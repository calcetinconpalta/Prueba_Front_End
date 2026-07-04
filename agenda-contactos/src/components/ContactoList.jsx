import { useMemo, useState } from 'react'
import ContactoCard from './ContactoCard'

export default function ContactoList({ contactos, onEliminarContacto, onAgregarDato, onEliminarDato }) {
  const [busqueda, setBusqueda] = useState('')

  const contactosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()
    if (!termino) return contactos
    return contactos.filter((c) =>
      `${c.nombre} ${c.apellido}`.toLowerCase().includes(termino)
    )
  }, [contactos, busqueda])

  return (
    <div className="tarjeta lista-contactos-contenedor">
      <div className="cabecera-lista">
        <h2>Contactos ({contactos.length})</h2>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      {contactosFiltrados.length === 0 ? (
        <p className="texto-vacio">No hay contactos que coincidan con la búsqueda.</p>
      ) : (
        <ul className="lista-contactos">
          {contactosFiltrados.map((contacto) => (
            <ContactoCard
              key={contacto.id_contacto}
              contacto={contacto}
              onEliminarContacto={onEliminarContacto}
              onAgregarDato={onAgregarDato}
              onEliminarDato={onEliminarDato}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
