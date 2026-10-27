import { Link } from 'react-router-dom';
import TagBadge from './TagBadge.jsx';
import VoteButtons from './VoteButtons.jsx';
import DeleteButton from './DeleteButton.jsx';
import { formatDate, hostname } from '../utils/format.js';

export default function LinkCard({ link, onVoteChange, onDeleted }) {
  return (
    <article className="card">
      <VoteButtons linkId={link.id} score={link.score} myVote={link.my_vote}
        onChange={(result) => onVoteChange(link.id, result)} />
      <div className="card-body">
        <h3><Link to={`/links/${link.id}`}>{link.title}</Link></h3>
        <a className="url" href={link.url} target="_blank" rel="noopener noreferrer">{hostname(link.url)}</a>
        {link.description && <p>{link.description}</p>}
        <div className="tags">{link.tags.map((t) => <TagBadge key={t} name={t} />)}</div>
        <p className="meta">💬 {link.comment_count} · {formatDate(link.created_at)}</p>
        <DeleteButton linkId={link.id} title={link.title} onDeleted={() => onDeleted(link.id)} />
      </div>
    </article>
  );
}