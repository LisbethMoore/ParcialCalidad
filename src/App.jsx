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
    <div className="app">
      <h1>AnimeCon Manager</h1>
      
      {/* Módulo de Invitados */}
      <Invitados />

      <hr style={{ margin: '40px 0' }} />

      {/* Módulo de Eventos */}
      <p>Gestión de eventos de la convención</p>

      <section>
        <h2>{editando ? 'Editar evento' : 'Registrar evento'}</h2>

        <form onSubmit={guardarEvento}>
          <div>
            <label>Nombre del evento</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Lugar</label>
            <input
              type="text"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            {editando ? 'Actualizar evento' : 'Guardar evento'}
          </button>

          {editando && (
            <button type="button" onClick={limpiarFormulario}>
              Cancelar
            </button>
          )}
        </form>
      </section>

      <section>
        <h2>Eventos registrados</h2>

        {eventos.length === 0 ? (
          <p>No hay eventos registrados.</p>
        ) : (
          eventos.map((evento) => (
            <div key={evento.id}>
              <h3>{evento.nombre}</h3>
              <p>Fecha: {evento.fecha}</p>
              <p>Lugar: {evento.lugar}</p>
              <p>{evento.descripcion}</p>

              <button onClick={() => editarEvento(evento)}>
                Editar
              </button>

              <button onClick={() => eliminarEvento(evento.id)}>
                Eliminar
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default App