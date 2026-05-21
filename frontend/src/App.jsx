import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Passport from './pages/Passport';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/:id" element={<Passport />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
