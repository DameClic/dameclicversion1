# Reglas de Proyecto: Dameclic Web Design (Agencia + Automatización)

Este archivo establece las instrucciones obligatorias para el desarrollo, rediseño, cumplimiento SEO/Legal y previsualización visual de sitios web corporativos y comerciales en este workspace.

---

## 1. Identidad Estética y Dirección Visual
* **Estilo Obligatorio:** Look & feel sobrio, arquitectónico y editorial inspirado en **Apple.com**, estudios de diseño de alta gama y firmas corporativas de prestigio.
* **Modo Claro Editorial por Defecto y Superficies Sólidas:** Todo diseño y todo artefacto de previsualización debe abrir **en Modo Claro por defecto** (`#F5F5F7` Alabastro para el lienzo general y `#FFFFFF` Blanco Puro para tarjetas con bordes finos `#E4E4E7`). El `<header>` fijo y cualquier elemento flotante (como el Cookie Banner) deben tener **fondo sólido opaco (nunca transparente ni semitransparente)**, para evitar que el contenido debajo dificulte la lectura al hacer scroll.
* **Prohibido el Cliché "SaaS":**
  * NO abrir en modo oscuro saturado de brillos neón.
  * NO usar insignias tipo `✨ New feature` o gradientes morado/magenta/cyan.
  * NO saturar las pantallas con iconos en círculos de colores ni grillas simétricas repetitivas.
  * La elegancia se logra mediante **espacio en blanco radical** (`py-24` a `py-36` en desktop), tipografía con fuerte contraste jerárquico y un solo color de acento institucional.

---

## 2. Flujo de Rediseño y Previsualización en Artefactos
* **Extracción Real del Sitio Live:** Cuando se rediseñe un sitio existente a partir de una URL, siempre extraer su estructura real, textos, paleta de marca y descargar sus fotografías y logotipos reales en `assets/images/`.
* **Artefactos con Imágenes Reales:** Al presentar un prediseño en un artefacto HTML interactivo, integrar las imágenes reales del sitio live (embebidas como Data URI optimizadas para superar el CSP del visor) y forzar el Modo Claro por defecto para que la evaluación visual sea fidedigna desde el primer momento.

---

## 3. SEO Técnico, Privacidad Internacional y Production Readiness
Todo sitio generado debe incluir de forma obligatoria:
* **Meta Tags por Página:** `<title>`, `<meta name="description">`, `canonical`, etiquetas **Open Graph** (`og:title`, `og:description`, `og:image`, `og:url`) para WhatsApp/LinkedIn y **Twitter Cards**.
* **Datos Estructurados (Schema.org):** Bloque `<script type="application/ld+json">` en cada página (`Organization`, `ProfessionalService`, `WebSite`, `WebPage`).
* **Archivos de Raíz:** Generar siempre `robots.txt`, `sitemap.xml`, `site.webmanifest`, `privacidad.html` y `404.html`.
* **Gestión de Cookies (GDPR / CCPA / Ley 8968 CR):** Banner de consentimiento de cookies con diseño editorial discreto y **fondo sólido opaco (nunca transparente)**, opciones claras (*Aceptar todas*, *Solo esenciales*, *Configurar*), persistencia en `localStorage` (`dameclic_cookie_consent`), disparo de `CustomEvent('cookieConsentUpdated')` y enlace en el footer para reabrir preferencias.
* **Accesibilidad & Core Web Vitals:** Skip-link (`Saltar al contenido`), jerarquía única de `<h1>`, `fetchpriority="high"` en imagen Hero y `loading="lazy"` en imágenes bajo el pliegue.

---

## 4. Contratos con el Backend y Automatización
* **Estructura Estática Pura:** Solo se crean archivos `.html`, `.css`, `.js` (puro UI), archivos de raíz SEO (`robots.txt`, `sitemap.xml`, `site.webmanifest`) e imágenes optimizadas en `assets/images/`. Cero backend (PHP, Node, bases de datos o servicios como Formspree/EmailJS).
* **Formularios:**
  * Siempre con `method="POST"` y `action="/api/v1/submit-form"`.
  * Siempre con el atributo identificador `data-form-id="[id-del-formulario]"`.
  * Campo Honeypot anti-spam `<input type="text" name="_gotcha" class="hidden" tabindex="-1" autocomplete="off" />`.
  * Casilla obligatoria de aceptación de Política de Privacidad (`name="privacy_consent"`).
  * Nombres de campos semánticos (`name`, `email`, `phone`, `company`, `message`).
  * Para subida de archivos: `enctype="multipart/form-data"` e input estándar `<input type="file" name="attachment" accept="image/*,.pdf" />`.

---

## 5. Skills Asociados
* `@skill:bespoke-editorial-design`: Consultar para lineamientos de Modo Claro por defecto, tipografía, curaduría de fotografías reales, cintillos de clientes en escala de grises, Bento Grids asimétricos y espaciado.
* `@skill:static-frontend-contract`: Consultar para el flujo de rediseño con imágenes del sitio live, compatibilidad de artefactos, estructura de archivos y plantillas de formularios compatibles con el orquestador.
* `@skill:seo-compliance-and-readiness`: Consultar para Meta Tags por página, Open Graph, Schema.org JSON-LD, `robots.txt`, `sitemap.xml`, Cookie Consent Manager, páginas legales (`privacidad.html`, `404.html`), accesibilidad WCAG AA y Core Web Vitals.
