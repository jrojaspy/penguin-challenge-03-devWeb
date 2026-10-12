import { db } from '../db/index.js';

const insertStmt = db.prepare('INSERT INTO comments (link_id, author, body) VALUES (?, ?, ?)');
const getStmt = db.prepare('SELECT id, author, body, created_at FROM comments WHERE id = ?');

export function addComment(linkId, { author, body }) {
  const { lastInsertRowid } = insertStmt.run(linkId, author, body);
  return getStmt.get(lastInsertRowid);
}
