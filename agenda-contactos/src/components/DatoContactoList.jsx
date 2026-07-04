import { useState } from 'react'

const ICONOS = {
  Personal: '👤',
  Trabajo: '💼',
  Casa: '🏠'
}

export default function DatoContactoList({ datos, onEliminar }) {
  const [eliminandoId, setEliminandoId] = useState(null)
  const [errorPorId, setErrorPorId] = useState({})

  const handleEliminar = async (idDatoContacto) => {
    setEliminandoId(idDatoContacto)
    setErrorPorId((prev) => ({ ...prev, [idDatoContacto]: null }))
    try {
      await onEliminar(idDatoContacto)
    } catch (err) {
      setErrorPorId((prev) => ({ ...prev, [idDatoContacto]: err.message }))
    } finally {
      setEliminandoId(null)
    }
  }

  if (!datos || datos.length === 0) {
    return <p className="texto-vacio">Sin datos de contacto registrados.</p>
  }

  return (
    <ul className="lista-datos">
      {datos.map((dato) => (
        <li key={dato.id_dato_contacto} className="item-dato">
          <span className="etiqueta-tipo">
            {ICONOS[dato.tipo] ?? '•'} {dato.tipo}
          </span>
          <div className="detalle-dato">
            {dato.correo && <span>{dato.correo}</span>}
            {dato.telefono && <span>{dato.telefono}</span>}
            {dato.direccion && <span>{dato.direccion}</span>}
            {errorPorId[dato.id_dato_contacto] && (
              <span className="error-texto">{errorPorId[dato.id_dato_contacto]}</span>
            )}
          </div>
          <button
            type="button"
            className="boton-eliminar-pequeno"
            onClick={() => handleEliminar(dato.id_dato_contacto)}
            disabled={eliminandoId === dato.id_dato_contacto}
          >
            {eliminandoId === dato.id_dato_contacto ? 'Eliminando...' : 'Eliminar'}
          </button>
        </li>
      ))}
    </ul>
  )
}
