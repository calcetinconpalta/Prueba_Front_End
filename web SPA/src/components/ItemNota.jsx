const COLORES = {
  amarillo: { fondo: '#f7e96e', borde: '#e0cf50', texto: '#2a2a2a' },
  verde:    { fondo: '#b5e48c', borde: '#8cc96a', texto: '#2a2a2a' },
  celeste:  { fondo: '#90e0ef', borde: '#60c4d8', texto: '#2a2a2a' },
  lila:     { fondo: '#c8b6e2', borde: '#a994cc', texto: '#2a2a2a' },
  rojo:     { fondo: '#e05c5c', borde: '#c03a3a', texto: '#ffffff' },
}

export default function ItemNota({ nota, onEliminar }) {
  const { id, titulo, descripcion, importante, color = 'amarillo' } = nota
  const estilos = COLORES[color] || COLORES.amarillo

  return (
    <div
      className={`item-nota ${importante ? 'nota-importante' : ''}`}
      style={{
        background: estilos.fondo,
        borderTop:  `4px solid ${estilos.borde}`,
        color:      estilos.texto,
      }}
    >
      <button
        className="btn-eliminar"
        onClick={() => onEliminar(id)}
        aria-label={`Eliminar nota: ${titulo || descripcion}`}
        title="Eliminar nota"
        style={{ color: estilos.texto }}
      >
        ✕
      </button>
      {titulo && <h3 className="nota-titulo">{titulo}</h3>}
      <p className="nota-descripcion">{descripcion}</p>
    </div>
  )
}
