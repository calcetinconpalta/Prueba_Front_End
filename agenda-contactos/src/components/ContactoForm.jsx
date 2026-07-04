import { useState } from 'react'
import { validarContacto } from '../validation'

export default function ContactoForm({ onCrear }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [errorServidor, setErrorServidor] = useState(null)

  const validarCampo = (campo, valorNombre, valorApellido) => {
    const erroresValidacion = validarContacto(valorNombre, valorApellido)
    setErrores((prev) => ({ ...prev, [campo]: erroresValidacion[campo] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const erroresValidacion = validarContacto(nombre, apellido)
    setErrores(erroresValidacion)
    setErrorServidor(null)
    if (Object.keys(erroresValidacion).length > 0) return

    setEnviando(true)
    try {
      await onCrear(nombre, apellido)
      setNombre('')
      setApellido('')
    } catch (err) {
      setErrorServidor(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="tarjeta formulario-contacto" onSubmit={handleSubmit}>
      <h2>Nuevo contacto</h2>
      <div className="campo">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onBlur={() => validarCampo('nombre', nombre, apellido)}
          placeholder="Ej: María"
        />
        {errores.nombre && <span className="error-texto">{errores.nombre}</span>}
      </div>
      <div className="campo">
        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          onBlur={() => validarCampo('apellido', nombre, apellido)}
          placeholder="Ej: González"
        />
        {errores.apellido && <span className="error-texto">{errores.apellido}</span>}
      </div>
      {errorServidor && <span className="error-texto">{errorServidor}</span>}
      <button type="submit" disabled={enviando}>
        {enviando ? 'Guardando...' : 'Agregar contacto'}
      </button>
    </form>
  )
}
