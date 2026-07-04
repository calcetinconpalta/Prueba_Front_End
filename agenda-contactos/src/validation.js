export const TIPOS_DATO = ['Personal', 'Trabajo', 'Casa']

export function validarContacto(nombre, apellido) {
  const errores = {}
  if (!nombre || nombre.trim().length === 0) {
    errores.nombre = 'El nombre es obligatorio.'
  } else if (nombre.trim().length > 80) {
    errores.nombre = 'El nombre no puede superar los 80 caracteres.'
  }
  if (!apellido || apellido.trim().length === 0) {
    errores.apellido = 'El apellido es obligatorio.'
  } else if (apellido.trim().length > 80) {
    errores.apellido = 'El apellido no puede superar los 80 caracteres.'
  }
  return errores
}

export function validarDatoContacto({ tipo, correo, telefono, direccion }) {
  const errores = {}
  if (!TIPOS_DATO.includes(tipo)) {
    errores.tipo = 'Selecciona un tipo válido.'
  }
  const sinValores = !correo && !telefono && !direccion
  if (sinValores) {
    errores.general = 'Debes ingresar al menos un correo, teléfono o dirección.'
  }
  if (correo) {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regexCorreo.test(correo)) {
      errores.correo = 'El correo electrónico no tiene un formato válido.'
    } else if (correo.length > 120) {
      errores.correo = 'El correo no puede superar los 120 caracteres.'
    }
  }
  if (telefono) {
    const regexTelefono = /^\+?[0-9\s-]{7,20}$/
    if (!regexTelefono.test(telefono)) {
      errores.telefono = 'El teléfono debe tener entre 7 y 20 dígitos, puede incluir +, espacios o guiones.'
    }
  }
  if (direccion && direccion.trim().length > 500) {
    errores.direccion = 'La dirección no puede superar los 500 caracteres.'
  }
  return errores
}
