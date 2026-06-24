import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FormularioNota from './components/FormularioNota'
import ListaNotas from './components/ListaNotas'

const CLAVE_LS = 'sticky-notes-v1'

export default function App() {
  const [notas, setNotas] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_LS)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CLAVE_LS, JSON.stringify(notas))
  }, [notas])

  const agregarNota = ({ titulo, descripcion, importante, color }) => {
    const nueva = {
      id: uuidv4(),
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      importante,
      color,
      fechaCreacion: new Date().toISOString()
    }
    setNotas(prev => [nueva, ...prev])
  }

  const eliminarNota = (id) => {
    setNotas(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1 className="app-titulo">Post It Simulator!</h1>
        <FormularioNota onAgregar={agregarNota} />
      </header>
      <main className="app-main">
        <ListaNotas notas={notas} onEliminar={eliminarNota} />
      </main>
    </div>
  )
}
