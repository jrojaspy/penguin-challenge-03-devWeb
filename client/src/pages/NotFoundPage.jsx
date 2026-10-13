import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="empty">
      <h2>404: aquí no hay nada 🐈</h2>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}