import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [tuxedos, setTuxedos] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    fetch('http://localhost:4000/api/tuxedos')
      .then(res => res.json())
      .then(data => setTuxedos(data));
  }, []);

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert('Revisa tu correo para el enlace de acceso');
  }

  if (!user) {
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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bienvenido, {user.email}</h1>
      <h2>Catálogo de Tuxedos</h2>
      <ul>
        {tuxedos.map(tux => (
          <li key={tux.id}>
            {tux.nombre} - Talla: {tux.talla} - Precio: ${tux.precio} MXN
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
