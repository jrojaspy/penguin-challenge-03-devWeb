import { Link } from 'react-router-dom';

export default function TagBadge({ name }) {
  return <Link className="tag" to={`/?tag=${encodeURIComponent(name)}`}>#{name}</Link>;
}