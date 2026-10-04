# Menu e movimento na rolagem

Atualização pontual solicitada na página inicial, preservando conteúdo, tipografia, imagens e rotas.

- O texto “Mais” foi substituído por três pontos dentro de um botão circular de 44px. O nome acessível continua sendo “Mais opções de navegação”. Foram preservados aria-expanded, aria-controls, foco, Escape e destinos do submenu. O botão tem espaço adicional e os pontos giram levemente ao abrir. O cabeçalho passou a usar fundo opaco para manter a leitura ao rolar.
- A faixa de instrumentos se desloca lateralmente conforme sua posição na tela. O limite é de 28px para cada lado no desktop e 10px no celular. Os nomes continuam distribuídos e podem quebrar em linhas.
- As linhas decorativas de “Minha Música, Nossa Arte” se movem no sentido oposto, preservando a inclinação original.
- O movimento acompanha a rolagem com um único requestAnimationFrame pendente e listener passivo. Não há temporizador nem movimento contínuo quando a página está parada. As posições são lidas antes das alterações visuais; são usados apenas transforms, sem alterar altura ou espaço reservado.
- A preferência reduced-motion desliga o movimento desde a abertura e também quando muda com a página aberta. Sem JavaScript, a faixa e as linhas permanecem estáticas e visíveis.

Edição: botão em `src/components.mjs`; estilos em `public/styles.css`; amplitudes e acompanhamento da rolagem em `public/app.js`. Não foram acrescentadas dependências.

## Verificação

Build, checks e sintaxe aprovados. Chromium local em 390×844, 768×1024, 1191×668 e 1440×1000: movimento medido em ambos os sentidos, nomes dentro da tela, altura da faixa constante e nenhuma rolagem horizontal. Conferidos três pontos por Enter/Tab/Escape, clique e fechamento externo, foco, destino da galeria e indicação da página atual. O menu móvel foi preservado. As oito rotas retornaram HTTP 200 e não apresentaram erros de execução. Reduced-motion foi testado desde a abertura e com mudança da preferência em tempo real; conteúdo estático sem JavaScript e texto a 200% em 390px também foram conferidos. Relatório em `qa-v3/verificacao.json`; capturas locais em `docs/qa-v3/`, excluídas do repositório.
