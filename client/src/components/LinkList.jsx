import LinkCard from './LinkCard.jsx';

export default function LinkList({ links, onVoteChange, onDeleted }) {
  if (links.length === 0) return <p className="empty">No hay enlaces para mostrar 🐈</p>;
  return links.map((link) => (
    <LinkCard key={link.id} link={link} onVoteChange={onVoteChange} onDeleted={onDeleted} />
  ));
}