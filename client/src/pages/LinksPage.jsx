import { useSearchParams } from 'react-router-dom';
import { api } from '../api/client.js';
import { useAsync } from '../hooks/useAsync.js';
import LinkList from '../components/LinkList.jsx';
import TagFilter from '../components/TagFilter.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default function LinksPage() {
  const [params, setParams] = useSearchParams();
  const tag = params.get('tag') ?? '';
  const q = params.get('q') ?? '';

  const links = useAsync(() => api.getLinks({ tag, q }), [tag, q]);
  const tags = useAsync(() => api.getTags(), []);

  function setFilter(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  }

  const handleVoteChange = (id, { score, my_vote }) =>
    links.setData((list) => list.map((l) => (l.id === id ? { ...l, score, my_vote } : l)));

  return (
    <>
      <form className="filters" onSubmit={(e) => {
        e.preventDefault();
        setFilter('q', new FormData(e.currentTarget).get('q').trim());
      }}>
        <input name="q" key={q} defaultValue={q} placeholder="Buscar por título o descripción..." />
        <button className="primary">Buscar</button>
      </form>

      {tags.data && <TagFilter tags={tags.data} active={tag} onSelect={(t) => setFilter('tag', t)} />}

      {links.loading && <Loader />}
      {links.error && <ErrorMessage error={links.error} onRetry={links.reload} />}
      {links.data && !links.error && <LinkList links={links.data} onVoteChange={handleVoteChange} />}
    </>
  );
}