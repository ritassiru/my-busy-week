# My Busy Week

Um jogo de inglês no celular para o 1º ano do Ensino Médio Integrado do IFAL
Campus Viçosa (nível A1/A2). O aluno vive **uma semana no celular de um
adolescente**, de segunda a sexta, um dia por aula: lê mensagens, agenda e notas,
e monta as respostas usando o **futuro** em inglês:

- ***will*** para decidir na hora, oferecer ajuda e prometer (*I'll buy them!*);
- ***going to*** para planos e sinais (*I'm going to buy balloons.*);
- ***present continuous*** para compromissos marcados (*We're meeting at Bia's house on Friday at 6.*).

Cada resposta tem consequência na história, e as decisões importantes mudam o
evento de sexta-feira.

**▶ Jogo:** `https://ritassiru.github.io/my-busy-week/`
**▶ Página do professor (QR code e códigos dos dias):** `https://ritassiru.github.io/my-busy-week/professor.html`
*(os links funcionam depois de ativar o GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root)*

## Situação

A semana inteira da *Surprise Party* está jogável (segunda a sexta, um dia por
aula). A *School Culture Fair* também
([roteiro](docs/roteiro-culture-fair.md)): o aluno escolhe o evento no começo da semana.
A *Class Trip* está pronta como rascunho, esperando a aprovação do professor
([roteiro](docs/roteiro-class-trip.md)). A página do professor tem o QR code, os códigos dos dias e um
**decodificador**: cole os códigos de resultado que os alunos copiaram e veja a
tabela da turma (pode copiar para uma planilha). O design completo está
em [`docs/gdd.md`](docs/gdd.md) e o roteiro dos cinco dias em
[`docs/roteiro-surprise-party.md`](docs/roteiro-surprise-party.md).

## Funciona sem internet

Depois da primeira visita com internet, o celular guarda o jogo e ele abre mesmo
sem sinal. Na engrenagem ⚙️ dá para instalar o jogo como aplicativo, mudar as
cores, o tamanho do texto, o glossário e o áudio (as configurações são as mesmas
do Story Shelf). O progresso, o nome e o avatar ficam só no aparelho do aluno:
nada é enviado.

## Para editar

Os textos ficam em `fonte/events/<evento>/event.json`. Depois de mudar:

```
python3 fonte/checar.py     # confere tudo
python3 fonte/build.py      # gera index.html, sw.js, manifest e professor.html
```

O GitHub faz isso sozinho a cada mudança em `fonte/` na branch `main`.

## Licença

Conteúdo em CC BY-SA 4.0, código em MIT, fontes em SIL OFL. Veja `LICENSE`.
