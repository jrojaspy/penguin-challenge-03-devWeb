export default function ErrorMessage({ error, onRetry }) {
  return (
    <div role="alert">
      <p className="error">{error?.message ?? 'Ocurrió un error inesperado'}</p>
      {onRetry && <button className="primary" onClick={onRetry}>Reintentar</button>}
    </div>
  );
}