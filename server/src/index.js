import { app } from './app.js';
import { config } from './config.js';
import './db/index.js'; // importa la configuración de la base de datos

app.listen(config.port, () => {
    console.log(`API lista en http:localhost:${config.port}`);
});