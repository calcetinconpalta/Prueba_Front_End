import { useState } from 'react'
import { TIPOS_DATO, validarDatoContacto } from '../validation'

export default function DatoContactoForm({ idContacto, onAgregar }) {
  const [tipo, setTipo] = useState('Personal')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [errorServidor, setErrorServidor] = useState(null)

  const limpiar = () => {
    setCorreo('')
    setTelefono('')
    setDireccion('')
  }

  const handleBlur = (campoModificado, valores) => {
    const erroresValidacion = validarDatoContacto({ tipo, ...valores })
    setErrores((prev) => ({
      ...prev,
      [campoModificado]: erroresValidacion[campoModificado],
      general: erroresValidacion.general
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const datos = {
      tipo,
      correo: correo.trim() || null,
      telefono: telefono.trim() || null,
      direccion: direccion.trim() || null
    }
    const erroresValidacion = validarDatoContacto(datos)
    setErrores(erroresValidacion)
    setErrorServidor(null)
    if (Object.keys(erroresValidacion).length > 0) return

    setEnviando(true)
    try {
      await onAgregar(idContacto, datos)
      limpiar()
    } catch (err) {
      setErrorServidor(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="formulario-dato" onSubmit={handleSubmit}>
      <div className="campo">
        <label>Tipo</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          {TIPOS_DATO.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errores.tipo && <span className="error-texto">{errores.tipo}</span>}
      </div>
      <div className="campo">
        <label>Correo</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          onBlur={() => handleBlur('correo', { correo, telefono, direccion })}
          placeholder="correo@ejemplo.com"
        />
        {errores.correo && <span className="error-texto">{errores.correo}</span>}
      </div>
      <div className="campo">
        <label>Teléfono</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          onBlur={() => handleBlur('telefono', { correo, telefono, direccion })}
          placeholder="+56 9 1234 5678"
        />
        {errores.telefono && <span className="error-texto">{errores.telefono}</span>}
      </div>
      <div className="campo">
        <label>Dirección</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          onBlur={() => handleBlur('direccion', { correo, telefono, direccion })}
          placeholder="Calle 123, Ciudad"
        />
        {errores.direccion && <span className="error-texto">{errores.direccion}</span>}
      </div>
      {errores.general && <span className="error-texto">{errores.general}</span>}
      {errorServidor && <span className="error-texto">{errorServidor}</span>}
      <button type="submit" disabled={enviando}>
        {enviando ? 'Guardando...' : 'Agregar dato'}
      </button>
    </form>
  )
}
