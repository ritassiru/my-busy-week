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
            if t.get("type") in ("piece", "stars", "plan"): continue   # partes da sexta que não são tarefas
            for o in t["outcomes"]:
                if "say" in o: o["say"] = [s for p in o["say"] for s in expand(p)]
            for o in t["outcomes"]:   # respostas certas com "if": cada uma tem a sua frase-modelo
                if o["kind"] == "ok" and "say" in o: o["model"] = join_toks(o["say"][0])
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
    assert "  </div>\n</main>" in pag and "</head>" in pag
    pag = pag.replace("  </div>\n</main>", codigos + "  </div>\n" + decodificador(events) + "</main>", 1)
    pag = pag.replace("</head>", DEC_CSS + "</head>", 1)
    open(os.path.join(HERE, "..", "professor.html"), "w", encoding="utf-8", newline="\n").write(pag)
    print("professor.html gerado (QR code + códigos dos dias)")

# ---------------- decodificador do código de resultado (na professor.html) ----------------
# O código é EV-dias-acertos-marcas-X (o mesmo resultCode() do template): X é a letra de conferência,
# 65 + (soma dos códigos dos caracteres de "EV-dias-acertos-marcas") mod 26. Se mudar lá, mude aqui.
DEC_CSS = """<style>
.dec { margin-top: 26px; }
.dec textarea { width: 100%; box-sizing: border-box; min-height: 120px; font: 1rem ui-monospace, Consolas, monospace; color: var(--ink); background: var(--panel); border: 2px solid var(--line); border-radius: 10px; padding: 10px; }
.dec table { width: 100%; border-collapse: collapse; margin: 12px 0; background: var(--panel); font-size: .95rem; }
.dec th, .dec td { border: 1px solid var(--line); padding: 6px 8px; text-align: left; vertical-align: top; }
.dec th { color: var(--berry); }
.dec .err { color: #B0413E; font-weight: 700; }
.dec .marks span { margin-right: 2px; cursor: help; }
.dec .tab { overflow-x: auto; }
.dec ol { margin: 6px 0 0; padding-left: 20px; }
@media print { .dec { display: none; } }
</style>
"""

def decodificador(events):
    import html
    dec = {e["meta"]["code"]: {"title": e["meta"]["title"], "marks": [{"pt": m.get("pt", m["mark"]), "good": m["good"], "bad": m["bad"]} for m in e["meta"]["markInfo"]],
                               "order": e["meta"]["marks"], "info": {m["mark"]: i for i, m in enumerate(e["meta"]["markInfo"])},
                               "perDay": [sum(1 for t in d["tasks"] if t.get("type") in (None, "pick")) for d in e["days"]]} for e in events}
    # a ordem das letras no código é a de meta.marks; a legenda segue meta.markInfo
    for v in dec.values(): v["marks"] = [v["marks"][v["info"][k]] for k in v["order"]]; del v["info"], v["order"]
    return DEC_HTML.replace("__DEC__", json.dumps(dec, ensure_ascii=False))

