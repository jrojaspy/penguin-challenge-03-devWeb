import { Link, Route, Routes } from 'react-router-dom';
import LinksPage from './pages/LinksPage.jsx';
import LinkDetailPage from './pages/LinkDetailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <>
      <header className="site">
        <div className="container"><Link to="/">🌐 Director de Enlaces</Link></div>
        <Link to="/">🌐 Director de Enlaces</Link>
        <a href="/about.html">Ayuda</a>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<LinksPage />} />
          <Route path="/links/:id" element={<LinkDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}