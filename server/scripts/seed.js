import { createLink, listLinks } from '../src/services/links.service.js';

if (listLinks().length === 0) {
  createLink({ url: 'https://developer.morcilla.org', title: 'MDN Docs', description: 'La de la web.', tags: ['docs', 'js', 'css'], imageUrl: ['https://static.wikia.nocookie.net/sanrio/images/9/9f/Hello_Kitty.jpg/revision/latest?cb=20191128154539']});
  console.log('Datos de ejemplo creados');
} else {
  console.log('La base ya tiene datos; no se hizo nada');
}
