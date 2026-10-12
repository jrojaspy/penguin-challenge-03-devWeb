# API del Organizador de Enlaces

Base: `/api`. Formato: JSON. Errores: `{ "error": { "code": "...", "message": "..." } }`.

| Método | Ruta | Descripción | Éxito | Errores |
|---|---|---|---|---|
| GET | /health | Estado del servidor | 200 | - |
| GET | /links?tag=&q= | Lista con filtros | 200 | - |
| POST | /links | Crea enlace `{url,title,description?,tags?}` | 201 | 400 |
| GET | /links/:id | Detalle con comentarios | 200 | 400, 404 |
| POST | /links/:id/comments | Comenta `{author,body}` | 201 | 400, 404 |
| POST | /links/:id/votes | Vota `{value: 1\|-1\|0}`. Requiere `X-Voter-Id` | 200 | 400, 404 |
| GET | /tags | Etiquetas con conteo | 200 | - |

Cabecera opcional `X-Voter-Id` en GET: permite recibir `my_vote`.