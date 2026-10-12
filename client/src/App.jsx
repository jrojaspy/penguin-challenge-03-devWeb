import { Link, Route, Routes } from 'react-router-dom';
import LinksPage from './pages/LinksPage.jsx';

export default function App() {
  return (
    <>
      <header className="site">
        <div className="container"><Link to="/">🌐 Director de Enlaces</Link></div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<LinksPage />} />
          <Route path="*" element={<p>Página no encontrada</p>} />
        </Routes>
      </main>
    </>
  );
}