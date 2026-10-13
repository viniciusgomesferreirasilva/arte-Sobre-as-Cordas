# Segurança e privacidade

- CSP em metatag em todas as páginas, incluindo a rota antiga: scripts e fontes locais, conexões de aplicação bloqueadas, objetos e formulários desativados, iframes restritos ao Google Maps. Estilos de atributo permitem os movimentos já implementados; scripts inline e eval não são permitidos.
- Links externos de componentes precisam usar HTTPS sem credenciais. Protocolos como javascript/data, links relativos à rede e caracteres de controle são rejeitados. Ações de contato validam os hosts oficiais permitidos, e resultados da pesquisa só aceitam URLs internas.
- Dados de pesquisa continuam renderizados com textContent, sem inserir HTML recebido do visitante.
- Política de referência no-referrer. Mapa só conecta ao Google após clique e usa iframe com permissões restritas.
- Servidor local aceita GET/HEAD, verifica o caminho real para impedir leitura por symlinks fora de dist e envia headers de segurança. Arquivo dist/_headers fornece CSP com frame-ancestors, proteção contra MIME sniffing e restrição de recursos para hosts compatíveis. A metatag não substitui frame-ancestors: esses headers adicionais dependem do suporte da hospedagem e devem ser verificados na resposta publicada.

Validação: build, checks gerais, sintaxe JS e node src/security-check.mjs. Casos de URLs inseguras e presença de CSP/referrer nas oito páginas conferidos. Sem validação visual no navegador nesta etapa. Não é um teste de invasão nem garantia de ausência de vulnerabilidades. Não há backend de matrícula, pagamento ou autenticação neste projeto.
