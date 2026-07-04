create table contacto (
  id_contacto bigint generated always as identity primary key,
  nombre varchar(80) not null,
  apellido varchar(80) not null
);

create table dato_contacto (
  id_dato_contacto bigint generated always as identity primary key,
  id_contacto bigint not null references contacto (id_contacto) on delete cascade,
  tipo varchar(20) not null check (tipo in ('Personal', 'Trabajo', 'Casa')),
  correo varchar(120),
  telefono varchar(20),
  direccion text,
  constraint al_menos_un_dato check (
    correo is not null or telefono is not null or direccion is not null
  )
);

alter table contacto enable row level security;
alter table dato_contacto enable row level security;

-- Política usada en este proyecto: acceso público total con la anon key.
-- Válida para una app de demostración/entrega académica sin autenticación de usuarios,
-- pero en un caso real cualquiera con la anon key puede leer y borrar todo.
create policy "acceso publico contacto" on contacto
  for all using (true) with check (true);

create policy "acceso publico dato_contacto" on dato_contacto
  for all using (true) with check (true);

-- Alternativa más segura si se agrega autenticación de usuarios (Supabase Auth):
-- añadir columna user_id a "contacto", y reemplazar las políticas de arriba por:
--
-- alter table contacto add column user_id uuid references auth.users default auth.uid();
-- drop policy "acceso publico contacto" on contacto;
-- create policy "solo dueño" on contacto
--   for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
--
-- create policy "solo dueño dato_contacto" on dato_contacto
--   for all using (
--     exists (select 1 from contacto c where c.id_contacto = dato_contacto.id_contacto and c.user_id = auth.uid())
--   );
