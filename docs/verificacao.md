# Verificação do aprimoramento

A atualização pontual de menu e movimento lateral foi verificada separadamente: [resultado e condições](ajustes-menu-movimento.md).

Realizada em 04/10/2026, em Chromium real sobre o servidor local. A verificação anterior está preservada em `verificacao-v1.md` como histórico.

## Build e checks

- `npm run build`: aprovado, oito páginas estáticas com HTML próprio.
- `npm run check`: aprovado, rotas, títulos, assets locais, endereço, segurança de links e contatos pendentes.
- `node --check public/app.js`: aprovado.
- Sem erros de execução ou requisições de recursos falhas nos percursos de interface.

## Rotas e tamanhos

As oito páginas foram abertas diretamente em **390×844**, **768×1024** e **1440×1000**: 24 verificações, todas HTTP 200. Conferidos título próprio, um H1, Sora 600, imagens carregadas, endereço no rodapé e ausência de rolagem horizontal. Todos os percursos também passaram com tamanho base do texto ampliado para **200% em 390px**, sem excesso horizontal. Esse teste de tamanho do texto não substitui testes em aparelhos físicos ou em todos os tipos de zoom do navegador.

Relatório: `qa-v2/verificacao.json`. Capturas dos oito percursos em celular e desktop, imagens de interação e folhas de contato ficam em `docs/qa-v2/` no workspace; os PNG/JPG são excluídos do repositório por tamanho. Os relatórios JSON acompanham o código.

## Inspeção visual

Foram examinadas as capturas das aberturas das oito páginas em celular e desktop, além dos cursos completos no desktop, Rota Musical completa no celular e Contato completo no celular. Conferidos hierarquia, enquadramento, texto, botões, endereço e rodapé. A inspeção revelou compressão do texto na página de Contato: a composição foi corrigida e novamente capturada. Também foram examinados menu móvel, abas, card de Ukulele e modal.

Os instrumentos usam proporções 3:2. Ukulele e Violino permanecem inteiros. O destaque de Violão mostra a fotografia uma vez e apresenta Popular e Clássico separadamente. Logo e identidades de Aulas Online/Rota Musical foram preservadas sem alteração das letras.

## Interações e acessibilidade

- Menu móvel abre e fecha, Escape restaura foco e links levam aos percursos corretos.
- Abertura dos menus não retarda a disponibilidade dos links por teclado; corrigida a transição de visibility que inicialmente fazia Tab saltar o menu.
- Menu Mais abre/fecha, com acesso aos itens; páginas agrupadas destacam o botão Mais.
- URLs e títulos acompanham navegação; voltar/avançar funcionam; item atual identificado com aria-current.
- Modal abre por ações de escola, professor e YouTube, mantém contexto, fecha por botão/Escape e restaura foco. Tab permanece no aviso.
- Cinco abas online carregam suas imagens e mensagens; clique, setas, Home e End funcionam. Texto mantém opacidade 1 durante a seleção.
- Galeria apresenta dez registros reais: URLs individuais continuam nulas e as fotos continuam figuras, sem destinos falsos.
- Conteúdo permanece visível sem JavaScript, com reduced-motion e com IntersectionObserver deliberadamente indisponível.
- Foco visível, controles de toque e links externos seguros.

## Desempenho

A investigação reproduziu download da imagem na primeira seleção de uma aba e painel inicialmente transparente. Foi removido o fade que escondia o conteúdo e acrescentada antecipação das imagens próxima da seção. Fontes locais passaram de 151.328 para 50.120 bytes. Sora e Manrope usam WOFF2 e font-display: swap.

A comparação controlada, condições e limites estão em `desempenho-v2.md`; os tempos locais não são uma promessa de desempenho em produção. Consultas HTTP ao site publicado retornaram 403 neste ambiente, impedindo diagnóstico da latência real da hospedagem.

## Conteúdo e limites

Endereço confirmado preservado integralmente, inclusive **Sobreloja 3 – 1° subsolo**. WhatsApp da escola/professores e canal do YouTube permanecem nulos. Aviso pendente mantém o texto solicitado. Não há envio simulado, novos contatos inventados, datas falsas ou links individuais de Instagram por suposição. Não foi feita nova pesquisa no Instagram nesta etapa.

Não foram testados leitores de tela, aparelhos físicos ou outros motores de navegador. Não há envio real de contato, pois faltam os destinos oficiais. A publicação é verificada pelo estado retornado pelo serviço Sites; os testes de interface descritos acima foram locais.
