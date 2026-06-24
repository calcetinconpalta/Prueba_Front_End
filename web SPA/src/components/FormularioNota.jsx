import { useRef, useState } from 'react'

const COLORES_PALETA = [
  { id: 'amarillo', label: 'Amarillo', hex: '#f7e96e' },
  { id: 'verde',    label: 'Verde',    hex: '#b5e48c' },
  { id: 'celeste',  label: 'Celeste',  hex: '#90e0ef' },
  { id: 'lila',     label: 'Lila',     hex: '#c8b6e2' },
  { id: 'rojo',     label: 'Rojo',     hex: '#e05c5c' },
]

export default function FormularioNota({ onAgregar }) {
  const refTitulo      = useRef()
  const refDescripcion = useRef()
  const [importante, setImportante] = useState(false)
  const [color, setColor]           = useState('amarillo')
  const [error, setError]           = useState('')

  const manejarEnvio = (e) => {
    e.preventDefault()
    const titulo      = refTitulo.current.value
    const descripcion = refDescripcion.current.value

    if (!descripcion.trim()) {
      setError('La descripción es obligatoria.')
      refDescripcion.current.focus()
      return
    }
    if (descripcion.trim().length > 300) {
      setError('La descripción no puede superar 300 caracteres.')
      return
    }

    setError('')
    onAgregar({ titulo, descripcion, importante, color })

    refTitulo.current.value      = ''
    refDescripcion.current.value = ''
    setImportante(false)
    setColor('amarillo')
    refTitulo.current.focus()
  }

  return (
    <form className="formulario-nota" onSubmit={manejarEnvio} noValidate>
      <div className="formulario-campos">
        <input
          ref={refTitulo}
          type="text"
          className="campo-texto"
          placeholder="Título (opcional)"
          maxLength={60}
        />
        <input
          ref={refDescripcion}
          type="text"
          className={`campo-texto campo-descripcion ${error ? 'campo-error' : ''}`}
          placeholder="Descripción *"
          maxLength={300}
        />

        {/* Paleta de colores */}
        <div className="paleta-colores" role="group" aria-label="Color de la nota">
          {COLORES_PALETA.map(c => (
            <button
              key={c.id}
              type="button"
              className={`circulo-color ${color === c.id ? 'seleccionado' : ''}`}
              style={{ background: c.hex }}
              onClick={() => setColor(c.id)}
              title={c.label}
              aria-label={c.label}
              aria-pressed={color === c.id}
            />
          ))}
        </div>

        <label className="check-importante">
          <input
            type="checkbox"
            checked={importante}
            onChange={e => setImportante(e.target.checked)}
          />
          <span>Importante</span>
        </label>

        <button type="submit" className="btn-agregar">Agregar</button>
      </div>
      {error && <p className="mensaje-error">{error}</p>}
    </form>
  )
}
