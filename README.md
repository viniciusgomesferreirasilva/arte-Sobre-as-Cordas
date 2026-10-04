# Arte Sobre as Cordas

Site institucional de avaliação, em português brasileiro, com oito páginas estáticas, conteúdo renderizado no HTML e pequenas interações em JavaScript. Node.js 20 ou superior; nenhuma dependência de aplicação para instalar.

## Executar

```bash
npm run build
npm run check
npm run dev
```

Abra `http://localhost:4173`. O servidor serve cada URL diretamente, inclusive após atualizar a página. Para publicar, use a pasta `dist` como raiz pública; o host precisa servir `index.html` dentro de cada diretório. As rotas são `/`, `/a-escola`, `/cursos`, `/aulas-online`, `/rota-musical`, `/eventos`, `/galeria` e `/contato`.

Os links internos usam a barra final dos diretórios gerados. A navegação é nativa do navegador, sem espera imposta por JavaScript.

## Editar

- `src/content.mjs`: escola, endereço, redes, cursos, professores, instrumentos online, galeria e eventos. Todos os dados pendentes usam `null`, coleção vazia ou confirmação explícita.
- `src/components.mjs`: cabeçalho, menu, rodapé, cards, endereço, galeria e modal.
- `src/pages.mjs`: composição e textos de cada página.
- `public/styles.css`: cores, fontes, grades, responsividade e movimento.
- `public/app.js`: menus, foco, modal, abas e contatos contextuais.
- `public/assets`: imagens WebP extraídas dos materiais fornecidos e fontes locais.

Títulos usam Sora 600; textos e interface usam Manrope. Violão tem um único destaque com Popular e Clássico separados. As imagens dos cursos possuem dimensões intrínsecas e variantes responsivas de 640px, preservando os arquivos originais. As imagens das abas online são antecipadas quando a seção se aproxima da tela; o texto permanece visível durante as animações.

Após qualquer alteração, rode `npm run build`. O build gera também `dist/site-config.js` com os contatos usados pelas interações; não contém o telefone antigo.

### Contatos

Cadastre o WhatsApp oficial em `school.contacts.whatsapp` somente após confirmação, com código de país. O canal oficial vai em `school.contacts.youtube`. Enquanto estão `null`, a interação abre o aviso de contato pendente. O Instagram foi confirmado pelo link enviado na mensagem do usuário.

Cada item de `onlineLessons` tem instrumento, descrição, professor, WhatsApp, mensagem inicial e `availabilityConfirmed`. O WhatsApp do professor só é aberto quando o número está preenchido e a disponibilidade foi confirmada. Não há vínculo automático com o contato da escola.

### Galeria

As dez fotos são registros reais extraídos da página de eventos do PDF. Cada item possui `id`, `image`, `alt`, `caption`, `category`, `postUrl` e `postType`. Apenas itens com imagem **e URL exata verificada de publicação** tornam-se links. Sem URL, continuam figuras estáticas. Não substitua o post pelo perfil geral. Várias imagens de um carrossel podem compartilhar a URL quando a correspondência estiver comprovada.

### Eventos

Para um evento confirmado, adicione em `events`: `id`, `title`, `description`, `date` (ISO), `time`, `location`, `image`, `url` e `confirmationStatus: 'confirmed'`. Antes de acrescentar eventos completos, adaptar a apresentação da data para pt-BR e incluir a imagem se fornecida. Os conceitos editoriais não constituem uma programação anunciada.

### SEO e publicação

Cada página tem título, descrição, Open Graph e metadados textuais de compartilhamento. Favicon provisório musical. Não há canonical, domínio oficial, coordenadas, telefone ou dados estruturados inferidos. Quando o domínio oficial for confirmado, adicionar canonical, URLs absolutas de compartilhamento e sitemap com esse domínio. Imagem de compartilhamento não foi solicitada nem gerada.

Consulte [pendências](docs/pendencias.md), [materiais](docs/materiais.md), [referências internacionais](docs/referencias-internacionais.md), [verificação](docs/verificacao.md) e [investigação de desempenho](docs/desempenho-v2.md).
