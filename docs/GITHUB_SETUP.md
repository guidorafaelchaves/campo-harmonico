# GitHub Setup

## Publicar em um novo repositorio

No GitHub:

1. Crie um repositorio chamado `baixo-harmonia-visual`.
2. Nao inicialize com README, porque este projeto ja tem um.
3. Copie a URL do repositorio.

No terminal, dentro desta pasta:

```powershell
git remote add origin https://github.com/SEU_USUARIO/baixo-harmonia-visual.git
git push -u origin main
```

## Publicar com GitHub Pages

Quando existir um `index.html` novo:

1. Abra Settings.
2. Va em Pages.
3. Escolha deploy from branch.
4. Selecione `main` e `/root` ou `/docs`, conforme a estrutura final.

## Primeiras issues sugeridas

- Redesenhar MVP em modo Playground.
- Separar CSS e JS do prototipo legado.
- Recriar componente de braco com posicao real.
- Criar parser de graus com alteracoes.
- Criar primeira trilha de missoes.
- Criar tela de tocar junto com loop curto.

