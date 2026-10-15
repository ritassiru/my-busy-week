"""Gera o jogo (../index.html) a partir de game.json e das pastas em events/.

Uso:
  python3 fonte/build.py             -> ../index.html autossuficiente (fontes embutidas, funciona offline)
  python3 fonte/build.py --online    -> carrega as fontes do Google Fonts (arquivo mais leve)
  python3 fonte/build.py --drafts    -> inclui também os eventos com "published": false (para testar)
  python3 fonte/build.py --out ARQ   -> grava em outro arquivo

Gera também manifest.webmanifest e sw.js (só no jogo publicado, sem --out), que
deixam instalar o jogo no celular e abri-lo sem internet depois da primeira
visita (os ícones vêm de icones.py), e professor.html (QR code e códigos dos dias).

As respostas de cada tarefa são escritas como padrões de blocos:
  "Yes!"                       um bloco
  { "opt": "Sorry," }          bloco opcional
  { "any": ["a", "b", "c"] }   estes blocos em qualquer ordem
O build expande os padrões em todas as frases aceitas (o template só compara).
Tarefas de leitura ("type": "pick") não têm blocos: cada resposta tem "text".
"""
import base64, hashlib, html, itertools, json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
P = lambda *p: os.path.join(HERE, *p)
URL = "https://ritassiru.github.io/my-busy-week/"   # endereço publicado (GitHub Pages), usado no QR code
FACES = [("Fraunces", 600, "normal", "fraunces-latin-600-normal.woff2"), ("Fraunces", 800, "normal", "fraunces-latin-800-normal.woff2"),
         ("Atkinson Hyperlegible", 400, "normal", "atkinson-hyperlegible-latin-400-normal.woff2"),
         ("Atkinson Hyperlegible", 400, "italic", "atkinson-hyperlegible-latin-400-italic.woff2"),
         ("Atkinson Hyperlegible", 700, "normal", "atkinson-hyperlegible-latin-700-normal.woff2")]
DIAS_PT = ["segunda", "terça", "quarta", "quinta", "sexta"]

def expand(pat):
    """Todas as sequências de blocos que um padrão aceita, na ordem escrita (a primeira é a frase-modelo)."""
    out = [[]]
    for item in pat:
        if isinstance(item, str): opts = [[item]]
        elif "any" in item: opts = [list(p) for p in itertools.permutations(item["any"])]
        elif "opt" in item: o = item["opt"]; opts = [[o] if isinstance(o, str) else list(o), []]
        else: raise ValueError(f"item de padrão desconhecido: {item}")
        out = [a + b for a in out for b in opts]
    return out

def join_toks(ts):
    """Mesma regra de joinToks() no template: sem espaço antes de apóstrofo e pontuação."""
    s = ""
    for t in ts: s = t if not s else s + t if re.match(r"^['’.,!?]", t) else s + " " + t
    return s

def load_event(slug):
    d = P("events", slug)
    e = json.load(open(os.path.join(d, "event.json"), encoding="utf-8"))
    for day in e["days"]:
        for t in day["tasks"]:
            for o in t["outcomes"]:
                if "say" in o: o["say"] = [s for p in o["say"] for s in expand(p)]
            ok = next(o for o in t["outcomes"] if o["kind"] == "ok")
            # tarefa de leitura ("pick"): a resposta certa é a própria frase-modelo
            t["model"] = re.sub(r"\[\[([^|\]]+)\|[^\]]+\]\]", r"\1", ok["text"]) if t.get("type") == "pick" else join_toks(ok["say"][0])
    return {"slug": slug, "meta": e["meta"], "days": e["days"]}, open(os.path.join(d, "scenes.js"), encoding="utf-8").read()

def main(online=False, drafts=False, out=None):
    game = json.load(open(P("game.json"), encoding="utf-8"))
    events, scenes = [], []
    for entry in game["events"]:
        if not entry.get("published") and not drafts: continue
        ev, sc = load_event(entry["slug"]); events.append(ev); scenes.append(sc)
    if not events: sys.exit("Nenhum evento publicado em game.json.")
    t = open(P("template.html"), encoding="utf-8").read()
    if not online:
        css = "\n".join(f'@font-face {{ font-family: "{f}"; font-weight: {w}; font-style: {s}; font-display: swap; src: url(data:font/woff2;base64,'
                        f'{base64.b64encode(open(P("fonts", fn), "rb").read()).decode()}) format("woff2"); }}' for f, w, s, fn in FACES)
        t = re.sub(r'<link rel="preconnect" href="https://fonts.googleapis.com">.*?display=swap" rel="stylesheet">', lambda m: "<style>\n" + css + "\n</style>", t, flags=re.S)
        assert "googleapis" not in t
    data = {"title": game["title"], "subtitle": game["subtitle"], "codes": game["codes"], "events": events}
    page = (t.replace("__TITLE__", game["title"]).replace("__GAME__", json.dumps(data, ensure_ascii=False))
             .replace("__IRREG__", json.dumps(json.load(open(P("irreg.json"), encoding="utf-8")), ensure_ascii=False))
             .replace("__A1__", json.dumps({k: v for k, v in json.load(open(P("a1.json"), encoding="utf-8")).items() if not k.startswith("_")}, ensure_ascii=False))
             .replace("__SCENES__", "\n".join(scenes)))
    out = out or os.path.join(HERE, "..", "index.html")
    open(out, "w", encoding="utf-8", newline="\n").write(page)
    print(f"gerado: {out} | eventos: {', '.join(e['slug'] for e in events)} | {len(page.encode()) // 1024} KB")
    if out == os.path.join(HERE, "..", "index.html"):   # só para o jogo publicado (não para --out)
        arquivos_do_app(os.path.join(HERE, ".."), "my-busy-week", game["title"], "Busy Week", game["subtitle"], page)
        pagina_do_professor(game, events)

