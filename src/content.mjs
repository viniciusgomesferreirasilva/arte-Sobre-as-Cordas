export const school = {
  name: 'Arte Sobre as Cordas',
  description: 'Uma escola de música que inspira pessoas de todas as idades a descobrirem seu talento e desenvolverem suas habilidades musicais com alegria, técnica e sensibilidade.',
  address: ['Office Center Vila Parque', 'Estrada Tenente Marques, 4321 – Vila Poupança', 'Sobreloja 3 – 1° subsolo'],
  contacts: {
    whatsapp: null,
    instagram: 'https://www.instagram.com/artesobreascordas/',
    youtube: null,
  },
  legacy: { whatsapp: '11 9 8297-3432', status: 'pending_confirmation', source: 'PDF antigo' },
  domain: null,
};

export const courses = [
  { id: 'violao-popular', name: 'Violão Popular', family: 'Cordas', symbol: '♮', image: 'violao', description: 'Acordes, ritmos, acompanhamento e repertório popular para explorar as músicas que você gosta de tocar e cantar.' },
  { id: 'violao-classico', name: 'Violão Clássico', family: 'Cordas', symbol: '𝄞', image: 'violao', description: 'Técnica, leitura, repertório e interpretação para desenvolver sua relação com o instrumento.', editorialReview: true },
  { id: 'violino', name: 'Violino', family: 'Cordas', symbol: '♯', image: 'violino', description: 'Postura, afinação, técnica e sensibilidade musical, com atenção ao seu desenvolvimento.' },
  { id: 'ukulele', name: 'Ukulele', family: 'Cordas', symbol: '♪', image: 'ukulele', description: 'Um instrumento versátil e acolhedor para explorar acordes, ritmos e novos repertórios.' },
  { id: 'piano', name: 'Piano', family: 'Teclas', symbol: '♭', image: 'piano', description: 'Técnica, leitura e expressão artística, respeitando seu nível e sua evolução.' },
  { id: 'canto', name: 'Canto', family: 'Voz', symbol: '♬', image: 'canto', description: 'Afinação, respiração, projeção vocal e interpretação para descobrir as possibilidades da sua voz.' },
  { id: 'coral', name: 'Coral', family: 'Voz em conjunto', symbol: '♫', image: 'coral', description: 'Harmonia, escuta e expressão por meio do canto coletivo. Uma experiência musical compartilhada.' },
];

export const teachers = []; // Exibir somente perfis com conteúdo oficial.
export const courseImages = {
  violao: { width: 1095, height: 730 },
  violino: { width: 901, height: 669 },
  ukulele: { width: 1036, height: 691 },
  piano: { width: 1200, height: 801 },
  canto: { width: 1200, height: 801 },
  coral: { width: 1104, height: 749 },
};
export const onlineLessons = ['violao-popular', 'violino', 'ukulele', 'piano', 'canto'].map(id => {
  const course = courses.find(c => c.id === id);
  return {
    instrument: id === 'violao-popular' ? 'Violão' : course.name,
    id, description: course.description,
    teacher: null, whatsapp: null, availabilityConfirmed: false,
    initialMessage: `Olá! Tenho interesse nas aulas online de ${id === 'violao-popular' ? 'violão' : course.name.toLowerCase()} da Arte Sobre as Cordas. Gostaria de saber como funcionam.`,
  };
});

