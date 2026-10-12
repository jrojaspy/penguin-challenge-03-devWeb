import { db } from '../db/index.js';

const upsertStmt = db.prepare(`
  INSERT INTO votes (link_id, voter_id, value) VALUES (?, ?, ?)
  ON CONFLICT (link_id, voter_id) DO UPDATE SET value = excluded.value`);
const deleteStmt = db.prepare('DELETE FROM votes WHERE link_id = ? AND voter_id = ?');
const scoreStmt = db.prepare('SELECT COALESCE(SUM(value), 0) AS score FROM votes WHERE link_id = ?');

export function castVote(linkId, voterId, value) {
  if (value === 0) deleteStmt.run(linkId, voterId);
  else upsertStmt.run(linkId, voterId, value);
  return { score: scoreStmt.get(linkId).score, my_vote: value };
}