def pagina_do_professor(game, events):
    """QR code do jogo + os códigos de cada dia (o qr.py é o mesmo da estante: não mexa nele aqui)."""
    sys.path.insert(0, HERE)
    from qr import pagina_professor
    cartoes = [(game["title"], "O jogo inteiro · " + ", ".join(e["meta"]["title"] for e in events), URL)]
    pag = pagina_professor(game["title"], game["subtitle"], cartoes)
    linhas = "".join(f"<tr><td>{DIAS_PT[i].capitalize()} (aula {i + 1})</td><td><b>{html.escape(c) if c else '— abre direto'}</b></td></tr>"
                     for i, c in enumerate(game["codes"]))
    codigos = (f'    <article class="card"><h2>Códigos dos dias</h2><p class="hint">Mostre no quadro no começo de cada aula. '
               f'Quem faltou recebe o código depois.</p><table style="margin:8px auto;border-collapse:collapse;text-align:left;font-size:1.1rem">{linhas}</table></article>\n')
    assert "  </div>\n</main>" in pag
    pag = pag.replace("  </div>\n</main>", codigos + "  </div>\n</main>", 1)
    open(os.path.join(HERE, "..", "professor.html"), "w", encoding="utf-8", newline="\n").write(pag)
    print("professor.html gerado (QR code + códigos dos dias)")

# ---------------- aplicativo (PWA): instalar no celular e abrir sem internet ----------------
ICONES = ["icon-192.png", "icon-512.png", "apple-touch-icon.png"]
SW = r"""// GERADO por fonte/build.py. Nunca edite à mão.
// Guarda o jogo no aparelho na primeira visita; depois ele abre mesmo sem internet.
// A versão muda a cada build: o celular baixa o jogo novo na próxima vez que abrir com internet.
const CACHE = "__PREFIXO__-__VERSAO__";
const ARQUIVOS = __ARQUIVOS__;
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(ARQUIVOS.map(f => new Request(f, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  // apaga só as versões antigas deste jogo (os outros projetos no mesmo site têm outro prefixo)
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith("__PREFIXO__-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(c => c.match(r, { ignoreSearch: true }).then(achou => achou ||
    // sem internet, só a página inicial vira o jogo guardado (professor.html, por exemplo, não)
    fetch(r).catch(() => r.mode === "navigate" && /\/(index\.html)?$/.test(new URL(r.url).pathname) ? c.match("index.html") : Response.error()))));
});
"""

def arquivos_do_app(raiz, prefixo, nome, curto, descricao, page):
    """Grava manifest.webmanifest e sw.js ao lado do index.html."""
    manifest = {"name": nome, "short_name": curto, "description": descricao, "lang": "en",
                "start_url": "./", "scope": "./", "display": "standalone",
                "background_color": "#F6F0E6", "theme_color": "#6D2E46",
                "icons": [{"src": "icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
                          {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
                          {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]}
    man = json.dumps(manifest, ensure_ascii=False, indent=1) + "\n"
    open(os.path.join(raiz, "manifest.webmanifest"), "w", encoding="utf-8", newline="\n").write(man)
    # a versão sai do conteúdo (e não do arquivo gravado), para dar o mesmo resultado no Windows e no GitHub
    versao = hashlib.sha256((page + man).encode()).hexdigest()[:12]
    arquivos = ["./", "index.html", "manifest.webmanifest"] + ICONES
    sw = SW.replace("__PREFIXO__", prefixo).replace("__VERSAO__", versao).replace("__ARQUIVOS__", json.dumps(arquivos))
    open(os.path.join(raiz, "sw.js"), "w", encoding="utf-8", newline="\n").write(sw)
    print(f"aplicativo: manifest.webmanifest e sw.js (versão {versao})")


if __name__ == "__main__":
    a = sys.argv[1:]
    main(online="--online" in a, drafts="--drafts" in a, out=a[a.index("--out") + 1] if "--out" in a else None)
