# Agenda de Contactos — SPA en React + Supabase

## Requisitos previos
- Node.js 18+
- Cuenta en [Supabase](https://supabase.com)

## Configuración de la base de datos
1. Crea un proyecto en Supabase.
2. Ve a **SQL Editor** y ejecuta el contenido de `supabase_schema.sql`. Esto crea las tablas `contacto` y `dato_contacto` con sus relaciones, restricciones y políticas RLS.
3. Ve a **Project Settings > API** y copia la `URL` y la `anon public key`.

## Configuración del proyecto
1. Copia `.env.example` a `.env`:
   ```
   cp .env.example .env
   ```
2. Reemplaza los valores con tu URL y anon key de Supabase.
3. Instala dependencias:
   ```
   npm install
   ```
4. Ejecuta en modo desarrollo:
   ```
   npm run dev
   ```

## Estructura del proyecto
```
src/
  App.jsx                 componente raíz
  useContactos.js         hook con toda la lógica CRUD contra Supabase
  validation.js           validaciones de formularios
  supabaseClient.js       instancia del cliente de Supabase
  components/
    ContactoForm.jsx       formulario de creación de contacto
    ContactoList.jsx       listado con buscador
    ContactoCard.jsx       tarjeta individual con detalle expandible
    DatoContactoForm.jsx   formulario de datos de contacto (correo/teléfono/dirección)
    DatoContactoList.jsx   listado de datos de contacto
```

## Funcionalidad implementada
- Alta y eliminación de contactos (nombre, apellido).
- Alta y eliminación de datos de contacto asociados (correo, teléfono, dirección), con tipo Personal/Trabajo/Casa.
- Validación en cliente según restricciones de la base de datos (formato de correo, formato de teléfono, largo máximo, al menos un dato por registro).
- Manejo de errores de conexión y de operaciones CRUD con mensajes al usuario.
- Buscador de contactos por nombre/apellido.
- Interfaz responsiva basada en componentes reutilizables.

## Publicación en GitHub
```
git init
git add .
git commit -m "Agenda de contactos SPA"
git branch -M main
git remote add origin <URL_DE_TU_REPOSITORIO>
git push -u origin main
```

Recuerda que `.env` está en `.gitignore` y no se subirá al repositorio; solo se sube `.env.example`.