DEC_HTML = r"""  <section class="dec" id="decoder">
    <h2>Decodificador dos códigos de resultado</h2>
    <p class="hint">Cole os códigos que os alunos copiaram, <b>um por linha</b>. Pode pôr o nome antes (<i>Ana SP-5-50-11011-K</i>).
      Tudo é calculado aqui mesmo, sem internet, e nada é enviado.</p>
    <textarea id="dec-in" spellcheck="false" placeholder="Ana SP-5-50-11011-K&#10;Beto SP-3-30-110xx-P"></textarea>
    <p><button type="button" id="dec-copy" style="font:inherit;font-weight:700;color:#fff;background:var(--berry);border:0;border-radius:10px;padding:8px 14px;cursor:pointer" hidden>📋 Copiar a tabela (para planilha)</button>
      <span class="hint" id="dec-msg"></span></p>
    <div class="tab" id="dec-out"></div>
  </section>
<script>
const DEC = __DEC__;
const DEC_RX = /([A-Za-z]{2})\s*-\s*(\d)\s*-\s*(\d{1,2})\s*-\s*([01xXoO]{1,10})\s*-\s*([A-Za-z])/;
const decCheck = body => String.fromCharCode(65 + [...body].reduce((s, c) => s + c.charCodeAt(0), 0) % 26);
const decEsc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function decLine(line) {
  const m = line.match(DEC_RX); if (!m) return line.trim() ? { bad: line.trim() } : null;
  const ev = m[1].toUpperCase(), days = +m[2], ft = +m[3], marks = m[4].toLowerCase().replace(/o/g, "0");
  const body = `${ev}-${days}-${String(ft).padStart(2, "0")}-${marks}`;
  const name = line.replace(m[0], "").replace(/^[\s:;,|–-]+|[\s:;,|–-]+$/g, "");
  return { name, ev, days, ft, marks, ok: decCheck(body) === m[5].toUpperCase(), E: DEC[ev] };
}
const decStars = n => n === 5 ? "⭐⭐⭐" : n >= 3 ? "⭐⭐" : "⭐";   // a mesma regra de starsOf() no template
let decRows = [];
function decRender() {
  const lines = document.getElementById("dec-in").value.split("\n").map(decLine).filter(Boolean);
  const out = document.getElementById("dec-out"), msg = document.getElementById("dec-msg");
  decRows = [];
  if (!lines.length) { out.innerHTML = ""; msg.textContent = ""; document.getElementById("dec-copy").hidden = true; return; }
  const evs = [...new Set(lines.filter(r => r.E).map(r => r.ev))];
  out.innerHTML = evs.map(ev => {
    const E = DEC[ev], rows = lines.filter(r => r.ev === ev);
    const body = rows.map(r => {
      const poss = E.perDay.slice(0, r.days).reduce((a, b) => a + b, 0), pct = poss ? Math.round(100 * r.ft / poss) : 0;
      const good = [...r.marks].filter(c => c === "1").length;
      decRows.push([r.name || "—", E.title, r.days === 5 ? "5 (semana completa, com plano)" : String(r.days), `${r.ft}/${poss} (${pct}%)`,
        ...E.marks.map((_, i) => ({ "1": "sim", "0": "não" }[r.marks[i]] || "—")), r.days === 5 ? decStars(good) : "", r.ok ? "ok" : "conferir"]);
      return `<tr><td>${decEsc(r.name || "—")}</td><td>${r.days === 5 ? "5 ✅" : r.days}</td><td>${r.ft}/${poss} <span class="hint">(${pct}%)</span></td>
        <td class="marks">${E.marks.map((m, i) => { const c = r.marks[i]; return `<span title="${decEsc(m.pt)}: ${c === "1" ? decEsc(m.good) : c === "0" ? decEsc(m.bad) : "ainda não"}">${c === "1" ? "✅" : c === "0" ? "❌" : "·"}</span>`; }).join("")}</td>
        <td>${r.days === 5 ? decStars(good) : ""}</td><td>${r.ok ? "✓" : '<span class="err">conferir a cópia</span>'}</td></tr>`;
    }).join("");
    // as médias da turma contam só os códigos conferidos (os com a letra errada podem estar copiados com erro)
    const okRows = rows.filter(r => r.ok), done = okRows.filter(r => r.days === 5).length;
    const media = okRows.length ? Math.round(okRows.reduce((s, r) => { const p = E.perDay.slice(0, r.days).reduce((a, b) => a + b, 0); return s + (p ? r.ft / p : 0); }, 0) / okRows.length * 100) : 0;
    const perMark = E.marks.map((m, i) => { const vis = okRows.filter(r => r.marks[i] === "1" || r.marks[i] === "0"); return vis.length ? `${Math.round(100 * vis.filter(r => r.marks[i] === "1").length / vis.length)}%` : "—"; });
    return `<h3>${decEsc(E.title)} · ${rows.length} ${rows.length === 1 ? "aluno" : "alunos"}</h3>
      <table><thead><tr><th>Aluno</th><th>Dias</th><th>Acertos de primeira</th><th>Decisões 1–5</th><th>Estrelas</th><th>Cópia</th></tr></thead><tbody>${body}</tbody>
      <tfoot><tr><th>Turma <span class="hint">(códigos conferidos)</span></th><td>${done} com a semana completa</td><td>média ${media}%</td><td colspan="3">${perMark.map((p, i) => `${i + 1}: ${p}`).join(" · ")}</td></tr></tfoot></table>
      <p class="hint"><b>Decisões</b> (passe o mouse no ✅/❌ para ver o efeito na festa; a porcentagem da turma conta só quem já chegou naquele dia):</p>
      <ol class="hint">${E.marks.map(m => `<li>${decEsc(m.pt)}</li>`).join("")}</ol>`;
  }).join("");
  const bad = lines.filter(r => r.bad || !r.E), wrong = lines.filter(r => r.E && !r.ok);
  msg.textContent = [bad.length ? `${bad.length} linha(s) sem código reconhecido.` : "", wrong.length ? `${wrong.length} código(s) com a letra de conferência errada: provavelmente copiados com erro.` : ""].join(" ");
  document.getElementById("dec-copy").hidden = !decRows.length;
}
document.getElementById("dec-in").addEventListener("input", decRender);
document.getElementById("dec-copy").addEventListener("click", () => {
  const head = ["Aluno", "Evento", "Dias", "Acertos de primeira", ...[1, 2, 3, 4, 5].map(i => "Decisão " + i), "Estrelas", "Cópia"];
  const tsv = [head, ...decRows].map(r => r.join("\t")).join("\n");
  const done = () => { document.getElementById("dec-msg").textContent = "Tabela copiada: cole na planilha."; };
  if (navigator.clipboard) navigator.clipboard.writeText(tsv).then(done, () => { prompt("Copie a tabela:", tsv); });
  else prompt("Copie a tabela:", tsv);
});
</script>
"""

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
