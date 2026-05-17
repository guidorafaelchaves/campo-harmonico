# Baixo Harmonia Visual

Um app de estudo de harmonia para baixistas, centrado no braco do baixo, no ouvido e em missoes curtas.

Este repositorio nasceu de um prototipo em HTML unico. A parte que vale preservar e evoluir e o braco visual: ver a harmonia acontecendo no instrumento. O resto sera redesenhado para deixar de ser uma lista longa de sequencias e virar uma experiencia didatica, divertida e progressiva.

## Estado atual

- `index.html`: primeira versao redesenhada do app.
- `src/app.js`: motor interativo, braco virtual, missoes e fluxo randomico.
- `src/styles.css`: interface nova centrada no braco.
- `legacy/curso_campo_harmonico_baixo_html.html`: prototipo original preservado como referencia.
- `docs/PRODUCT_PHILOSOPHY.md`: nova filosofia do produto.
- `docs/ROADMAP.md`: plano de evolucao.
- `docs/GITHUB_SETUP.md`: passos para publicar no GitHub.

## Nova direcao

O app deixa de perguntar "qual sequencia voce quer tocar?" e passa a propor:

1. Ouvir uma situacao musical curta.
2. Ver o movimento no braco.
3. Adivinhar ou completar o proximo passo.
4. Tocar junto em loop curto.
5. Receber feedback simples.
6. Desbloquear a proxima missao.

## Principios

- O braco e o mapa principal.
- Menos tabela, mais gesto musical.
- Toda teoria precisa virar som.
- Toda sessao deve ter uma meta pequena.
- O app deve parecer um instrumento/brinquedo de estudo, nao uma planilha de progressoes.
- O aluno deve sentir "eu entendi esse caminho" antes de ver mais opcoes.

## Referencias de inspiracao

- Interactive Music Theory Lab: https://imtl.net/
- Solfej: https://www.solfej.io/
- Chord Progressor: https://chordprogressor.com/
- Fretride: https://fretride.com/
- Sonid: https://sonid.app/
- Learn You A FretBoard: https://lyafb.com/

## Proximo marco

Evoluir o MVP atual com tres modos mais completos:

- **Explorar**: brincar com I, IV, V, vi e ver/ouvir o braco reagir.
- **Missao**: desafios de 2 a 5 minutos com objetivo claro.
- **Tocar junto**: loop curto, metronomo, destaque da proxima nota e acompanhamento.

## Como abrir localmente

Abra `index.html` no navegador. O app nao depende de instalacao, build ou servidor.

## Primeira versao redesenhada

A nova tela prioriza:

- Braco virtual grande e clicavel.
- Graus harmonicos como botoes simples.
- Missoes curtas em vez de biblioteca infinita.
- Fluxo randomico continuo, com tempo por sequencia configuravel.
- Exemplos de musicas reais onde a familia da progressao aparece.
