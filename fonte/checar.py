"""Confere o jogo e todos os eventos. Rode depois de qualquer edição.

Uso:  python3 fonte/checar.py

Para cada evento de game.json verifica: metadados, ilustrações, os dias (4 tarefas
cada), as respostas de cada tarefa (todo padrão pode ser montado com os blocos,
nenhuma frase cai em duas respostas, toda resposta errada tem dica), as marcas
das decisões-chave e os códigos dos dias. Avisa também sobre palavras fora do
glossário Beginner (A1), simple past (o jogo não usa), -ing sem expressão de
tempo (parece "agora", não futuro) e "going to" tratado como o verbo go.
"""
import json, os, re, sys
from collections import Counter
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from build import expand, join_toks
IR = json.load(open(os.path.join(HERE, "irreg.json"), encoding="utf-8"))
PAST = {f.lower() for v in IR for f in v[1].split(" / ")} | {"didn't", "couldn't", "wasn't", "weren't", "hadn't", "could"}
NOT_PAST = {"need", "feed", "seed", "speed", "red", "bed", "indeed", "shed"}
# futuro no balão: a mesma regra está em template.html (GOING_TO, TIME, BE_ING, NOT_ING). Se mudar aqui, mude lá.
GOING_TO = re.compile(r"\b(going to)(?=\s+(?!(?:the|a|an|my|your|his|her|its|our|their|this|that|these|those|school|bed|sleep|work|church|class|town|home)\b)[a-z])", re.I)
TIME = re.compile(r"\b(?:tonight|tomorrow|this (?:morning|afternoon|evening|weekend)|next (?:week|weekend|year|monday|tuesday|wednesday|thursday|friday|saturday|sunday)|on (?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)|in the (?:morning|afternoon|evening)|at \d{1,2}(?::\d\d)?)\b", re.I)
BE_ING = re.compile(r"((?:\b(?:am|is|are)|['’](?:m|s|re))\s+)([a-z]+ing)\b", re.I)
NOT_ING = {"nothing", "something", "anything", "everything", "thing", "morning", "evening", "king", "ring", "spring", "building", "ceiling", "sing", "bring"}
A1 = json.load(open(os.path.join(HERE, "a1.json"), encoding="utf-8"))
SEM_A1 = {"a", "an", "the", "i", "you", "it", "is", "are", "am", "to", "and", "of", "in", "on", "at"}
CONHECIDAS = set(A1) | set(A1.get("_cognatos", [])) | set(A1.get("_ignorar", [])) | SEM_A1
for _b, _p, _pp, _ in IR:
    CONHECIDAS |= {_b, _b + "s", _b + "es", _b + "ing", _b[:-1] + "ing", _b + _b[-1] + "ing", _b[:-2] + "ying"} | set(_p.split(" / ")) | set(_pp.split(" / "))
META = ["slug", "code", "title", "titlePt", "blurb", "blurbPt", "cover", "cast", "marks", "keywords"]
DAY = ["day", "dayPt", "focusPt", "lock", "notes", "notesPt", "tasks", "close"]
KINDS = {"ok", "warn", "bad"}
TAREFAS = 4

sem_glossario = lambda t: re.sub(r"\[\[([^|\]]+)\|[^\]]+\]\]", r"\1", t.replace("{name}", "Ana"))
def passado(t):
    # o que está em [[...]] já tem tradução e é de propósito (Got it!)
    return sorted({x for x in re.findall(r"[a-z']+", re.sub(r"\[\[[^\]]+\]\]", " ", t).lower()) if x in PAST or (x.endswith("ed") and len(x) > 3 and x not in NOT_PAST)})
def ing_ambiguo(t):
    """-ing depois de am/is/are sem expressão de tempo na mesma frase: o aluno lê como "agora"."""
    out = []
    for frase in re.findall(r"[^.!?]+[.!?]*", re.sub(r"\[\[[^\]]+\]\]", "", t)):
        if TIME.search(frase): continue
        for m in BE_ING.finditer(frase):
            ing = m.group(2).lower()
            if ing in NOT_ING or (ing == "going" and GOING_TO.match(frase[m.start(2):])): continue
            out.append(frase.strip())
    return out

