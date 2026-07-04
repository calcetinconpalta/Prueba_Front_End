import { useState } from 'react'
import DatoContactoForm from './DatoContactoForm'
import DatoContactoList from './DatoContactoList'

export default function ContactoCard({ contacto, onEliminarContacto, onAgregarDato, onEliminarDato }) {
  const [expandido, setExpandido] = useState(false)
  const [eliminando, setEliminando] = useState(false)
  const [errorEliminar, setErrorEliminar] = useState(null)

  const handleEliminarContacto = async () => {
    setEliminando(true)
    setErrorEliminar(null)
    try {
      await onEliminarContacto(contacto.id_contacto)
    } catch (err) {
      setErrorEliminar(err.message)
      setEliminando(false)
    }
  }

  const handleEliminarDato = async (idDatoContacto) => {
    await onEliminarDato(contacto.id_contacto, idDatoContacto)
  }

  return (
    <li className="tarjeta tarjeta-contacto">
      <div className="cabecera-contacto">
        <div>
          <h3>{contacto.nombre} {contacto.apellido}</h3>
          <span className="contador-datos">
            {contacto.dato_contacto.length} dato(s) de contacto
          </span>
        </div>
        <div className="acciones-contacto">
          <button type="button" onClick={() => setExpandido((v) => !v)}>
            {expandido ? 'Ocultar' : 'Ver detalle'}
          </button>
          <button
            type="button"
            className="boton-peligro"
            onClick={handleEliminarContacto}
            disabled={eliminando}
          >
            {eliminando ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>

      {errorEliminar && <span className="error-texto">{errorEliminar}</span>}

      {expandido && (
        <div className="detalle-expandido">
          <DatoContactoList datos={contacto.dato_contacto} onEliminar={handleEliminarDato} />
          <DatoContactoForm idContacto={contacto.id_contacto} onAgregar={onAgregarDato} />
        </div>
      )}
    </li>
  )
}
