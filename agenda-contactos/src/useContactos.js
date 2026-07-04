import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function mapearErrorApi(errorSupabase, entidad) {
  const codigo = errorSupabase.code

  if (codigo === '23514') {
    return entidad === 'dato_contacto'
      ? 'La API rechazó el dato: debe incluir tipo válido y al menos un correo, teléfono o dirección.'
      : 'La API rechazó el registro por no cumplir una restricción de la base de datos.'
  }
  if (codigo === '23503') {
    return 'El contacto asociado ya no existe en la base de datos.'
  }
  if (codigo === '23502') {
    return 'Falta un campo obligatorio requerido por la base de datos.'
  }
  if (codigo === '22001') {
    return 'Uno de los campos supera el largo máximo permitido por la base de datos.'
  }
  if (errorSupabase.message?.includes('Failed to fetch')) {
    return 'No hay conexión con la API de Supabase. Revisa tu conexión a internet.'
  }
  return entidad === 'dato_contacto'
    ? 'No se pudo agregar el dato de contacto.'
    : 'No se pudo crear el contacto. Intenta nuevamente.'
}


export function useContactos() {
  const [contactos, setContactos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const cargarContactos = useCallback(async () => {
    setCargando(true)
    setError(null)
    const { data, error: errorConsulta } = await supabase
      .from('contacto')
      .select('id_contacto, nombre, apellido, dato_contacto(id_dato_contacto, tipo, correo, telefono, direccion)')
      .order('id_contacto', { ascending: true })

    if (errorConsulta) {
      setError('No se pudo cargar la agenda. Verifica tu conexión con Supabase.')
      setCargando(false)
      return
    }
    setContactos(data ?? [])
    setCargando(false)
  }, [])

  useEffect(() => {
    cargarContactos()
  }, [cargarContactos])

  const crearContacto = async (nombre, apellido) => {
    const { data, error: errorInsert } = await supabase
      .from('contacto')
      .insert({ nombre: nombre.trim(), apellido: apellido.trim() })
      .select()
      .single()

    if (errorInsert) {
      throw new Error(mapearErrorApi(errorInsert, 'contacto'))
    }
    setContactos((prev) => [...prev, { ...data, dato_contacto: [] }])
    return data
  }

  const eliminarContacto = async (idContacto) => {
    const { error: errorDelete } = await supabase
      .from('contacto')
      .delete()
      .eq('id_contacto', idContacto)

    if (errorDelete) {
      throw new Error('No se pudo eliminar el contacto.')
    }
    setContactos((prev) => prev.filter((c) => c.id_contacto !== idContacto))
  }

  const agregarDatoContacto = async (idContacto, datoContacto) => {
    const { data, error: errorInsert } = await supabase
      .from('dato_contacto')
      .insert({ id_contacto: idContacto, ...datoContacto })
      .select()
      .single()

    if (errorInsert) {
      throw new Error(mapearErrorApi(errorInsert, 'dato_contacto'))
    }
    setContactos((prev) =>
      prev.map((c) =>
        c.id_contacto === idContacto
          ? { ...c, dato_contacto: [...c.dato_contacto, data] }
          : c
      )
    )
    return data
  }

  const eliminarDatoContacto = async (idContacto, idDatoContacto) => {
    const { error: errorDelete } = await supabase
      .from('dato_contacto')
      .delete()
      .eq('id_dato_contacto', idDatoContacto)

    if (errorDelete) {
      throw new Error('No se pudo eliminar el dato de contacto.')
    }
    setContactos((prev) =>
      prev.map((c) =>
        c.id_contacto === idContacto
          ? { ...c, dato_contacto: c.dato_contacto.filter((d) => d.id_dato_contacto !== idDatoContacto) }
          : c
      )
    )
  }

  return {
    contactos,
    cargando,
    error,
    recargar: cargarContactos,
    crearContacto,
    eliminarContacto,
    agregarDatoContacto,
    eliminarDatoContacto
  }
}
