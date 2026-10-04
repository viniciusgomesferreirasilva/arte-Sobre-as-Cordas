# Verificação da versão de avaliação

Realizada em 04/10/2026, em Chromium real sobre o servidor local.

## Build e verificações locais

- `npm run build`: aprovado, oito páginas com HTML próprio.
- `npm run check`: aprovado, títulos distintos, um H1 por página, assets locais existentes, endereço corrigido, contatos e segurança de links.
- `node --check public/app.js`: aprovado.
- Nenhum erro de execução encontrado no navegador.

## Páginas e responsividade

As oito rotas foram abertas diretamente em **1440×1000**, **390×844** e **768×1024**. Todas retornaram HTTP 200, carregaram suas imagens e apresentaram conteúdo. A página inicial também foi verificada nas larguras **320px** e **1920px**. Não foi encontrada rolagem horizontal nos tamanhos normais após corrigir a largura da composição de abertura.

Capturas de início, aulas online, Rota Musical, galeria e contato foram feitas em desktop e celular. Foram inspecionadas visualmente a abertura de desktop e celular, a página Rota Musical no desktop e os estados de interação. Os arquivos de captura estão em `docs/qa/` no workspace. A verificação automática das demais páginas cobriu carregamento, imagens e largura; não equivale a uma revisão manual exaustiva de cada viewport.

## Interações

- Menu móvel abre, fecha, fecha com Escape e restaura foco ao botão.
- Menu “Mais” abre, fecha e responde a Escape.
- Modal de contato abre, fecha por botão/Escape e restaura foco à ação inicial; Tab e Shift+Tab permanecem nos controles do aviso.
- Seleção de instrumentos online funciona por clique, setas, Home e End; mensagem de interesse corresponde ao instrumento escolhido.
- Botões pendentes de WhatsApp, professor e YouTube exibem o aviso; não há destinos falsos.
- Links internos navegam entre URLs próprias; a rota Cursos foi alcançada pelo botão da abertura.
- Galeria mostra dez fotos reais e mantém itens sem URL como figuras estáticas.
- Links externos têm `target="_blank"` e `rel="noopener noreferrer"`.
- Conteúdo e cursos permanecem legíveis com JavaScript desativado; a navegação completa também está disponível no rodapé.
- `prefers-reduced-motion` desativa as animações e mantém o conteúdo visível.

## Fontes, mídia e conteúdo

Fontes locais Instrument Serif e Manrope, com fallback e `font-display: swap`. Imagens otimizadas em WebP. Sem áudio, vídeos ou players automáticos, nem formulário que simula envio. Aulas Online e Rota Musical usam as identidades corretas e páginas separadas. Endereço confirmado no briefing aparece completo, com “Sobreloja 3 – 1° subsolo”.

## Texto ampliado a 200%

A primeira verificação detectou excesso de largura em alguns blocos. Foram corrigidas as quebras de palavras, as larguras mínimas de colunas e as ações flexíveis. A execução adicional para confirmar os oito percursos com 200% foi recusada pelo ambiente (`denied`); essa repetição permanece pendente. Não é declarado que o teste final a 200% passou.

## Limites

Não houve autenticação no Instagram: a resposta pública permitiu confirmar o perfil, mas não as URLs específicas das publicações. Nenhuma foto foi associada a um post por suposição. Consulte `instagram-verificacao.md`.

Não foram testados envios reais para WhatsApp/YouTube, pois esses contatos continuam pendentes. Não foram testados leitores de tela, aparelhos físicos ou todos os motores de navegador. Os sites internacionais foram pesquisados por HTML atual, sem afirmar teste visual deles.

Os resultados resumidos e capturas ficam em `docs/qa/`. A verificação de publicação usa o status retornado pelo serviço de hospedagem; os testes de interface foram feitos localmente.
