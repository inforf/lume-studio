// Elementos principais da interface
const menu = document.querySelector('.menu');
const nav = document.querySelector('.header nav');

if (menu && nav) {
  menu.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
  });
}

// Preferências de privacidade
const CONSENT_KEY = 'lume-clarity-consent';
const cookieBanner = document.querySelector('.cookie-banner');
const privacyPanel = document.querySelector('.privacy-panel');
const openPrivacyButtons = document.querySelectorAll('[data-open-privacy]');
const closePrivacyButtons = document.querySelectorAll('[data-close-privacy]');
const consentButtons = document.querySelectorAll('[data-consent]');

let clarityLoaded = false;

function loadClarity() {
  if (clarityLoaded) {
    return;
  }

  clarityLoaded = true;

  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () {
      (c[a].q = c[a].q || []).push(arguments);
    };

    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;

    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', 'ykk63v4ciq');

  window.clarity('consentv2', {
    ad_Storage: 'denied',
    analytics_Storage: 'granted'
  });
}

function showCookieBanner() {
  if (cookieBanner) {
    cookieBanner.hidden = false;
  }
}

function hideCookieBanner() {
  if (cookieBanner) {
    cookieBanner.hidden = true;
  }
}

function openPrivacyPanel() {
  if (privacyPanel) {
    privacyPanel.hidden = false;
  }
}

function closePrivacyPanel() {
  if (privacyPanel) {
    privacyPanel.hidden = true;
  }
}

function saveConsent(choice) {
  localStorage.setItem(CONSENT_KEY, choice);

  if (choice === 'accepted') {
    loadClarity();
  } else if (typeof window.clarity === 'function') {
    window.clarity('consentv2', {
      ad_Storage: 'denied',
      analytics_Storage: 'denied'
    });
  }

  hideCookieBanner();
  closePrivacyPanel();
}

openPrivacyButtons.forEach((button) => {
  button.addEventListener('click', openPrivacyPanel);
});

closePrivacyButtons.forEach((button) => {
  button.addEventListener('click', closePrivacyPanel);
});

consentButtons.forEach((button) => {
  button.addEventListener('click', () => {
    saveConsent(button.dataset.consent);
  });
});

if (privacyPanel) {
  privacyPanel.addEventListener('click', (event) => {
    if (event.target === privacyPanel) {
      closePrivacyPanel();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePrivacyPanel();
  }
});

const savedConsent = localStorage.getItem(CONSENT_KEY);

if (savedConsent === 'accepted') {
  loadClarity();
} else if (savedConsent !== 'rejected') {
  showCookieBanner();
}
