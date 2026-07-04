import ContactoForm from './components/ContactoForm'
import ContactoList from './components/ContactoList'
import { useContactos } from './useContactos'

export default function App() {
  const {
    contactos,
    cargando,
    error,
    recargar,
    crearContacto,
    eliminarContacto,
    agregarDatoContacto,
    eliminarDatoContacto
  } = useContactos()

  return (
    <div className="contenedor-app">
      <header className="encabezado-app">
        <h1>Agenda de Contactos</h1>
        <p>Gestiona tus contactos y sus datos de contacto de forma simple.</p>
      </header>

      {error && (
        <div className="banner-error">
          <span>{error}</span>
          <button type="button" onClick={recargar}>Reintentar</button>
        </div>
      )}

      <main className="cuerpo-app">
        <ContactoForm onCrear={crearContacto} />

        {cargando ? (
          <p className="texto-vacio">Cargando contactos...</p>
        ) : (
          <ContactoList
            contactos={contactos}
            onEliminarContacto={eliminarContacto}
            onAgregarDato={agregarDatoContacto}
            onEliminarDato={eliminarDatoContacto}
          />
        )}
      </main>
    </div>
  )
}