export const gallery = [
  { id: 'cordas-no-palco', image: '/assets/cordas-palco.webp', alt: 'Apresentação de violino e violão em um palco.', caption: 'A emoção de compartilhar', category: 'Apresentações', postUrl: null, postType: null },
  { id: 'grupo-de-violoes', image: '/assets/violoes.webp', alt: 'Participantes com violões reunidos em uma sala.', caption: 'Uma descoberta em conjunto', category: 'Comunidade', postUrl: null, postType: null },
  { id: 'palco-coletivo', image: '/assets/palco.webp', alt: 'Grupo de participantes com instrumentos em uma apresentação no palco.', caption: 'Muitas vozes, uma música', category: 'Apresentações', postUrl: null, postType: null },
  { id: 'encontro-ao-ar-livre', image: '/assets/encontro.webp', alt: 'Grupo reunido ao ar livre com violões e outros instrumentos.', caption: 'A música aproxima', category: 'Comunidade', postUrl: null, postType: null },
  { id: 'pratica-em-grupo', image: '/assets/pratica.webp', alt: 'Participantes tocando instrumentos em uma sala com iluminação colorida.', caption: 'Encontro de sons', category: 'Prática musical', postUrl: null, postType: null },
  { id: 'turma-com-instrumentos', image: '/assets/turma.webp', alt: 'Grupo com instrumentos de cordas em uma sala de música.', caption: 'Aprender e estar junto', category: 'Comunidade', postUrl: null, postType: null },
  { id: 'encontro-de-alunos', image: '/assets/alunos.webp', alt: 'Crianças e adultos reunidos em uma sala, alguns com instrumentos.', caption: 'Cada pessoa, um novo som', category: 'Comunidade', postUrl: null, postType: null },
  { id: 'grupo-na-comunidade', image: '/assets/comunidade.webp', alt: 'Grupo reunido em frente a um edifício com instrumentos de cordas.', caption: 'A arte nos reúne', category: 'Comunidade', postUrl: null, postType: null },
  { id: 'musica-em-sala', image: '/assets/sala.webp', alt: 'Grupo tocando violões em uma sala de música.', caption: 'O prazer de fazer música', category: 'Prática musical', postUrl: null, postType: null },
  { id: 'duo-no-palco', image: '/assets/duo.webp', alt: 'Dois músicos tocando instrumentos de cordas em um palco.', caption: 'Notas que viram lembranças', category: 'Apresentações', postUrl: null, postType: null },
];

export const events = []; // { id, title, description, date, time, location, image, url, confirmationStatus }
export const eventConcepts = [
  { title: 'Minha Música, Nossa Arte', label: 'Expressão no palco', description: 'Uma apresentação que valoriza a expressão dos alunos e a experiência de compartilhar a música com o público.' },
  { title: 'Rota Musical', label: 'Arte na comunidade', description: 'Encontros musicais em comércios e espaços da comunidade, aproximando alunos, famílias e novos públicos.' },
  { title: 'Encontro de fim de ano', label: 'Uma celebração em conjunto', description: 'O momento em que os alunos da Rota Musical se reúnem para apresentar sua música e receber o público.' },
];

export const pages = [
  { path: '/', label: 'Início', title: 'Arte Sobre as Cordas | Escola de música', description: 'Descubra seu talento com violão, violino, ukulele, piano, canto e coral. Conheça a escola Arte Sobre as Cordas e o projeto Rota Musical.' },
  { path: '/a-escola', label: 'Nossa Escola', title: 'Nossa Escola | Arte Sobre as Cordas', description: 'Um espaço de arte, aprendizado e convivência. Conheça a proposta, a missão e os valores da Arte Sobre as Cordas.' },
  { path: '/cursos', label: 'Cursos', title: 'Cursos de música | Arte Sobre as Cordas', description: 'Conheça os cursos de violão popular e clássico, violino, ukulele, piano, canto e coral da Arte Sobre as Cordas.' },
  { path: '/aulas-online', label: 'Aulas Online', title: 'Aulas Online | Arte Sobre as Cordas', description: 'Explore instrumentos e conheça a proposta de aulas online. Consulte modalidades e disponibilidade com a Arte Sobre as Cordas.' },
  { path: '/rota-musical', label: 'Rota Musical', title: 'Rota Musical | A música encontra a comunidade', description: 'Conheça a Rota Musical: apresentações em espaços da comunidade e um encontro de fim de ano para compartilhar a música dos alunos.' },
  { path: '/eventos', label: 'Eventos', title: 'Eventos e Apresentações | Arte Sobre as Cordas', description: 'Música, expressão e convivência. Conheça os projetos e apresentações dos alunos da Arte Sobre as Cordas.' },
  { path: '/galeria', label: 'Galeria', title: 'Galeria | Arte Sobre as Cordas', description: 'Um espaço para registros de aulas, apresentações e Rota Musical. Acompanhe a comunidade da Arte Sobre as Cordas.' },
  { path: '/contato', label: 'Contato', title: 'Contato e endereço | Arte Sobre as Cordas', description: 'Conheça a Arte Sobre as Cordas no Office Center Vila Parque. Saiba como consultar cursos, aulas online e aula experimental.' },
];
