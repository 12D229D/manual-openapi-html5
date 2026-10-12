# Manual y Guía Interactiva de OpenAPI 3.1 & Swagger (HTML5/CSS3/JS)

Una aplicación web de página única (SPA) responsiva, interactiva y moderna construida con HTML5 semántico, CSS3 con variables de diseño (modo claro/oscuro) y JavaScript vanila. Diseñada para servir como manual de referencia completo y guía práctica de la especificación **OpenAPI 3.1** y el ecosistema **Swagger**.

---

## 🚀 Características Principales

- **Diseño SPA con Navegación Fija & Contenido Fluido**: Navegación lateral persistente con categorías colapsables y scroll automático a cada sección mediante rutas `#hash`.
- **Soporte de Modo Oscuro / Claro**: Cambiador de tema persistente guardado en `localStorage`.
- **Búsqueda en Tiempo Real**: Filtrado dinámico en la barra lateral para encontrar rápidamente cualquier concepto, objeto o palabra clave.
- **Asistente Interactivo de Decisión (Decision Wizard)**: Asistente paso a paso que diagnostica las necesidades de tu arquitectura API y genera dinámicamente un archivo YAML de OpenAPI 3.1 listo para descargar o copiar.
- **Playground & Generador Live en Tiempo Real**: Formulario interactivo donde ajustas parámetros (Ruta, Método HTTP, Código de Respuesta, Servidor) y visualizas en vivo el código YAML resultante.
- **Copiado de Código al Portapapeles**: Botones de copia con respuesta visual e indicación de notificación "Toast" flotante.
- **Seguimiento de Progreso**: Indicador de lectura acumulado por secciones visitadas, guardado en el navegador.
- **100% Responsivo**: Compatible con pantallas móviles, tablets y monitores de escritorio mediante menú lateral desplegable.

---

## 📂 Estructura del Proyecto

```text
manual-openapi-html5/
├── index.html         # Documento HTML5 semántico con todas las secciones y componentes
├── css/
│   └── style.css      # Sistema de diseño con CSS Custom Properties, layout flex/grid y temas
├── js/
│   └── main.js        # Lógica de navegación SPA, Wizard interactivo, Playground live y almacenamiento local
└── README.md          # Documentación del proyecto y guía de uso
```

---

## 📖 Secciones Incluidas en el Manual

1. **Introducción a OpenAPI**: Qué es OAS, ventajas de la especificación y novedades de OpenAPI 3.1 (JSON Schema Draft 2020-12, webhooks).
2. **Swagger vs. OpenAPI**: Diferencias claras entre el estándar abierto y las herramientas de SmartBear.
3. **Filosofía API-First**: Ventajas del diseño previo al código frente al enfoque Code-First.
4. **Anatomía de un Documento OAS**: Estructura de campos raíz (`openapi`, `info`, `servers`, `paths`, `components`, `security`).
5. **Servers y Variables**: Entornos dinámicos con enums y defaults.
6. **Paths y Métodos HTTP**: Endpoints, verbos (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`) y metadatos (`operationId`, `deprecated`).
7. **Tipos de Parámetros**: `path`, `query`, `header` y `cookie`.
8. **Request Body**: Envíos JSON, URL-encoded, multipart/form-data y esquemas de entrada.
9. **Responses y Códigos HTTP**: Mapeo de respuestas 2XX, 4XX, 5XX y cabeceras asociadas.
10. **Schemas y Tipos de Datos**: Definición de objetos, arreglos y validaciones numéricas/cadenas.
11. **Composición Lógica**: Operadores `oneOf`, `anyOf`, `allOf` y polimorfismo.
12. **Reutilización con `$ref`**: DRY mediante el contenedor `components`.
13. **Esquemas de Seguridad**: Configuración de `securitySchemes` para API Key, Bearer JWT y OAuth 2.0.
14. **OAuth 2.0 y JWT**: Flujos completos y asignación de scopes.
15. **Ecosistema de Herramientas**: Renderizadores (Swagger UI, Redoc), Linters (Spectral) y Generadores de código.
16. **Asistente de Diseño (Wizard)**: Generación dinámica de especificaciones YAML.
17. **Playground Interactivo**: Vista previa en vivo.
18. **Cheat Sheet**: Referencia rápida copiables.

---

## 💻 Instrucciones de Uso

No requiere instalación de dependencias ni servidores backend. Simplemente abre `index.html` en cualquier navegador web moderno:

```bash
# Opción 1: Abrir directamente en Windows
start index.html

# Opción 2: Usar un servidor HTTP simple si lo deseas
npx serve .
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Etiquetas semánticas (`<aside>`, `<main>`, `<section>`, `<nav>`, `<header>`).
- **CSS3**: Variables CSS (Custom Properties), CSS Grid, Flexbox, Keyframe animations.
- **JavaScript ES6+**: DOM Manipulation, Event Delegation, Clipboard API, LocalStorage API, State Management.
- **FontAwesome 6**: Iconografía vectorial para componentes y badges.
- **Google Fonts**: Tipografías *Inter* (Interfaz) y *Fira Code* (Bloques de código).
