# Evaluaciones de Proyectos UVG

Portal demostrativo para **proyectos y presentaciones finales**. Diseño verde `#008D36` y blanco, adaptable a celulares.

## ¿Qué cambia en esta versión?

La rúbrica **no está fija en el código de la interfaz**. Cada evaluación tiene sus propios criterios, valores máximos, puntajes y comentarios; el total se calcula automáticamente. Esto permite rúbricas diferentes por curso, nivel académico, período y tipo de proyecto.

### Ejemplos completamente ficticios

| Sección | Grupo | Código | Rúbrica |
|---|---|---|---|
| 20 | 1 | `DEMO-UVG` | Algoritmos y Programación Básica, 11 criterios y 100 puntos |
| 99 | 2 | `DEMO-AVANZADO` | Curso avanzado de ejemplo, 4 criterios y 100 puntos |

El ejemplo avanzado no es una rúbrica aprobada para un curso real. Las dos evaluaciones son **ficticias**.

## Archivos

- `index.html`: formulario y vista de resultados.
- `styles.css`: diseño visual.
- `config-demo.js`: dos evaluaciones **públicas y ficticias** con rúbricas distintas.
- `app.js`: representación dinámica de cualquier número de criterios.
- `.nojekyll`: publicación directa en GitHub Pages.

## Publicación

1. Crear repositorio **público** `evaluaciones-proyectos-uvg`.
2. Subir **el contenido de la carpeta**, no el ZIP, a la raíz del repositorio.
3. Abrir **Settings > Pages**.
4. Seleccionar **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guardar.
5. Visitar `https://TU-USUARIO.github.io/evaluaciones-proyectos-uvg/`.

## Seguridad y siguiente fase

**Nunca subas al repositorio público el Excel con notas, listas de estudiantes, códigos reales ni archivos JSON con evaluaciones.** El código y los archivos servidos por GitHub Pages son públicos. El formulario actual es una **simulación**, no un mecanismo seguro de autenticación.

Para mostrar los 22 grupos reales de las secciones 20 y 30 se necesitará, antes de publicarlos, una API privada que valide sección + grupo + código de alta entropía en el servidor, limite intentos y devuelva solo los resultados autorizados. Se puede implementar sin panel administrativo inicialmente; después se añadirá administración de cursos, rúbricas versionadas, evaluaciones y carga de Excel.

No es un sitio oficial de la Universidad del Valle de Guatemala.
