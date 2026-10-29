# Revisão de 29/10/2026

Base: 269a7dfd33d61a7b9ea4d9ebbed205eda1c96b88, confirmada por consulta read-only à main do GitHub. Checkout inicialmente limpo na branch local work. Node 24.19.0 / npm 11.9.0; aplicação requer Node >=20 e não possui dependências externas para instalar.

## Requisitos e resultado

- Preservadas as dez páginas, imagens, fontes locais, paleta marrom, animações e controles de movimento reduzido existentes.
- Preservados pesquisa, navegação, filtros, suporte ao aluno, aulas online, galeria, eventos e Rota Musical.
- Mantidos os seis cursos: Violão Popular, Violão Clássico, Violino, Ukulele, Piano e Canto e Coral.
- Corrigida a mensagem WhatsApp para o modelo solicitado, com nome dinâmico do curso nas páginas de cursos e pagamentos, sem asteriscos literais. Destino: 5511982973432.
- Corrigido menu móvel de dois para três traços, com animação de fechamento correspondente.
- Ícone do Instagram recebeu nome acessível, mantendo apresentação visual pelo ícone. Canal YouTube e sua seção profissional preservados.
- Corrigidas referências a Ricardo ACISESP nos links/metadata que na realidade apontam para o setor administrativo. Não foram inventados contatos de professores.
- Alternativa sem JavaScript agora também oferece WhatsApp administrativo.
- README e pendências atualizados; dist regenerado porque é rastreado e usado na publicação. A versão de dist recebida estava parcialmente defasada em relação aos arquivos-fonte.

## Validação executada

- npm run build: dez páginas geradas.
- npm run check: rotas, títulos, assets, endereço, contatos, links externos e pagamentos aprovados.
- node src/security-check.mjs: validação de URLs, CSP, referrer, checkout e mapa aprovada.
- tests/browser.mjs: Chromium/Playwright, dez rotas em 390×844 e 1440×900, respostas HTTP 200, título principal único, ausência de overflow horizontal e erros JS; menu abre/fecha com Escape; pesquisa sem acentos; filtros de cursos/galeria; nome acessível do Instagram; doze mensagens WhatsApp comparadas integralmente ao modelo e ao número administrativo. window.open interceptado: nenhuma mensagem enviada e nenhuma cobrança realizada.
- git diff --check: aprovado.

## Pendências reais

Não há preços nem links de checkout confirmados: a página mantém consultas por curso, sem cobranças fictícias. Contatos próprios dos professores, horários, agenda, URLs exatas de posts da galeria e domínio de produção continuam dependendo de dados oficiais. Nenhuma disponibilidade de terceiros foi presumida com base apenas na presença dos links. Este teste não constitui auditoria visual em todos os dispositivos nem auditoria completa de acessibilidade.

## Ambiente

Servidor de desenvolvimento iniciado e validado por requisições reais no navegador. install_script e start_skill salvos no rascunho do ambiente; publicação é uma etapa separada na interface de configurações. Não é necessário adicionar segredos para este fluxo. Não foi validada restauração em uma nova tarefa.
