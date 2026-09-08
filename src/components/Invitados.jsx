import { useState, useEffect } from 'react'

function Invitados() {
  const [invitados, setInvitados] = useState(() => {
    const guardados = localStorage.getItem('invitados')
    return guardados ? JSON.parse(guardados) : []
  })

  const [nombre, setNombre] = useState('')
  const [serie, setSerie] = useState('')
  const [tipo, setTipo] = useState('Cosplayer')
  const [estado, setEstado] = useState('Confirmado')
  const [editando, setEditando] = useState(null)

  // Filtros
  const [busqueda, setBusqueda] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('Todos')
  const [filtroEstado, setFiltroEstado] = useState('Todos')

  useEffect(() => {
    localStorage.setItem('invitados', JSON.stringify(invitados))
  }, [invitados])

  function guardarInvitado(e) {
    e.preventDefault()
    const invitado = {
      id: editando || Date.now(),
      nombre,
      serie,
      tipo,
      estado
    }

    if (editando) {
      setInvitados(invitados.map(i => i.id === editando ? invitado : i))
    } else {
      setInvitados([...invitados, invitado])
    }

    limpiarFormulario()
  }

  function editarInvitado(invitado) {
    setNombre(invitado.nombre)
    setSerie(invitado.serie)
    setTipo(invitado.tipo)
    setEstado(invitado.estado)
    setEditando(invitado.id)
  }

  function eliminarInvitado(id) {
    setInvitados(invitados.filter(i => i.id !== id))
  }

  function limpiarFormulario() {
    setNombre('')
    setSerie('')
    setTipo('Cosplayer')
    setEstado('Confirmado')
    setEditando(null)
  }

  // Filtrado de invitados
  const invitadosFiltrados = invitados.filter(i => {
    const coincideNombre = i.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                           i.serie.toLowerCase().includes(busqueda.toLowerCase())
    const coincideTipo = filtroTipo === 'Todos' || i.tipo === filtroTipo
    const coincideEstado = filtroEstado === 'Todos' || i.estado === filtroEstado
    return coincideNombre && coincideTipo && coincideEstado
  })

  return (
    <div>
      <h2>Gestión de Invitados y Cosplayers</h2>
      <p className="subtitle">Administra los paneles, cosplayers e invitados especiales</p>

      {/* Formulario de registro/edición */}
      <form className="form-grid" onSubmit={guardarInvitado}>
        <h3>{editando ? 'Editar Invitado' : 'Registrar Invitado'}</h3>

        <div className="form-group">
          <label>Nombre del invitado / Cosplayer</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Serie / Personaje</label>
          <input
            type="text"
            value={serie}
            onChange={(e) => setSerie(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo de Invitado</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="Cosplayer">Cosplayer</option>
            <option value="Actor de Doblaje">Actor de Doblaje</option>
            <option value="Gamer / Streamer">Gamer / Streamer</option>
            <option value="Panelista">Panelista</option>
          </select>
        </div>

        <div className="form-group">
          <label>Estado de Confirmación</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="Confirmado">Confirmado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <div className="form-actions full-width">
          <button type="submit" className="btn btn-primary">
            {editando ? 'Actualizar Invitado' : 'Guardar Invitado'}
          </button>
          {editando && (
            <button type="button" className="btn btn-secondary" onClick={limpiarFormulario}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Sección de Tabla y Filtros */}
      <div className="list-container">
        <h3>Lista de Invitados</h3>

        {/* Barra de Filtros */}
        <div className="form-grid" style={{ marginBottom: '1rem', padding: '1rem' }}>
          <div className="form-group">
            <label>Buscar por nombre o serie</label>
            <input
              type="text"
              placeholder="Ej: Lisbeth, Sao..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Filtrar por Tipo</label>
            <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
              <option value="Todos">Todos los tipos</option>
              <option value="Cosplayer">Cosplayer</option>
              <option value="Actor de Doblaje">Actor de Doblaje</option>
              <option value="Gamer / Streamer">Gamer / Streamer</option>
              <option value="Panelista">Panelista</option>
            </select>
          </div>

          <div className="form-group">
            <label>Filtrar por Estado</label>
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="Todos">Todos los estados</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Tabla Responsiva */}
        {invitadosFiltrados.length === 0 ? (
          <p className="empty-message">No se encontraron invitados registrados.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Serie / Personaje</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {invitadosFiltrados.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.serie}</td>
                    <td>{item.tipo}</td>
                    <td>{item.estado}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-small" onClick={() => editarInvitado(item)}>
                          Editar
                        </button>
                        <button className="btn btn-small btn-danger" onClick={() => eliminarInvitado(item.id)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Invitados