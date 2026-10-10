import { db } from '../db/index.js';

const listStmt = db.prepare(`
  SELECT t.name, COUNT(lt.link_id) AS count
  FROM tags t JOIN link_tags lt ON lt.tag_id = t.id
  GROUP BY t.id ORDER BY count DESC, t.name ASC`);

export const listTags = () => listStmt.all();