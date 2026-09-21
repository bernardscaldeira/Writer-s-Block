# Writer's Block

Site autoral de Bernardo Rodrigues Caldeira, desenvolvido com React e Vite.

## Rodar localmente

```bash
npm install
npm run dev
```

## Gerar versão de produção

```bash
npm run build
```

A pasta publicada será `dist`.

## Publicar no Cloudflare Pages

1. Envie todos os arquivos deste projeto para o repositório `writers-block` no GitHub.
2. No Cloudflare, abra **Workers & Pages**.
3. Escolha **Create application > Pages > Import an existing Git repository**.
4. Selecione o repositório `writers-block`.
5. Use estas configurações:
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Clique em **Save and Deploy**.

## Estrutura futura de conteúdo

A próxima evolução será separar os textos em arquivos individuais dentro de uma pasta `content`, organizados em `cronicas`, `reflexoes` e `cartas`.
