# Plan: Manual y Guía Interactiva de OpenAPI 3.1 & Swagger (HTML5/CSS3/JS)

## Resumen
Aplicación web SPA responsiva e interactiva construida en HTML5 semántico, CSS3 (variables HSL, modo claro/oscuro) y JS Vanilla. Sirve como manual de referencia y guía práctica para OpenAPI 3.1 y el ecosistema Swagger.

## Objetivos
- [x] Documentar detalladamente la especificación OpenAPI 3.1, diferencia con Swagger, filosofía API-First, anatomía OAS, esquemas de seguridad y OAuth 2.0.
- [x] Incluir un **Decision Wizard** interactivo que diagnostica la arquitectura API y genera un YAML OpenAPI 3.1 listo para descargar.
- [x] Incorporar un **Playground en tiempo real** para ajustar parámetros (método, ruta, respuestas, servidores) y visualizar la especificación YAML resultante.
- [x] Brillar en UX/UI con buscador en tiempo real, modo oscuro y seguimiento de lectura con `localStorage`.

---

## 🏗️ Arquitectura

```text
manual-openapi-html5/
├── index.html         # Documento HTML5 con 18 secciones, playground y wizard
├── css/
│   └── style.css      # Sistema de diseño HSL, layout flex/grid, componentes y animación
├── js/
│   └── main.js        # Router SPA, Wizard generador YAML, Playground live y LocalStorage
├── README.md          # Documentación general
└── plan.md            # Plan de desarrollo
```

---

## 🧠 Paradigma de Programación

- **Híbrido: Declarativo + Event-Driven**
- Basado en componentes declarativos (UI) y manejo de eventos para la interacción, validación de esquemas y generación dinámica de especificaciones YAML.

---

## 🌐 Propósito de Visibilidad y Destino Remoto

- **Visibilidad**: `Público (Open Source / Portafolio)`.
- **Plataforma Remota Asignada**: `GitHub`.
- **Plataforma de Despliegue CI/CD**: `GitHub Pages` / `Cloudflare Pages`.
- **Justificación**: Manual y guía interactiva de OpenAPI 3.1 & Swagger con Wizard generador de YAML y Playground en vivo; recurso formativo ideal para GitHub Pages.

---

> ⚠️ **Auditoría de UI / DESIGN.md:** La interfaz actual no cumple con las directrices visuales de [DESIGN.md](../DESIGN.md) (requiere paleta HSL, Google Fonts modernas y profundidad/glassmorphism). Pendiente refactor visual.
## Estado Actual
- Estado: ✅ **Completado**
- 18 secciones técnicas completas cubriendo OpenAPI 3.1, JSON Schema 2020-12, autenticación OAuth2/Bearer, herramientas Swagger UI y Redoc.
- Asistente de Decisión funcional con descarga de especificación YAML.
- Playground de prueba en vivo con generación instantánea.

## Tareas realizadas
- [x] Marcado HTML5 semántico con 18 secciones técnicas completas.
- [x] Asistente de Decisión (Decision Wizard) que construye especificaciones YAML OpenAPI 3.1.
- [x] Playground interactivo de pruebas con generación de YAML en vivo.
- [x] Buscador en tiempo real integrado en la navegación lateral.
- [x] Sistema de copiado al portapapeles con notificación Toast.
- [x] Indicador de progreso de lectura guardado en `localStorage`.
- [x] Tema claro y oscuro dinámico.

---

## Cómo Ejecutar

Abre directamente `index.html` en el navegador web.
