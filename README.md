# EXMATCH

Uma experiência estática de humor: um algoritmo absurdamente dedicado a encontrar o passado.

## Uso

Abra `index.html` no navegador ou publique os quatro arquivos em qualquer hospedagem estática. Não há backend, banco de dados ou dependências de build.

## Personalização

Edite a constante `EXES` no topo de `script.js`. Cada item aceita:

```js
{ name: "Personagem fictícia", age: 20, image: "assets/foto.jpg", compatibility: 98, description: "…", reason: "…" }
```

- Use somente personagens fictícias adultas e imagens que você criou ou para as quais tem autorização.
- Deixe `image` vazio para exibir o placeholder estilizado `FOTO FICTÍCIA`.
- Para adicionar perfis, acrescente itens ao array; para remover, apague o item correspondente.

## Estrutura

- `index.html` — interface e telas
- `style.css` — design responsivo e animações
- `script.js` — dados, interações, swipe e confetes
- `assets/` — fotos autorizadas opcionais
