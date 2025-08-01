// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Dashboard from './pages/Dashboard';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function LoginPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: import.meta.env.VITE_SITE_URL + '/dashboard',
      },
    });
    if (error) alert(error.message);
    else alert('Revisa tu correo para el enlace de acceso');
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Inicia Sesión</h2>
      <input
        type="email"
        placeholder="tu@correo.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Enviar enlace mágico</button>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando...</p>;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

