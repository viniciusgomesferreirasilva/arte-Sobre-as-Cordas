import { school, courses } from './content.mjs';

// Links nativos funcionam sem JavaScript e não dependem de abertura de pop-ups.
export function administrativeContactUrl(subject) {
  const courseName = subject?.replace(/^Pagamento de /, '');
  const course = courses.find(item => item.name === courseName);
  const message = course
    ? `Olá! Tudo bem? Quero fazer o curso de ${course.name} na Arte Sobre as Cordas. Gostaria de saber mais sobre valores, formas de pagamento e horários disponíveis. Obrigado!`
    : `Olá! Tudo bem? Gostaria de falar com o setor administrativo da Arte Sobre as Cordas${subject ? ` sobre ${subject}` : ''}. Poderiam me ajudar? Obrigado!`;
  return `https://wa.me/${school.contacts.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
