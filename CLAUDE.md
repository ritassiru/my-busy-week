# My Busy Week — instruções para o Claude

Converse com o professor em **português**. O jogo é em **inglês**, com apoio em
português (glossário, dicas, instruções curtas).

## O projeto

Jogo de inglês do Prof. Ritaciro Cavalcante (IFAL Campus Viçosa) para o **1º ano**
do Ensino Médio Integrado, nível **A1/A2**: o aluno vive uma semana (segunda a
sexta, **um dia por aula**) no celular de um adolescente e usa o **futuro**
(*will*, *going to*, *present continuous* com expressão de tempo) para organizar
um evento. Lido **no celular**, muitas vezes com internet limitada: tudo precisa
funcionar em tela pequena, no modo claro e no escuro, e **sem internet**.

Projetos irmãos: `ritassiru/story-shelf` (de onde vêm o template base, o glossário
e o painel de configurações) e `ritassiru/the-ceo-game`. Mantenha a consistência
visual entre eles.

**Documentos de design:** `docs/gdd.md` (decisões do jogo) e
`docs/roteiro-<evento>.md` (o texto de cada dia, tarefa por tarefa). O roteiro é
escrito e aprovado primeiro; depois vira `event.json`.

**Estado (out/2026):** a semana inteira da *Surprise Party* é jogável: segunda a
quinta com 15 partes, a sexta com 18 (códigos `BALLOON`, `CLOUD`, `OVEN` e
`PARTY`). A *School Culture Fair* (`culture-fair`, código `CF`) também está
completa, mas é **rascunho** (`"published": false`) até o professor aprovar: teste com
`python3 fonte/build.py --drafts --out ...`. Falta a *Class Trip* (o decodificador do
código de resultado já está na `professor.html`).

## Arquitetura

```
fonte/game.json                       eventos, ordem, publicado/rascunho, códigos dos dias
fonte/events/<slug>/event.json        metadados (meta) + os dias de um evento
fonte/events/<slug>/scenes.js         ilustrações: SCENE_LIB["<slug>"] = (() => { ... return { cena: () => `svg` } })();
fonte/template.html                   visual e lógica, iguais para todos os eventos
fonte/a1.json, irreg.json             glossário Beginner e verbos irregulares (vieram da estante)
fonte/build.py                        gera ../index.html, sw.js, manifest e professor.html (--online, --drafts, --out)
fonte/checar.py                       valida o jogo e cada tarefa
fonte/qr.py                           gerador de QR (o MESMO arquivo da estante: não edite aqui)
fonte/icones.py                       ícones do aplicativo
index.html, sw.js, manifest.webmanifest, professor.html   GERADOS. Nunca edite à mão.
```

**Depois de qualquer mudança:** `python3 fonte/checar.py` e depois
`python3 fonte/build.py`. Abra o `index.html` e jogue ao menos um dia em largura
de celular (o Playwright está disponível nas sessões na nuvem).

### Um dia no `event.json`

`lock` (tela de bloqueio) → `notes` (lista do dia) → **12 `tasks`** → `close`
(resumo, agenda, gancho do dia seguinte, código de resultado, código do próximo dia):
**15 partes por dia** (decidido em out/2026: 7 era curto para uma aula). Das 12
tarefas, **8 são de montar** a frase e **4 são de leitura** (`"type": "pick"`), em
que o aluno confere Notes, agenda ou a conversa e escolhe 1 de 3 respostas
prontas (`outcomes` com `text`, `reply` e, nas erradas, `tip`; sem marca). O
texto dessas respostas vai sem glossário (botão dentro de botão quebra a tela).
A **sexta** é a exceção: 8 tarefas (6 + 2), porque já tem as cenas da festa e o
plano do fim de semana (18 partes). O `checar.py` confere as contas.

Cada tarefa tem `messages` (falas: `[quem, texto]`; `{name}` = nome do aluno),
`blocks` (as peças do montador, inclusive as erradas) e `outcomes` (as respostas):

- `say`: padrões de blocos aceitos. `"Yes!"` = um bloco; `{"opt": "Sorry,"}` = opcional;
  `{"any": ["a", "b", "c"]}` = esses blocos em qualquer ordem. A pontuação final é
  opcional. O `build.py` expande tudo; a primeira frase da primeira resposta `ok` é
  a frase-modelo das dicas ("Você quis dizer").
