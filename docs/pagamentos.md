# Pagamentos pela InfinitePay

Página /pagamentos/ com abas para os sete cursos, disponível no menu de três pontos, menu móvel, rodapé e área de matrícula. As abas usam o comportamento já existente: clique, setas, Home/End, aria-selected e foco. Links reais abrem em nova aba com noopener/noreferrer. Ausência de cobrança encaminha à consulta pelo Instagram oficial.

## Ativar uma cobrança

Em src/content.mjs:
1. Cadastre em paymentConfig.verifiedCheckoutHosts somente o hostname exato verificado do link gerado pela conta InfinitePay da escola (sem protocolo ou caminho). Confirme conta/recebedor, valor e condições antes de ativar.
2. No coursePayments do curso correspondente, adicione oferta com id, title, amountCents (inteiro positivo, em centavos), currency:'BRL', terms, checkoutUrl e status:'confirmed'. Pode haver mais de um plano por curso; não cadastrar mensal/anual sem confirmação.
3. Execute build/check/security-check. O build rejeita destino não autorizado; os checks validam valor e condições. Verifique o checkout real, meios de pagamento e recebedor, sem efetuar uma compra desnecessária.

Não há API, chave secreta, checkout embutido, coleta de cartão, simulação de sucesso ou confirmação automática de matrícula. Parcelamento, Pix e outras opções são as oferecidas na cobrança oficial, não promessas deste site. Para conciliação automática futura, será necessário backend e integração oficialmente suportada pela InfinitePay, validação de autenticidade e idempotência; um redirecionamento do navegador não comprova pagamento.

Pendente: conta/recebedor oficial, links por curso/plano, valores, condições, políticas comerciais e confirmação do atendimento. A página publicada permanece sem cobranças ativas até cadastro.

Verificações: build das nove páginas, checks gerais e de ofertas, sintaxe e testes de rejeição de destinos de checkout. Sem conferência visual de navegador nesta etapa.
