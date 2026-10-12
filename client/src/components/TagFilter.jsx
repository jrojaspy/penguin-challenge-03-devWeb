export default function TagFilter({ tags, active, onSelect }) {
  return (
    <div className="tags" role="group" aria-label="Filtrar por etiqueta">
      <button className={`tag ${active === '' ? 'active' : ''}`} onClick={() => onSelect('')}>Todas</button>
      {tags.map((t) => (
        <button key={t.name} className={`tag ${active === t.name ? 'active' : ''}`} onClick={() => onSelect(t.name)}>
          #{t.name} ({t.count})
        </button>
      ))}
    </div>
  );
}