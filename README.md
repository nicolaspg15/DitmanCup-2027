# Ditman Cup 2027 — Sitio del torneo

Sitio estático (GitHub Pages), una sola página con navegación por pestañas.

## Estructura
- `index.html` — toda la página (Inicio, Sorteo, Grupos, Brackets, Clasificatorias, Donaciones, Organizadores)
- `css/style.css` — estilos
- `js/script.js` — lógica de pestañas + carga de datos desde Google Sheets
- `assets/` — logo e imágenes (agregar acá el logo del torneo cuando esté listo)

## Cómo agregar colaboradores
En el repo: **Settings → Collaborators → Add people**, buscar por usuario o email de GitHub, y aceptan la invitación por mail. Van a poder subir cambios directo al repo, igual que el dueño.

## Cómo conectar una Google Sheet
1. En la Sheet: **Archivo → Compartir → Publicar en la web**
2. Elegir la hoja específica (no "todo el libro") y formato **CSV**
3. Publicar y copiar el link generado
4. Pegarlo en `js/script.js`, dentro de `SHEET_URLS.groups` o `SHEET_URLS.standings`

**Formato esperado — hoja de grupos:** dos columnas, `Grupo` y `Corredor` (una fila por corredor, ej: `A, NombreDelRunner`).

**Formato esperado — hoja de clasificación:** cualquier set de columnas (se muestran todas tal cual estén en la Sheet).

Si en algún momento los nombres tienen comas o el CSV se complica, se puede reemplazar el parser casero de `fetchCSV()` por la librería PapaParse (vía CDN), que es más robusta.

## Publicar cambios
Cualquier colaborador puede subir/editar archivos desde la web de GitHub (**Add file → Upload files**, o editar directo con el lápiz), o clonar el repo y trabajar con git localmente. GitHub Pages se actualiza solo, en menos de 2 minutos.

## Pendiente
- [ ] Logo del torneo (reemplazar `.hero-logo-slot` y `.brand-logo`)
- [ ] Confirmar número final de corredores / grupos / clasificados
- [ ] VOD del sorteo (sección Sorteo)
- [ ] Armar el bracket visual una vez definida la fase de grupos
- [ ] Nombres reales de organizadores / casters
- [ ] Link real de donaciones
- [ ] Conectar las dos Sheets (grupos y clasificación)
