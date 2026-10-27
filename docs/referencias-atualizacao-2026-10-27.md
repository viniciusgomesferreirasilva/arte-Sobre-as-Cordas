# Pesquisa internacional e aplicação — 27/10/2026

Consulta atual aos sites oficiais de dez instituições de referência, em dez países. Esta seleção é de referências internacionais, não um ranking comprovado das dez maiores por matrícula. Leitura por ferramenta web de navegação, títulos e conteúdo; não constitui auditoria visual ou teste móvel dos sites externos. Nenhuma marca, fotografia, código ou texto dessas instituições foi copiado.

| País / instituição | Fonte oficial consultada | Evidência observada e adaptação original |
|---|---|---|
| EUA — Berklee | https://www.berklee.edu/ | Escolha de programas e caminhos de estudo. Aplicado: atalhos para começar e explorar cursos. |
| Canadá — Royal Conservatory of Music | https://www.rcmusic.com/ | Introdução ao programa, disciplinas e recursos de aprendizagem. Aplicado: organização dos cursos por família e acesso ao suporte. |
| Reino Unido — Guildhall | https://www.gsmd.ac.uk/ | Entrada de estudo e departamentos musicais. Aplicado: filtro Cordas, Teclas e Voz. |
| França — Conservatoire de Paris | https://www.conservatoiredeparis.fr/fr | Acesso por perfil e interesse. Aplicado: caminhos “Quero começar”, “Já sou aluno” e “Quero acompanhar”. |
| Alemanha — UdK Berlin | https://www.udk-berlin.de/en/ | Acessos rápidos, orientação e contato. Aplicado: atalhos claros logo após a abertura, com destinos existentes. |
| Áustria — Mozarteum | https://www.moz.ac.at/en | Busca de cursos, vida estudantil e apresentações. Aplicado: distinção entre estudar, receber apoio e acompanhar encontros. |
| Austrália — Sydney Conservatorium | https://www.sydney.edu.au/music/ | Entradas de estudo e comunidade na área Join us. Aplicado: navegação com intenções explícitas, proporcional à escola local. |
| Japão — Tokyo University of the Arts | https://www.geidai.ac.jp/english/ | Disciplinas musicais, acesso e perguntas. Aplicado: nomes de famílias compreensíveis e preservação das dúvidas/endereço. |
| Espanha — Berklee Valencia | https://valencia.berklee.edu/ | Links por etapa da jornada e públicos diferentes. Aplicado: separar descoberta, apoio ao aluno e participação da comunidade. |
| Dinamarca — Royal Danish Academy of Music | https://www.dkdm.dk/en | Agenda e programas musicais distintos. Aplicado: atalho de apresentações; conteúdos da comunidade e YouTube com hierarquia própria, sem inventar eventos. |

## Implementado

- Faixa de instrumentos sem Coral; Coral permanece no catálogo, pois a remoção solicitada foi apenas da faixa.
- Movimento contínuo suave, botão de pausa, pausa ao passar o mouse e ao focar, e versão estática respeitando movimento reduzido. Sem JavaScript, movimento permanece parado. Cópias visuais não repetem conteúdo para leitores de tela.
- Três caminhos de navegação por intenção logo após a abertura.
- Filtros por família em Cursos, com contagem de cursos e estado acessível. Sem JavaScript, todos os cursos continuam visíveis.
- Convite do YouTube reorganizado em duas colunas: apresentação e missão. Preservados texto enviado, canal oficial e identidade.

A segurança, os contatos configurados e as condições pendentes de cursos e pagamentos foram preservados.

## Verificação da implementação

Build, checks gerais e testes de segurança aprovados. Chromium/Playwright: 390, 768, 1191 e 1440px; faixa sem Coral, movimento efetivo, pausa por botão, preferência de movimento reduzido, filtros e contagens de sete cursos, ausência de transbordamento horizontal e de erros JavaScript. Capturas de atalhos/faixa e YouTube examinadas visualmente em celular e desktop.
