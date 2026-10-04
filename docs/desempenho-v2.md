# Investigação de carregamento — segunda versão

Realizada em 04/10/2026 antes e depois das alterações. Relatórios brutos: `qa-v2/before-performance.json` e `qa-v2/after-performance.json`.

## Causa reproduzida nas abas

Em `/aulas-online/`, a versão anterior mantinha as imagens dos painéis ocultos em lazy loading. A primeira seleção iniciava o download. O painel também começava com opacidade zero numa animação de 300ms. A entrada das seções usava opacidade zero até o retorno do IntersectionObserver. Isso podia atrasar a percepção do conteúdo; se a observação falhasse, ele poderia continuar oculto.

O arquivo de Ukulele existia, tinha caminho correto e carregou no navegador antes das alterações. Não foi reproduzido um asset ausente. A nova composição mantém o instrumento inteiro, com proporção 3:2 e object-fit: contain.

As imagens online agora são antecipadas quando a seção está a até 240px da área visível, com prioridade baixa. Foco e aproximação do ponteiro também antecipam a opção; a seleção recebe prioridade alta. A antecipação não bloqueia o texto nem o carregamento da abertura. Abas e seções animam apenas o deslocamento, mantendo opacidade 1. O conteúdo permanece legível sem JavaScript ou se o observador falhar.

## Comparação controlada

Chromium local em 390px, abas com cache desativado, latência simulada de 150ms e download de 1,6Mbps. Após aproximar a seção, aguardamos 1,8s antes de selecionar Ukulele. Uma execução antes e uma depois, sem significância estatística:

| Medida | Antes | Depois |
| --- | --- | --- |
| Imagens já disponíveis antes da seleção | 1 de 5 | 5 de 5 |
| Opacidade do painel imediatamente após selecionar | 0 | 1 |
| Tempo medido entre interação automatizada e imagem pronta | 625,6ms | 52,3ms |
| Bytes das fontes utilizadas | 151.328 | 50.120 |

O tempo inclui a execução da interação pelo Playwright. Depois da alteração, a imagem já estava disponível no momento da seleção. Isso demonstra a melhoria do fluxo testado, não garante esses tempos em aparelhos reais ou em qualquer condição de rede. Se a pessoa chegar à seção e trocar de instrumento antes de o download terminar, a imagem ainda pode estar carregando; o texto não é escondido.

## Fontes, imagens e navegação

Sora e Manrope são WOFF2 locais, variáveis, com font-display: swap. Foram retirados os dois TTF de Instrument Serif. São 101.208 bytes a menos nas fontes, sem requisições externas na página. Sora é antecipada pelo HTML.

As seis imagens dos cursos têm versões de 640px e srcset/sizes. Dimensões e proporções são reservadas no layout. A foto principal do destaque de Violão e a logo da abertura não são lazy; os registros abaixo da abertura continuam sob demanda. Não há players, áudio automático, loader obrigatório ou dependência de aplicação adicional.

A navegação continua usando HTML estático e links nativos. Os hrefs apontam para os diretórios com barra final; não há interceptação de rotas. Não foi atribuído um ganho de tempo a essa normalização. O JavaScript trata menus, modal e abas, sem requisições que bloqueiam a renderização.

Na conferência por teclado, o menu móvel aberto ainda tinha visibility: hidden no primeiro instante da transição; Tab imediato saltava para o conteúdo. A abertura dos menus móvel e Mais agora torna visibility: visible imediatamente, mantendo as transições de posição, altura e opacidade. Isso elimina a espera para alcançar seus links por teclado.

Os relatórios incluem dois acessos locais por rota para Início, Cursos e Aulas Online. O contexto do navegador foi reutilizado: “cold” significa primeiro acesso àquela rota no teste, e “warm” significa repetição. Não são amostras isoladas de cache vazio, benchmarks de produção ou base para prometer melhoria geral. Os tempos curtos do servidor local variam com a execução.

## Limitação da hospedagem

As cinco consultas HTTP ao site publicado — Início, Cursos e Aulas Online, com e sem barra final — retornaram HTTP 403 neste ambiente. Isso impediu medir a resposta real da hospedagem e seus redirecionamentos. Não há evidência para concluir que o servidor causou a demora, nem para afirmar que a latência da hospedagem foi corrigida. A verificação de publicação usa o status do serviço Sites; a comparação de interface foi realizada no servidor local.