def check_event(slug, game):
    erros, avisos = [], []
    pasta = os.path.join(HERE, "events", slug)
    E = json.load(open(os.path.join(pasta, "event.json"), encoding="utf-8"))
    M, D = E.get("meta", {}), E.get("days", [])
    for k in META:
        if k not in M: erros.append(f"meta: falta o campo '{k}'")
    if M.get("slug") != slug: erros.append(f"meta.slug é '{M.get('slug')}', mas a pasta se chama '{slug}'")
    for g in M.get("keywords", []):
        if not all(len(w) == 3 for w in g.get("words", [])): erros.append(f"keywords '{g.get('title')}': cada palavra precisa de [emoji, inglês, português]")
    js = open(os.path.join(pasta, "scenes.js"), encoding="utf-8").read()
    if f'SCENE_LIB["{slug}"]' not in js: erros.append(f'scenes.js precisa registrar SCENE_LIB["{slug}"]')
    cenas = set(re.findall(r"^\s*(\w+): \(\) =>", js, re.M))
    if M.get("cover") not in cenas: erros.append(f"meta.cover: a ilustração '{M.get('cover')}' não existe em scenes.js")
    if not 1 <= len(D) <= 5: erros.append(f"o evento tem {len(D)} dias (de 1 a 5)")
    elif len(D) < 5: avisos.append(f"evento incompleto: {len(D)} de 5 dias")
    cast = set(M.get("cast", {})) | {"me"}
    ids, textos, marcas = Counter(), [], Counter()
    for di, d in enumerate(D):
        nd = d.get("day", f"dia {di + 1}")
        for k in DAY:
            if k not in d: erros.append(f"{nd}: falta o campo '{k}'")
        if erros: continue
        if len(d["tasks"]) != TAREFAS: erros.append(f"{nd}: {len(d['tasks'])} tarefas (todo dia tem {TAREFAS})")
        textos += [(nd, x) for x in d["notes"]] + [(nd, x[2]) for x in d["lock"]["items"]] + [(nd, d["close"]["tomorrow"]), (nd, d["close"]["hook"][3])]
        for t in d["tasks"]:
            tid = t.get("id", "?"); ids[tid] += 1; onde = f"{nd} · {tid}"
            for k in ["id", "app", "thread", "time", "messages", "pt", "blocks", "outcomes", "fallback"]:
                if k not in t: erros.append(f"{onde}: falta o campo '{k}'")
            if any(k not in t for k in ["messages", "blocks", "outcomes", "fallback"]): continue
            B = t["blocks"]
            if len(set(B)) != len(B): erros.append(f"{onde}: bloco repetido em blocks")
            for w, x in t["messages"]:
                if w not in cast: erros.append(f"{onde}: '{w}' fala, mas não está em meta.cast")
                textos.append((onde, x))
            oks = [o for o in t["outcomes"] if o.get("kind") == "ok"]
            if not oks or "say" not in oks[0]: erros.append(f"{onde}: a primeira resposta 'ok' precisa de 'say' (é a frase-modelo das dicas)")
            vistas = {}
            for i, o in enumerate(t["outcomes"] + [dict(t["fallback"], kind="fallback")]):
                ko = f"{onde} · resposta {i + 1} ({o.get('kind')})"
                if o["kind"] != "fallback" and o.get("kind") not in KINDS: erros.append(f"{ko}: kind deve ser ok, warn ou bad")
                if not o.get("reply"): erros.append(f"{ko}: falta 'reply' (a reação do personagem)")
                for w, x in o.get("reply", []):
                    if w not in cast: erros.append(f"{ko}: '{w}' fala, mas não está em meta.cast")
                    textos.append((ko, x))
                if o["kind"] != "ok" and not o.get("tip"): erros.append(f"{ko}: resposta errada sem 'tip' (a dica em português)")
                if t.get("mark"):
                    if not isinstance(o.get("mark"), bool): erros.append(f"{ko}: tarefa com marca '{t['mark']}', mas a resposta não diz \"mark\": true/false")
                    elif o["kind"] == "ok" and not o["mark"]: erros.append(f"{ko}: resposta certa com mark false")
                elif "mark" in o: erros.append(f"{ko}: 'mark' numa tarefa sem marca")
                for p in o.get("say", []):
                    for s in expand(p):
                        if any(b not in B for b in s): erros.append(f"{ko}: o padrão usa um bloco que não existe: {[b for b in s if b not in B]}")
                        if len(set(s)) != len(s): erros.append(f"{ko}: o padrão usa o mesmo bloco duas vezes: {join_toks(s)}")
                        chave = tuple(s[:len(s) - next((j for j, b in enumerate(reversed(s)) if b not in ".!?"), 0)])
                        if chave in vistas and vistas[chave] != i: erros.append(f"{ko}: a frase '{join_toks(s)}' já está em outra resposta")
                        vistas[chave] = i
                regras = [b for k in ("has", "hasAny", "lacks") for b in o.get(k, [])]
                if any(b not in B for b in regras): erros.append(f"{ko}: has/hasAny/lacks com bloco que não existe")
                if o["kind"] != "fallback" and not o.get("say") and not regras: erros.append(f"{ko}: resposta sem 'say' e sem regra (has, hasAny, lacks): nunca acontece")
            if t.get("mark"):
                marcas[t["mark"]] += 1
                if t["mark"] not in M.get("marks", []): erros.append(f"{onde}: marca '{t['mark']}' não está em meta.marks")
    for tid, n in ids.items():
        if n > 1: erros.append(f"id de tarefa repetido: {tid}")
    for m in M.get("marks", []):
        if marcas[m] > 1: erros.append(f"a marca '{m}' aparece em {marcas[m]} tarefas (deve ser uma)")
        elif not marcas[m] and len(D) == 5: erros.append(f"a marca '{m}' não aparece em nenhuma tarefa")
    if len(D) < 5 and M.get("marks"):
        falta = [m for m in M["marks"] if not marcas[m]]
        if falta: avisos.append(f"marcas ainda sem tarefa (dias por escrever): {', '.join(falta)}")
    # linguagem
    for onde, x in textos:
        p = passado(x)
        if p: avisos.append(f"{onde}: simple past? {', '.join(p)} → '{sem_glossario(x)}'")
        for f in ing_ambiguo(x): avisos.append(f"{onde}: -ing sem expressão de tempo (parece 'agora'): '{sem_glossario(f)}'")
        solto = re.search(r"\bgoing to\b", GOING_TO.sub("", re.sub(r"\[\[[^\]]+\]\]", "", x)), re.I)
        if solto: avisos.append(f"{onde}: 'going to' tratado como o verbo go: '{x}'")
    limpos = [re.sub(r"\[\[[^\]]+\]\]", " ", x.replace("{name}", " ")) for _, x in textos] + [M.get("blurb", "")]
    # blocos como 'll e 're meeting: o pedaço depois do apóstrofo não é uma palavra
    limpos += [re.sub(r"^['’][a-z]+\s*", "", b) for d in D for t in d.get("tasks", []) for b in t.get("blocks", [])]
    minusc = {w for t in limpos for w in re.findall(r"\b[a-zà-ÿ]+\b", t)}
    nomes = {w.lower() for t in limpos for w in re.findall(r"(?<![.!?] )(?<!^)\b([A-ZÀ-Ý][a-zà-ÿ]+)", t)} - minusc
    nomes |= {n.lower() for n in M.get("cast", {})}
    vistas = {w.lower().replace("’", "'") for t in limpos for w in re.findall(r"[A-Za-zÀ-ÿ]+(?:['’][A-Za-zÀ-ÿ]+)?", t)}
    faltam = sorted(w for w in vistas if w not in CONHECIDAS and re.sub(r"'s$", "", w) not in nomes)
    if faltam: avisos.append("glossário Beginner: palavras sem tradução em a1.json (ou em _cognatos): " + ", ".join(faltam))
    resumo = f"{len(D)} de 5 dias · {sum(len(d.get('tasks', [])) for d in D)} tarefas · marcas {sum(marcas.values())}/{len(M.get('marks', []))}"
    return erros, avisos, resumo

