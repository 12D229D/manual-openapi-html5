/* ==========================================================================
   Manual y Guía Interactiva de OpenAPI 3.1 & Swagger
   Lógica JavaScript: Navegación SPA, Búsqueda, Copiado, Asistente e Interactividad
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // === 1. Inicialización de Estado y Elementos DOM ===
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const searchInput = document.getElementById('sidebar-search-input');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.guide-section');
  const progressBar = document.getElementById('progress-bar');
  const progressPercentText = document.getElementById('progress-percentage');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');

  // Progreso de lectura guardado en localStorage
  let readSections = JSON.parse(localStorage.getItem('openapi_guide_read_sections')) || [];

  // === 2. Gestión de Tema Claro / Oscuro ===
  const savedTheme = localStorage.getItem('openapi_guide_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('openapi_guide_theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // === 3. Navegación SPA e Intercepción de Hash ===
  function navigateToSection(targetHash) {
    const hash = targetHash || '#introduccion';
    const targetSection = document.querySelector(hash);

    if (!targetSection) return;

    // Desactivar secciones y activar la seleccionada
    sections.forEach(sec => sec.classList.remove('active'));
    targetSection.classList.add('active');

    // Actualizar sidebar links
    navLinks.forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Desplazar al inicio del contenido
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Marcar como leída
    const sectionId = hash.replace('#', '');
    if (!readSections.includes(sectionId)) {
      readSections.push(sectionId);
      localStorage.setItem('openapi_guide_read_sections', JSON.stringify(readSections));
    }

    updateProgress();

    // En móviles, cerrar el sidebar tras seleccionar
    if (window.innerWidth <= 768 && sidebar) {
      sidebar.classList.remove('open');
    }
  }

  // Escuchar clics en links de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = link.getAttribute('href');
      history.pushState(null, '', hash);
      navigateToSection(hash);
    });
  });

  // Manejar cambio de Hash en la URL
  window.addEventListener('hashchange', () => {
    navigateToSection(window.location.hash);
  });

  // Carga inicial
  navigateToSection(window.location.hash);

  // Toggle menú móvil
  if (mobileMenuToggle && sidebar) {
    mobileMenuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // === 4. Barra e Indicador de Progreso ===
  function updateProgress() {
    const totalSections = sections.length;
    const countRead = readSections.length;
    const percentage = Math.round((countRead / totalSections) * 100);

    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressPercentText) progressPercentText.textContent = `${percentage}%`;
  }

  // === 5. Búsqueda en el Sidebar en Tiempo Real ===
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const categories = document.querySelectorAll('.nav-category');

      categories.forEach(category => {
        const links = category.querySelectorAll('.nav-link');
        let visibleCount = 0;

        links.forEach(link => {
          const text = link.textContent.toLowerCase();
          if (text.includes(query)) {
            link.style.display = 'flex';
            visibleCount++;
          } else {
            link.style.display = 'none';
          }
        });

        // Ocultar cabecera de categoría si no hay elementos visibles
        const header = category.querySelector('.category-header');
        if (header) {
          header.style.display = visibleCount > 0 ? 'block' : 'none';
        }
      });
    });
  }

  // === 6. Copiado de Código al Portapapeles ===
  document.addEventListener('click', (e) => {
    if (e.target.closest('.copy-btn')) {
      const btn = e.target.closest('.copy-btn');
      const container = btn.closest('.code-block-container');
      const codeElement = container ? container.querySelector('code, .code-content') : null;

      if (codeElement) {
        const textToCopy = codeElement.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('¡Código copiado al portapapeles!');
          const originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Copiado';
          setTimeout(() => {
            btn.innerHTML = originalText;
          }, 2000);
        }).catch(() => {
          showToast('Error al copiar el código', true);
        });
      }
    }
  });

  // Sistema de Notificaciones Toast
  function showToast(message, isError = false) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (isError) toast.style.borderColor = '#ef4444';
    toast.innerHTML = `<i class="${isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'}" style="color:${isError ? '#ef4444' : '#10b981'}"></i> ${message}`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // === 7. Asistente Interactivo de Diseño API (Decision Wizard) ===
  const wizardState = {
    step: 1,
    apiType: null,
    authType: null,
    format: 'yaml',
    docTool: 'swagger-ui'
  };

  const wizardNextBtns = document.querySelectorAll('.wizard-next');
  const wizardPrevBtns = document.querySelectorAll('.wizard-prev');
  const wizardOptions = document.querySelectorAll('.option-card');

  wizardOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const step = opt.closest('.wizard-step-content').dataset.step;
      const group = opt.dataset.group;
      const val = opt.dataset.value;

      // Desmarcar hermanos
      opt.closest('.wizard-options-grid').querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      opt.classList.add('selected');

      wizardState[group] = val;

      // Habilitar botón Siguiente de ese paso
      const nextBtn = document.querySelector(`.wizard-next[data-step="${step}"]`);
      if (nextBtn) nextBtn.disabled = false;
    });
  });

  wizardNextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentStep = parseInt(btn.dataset.step);
      if (currentStep < 4) {
        goToWizardStep(currentStep + 1);
      } else {
        // Generar Resultado
        generateWizardResult();
      }
    });
  });

  wizardPrevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentStep = parseInt(btn.dataset.step);
      goToWizardStep(currentStep - 1);
    });
  });

  function goToWizardStep(stepNum) {
    wizardState.step = stepNum;
    document.querySelectorAll('.wizard-step-content').forEach(s => s.style.display = 'none');
    
    const targetStep = document.querySelector(`.wizard-step-content[data-step="${stepNum}"]`);
    if (targetStep) targetStep.style.display = 'block';

    // Actualizar nodos de progreso del Wizard
    document.querySelectorAll('.wizard-step-node').forEach((node, idx) => {
      const n = idx + 1;
      node.classList.remove('active', 'completed');
      if (n === stepNum) node.classList.add('active');
      else if (n < stepNum) node.classList.add('completed');
    });
  }

  function generateWizardResult() {
    document.querySelectorAll('.wizard-step-content').forEach(s => s.style.display = 'none');
    const resultBox = document.getElementById('wizard-result-step');
    if (resultBox) resultBox.style.display = 'block';

    // Construcción de la especificación YAML personalizada
    let securitySchemeYAML = '';
    let securityRequirement = '';

    if (wizardState.authType === 'jwt') {
      securitySchemeYAML = `    BearerAuth:\n      type: http\n      scheme: bearer\n      bearerFormat: JWT`;
      securityRequirement = `security:\n  - BearerAuth: []\n`;
    } else if (wizardState.authType === 'oauth2') {
      securitySchemeYAML = `    OAuth2Auth:\n      type: oauth2\n      flows:\n        authorizationCode:\n          authorizationUrl: https://api.ejemplo.com/oauth/authorize\n          tokenUrl: https://api.ejemplo.com/oauth/token\n          scopes:\n            read: Acceso de lectura\n            write: Acceso de escritura`;
      securityRequirement = `security:\n  - OAuth2Auth:\n      - read\n      - write\n`;
    } else if (wizardState.authType === 'apikey') {
      securitySchemeYAML = `    ApiKeyAuth:\n      type: apiKey\n      in: header\n      name: X-API-Key`;
      securityRequirement = `security:\n  - ApiKeyAuth: []\n`;
    }

    const yamlSpec = `openapi: 3.1.0
info:
  title: ${wizardState.apiType === 'saas' ? 'SaaS Public API' : wizardState.apiType === 'microservices' ? 'Microservice Core API' : 'Mi Nueva REST API'}
  description: Especificación autogenerada lista para producción.
  version: 1.0.0
servers:
  - url: https://api.ejemplo.com/v1
    description: Entorno de Producción
${securityRequirement}paths:
  /recursos:
    get:
      summary: Obtener lista de recursos
      operationId: getRecursos
      responses:
        '200':
          description: Operación exitosa
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Recurso'

components:
  schemas:
    Recurso:
      type: object
      required:
        - id
        - nombre
      properties:
        id:
          type: string
          format: uuid
          example: "123e4567-e89b-12d3-a456-426614174000"
        nombre:
          type: string
          example: "Ejemplo de Recurso"
${securitySchemeYAML ? '  securitySchemes:\n' + securitySchemeYAML : ''}`;

    const wizardCode = document.getElementById('wizard-generated-code');
    if (wizardCode) wizardCode.textContent = yamlSpec;

    // Diagnóstico
    const diagText = document.getElementById('wizard-diagnosis-text');
    if (diagText) {
      diagText.innerHTML = `
        <p><strong>Estrategia Recomendada:</strong> Basado en tus elecciones, una arquitectura <em>${wizardState.apiType || 'REST'}</em> con autenticación <em>${wizardState.authType || 'estándar'}</em> es ideal. Te sugerimos usar <strong>${wizardState.docTool === 'redoc' ? 'Redoc' : 'Swagger UI'}</strong> para renderizar la documentación interactiva.</p>
      `;
    }
  }

  const resetWizardBtn = document.getElementById('reset-wizard-btn');
  if (resetWizardBtn) {
    resetWizardBtn.addEventListener('click', () => {
      wizardState.step = 1;
      wizardState.apiType = null;
      wizardState.authType = null;
      document.querySelectorAll('.wizard-options-grid .option-card').forEach(c => c.classList.remove('selected'));
      document.querySelectorAll('.wizard-next').forEach(btn => btn.disabled = true);
      document.getElementById('wizard-result-step').style.display = 'none';
      goToWizardStep(1);
    });
  }

  // === 8. Interactive Playground / Generador de Especificación ===
  const pgTitle = document.getElementById('pg-title');
  const pgVersion = document.getElementById('pg-version');
  const pgServer = document.getElementById('pg-server');
  const pgPath = document.getElementById('pg-path');
  const pgMethod = document.getElementById('pg-method');
  const pgStatus = document.getElementById('pg-status');
  const pgOutput = document.getElementById('pg-output');

  function updatePlaygroundPreview() {
    if (!pgOutput) return;

    const title = pgTitle?.value || 'Mi API OpenAPI';
    const version = pgVersion?.value || '1.0.0';
    const server = pgServer?.value || 'https://api.ejemplo.com/v1';
    const path = pgPath?.value || '/usuarios';
    const method = (pgMethod?.value || 'get').toLowerCase();
    const status = pgStatus?.value || '200';

    const yamlResult = `openapi: 3.1.0
info:
  title: "${title}"
  version: "${version}"
  description: "Especificación generada interactivamente desde la guía OpenAPI."
servers:
  - url: "${server}"
    description: Server Principal
paths:
  ${path}:
    ${method}:
      summary: "Operación ${method.toUpperCase()} para ${path}"
      responses:
        '${status}':
          description: "Respuesta exitosa de la API"
          content:
            application/json:
              schema:
                type: object
                properties:
                  mensaje:
                    type: string
                    example: "Operación completada con éxito"
                  timestamp:
                    type: string
                    format: date-time`;

    pgOutput.textContent = yamlResult;
  }

  // Event Listeners para el playground
  [pgTitle, pgVersion, pgServer, pgPath, pgMethod, pgStatus].forEach(input => {
    if (input) {
      input.addEventListener('input', updatePlaygroundPreview);
      input.addEventListener('change', updatePlaygroundPreview);
    }
  });

  // Generar preview inicial
  updatePlaygroundPreview();
});
