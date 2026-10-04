# Verificação do Instagram da Arte Sobre as Cordas

Data: 4 de outubro de 2026.

O usuário forneceu diretamente o perfil **https://www.instagram.com/artesobreascordas/**. Esse perfil pode ser registrado como contato social confirmado pela instrução mais recente. Isso não confirma o WhatsApp antigo do PDF.

## Resultado da consulta pública

A raiz do trabalho recebeu HTTP 200 para o perfil, sem autenticação. O HTML está salvo em `/tmp/instagram-root.html`; o resultado HTTP está em `/tmp/instagram-root.json`.

O documento identifica o perfil pelo título **“Aulas de Violão | Arte Sobre as Cordas (@artesobreascordas) • Instagram photos and videos”** e por `og:url` igual ao perfil fornecido. A resposta contém metadados do perfil e a interface pública com ações de login/cadastro.

Na resposta recebida, não foram encontradas URLs de publicações `/p/` ou `/reel/`, caminhos relativos de publicações, campos `display_url`, `image_versions2` ou `edge_owner_to_timeline_media`. O parâmetro `post_shortcode_to_uri_mapping` está vazio. As ocorrências de `shortcode` pertencem à configuração da interface, sem código de uma postagem verificável. A única imagem identificável nos metadados é a miniatura do avatar do perfil, que não estabelece correspondência com fotos de alunos.

**Limitação objetiva:** o perfil é acessível publicamente por HTML, mas essa resposta não fornece as publicações e as imagens necessárias para associar cada foto do PDF ao post exato. Não foi feita autenticação, tentativa de contornar barreiras ou criação de destinos por suposição.

## Aplicação na demonstração

- O link geral “Instagram” pode apontar para o perfil fornecido, em nova aba com `rel="noopener noreferrer"`.
- As fotografias reais extraídas do PDF podem ser exibidas na galeria com legendas e textos alternativos cuidadosos, sem nomear pessoas não identificadas.
- Cada registro da galeria deve conservar `postUrl: null` até haver evidência de correspondência. Um item sem URL não deve se tornar um link para o perfil geral, pois isso não cumpre o requisito de abrir o post exato.
- Não foi evidenciada nenhuma associação foto → publicação nesta verificação. `verified_posts` e `downloaded_post_images` estão vazios no manifesto.
- A pendência específica é obter a URL exata da publicação de cada foto, ou verificar os posts em contexto público que exponha as imagens. Fotos de um mesmo carrossel só podem compartilhar URL quando essa relação for confirmada.

O manifesto técnico está em `/tmp/instagram-assets/manifesto.json`. Não há imagens de posts baixadas nem URLs de posts inventadas.