def main():
    game = json.load(open(os.path.join(HERE, "game.json"), encoding="utf-8"))
    total = 0
    c = game.get("codes", [])
    if len(c) != 5 or c[0] != "" or not all(re.fullmatch(r"[A-Z]{3,10}", x) for x in c[1:]) or len(set(c[1:])) != 4:
        print("ERRO: game.codes precisa de 5 itens: \"\" (a segunda abre direto) e 4 códigos diferentes em MAIÚSCULAS"); total += 1
    slugs = [e["slug"] for e in game["events"]]
    if len(slugs) != len(set(slugs)): print("ERRO: slug repetido em game.json"); total += 1
    pastas = {d for d in os.listdir(os.path.join(HERE, "events")) if os.path.isdir(os.path.join(HERE, "events", d))}
    for d in sorted(pastas - set(slugs)): print(f"AVISO: events/{d} existe, mas não está em game.json")
    for e in game["events"]:
        slug = e["slug"]
        if slug not in pastas: print(f"ERRO: {slug}: a pasta events/{slug} não existe"); total += 1; continue
        erros, avisos, resumo = check_event(slug, game)
        print(f"\n📱 {slug} ({'publicado' if e.get('published') else 'rascunho'})\n   {resumo}")
        for a in avisos: print("   AVISO:", a)
        for x in erros: print("   ERRO:", x)
        total += len(erros)
    print("\nRESULTADO:", "OK" if not total else f"{total} erro(s)")
    sys.exit(1 if total else 0)

if __name__ == "__main__":
    main()
