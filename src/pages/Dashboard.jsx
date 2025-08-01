// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Configurar cliente de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Cargar últimos clientes registrados
    async function loadClientes() {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error) setClientes(data);
    }

    loadClientes();
  }, []);

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        👋 Bienvenido, {user.email}
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate('/buscar-cliente')}
        >
          Buscar cliente 🔍
        </button>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => navigate('/nuevo-cliente')}
        >
          Nuevo cliente ➕
        </button>

        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={() => navigate('/nueva-renta')}
        >
          Iniciar Renta 📋
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Últimos clientes registrados</h2>
      <ul className="space-y-2">
        {clientes.map(cliente => (
          <li
            key={cliente.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <span>{cliente.nombre} - {cliente.telefono}</span>
            <button
              className="text-blue-500 underline"
              onClick={() => navigate(`/cliente/${cliente.id}`)}
            >
              Ver ficha
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}