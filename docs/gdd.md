# My Busy Week — Game Design Document

> Versão 0.1 · out/2026 · Prof. Ritaciro Cavalcante (IFAL Campus Viçosa)
> Projeto irmão do **Story Shelf** e do **the-ceo-game**.
>
> Nomes de personagens, da cidade e textos de exemplo são **provisórios**.

---

## 1. Visão geral

| | |
|---|---|
| **Gênero** | Simulador de semana no celular, com escolhas e consequências |
| **Público** | 1º ano do Ensino Médio Integrado, nível A1/A2 |
| **Plataforma** | Celular (tela pequena), modo claro e escuro, **sem internet** (PWA) |
| **Conteúdo** | Futuro: ***will***, ***going to*** e ***present continuous*** (compromissos) |
| **Apoio** | *Simple present* (rotina, horários) e imperativo (pedidos, avisos). **Sem simple past.** |
| **Duração** | 5 episódios (segunda a sexta), **um por aula**, de 25 a 30 min cada (15 partes) |

### Objetivo pedagógico
O aluno distingue os três usos do futuro **pelo efeito**, e não só pela regra:

- ***going to***: planos já decididos (*I'm going to study tonight*) e previsões
  com evidência (*Look at the clouds! It's going to rain*);
- ***will***: decisões na hora, ofertas e promessas (*I'll bring the snacks!*) e
  previsões de opinião (*I think it'll be fun*);
- ***present continuous***: compromissos com hora e lugar marcados
  (*We're meeting at 3 p.m. at the library*).

### Princípio de design
**Toda forma errada tem consequência na história.** Um *I'll meet you* (que soa
como decisão de momento) no lugar de *I'm meeting you at 4* deixa o amigo sem
saber se foi combinado de verdade, e na sexta ele não aparece.

---

## 2. Premissa e mundo

O aluno vive **a semana de um adolescente** numa cidade fictícia (nome
provisório: **Vila Serena**). O jogo acontece no **celular do personagem**, e
cada **app é uma mecânica**:

| App | Uso do futuro | Exemplo |
|---|---|---|
| 📅 **Calendar** | compromissos marcados → *present continuous* | *I'm meeting Bia at 4 p.m. on Tuesday.* |
| 📝 **Notes** | planos e intenções → *going to* | *I'm going to buy the balloons.* |
| 💬 **Chat** | decisões na hora, ofertas, promessas → *will* | *No problem, I'll bring the speakers!* |
| 🌦️ **Weather / Photos** | evidência (*going to*) x opinião (*will*) | *Look! It's going to rain.* / *I think it'll be sunny.* |
| 📞 **Calls** | imprevistos com reação imediata → *will* | *Don't worry, I'll call the bus company.* |

### Escolha do evento
Na primeira tela o aluno escolhe **o evento de sexta-feira**. Versão 1 com três:

1. **School Culture Fair**: a feira cultural da escola (equipe, estande, ensaio);
2. **Class Trip**: passeio da turma a uma praia fictícia (ônibus, lanche, tempo);
3. **Surprise Party**: festa surpresa para um amigo (segredo, convites, compras).

### Estrutura comum com "peles"
Os cinco dias têm **os mesmos tipos de tarefa** em todos os eventos. Só o
conteúdo muda. Assim um evento novo é só texto e ilustrações, sem mexer no motor.

| Dia | Foco | Apps principais | Forma em destaque |
|---|---|---|---|
| **Monday** | convites e agenda | Chat, Calendar | *present continuous* (+ *will* para aceitar convites) |
| **Tuesday** | planos e lista de tarefas | Notes, Chat (família) | *going to* (+ *will* para promessas) |
| **Wednesday** | previsão do tempo e sinais | Weather, Photos | *going to* (evidência) x *will* (opinião) |
| **Thursday** | imprevisto | Calls, Chat | *will* (decisão na hora, oferta) |
| **Friday** | o evento + plano do fim de semana | todos | as três, misturadas |

---

## 3. Personagens

### Protagonista: o próprio aluno
- Digita o **nome** e monta um **avatar simples** com o ajudante `person()`
  (tom de pele, cabelo, cor da camiseta).
- Nome e avatar ficam **só no aparelho**. Nada é enviado.
- O aluno escreve em **1ª pessoa** (*I'll..., I'm going to...*). Os outros
  personagens falam com ele pelo nome.

### Núcleo fixo de amigos (nos três eventos)
Cada um tem um traço que **gera situações de futuro**:

| Nome (provisório) | Traço | Situação típica |
|---|---|---|
| **Bia** | organizada, vive na agenda | marca horários (*We're meeting at...*) e cobra confirmação |
| **Davi** | sempre atrasado, promete demais | *I'll be there, I promise!* (será?) |
| **Maya** | preocupada com o tempo | olha o céu e o app do tempo, faz previsões |
| **Kauã** | brincalhão, cuida da comida | oferece ajuda de última hora (*I'll bring pizza!*) |

### Convidados por evento (1 ou 2 por evento)
- *Fair*: a professora coordenadora da feira e o técnico do som;
- *Trip*: o motorista do ônibus e a guia do passeio;
- *Party*: a aniversariante, **Nina** (não pode descobrir), e a dona da padaria.

### Adultos
- **Família** (mãe, pai ou avó): pedem tarefas e o aluno promete (*I'll do it
  after lunch!*);
- **Professor(a)**: avisa prazos e compromissos da escola;
- **Serviços** (loja, ônibus, rádio do tempo): ligações e imprevistos.

---

## 4. Estrutura e mecânicas

### Ciclo de cada dia
1. **Abertura**: tela de bloqueio com notificações (*3 new messages · 1 missed
   call*) e a **lista do dia** no Notes (*Today I'm meeting... / I'm going to...*).
   Ela substitui uma recapitulação no passado, que fica fora do conteúdo.
2. **Tarefas** (12 por dia): o aluno lê uma situação num app e responde.
   - **8 de montar a frase** (abaixo);
   - **4 de leitura**: o aluno confere o Notes, a agenda, o app do tempo ou a
     própria conversa e escolhe 1 de 3 respostas prontas. Elas variam o ritmo,
     treinam a leitura do celular e não guardam marca.

   Com a abertura, o Notes e o fechamento, cada dia tem **15 partes** (decidido em
   out/2026: 7 partes era pouco para uma aula). A **sexta** tem 8 tarefas, porque
   já tem as cenas da festa e o plano do fim de semana: são 18 partes.
3. **Reação**: o personagem responde e mostra se o sentido ficou certo.
4. **Fechamento**: resumo do dia, acertos e as palavras novas no *My words*.

### Montar a frase
- O aluno toca em **blocos de palavras** na ordem (como o montador do reconto).
- Os blocos trazem **as três formas como opções concorrentes**, por exemplo:

  > **Bia:** Can you come to the meeting? It's on Tuesday at 4.
  >
  > Blocos: `I` `'ll` `'m going to` `'m` `meeting` `meet` `you` `there` `at 4` `on Tuesday`

  Escolher a forma faz parte da montagem. Não dá para acertar só pela ordem.
- Mais de uma resposta pode ser aceita quando o sentido for o mesmo
  (*I'll be there* para aceitar um convite na hora também vale).
- **Regra de ouro dos distratores:** uma forma errada só entra quando **o sentido
  muda de verdade** e a reação do personagem mostra essa mudança. Quando duas
  formas soam naturais em inglês, as duas são aceitas.
- Um erro também pode estar na **informação** (hora errada, dia faltando), e não
  só na forma. O *-ing* sem expressão de tempo quer dizer **agora**, e os
  personagens reagem assim (*Today?! I'm running!*).

### Erro: consequência que fica
- **Não há nova tentativa.** O personagem **reage na hora** ao sentido que a
  frase passou (*Wait... are you coming or not? 🤔*) e aparece a dica
  **"o que você quis dizer"** com a frase certa e o motivo em português.
- Cada dia tem **1 ou 2 decisões-chave** que viram **marcas**:

  | Dia | Marca (exemplo) | Efeito na sexta |
  |---|---|---|
  | Mon | `combinado_firme` | a equipe aparece no horário, ou alguém falta |
  | Tue | `promessa_familia`, `lista_pronta` | sai de casa liberado e com tudo, ou esquece algo |
  | Wed | `preparado_tempo` | leva guarda-chuva ou protetor, ou é pego de surpresa |
  | Thu | `imprevisto_resolvido` | o problema foi resolvido, ou estoura na sexta |

- **A sexta é narrada no presente** (o evento está acontecendo).
- **A sexta é montada em pedaços**: uma cena (ou frase) boa ou ruim **por
  marca**, na ordem do dia. Não há finais inteiros para cada combinação.
  Fecha com uma avaliação de **1 a 3 estrelas** pelo número de marcas boas
  (5 marcas: 5 = ⭐⭐⭐, 3–4 = ⭐⭐, 0–2 = ⭐) e a lista **Your week**: a frase que
  o aluno montou em cada decisão-chave e o efeito dela.
- **A festa sempre acontece** e o evento sempre termina bem: as marcas mudam o
  jeito (organizado ou caótico e engraçado), nunca viram fracasso.
- Quando duas marcas mexem na mesma cena (a chegada), vale **uma ordem de
  prioridade** e aparece uma cena só.
- As tarefas que não são decisões-chave contam só para os **acertos de primeira**.
- **Só a informação muda a marca** (hora, dia, item). A forma errada com a
  informação certa gera reação e dica e conta nos acertos de primeira, mas não
  muda a sexta: o aluno não é punido duas vezes por uma diferença sutil, e toda
  consequência tem um motivo que ele consegue ver.
- Quando duas marcas ruins contam a mesma coisa (dois atrasos), a sexta junta
  as duas numa cena só.

### Progresso: um dia por aula
- Cada dia é liberado por um **código do dia** (palavra curta em inglês, como
  `SUNNY`), que o professor mostra no quadro ou no QR da `professor.html`.
- A **segunda** abre direto depois da escolha do evento e do avatar (aula 1).
  Os códigos valem de terça a sexta.
- Quem faltou recebe o código e joga o dia depois. Os dias são sempre jogados
  **em ordem**.
- O código está dentro do próprio jogo: ele **organiza a turma**, mas não é
  segurança, e isso basta.
- Terminada a semana, o aluno pode jogar **outro evento**: já tendo os códigos,
  os dias são liberados de novo em ordem.

### Produção final: plano do fim de semana
Na sexta à noite o aluno escreve **o seu plano para o fim de semana** (dele
mesmo, não do personagem).

- **Regras para passar:**
  - mínimo de frases (proposta: **5**), cada uma com um verbo no futuro (*will*,
    *going to* ou *present continuous* com expressão de tempo);
  - **expressões de tempo diferentes** (proposta: **3**), como *tomorrow*,
    *on Saturday*, *next week*, *at 3 p.m.*, *in the morning*. Elas fazem o papel
    das *sequence words* do reconto;
  - **montador de ajuda** em no máximo **2** frases (expressão de tempo + forma
    + verbo).
- **Dicas sem bloquear** (como o `checkSentence`): *will to go* → *will go*;
  *will goes* → *will go*; *I going to* → *I'm going to*; *going to playing* →
  *going to play*.
- **Trava:** quem termina a sexta sem o plano **não recomeça nem troca de
  evento**, mesmo recarregando a página (como a trava do reconto na estante).

### Código de resultado (avaliação sem enviar dados)
- No fim de cada dia e da semana o jogo mostra um **código curto** (ex.:
  `TRIP-4F-K7Q2`) que o aluno copia no caderno ou num formulário da turma.
- Ele guarda: evento, dias concluídos, acertos de primeira por dia, marcas e se
  o plano foi feito, com um dígito de conferência contra códigos inventados.
- A `professor.html` tem um **decodificador** (funciona sem internet) que mostra
  o resultado por extenso.
- O plano escrito não cabe no código: o aluno **copia ou fotografa** para entregar.

---

## 5. Linguagem

- Vocabulário **A1/A2**, frases curtas, mensagens no estilo de chat (curtas e
  naturais, sem gírias difíceis e sem abreviações como *u* e *r*).
- Palavras difíceis no formato `[[palavra|tradução]]`, como nos livros.
- **Glossário Beginner (A1):** reaproveita o `a1.json` da estante, com
  `_cognatos` e `_ignorar`. O verificador avisa quais palavras faltam.
- **Falsos amigos sempre traduzidos** (*library, pretend, assist, attend,
  realize, parents...*).

### Balão do glossário com as três formas
| Na frase | Balão |
|---|---|
| *'ll* / *will* / *won't* + verbo | **vai + verbo** (decisão, promessa ou opinião) |
| *going to* + verbo | **vai + verbo** (plano ou sinal), a mesma regra `GOING_TO` da estante |
| *be* + *-ing* **+ expressão de tempo** | **compromisso marcado** (futuro) |

- **Armadilha:** *I'm meeting Ana* sozinho pode ser **agora**. O *-ing* só
  vira futuro com uma expressão de tempo na mesma frase. O verificador avisa
  quando acha um *-ing* ambíguo. A regra fica **igual no jogo e no
  verificador** (como o `GOING_TO` hoje).
- *going to school* / *going to the beach* continua sendo o verbo *go* (regra
  atual da estante).

### Palavras-chave (tela antes do primeiro dia)
- *Future words*: *will, won't, going to, tomorrow, next week, tonight, soon*;
- *Time words*: *on Monday, at 3 p.m., in the morning, this weekend*;
- *Phone words*: *message, missed call, reminder, forecast, to-do list*;
- Mais as palavras do evento escolhido.

---

## 6. Arte, interface e aula

### Visual e interface
- **Mesmo visual e engrenagem da estante e do the-ceo-game**: painel de
  configurações em todas as telas (glossário em 3 níveis, cores, tamanho do
  texto, animações, áudio), *My words*, áudio com `speechSynthesis`, PWA sem
  internet. O `comparar.py` passa a cobrir os três projetos.
- A tela de jogo é uma **moldura de celular**, com a barra de apps embaixo.
  Cada app tem o seu visual simples (balões de chat, calendário, lista,
  previsão do tempo, tela de ligação).
- Ilustrações em SVG gerado (`person()`, `SKY()`, `GROUND()`), sem imagens
  baixadas, numa cena por momento-chave (abertura do dia e pedaços da sexta).
- Botões e blocos grandes para tocar com o polegar.

### Armazenamento (tudo em `try/catch`, prefixo próprio)
- `week:profile` (nome e avatar), `week:run` (a semana em andamento: evento,
  dia, passo, marcas, respostas, agenda, notas) e, quando o plano existir,
  `week:pending` (trava do plano);
- **Configurações** compartilhadas com a estante (`reader:gloss`, `reader:theme`,
  `reader:size`, `reader:motion`, `reader:audio`), porque é o mesmo site
  (`ritassiru.github.io`): o aluno ajusta uma vez. **My words** separado
  (`week:words`), porque a revisão é do jogo. *(decidido no MVP; dá para mudar)*
- Cache do service worker com prefixo `my-busy-week-`.

### Plano de aulas (5 aulas)
| Aula | Jogo | Em sala (sugestão) |
|---|---|---|
| 1 | escolha do evento, avatar, palavras-chave, **Monday** | apresentar as três formas com a agenda da turma |
| 2 | **Tuesday** | listas de planos em dupla (*going to*) |
| 3 | **Wednesday** | previsões com fotos do céu: evidência x opinião |
| 4 | **Thursday** | *role-play* de imprevistos (*I'll...*) |
| 5 | **Friday** + plano do fim de semana | socializar os planos, entregar códigos e planos |

Os materiais de aula ficam no repositório novo, em `aula/` (feitos fora dele,
como na estante).

---

## 7. Arquitetura prevista (reaproveitando a estante)

```
fonte/game.json                 eventos disponíveis, ordem, publicado/rascunho, códigos dos dias
fonte/events/<slug>/event.json  metadados + as 5 jornadas daquele evento (tarefas, marcas, pedaços da sexta)
fonte/events/<slug>/scenes.js   ilustrações do evento
fonte/template.html             motor do celular, apps, montador, painel de configurações
fonte/a1.json, irreg.json       copiados da estante
fonte/build.py, checar.py       gerar e verificar (inclui a regra do -ing com expressão de tempo)
fonte/qr.py, icones.py          os mesmos da estante
index.html, sw.js, manifest     GERADOS
professor.html                  GERADO: QR do jogo, códigos dos dias, decodificador de resultados
```

O `checar.py` do jogo deve verificar, para cada evento:
- todos os 5 dias completos, com 12 tarefas (8 de montar e 4 de leitura; a sexta com 8) e as marcas previstas;
- toda marca tem pedaço bom **e** ruim na sexta;
- toda resposta aceita usa a forma certa, e as alternativas erradas têm reação
  e dica;
- glossário A1, `labelPt`, *-ing* ambíguo e *going* fora da regra.

---

## 8. Riscos e pontos em aberto

- **Volume de texto:** 3 eventos × (4 dias × 12 + 8) tarefas, cada uma com reação
  certa e errada. Sugestão: fazer **um evento completo primeiro** (MVP), testar
  com uma turma e só depois escrever os outros dois.
- **Sem nova tentativa:** um aluno que erra muito pode desanimar. Observar no
  teste. Se for o caso, dá para mostrar a frase certa e pedir que ele a monte
  antes de seguir (sem mudar a marca).
- **Respostas equivalentes:** algumas situações aceitam mais de uma forma.
  Cada tarefa precisa listar todas as respostas aceitas, e o verificador deve
  conferir isso.
- **Aluno que falta várias aulas:** pode jogar mais de um dia na mesma aula,
  desde que tenha os códigos.
- **A decidir:** nomes definitivos (cidade, amigos) e códigos dos dias
  (provisórios: `BALLOON`, `CLOUD`, `OVEN`, `PARTY`).

## 9. Próximos passos

1. O professor revisa este GDD e fecha os pontos em aberto.
2. Criar o repositório `ritassiru/my-busy-week` e mover este arquivo para lá.
3. ▶ Em andamento (`docs/roteiro-surprise-party.md`, segunda a sexta prontas, aguardando revisão): escrever o **roteiro do primeiro evento** (sugestão: *Surprise Party*, que
   tem mais situações de chat), dia por dia, com tarefas, marcas e pedaços da sexta.
4. MVP: motor do celular + montador + Monday jogável, testado em largura de celular.
5. Completar a semana, a `professor.html`, o código de resultado e testar com
   uma turma.
