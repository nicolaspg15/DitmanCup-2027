# Ditman Cup 2027 — Sitio del torneo

Sitio estático (GitHub Pages), una sola página con navegación por pestañas.
Bilingüe español / inglés (botón **ES / EN** en la barra superior).

## Estructura
- `index.html` — toda la página (Inicio, Sorteo, Grupos, Brackets, Clasificatorias, Donaciones, Organizadores)
- `css/style.css` — estilos + `@font-face` de las fuentes locales
- `js/script.js` — configuración del torneo, textos ES/EN, pestañas, contador y carga de datos
- `assets/` — imágenes: `fondoInicio.jpg` (fondo de la pestaña Inicio), `fondo1.jpeg` (fondo del resto)
- `assets/fonts/` — fuentes (fan/gratis): `REBiohazard.otf` (la del juego, principal) y `VirgulaVulgaris-Bold.ttf` (acentos)

## Configuración del torneo
Todo en la constante `TOURNAMENT_CONFIG` al principio de `js/script.js`:
- `totalRunners`, `numGroups`, `groupSize`, `qualifiersPerGroup` — los cuadros y grupos se arman a partir de acá, no hay números hardcodeados.
- `qualysOpen` — apertura de las clasificatorias, formato ISO con offset. Hoy: `2026-11-20T00:00:00-03:00` (20 nov 2026, 00:00 Argentina). Alimenta el contador de la portada.
- `qualysTimeZone` — zona horaria para mostrar la fecha siempre igual sin importar dónde esté el visitante.

## Idiomas
Cada texto traducible lleva `data-i18n="clave"` en el HTML y su valor está en el objeto `I18N` (`es` / `en`) de `js/script.js`. Para tocar un texto se edita ahí, en los dos idiomas. El idioma elegido queda guardado en el navegador (`localStorage`).

## Cómo agregar colaboradores
En el repo: **Settings → Collaborators → Add people**, buscar por usuario o email de GitHub, y aceptan la invitación por mail.

## Cómo conectar una Google Sheet
1. En la Sheet: **Archivo → Compartir → Publicar en la web**
2. Elegir la hoja específica (no "todo el libro") y formato **CSV**
3. Publicar y copiar el link generado
4. Pegarlo en `js/script.js`, dentro de `SHEET_URLS.groups` o `SHEET_URLS.standings`

**Formato esperado — hoja de grupos:** dos columnas, `Grupo` y `Corredor` (una fila por corredor, ej: `A, NombreDelRunner`).

**Formato esperado — hoja de clasificación:** cualquier set de columnas (se muestran todas tal cual estén en la Sheet). Si además trae `Grupo` y `Corredor`, los primeros `qualifiersPerGroup` de cada grupo alimentan el bracket.

El parser (`parseCSV` / `fetchCSV`) soporta comas dentro de comillas, comillas escapadas (`""`), CRLF, BOM y filas vacías.

## Modo prueba (datos falsos)
Para ver Grupos / Clasificatorias / Brackets sin la Sheet conectada:
- agregá `?mock=1` a la URL (ej. `.../index.html?mock=1`), o
- poné `mock: true` en `TOURNAMENT_CONFIG`.

Aparece un cartel "MODO PRUEBA" y se cargan 32 corredores de mentira. **No dejar `mock: true` commiteado.**

## Bracket
Se arma solo desde `TOURNAMENT_CONFIG`: `numGroups × qualifiersPerGroup` entrantes → cuadro de eliminación con la siembra estándar (1º A vs 2º del cruzado, etc.). Si el número no es potencia de 2, reparte BYEs a los primeros. Sin datos muestra casilleros `1 A` / `2 B`; con datos (Sheet o mock) muestra nombres.

## Correr en local
```bash
python -m http.server 4599
```
y abrir <http://localhost:4599>. (Hace falta un server por las fuentes y el `fetch`; abrir el `index.html` directo no alcanza.)

## Publicar cambios
Cualquier colaborador puede editar desde la web de GitHub o clonar y trabajar con git. GitHub Pages se actualiza solo en menos de 2 minutos.

## Pendiente
- [ ] Logo del torneo (se sacó el del 2026)
- [ ] Confirmar número final de corredores / grupos / clasificados
- [ ] Fecha real de apertura de qualys (`qualysOpen`)
- [ ] VOD del sorteo (sección Sorteo)
- [ ] Armar el bracket visual una vez definida la fase de grupos
- [ ] Nombres reales de organizadores / casters
- [ ] Link real de donaciones
- [ ] Conectar las dos Sheets (grupos y clasificación)

## Notas sobre las fuentes
`REBiohazard.otf` (Biohazard Game Font) y `VirgulaVulgaris-Bold.ttf` son fuentes de fan / gratuitas
para uso no comercial. Para un torneo comunitario sin fines de lucro suele estar bien; conviene igual
confirmar los términos antes de algo más formal.
