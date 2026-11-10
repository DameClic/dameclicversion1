/* ==========================================================================
   Dame Clic — Pure UI & International Cookie Compliance Scripts
   Compatible con @skill:static-frontend-contract & @skill:seo-compliance-and-readiness
   ========================================================================== */

const COOKIE_STORAGE_KEY = 'dameclic_cookie_consent';

document.addEventListener('DOMContentLoaded', () => {
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');
  const navLogo = document.getElementById('nav-logo');

  // Garantizar Modo Claro Editorial por defecto al iniciar
  htmlEl.classList.remove('dark');
  htmlEl.classList.add('light');

  if (themeBtn && themeLabel) {
    themeBtn.addEventListener('click', () => {
      if (htmlEl.classList.contains('light')) {
        htmlEl.classList.remove('light');
        htmlEl.classList.add('dark');
        themeLabel.textContent = 'Oscuro Editorial (#0B0B0E)';
        if (navLogo && navLogo.dataset.logoDarkMode) {
          navLogo.src = navLogo.dataset.logoDarkMode;
        }
      } else {
        htmlEl.classList.remove('dark');
        htmlEl.classList.add('light');
        themeLabel.textContent = 'Claro Editorial (#F5F5F7)';
        if (navLogo && navLogo.dataset.logoLightMode) {
          navLogo.src = navLogo.dataset.logoLightMode;
        }
      }
    });
  }

  // Toggle de menú móvil
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu.classList.toggle('hidden');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Inicializar Gestor de Consentimiento de Cookies (GDPR / CCPA / Ley 8968 CR)
  initCookieConsent();
});

// Prellenado del mensaje cuando el usuario selecciona una solución del Bento Grid
window.selectService = function (serviceName) {
  const msgField = document.getElementById('message');
  if (msgField) {
    msgField.value = `Hola equipo de Dame Clic, me gustaría recibir asesoría y una cotización sobre la solución: "${serviceName}".`;
    msgField.focus();
  }
};

// ==========================================================================
// Gestor de Consentimiento de Cookies Editorial (Superficie Sólida Opaca)
// ==========================================================================
function initCookieConsent() {
  let banner = document.getElementById('cookie-banner');
  if (!banner) {
    banner = createCookieBannerElement();
    document.body.appendChild(banner);
  }

  const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
  if (!saved) {
    banner.classList.remove('hidden');
  } else {
    try {
      const parsed = JSON.parse(saved);
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: parsed }));
    } catch (e) {
      banner.classList.remove('hidden');
    }
  }
}

function saveCookieConsent(preferences) {
  const payload = {
    essential: true,
    analytics: Boolean(preferences.analytics),
    marketing: Boolean(preferences.marketing),
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: payload }));

  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.classList.add('hidden');
  }
}

window.openCookiePreferences = function () {
  let banner = document.getElementById('cookie-banner');
  if (!banner) {
    banner = createCookieBannerElement();
    document.body.appendChild(banner);
  }
  const detailsPanel = document.getElementById('cookie-details-panel');
  if (detailsPanel) {
    detailsPanel.classList.remove('hidden');
  }
  banner.classList.remove('hidden');
};