- sem `say`, uma resposta é uma **regra**: `has` (todos estes blocos), `hasAny`
  (algum destes), `lacks` (nenhum destes). As regras só valem se nenhuma frase
  `say` combinou; vale a primeira da lista.
- `fallback`: qualquer outra montagem.
- `if`: `{"mark": ..., "is": true/false}` faz a resposta valer só quando aquela marca
  (de um dia anterior) tem esse valor. Na quinta, a tarefa 4 aceita *at 4* ou
  *at 6* conforme a hora que o aluno marcou com a padaria; a frase-modelo
  (`model`) acompanha a condição. O `checar.py` confere se a marca já existe.
- `kind`: `ok` (conta como acerto de primeira; com `tip` vira ✅ com 💡), `warn`
  (⚠️ só a forma errada) ou `bad` (❌ informação errada). Toda resposta errada tem `tip`.
- Tarefa com `mark` (decisão-chave): **toda** resposta e o fallback dizem
  `"mark": true/false`. **Só a informação muda a marca**; a forma errada com a
  informação certa é `warn` com `mark: true`.
- `calendar` (na resposta, também nas de leitura) entra na agenda, que aparece na
  ordem dos dias (a entrada começa com `Mon`, `Tue`...). `notes` (na tarefa) entra
  nas notas do dia seguinte (escreva `"Tuesday: ..."`; na terça o nome do dia some
  e a nota aparece como *new* no Notes).
- `scene` (na tarefa, com `sceneAlt` para leitores de tela) mostra uma ilustração
  de `scenes.js` acima da conversa (videochamada, foto). `app` muda o ícone:
  `chat` 💬, `call` 📞, `video` 📹, `photo` 🖼️, `shop` 🛍️.
- `weather` (no dia) liga o app 🌦️ na barra do celular: `today` e `days` (cada um
  com `day`, `summary` e `hours` = [hora, emoji]). Só aparece nos dias que têm.
- **Partes da sexta que não são tarefas** (não contam acertos):
  - `"type": "piece"`: cena da festa. `scenes` (a primeira que combina) e `text`
    (os parágrafos que combinam), cada um com `when`: `[{"mark": ..., "is": ...}]` ou
    `[{"flag": ..., "is": ...}]` (todas precisam valer; marca sem valor = false).
  - `"type": "stars"`: a foto (`scene`), as estrelas (5 marcas boas = ⭐⭐⭐, 3–4 = ⭐⭐,
    0–2 = ⭐), a legenda de cada faixa (`meta.stars`: 3 pares [inglês, português],
    de 3 a 1 estrela) e a lista *Your week* (`meta.markInfo`: a frase que o aluno montou em
    cada decisão-chave e o efeito dela). Nada de um evento fica no template.
  - `"type": "plan"`: o plano do fim de semana (`plan`: `sentences`, `minTime`,
    `maxHelp`, os blocos do montador e o exemplo). Cada frase precisa de futuro
    (*will/'ll/won't* + verbo, *going to* + verbo, ou *am/is/are* + *-ing* com
    expressão de tempo); as dicas (*will to*, *will goes*, *I going to*, *going to
    playing*) não bloqueiam. **Trava:** com o plano aberto (`run.planPending`), a
    tela inicial não deixa recomeçar, mesmo recarregando.
- As ilustrações recebem o contexto da semana (`sceneOf`): `c.marks`, `c.flags` e
  `c.me` (o avatar). Escreva cenas que mudam como `cena: c => ...`.
- `flag` (na resposta) guarda uma escolha **sem marca** que só muda o visual da
  sexta (ex.: `camiseta_amarela`, na terça). Fica em `run.flags`.

## Regras para escrever (as mesmas do GDD)

- Falas curtas, vocabulário A1/A2, **sem simple past, nem nas falas** (o
  `checar.py` avisa). Expressões fixas no passado (*Got it!*) vão em `[[...|...]]`.
- **Distratores:** uma forma errada só entra quando o sentido muda de verdade e a
  reação mostra a mudança. Quando *will* e *going to* são naturais, aceite os dois
  (✅ com 💡).
