import ItemNota from './ItemNota'

export default function ListaNotas({ notas, onEliminar }) {
  if (notas.length === 0) {
    return (
      <div className="lista-vacia">
        <p>No hay notas aún. ¡Agrega la primera!</p>
      </div>
    )
  }

  return (
    <div className="lista-notas">
      {notas.map(nota => (
        <ItemNota
          key={nota.id}
          nota={nota}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  )
}
