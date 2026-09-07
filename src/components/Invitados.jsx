import { useState, useEffect } from 'react';

export default function Invitados() {
  const [invitados, setInvitados] = useState(() => {
    const saved = localStorage.getItem('animecon_invitados');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    nombre: '',
    personaje: '',
    tipo: 'Cosplayer',
    estado: 'Confirmado'
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('animecon_invitados', JSON.stringify(invitados));
  }, [invitados]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.personaje) return;

    if (editIndex !== null) {
      const updated = [...invitados];
      updated[editIndex] = form;
      setInvitados(updated);
      setEditIndex(null);
    } else {
      setInvitados([...invitados, form]);
    }

    setForm({ nombre: '', personaje: '', tipo: 'Cosplayer', estado: 'Confirmado' });
  };

  const handleEdit = (index) => {
    setForm(invitados[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setInvitados(invitados.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Gestión de Invitados / Cosplayers</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Nombre del Invitado" 
          value={form.nombre} 
          onChange={(e) => setForm({ ...form, nombre: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Serie / Personaje" 
          value={form.personaje} 
          onChange={(e) => setForm({ ...form, personaje: e.target.value })} 
          required 
        />
        <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
          <option value="Cosplayer">Cosplayer</option>
          <option value="Seiyuu">Seiyuu</option>
          <option value="Artista">Artista</option>
        </select>
        <select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
          <option value="Confirmado">Confirmado</option>
          <option value="Pendiente">Pendiente</option>
        </select>
        <button type="submit">{editIndex !== null ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Serie/Personaje</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {invitados.map((item, index) => (
            <tr key={index}>
              <td>{item.nombre}</td>
              <td>{item.personaje}</td>
              <td>{item.tipo}</td>
              <td>{item.estado}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Editar</button>
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}