- **-ing sem expressão de tempo quer dizer "agora"**: o balão só mostra
  "compromisso marcado" com expressão de tempo na mesma frase, e o `checar.py`
  avisa quando falta. Se o "agora" for de propósito (*I'm running!*), marque com `[[...]]`.
- Glossário Beginner: toda palavra nova precisa estar em `fonte/a1.json`,
  `_cognatos` ou `_ignorar` (o `checar.py` avisa). O `a1.json` veio da estante:
  palavras novas aqui também servem lá, então vale copiar de volta.
- Temas adequados a adolescentes. Lugares fictícios.
- A festa (o evento) **sempre dá certo** na sexta: as marcas mudam o jeito, nunca
  viram fracasso.

## Decisões já tomadas (não desfazer sem pedir)

- **Futuro no balão** (`WILL`, `GOING_TO`, `TIME`, `BE_ING`, `NOT_ING`): a mesma
  regra no `template.html` e no `checar.py`. Se mudar num, mude no outro.
  `NOT_ING` lista palavras em *-ing* que não são verbo (*morning, amazing, boring...*).
- **Partes copiadas da estante sem mudança** (utilidades, verbos, `person()`/`SKY()`/
  `GROUND()`, áudio, painel de configurações, *My words*, balão do glossário):
  mudanças nelas devem ir para os dois projetos. Diferenças de propósito: textos
  ("jogo" em vez de "estante/leitura") e a chave `reader:audio`.
- **Armazenamento** (tudo em `try/catch`): configurações compartilhadas com a
  estante (`reader:gloss`, `reader:theme`, `reader:size`, `reader:motion`,
  `reader:audio`), porque é o mesmo site. Do jogo: `week:profile` (nome e avatar),
  `week:run` (a semana em andamento) e `week:words` (*My words* do jogo, separado
  da estante). O nome do aluno nunca sai do aparelho.
- **Agenda** na ordem dos dias e, no mesmo dia, das horas (`calSorted`).
- **Atalho 📖 para as palavras-chave** no alto de todas as telas dos dias (tela de
  bloqueio, notas, tarefas e fim do dia), ao lado da engrenagem (`topBar(..., true)`).
  Abre por cima, no mesmo painel das configurações (`openSheet`): não mexe no
  jogo nem apaga a frase que o aluno está montando.
- **Um dia por aula:** a segunda abre direto; terça a sexta pedem o código do dia
  (`game.json` → `codes`), que fica em `professor.html`. O código organiza a
  turma, não é segurança.
- **Código de resultado:** `EV-dias-acertos-marcas-X` (ex.: `SP-1-03-1xxxx-L`; dias = 5
  só depois do plano, então `SP-5-...` quer dizer semana completa com plano):
  evento, dias concluídos, acertos de primeira (2 dígitos), uma letra por marca de
  `meta.marks` (1 boa, 0 ruim, x ainda não) e uma letra de conferência (soma dos
  códigos dos caracteres, mod 26).
- **Decodificador** na `professor.html` (gerado pelo `build.py`, sem mexer no `qr.py`):
  o professor cola os códigos, um por linha, com ou sem o nome antes, e vê a
  tabela da turma (dias, acertos de primeira com %, as 5 decisões, estrelas) e
  copia para planilha. A letra de conferência acusa cópia errada; as médias da
  turma contam só os códigos conferidos. Usa `meta.markInfo[].pt` (o rótulo em
  português de cada decisão). A conta da letra e a regra das estrelas estão no
  template (`resultCode`, `starsOf`) e no `build.py`: se mudar num, mude no outro.
- **PWA:** o `build.py` gera `sw.js` e `manifest.webmanifest`; prefixo do cache
  `my-busy-week-` (a estante usa `story-shelf-`, o CEO game `ceo-game-`).

## Armadilhas (vindas da estante)

- **Nunca reuse o mesmo atributo `data-*` em elementos diferentes.** Aqui:
  `data-act` (ações), `data-blk` (blocos), `data-tok` (blocos já na mensagem),
  `data-av` (avatar), `data-app` (barra de apps), `data-ev` (evento); o painel
  usa `data-k`/`data-v`; os verbos, `data-v`/`data-cols`.
- **Não nomeie globais com nomes da janela** (`top`, `name`, `status`, `parent`...).
- **Nomes de cena só com letras, números e `_`.**
- **Identificadores dentro dos SVGs precisam ser únicos** (`SKY()` já cuida disso).
- **Ao substituir texto em arquivos, confira o resultado**, não só a ausência do texto antigo.

## O que não fazer

- Licença: conteúdo em CC BY-SA 4.0, código em MIT, fontes em OFL (arquivo `LICENSE`).
- Não adicionar bibliotecas externas, CDNs nem qualquer acesso à rede.
- Não coletar nem enviar dados dos alunos.
- Não reproduzir letras de música ou textos protegidos.
