# Pesquisa no site

Lupa no cabeçalho, disponível em todas as páginas e no celular. Abre um diálogo com busca local em títulos e descrições das páginas e dos cursos. O índice é gerado a partir de `src/content.mjs` pelo build, sem serviço externo. A busca ignora acentos e diferenciação entre maiúsculas e minúsculas, aceita várias palavras e prioriza correspondências no título.

Resultados são links para páginas e âncoras de cursos. Há mensagem para busca sem resultado, fechamento por botão, Escape ou clique externo, foco inicial no campo e retorno do foco à lupa. O diálogo limita sua altura e permite rolagem interna.

Verificado com Chromium em 390, 768, 1191 e 1440px: abertura, termos sem acento, resultados, estado vazio, navegação para curso, foco e Escape. Sem erros JavaScript ou transbordamento horizontal. Capturas examinadas em celular e desktop. Build, checks e sintaxe aprovados.
