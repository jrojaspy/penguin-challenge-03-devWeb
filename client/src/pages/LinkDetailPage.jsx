import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client.js';
import { useAsync } from '../hooks/useAsync.js';
import VoteButtons from '../components/VoteButtons.jsx';
import TagBadge from '../components/TagBadge.jsx';
import CommentList from '../components/CommentList.jsx';
import CommentForm from '../components/CommentForm.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { formatDate, hostname } from '../utils/format.js';

export default function LinkDetailPage() {
  const { id } = useParams();
  const { data: link, loading, error, reload, setData } = useAsync(() => api.getLink(id), [id]);

  if (loading) return <Loader />;
  if (error) {
    return (
      <>
        <ErrorMessage error={error} onRetry={error.status === 404 ? undefined : reload} />
        <Link to="/">← Volver a la lista</Link>
      </>
    );
  }

  const handleVote = ({ score, my_vote }) => setData((l) => ({ ...l, score, my_vote }));
  const handleCommentAdded = (comment) => setData((l) => ({ ...l, comments: [...l.comments, comment] }));

  return (
    <>
      <Link to="/">← Volver</Link>
      <article className="card" style={{ marginTop: '1rem' }}>
        <VoteButtons linkId={link.id} score={link.score} myVote={link.my_vote} onChange={handleVote} />
        <div className="card-body">
          <h2>{link.title}</h2>
          <a className="url" href={link.url} target="_blank" rel="noopener noreferrer">{hostname(link.url)} ↗</a>
          {link.description && <p>{link.description}</p>}
          <div className="tags">{link.tags.map((t) => <TagBadge key={t} name={t} />)}</div>
          <p className="meta">{formatDate(link.created_at)}</p>
        </div>
      </article>

      <section className="panel">
        <h3>Comentarios ({link.comments.length})</h3>
        <CommentList comments={link.comments} />
        <CommentForm linkId={link.id} onAdded={handleCommentAdded} />
      </section>
    </>
  );
}