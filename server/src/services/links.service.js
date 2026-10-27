import { db } from '../db/index.js';

const baseSelect = `
  SELECT l.id, l.url, l.title, l.description, l.created_at,
    COALESCE((SELECT SUM(v.value) FROM votes v WHERE v.link_id = l.id), 0) AS score,
    (SELECT v.value FROM votes v WHERE v.link_id = l.id AND v.voter_id = @voterId) AS my_vote,
    (SELECT COUNT(*) FROM comments c WHERE c.link_id = l.id) AS comment_count
  FROM links l`;

const listStmt = db.prepare(`${baseSelect}
  WHERE (@tag IS NULL OR EXISTS (
          SELECT 1 FROM link_tags lt JOIN tags t ON t.id = lt.tag_id
          WHERE lt.link_id = l.id AND t.name = @tag))
    AND (@like IS NULL OR l.title LIKE @like OR l.description LIKE @like)
  ORDER BY l.created_at DESC, l.id DESC`);

const oneStmt = db.prepare(`${baseSelect} WHERE l.id = @id`);
const tagsStmt = db.prepare(
  'SELECT t.name FROM tags t JOIN link_tags lt ON lt.tag_id = t.id WHERE lt.link_id = ? ORDER BY t.name',
);
const commentsStmt = db.prepare(
  'SELECT id, author, body, created_at FROM comments WHERE link_id = ? ORDER BY created_at ASC, id ASC',
);
const existsStmt = db.prepare('SELECT 1 FROM links WHERE id = ?');

const insertLink = db.prepare('INSERT INTO links (url, title, description) VALUES (?, ?, ?)');
const deleteStmt = db.prepare('DELETE FROM links WHERE id = ?');
const insertTag = db.prepare('INSERT OR IGNORE INTO tags (name) VALUES (?)');
const findTag = db.prepare('SELECT id FROM tags WHERE name = ?');
const insertLinkTag = db.prepare('INSERT OR IGNORE INTO link_tags (link_id, tag_id) VALUES (?, ?)');

// N+1 consultas de etiquetas: aceptable para este tamaño. Mejorable con GROUP_CONCAT.
const withTags = (row) => ({ ...row, tags: tagsStmt.all(row.id).map((t) => t.name) });

export function listLinks({ tag = null, q = null, voterId = null } = {}) {
  return listStmt
    .all({ tag, like: q ? `%${q}%` : null, voterId })
    .map(withTags);
}

export function linkExists(id) {
  return Boolean(existsStmt.get(id));
}

export function getLink(id, voterId = null) {
  const row = oneStmt.get({ id, voterId });
  if (!row) return null;
  return { ...withTags(row), comments: commentsStmt.all(id) };
}

export const createLink = db.transaction(({ url, title, description, tags }) => {
  const { lastInsertRowid } = insertLink.run(url, title, description);
  for (const name of tags) {
    insertTag.run(name);
    insertLinkTag.run(lastInsertRowid, findTag.get(name).id);
  }
  return Number(lastInsertRowid);
});

export const deleteLink = (id) => deleteStmt.run(id).changes > 0;