function createCookieBannerElement() {
  const wrapper = document.createElement('aside');
  wrapper.id = 'cookie-banner';
  wrapper.setAttribute('role', 'dialog');
  wrapper.setAttribute('aria-label', 'Preferencias de privacidad y cookies');
  // Fondo sólido opaco obligatorio (#FFFFFF) y borde #E4E4E7
  wrapper.className = 'hidden fixed bottom-5 left-5 right-5 z-50 max-w-4xl mx-auto rounded-2xl border border-[#E4E4E7] bg-white shadow-2xl p-6 text-xs text-[#52525B] transition-all';

  wrapper.innerHTML = `
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div class="space-y-1.5 max-w-xl">
        <p class="font-semibold text-[#111113] text-sm tracking-tight">
          Respetamos su privacidad y la transparencia de sus datos
        </p>
        <p class="leading-relaxed text-[#52525B]">
          En <strong>Dame Clic</strong> utilizamos cookies esenciales para la operación segura del sitio y, bajo su autorización, cookies de analítica y pauta digital en cumplimiento con la Ley N.º 8968 de Costa Rica y estándares GDPR/CCPA. Consulte nuestra <a href="./privacidad.html" class="underline font-medium text-[#111113] hover:text-[#0D003E]">Política de Privacidad</a>.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2.5 shrink-0">
        <button type="button" id="cookie-btn-config" class="px-4 py-2.5 rounded-full border border-[#E4E4E7] bg-white text-[#111113] font-medium hover:border-[#0D003E] transition-colors cursor-pointer">
          Configurar
        </button>
        <button type="button" id="cookie-btn-essential" class="px-4 py-2.5 rounded-full border border-[#E4E4E7] bg-[#F5F5F7] text-[#111113] font-medium hover:border-[#0D003E] transition-colors cursor-pointer">
          Solo esenciales
        </button>
        <button type="button" id="cookie-btn-accept-all" class="px-5 py-2.5 rounded-full bg-[#0D003E] text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer">
          Aceptar todas
        </button>
      </div>
    </div>

    <!-- Panel Granular de Preferencias -->
    <div id="cookie-details-panel" class="hidden mt-5 pt-5 border-t border-[#E4E4E7] space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="p-3.5 rounded-xl border border-[#E4E4E7] bg-[#F5F5F7]">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-[#111113]">Esenciales</span>
            <span class="text-[#0066CC] font-semibold uppercase">Siempre activas</span>
          </div>
          <p class="mt-1 text-[#71717A]">Necesarias para seguridad, navegación y envío protegido de formularios.</p>
        </div>

        <label class="p-3.5 rounded-xl border border-[#E4E4E7] bg-[#F5F5F7] cursor-pointer flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-[#111113]">Analítica Web</span>
            <input type="checkbox" id="chk-cookie-analytics" checked class="h-4 w-4 rounded accent-[#0D003E]" />
          </div>
          <p class="mt-1 text-[#71717A]">Permiten medir conversiones y experiencia de usuario de forma agregada.</p>
        </label>

        <label class="p-3.5 rounded-xl border border-[#E4E4E7] bg-[#F5F5F7] cursor-pointer flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-[#111113]">Marketing &amp; Ads</span>
            <input type="checkbox" id="chk-cookie-marketing" class="h-4 w-4 rounded accent-[#0D003E]" />
          </div>
          <p class="mt-1 text-[#71717A]">Utilizadas para atribución de campañas en Google Ads, Meta y LinkedIn.</p>
        </label>
      </div>

      <div class="flex justify-end">
        <button type="button" id="cookie-btn-save-custom" class="px-5 py-2 rounded-full bg-[#111113] text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer">
          Guardar mi selección
        </button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const btnConfig = wrapper.querySelector('#cookie-btn-config');
    const btnEssential = wrapper.querySelector('#cookie-btn-essential');
    const btnAcceptAll = wrapper.querySelector('#cookie-btn-accept-all');
    const btnSaveCustom = wrapper.querySelector('#cookie-btn-save-custom');
    const detailsPanel = wrapper.querySelector('#cookie-details-panel');

    if (btnConfig && detailsPanel) {
      btnConfig.addEventListener('click', () => {
        detailsPanel.classList.toggle('hidden');
      });
    }
    if (btnEssential) {
      btnEssential.addEventListener('click', () => {
        saveCookieConsent({ analytics: false, marketing: false });
      });
    }
    if (btnAcceptAll) {
      btnAcceptAll.addEventListener('click', () => {
        saveCookieConsent({ analytics: true, marketing: true });
      });
    }
    if (btnSaveCustom) {
      btnSaveCustom.addEventListener('click', () => {
        const analytics = wrapper.querySelector('#chk-cookie-analytics')?.checked || false;
        const marketing = wrapper.querySelector('#chk-cookie-marketing')?.checked || false;
        saveCookieConsent({ analytics, marketing });
      });
    }
  }, 0);

  return wrapper;
}
