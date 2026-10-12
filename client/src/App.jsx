import { Link, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <>
      <header className="site">
        <div className="container"><Link to="/">🌐 Director de Enlaces</Link></div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<p>Lista (próximo commit)</p>} />
          <Route path="*" element={<p>Página no encontrada</p>} />
        </Routes>
      </main>
    </>
  );
}