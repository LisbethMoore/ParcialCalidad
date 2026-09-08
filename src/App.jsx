import { useState } from 'react'
import './App.css'
import Invitados from './components/Invitados'

function App() {
  const [eventos, setEventos] = useState(() => {
    const guardados = localStorage.getItem('eventos')
    return guardados ? JSON.parse(guardados) : []
  })

  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [lugar, setLugar] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [editando, setEditando] = useState(null)

  function guardarEvento(e) {
    e.preventDefault()

    const evento = {
      id: editando || Date.now(),
      nombre,
      fecha,
      lugar,
      descripcion
    }

    let nuevosEventos
    if (editando) {
      nuevosEventos = eventos.map((item) =>
        item.id === editando ? evento : item
      )
    } else {
      nuevosEventos = [...eventos, evento]
    }

    setEventos(nuevosEventos)
    localStorage.setItem('eventos', JSON.stringify(nuevosEventos))
    limpiarFormulario()
  }

  function editarEvento(evento) {
    setNombre(evento.nombre)
    setFecha(evento.fecha)
    setLugar(evento.lugar)
    setDescripcion(evento.descripcion)
    setEditando(evento.id)
  }

  function eliminarEvento(id) {
    const nuevosEventos = eventos.filter((evento) => evento.id !== id)
    setEventos(nuevosEventos)
    localStorage.setItem('eventos', JSON.stringify(nuevosEventos))
  }

  function limpiarFormulario() {
    setNombre('')
    setFecha('')
    setLugar('')
    setDescripcion('')
    setEditando(null)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AnimeCon Manager</h1>
      </header>

      <main className="main-content">
        {/* Módulo 1: Invitados */}
        <section className="container-seccion">
          <Invitados />
        </section>

        {/* Módulo 2: Eventos */}
        <section className="container-seccion">
          <h2>Gestión de Eventos de la Convención</h2>
          <p className="subtitle">Registra y administra los eventos programados</p>

          <form className="form-grid" onSubmit={guardarEvento}>
            <h3>{editando ? 'Editar Evento' : 'Registrar Evento'}</h3>
            
            <div className="form-group">
              <label>Nombre del evento</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Lugar</label>
              <input
                type="text"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows="3"
                required
              />
            </div>

            <div className="form-actions full-width">
              <button type="submit" className="btn btn-primary">
                {editando ? 'Actualizar evento' : 'Guardar evento'}
              </button>

              {editando && (
                <button type="button" className="btn btn-secondary" onClick={limpiarFormulario}>
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="list-container">
            <h3>Eventos Registrados</h3>
            {eventos.length === 0 ? (
              <p className="empty-message">No hay eventos registrados.</p>
            ) : (
              <div className="cards-grid">
                {eventos.map((evento) => (
                  <div key={evento.id} className="card">
                    <h4>{evento.nombre}</h4>
                    <p><strong>Fecha:</strong> {evento.fecha}</p>
                    <p><strong>Lugar:</strong> {evento.lugar}</p>
                    <p className="card-desc">{evento.descripcion}</p>

                    <div className="card-actions">
                      <button className="btn btn-small" onClick={() => editarEvento(evento)}>
                        Editar
                      </button>
                      <button className="btn btn-small btn-danger" onClick={() => eliminarEvento(evento.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App