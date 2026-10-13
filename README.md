# 🌐 Organizador de Enlaces

Aplicación para guardar, etiquetar, comentar y votar enlaces.
Backend REST (Node + Express + SQLite) y frontend SPA en React. Incluye además un prototipo en Vanilla JS.

## Requisitos
- Node.js 20+ y npm

## Instalación y ejecución (desarrollo)
```bash
git clone <URL-DEL-REPO> && cd link-organizer

# 1) Backend
cd server
npm install
cp .env.example .env
npm run seed        # opcional: datos de ejemplo
npm run dev         # http://localhost:3000

# 2) Frontend React (otra terminal)
cd client
npm install
npm run dev         # http://localhost:5173

# 3) Prototipo Vanilla (otra terminal, opcional)
npx serve vanilla
```

## Variables de entorno (`server/.env`)
| Variable | Descripción | Por defecto |
|---|---|---|
| PORT | Puerto del servidor | 3000 |
| DB_PATH | Ruta del archivo SQLite | ./data/links.db |

## API
Ver [server/API.md](server/API.md) y [server/api.http](server/api.http).

## Estructura
```
server/   API REST (routes → controllers → services → db)
client/   SPA en React (pages, components, hooks, api)
vanilla/  Prototipo en JavaScript puro
```

## Decisiones de diseño
- **SQLite**: cero configuración, el archivo viaja con el proyecto.
- **Votos sin login**: un UUID por navegador (`X-Voter-Id`) + restricción UNIQUE en la BD.
- **Filtros en la URL**: enlaces compartibles y botón "atrás" funcional.
- **Capa `api/` y hook `useAsync`**: los componentes no conocen `fetch`.

## Vanilla vs React: mi reflexión
(Escribe 5 a 10 líneas con tus palabras: qué fue tedioso en Vanilla, qué simplificó React,
qué componentes reutilizaste y qué harías distinto.)

## Despliegue
(Se completa en el commit 17.)

## Desarrollado
@jrojaspy