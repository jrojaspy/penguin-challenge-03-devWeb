import { createLink, listLinks } from '../src/services/links.service.js';

if (listLinks().length === 0) {
  createLink({ url: 'https://developer.mozilla.org', title: 'MDN Web Docs', description: 'La referencia de la web.', tags: ['docs', 'js', 'css'] });
  createLink({ url: 'https://react.dev', title: 'Documentación de React', description: 'Aprende React con la guía oficial.', tags: ['react', 'docs'] });
  createLink({ url: 'https://expressjs.com', title: 'Express', description: 'Framework web para Node.', tags: ['node', 'docs'] });
  console.log('Datos de ejemplo creados');
} else {
  console.log('La base ya tiene datos; no se hizo nada');
}