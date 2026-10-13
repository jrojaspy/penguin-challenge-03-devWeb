import { formatDate } from '../utils/format.js';

export default function CommentList({ comments }) {
  if (comments.length === 0) return <p className="empty">Sé la primera persona en comentar</p>;
  return comments.map((c) => (
    <div className="comment" key={c.id}>
      <strong>{c.author}</strong>
      <span className="meta">{formatDate(c.created_at)}</span>
      <p>{c.body}</p>
    </div>
  ));
}