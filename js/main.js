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

function sendClarityConsent(choice) {
  const analyticsStorage = choice === 'accepted' ? 'granted' : 'denied';

  window.clarity('consentv2', {
    ad_Storage: 'denied',
    analytics_Storage: analyticsStorage
  });
}

function showCookieBanner() {
  if (cookieBanner) cookieBanner.hidden = false;
}

function hideCookieBanner() {
  if (cookieBanner) cookieBanner.hidden = true;
}

function openPrivacyPanel() {
  if (privacyPanel) privacyPanel.hidden = false;
}

function closePrivacyPanel() {
  if (privacyPanel) privacyPanel.hidden = true;
}

function saveConsent(choice) {
  localStorage.setItem(CONSENT_KEY, choice);
  sendClarityConsent(choice);
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
  button.addEventListener('click', () => saveConsent(button.dataset.consent));
});

if (privacyPanel) {
  privacyPanel.addEventListener('click', (event) => {
    if (event.target === privacyPanel) closePrivacyPanel();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePrivacyPanel();
});

const savedConsent = localStorage.getItem(CONSENT_KEY);
sendClarityConsent(savedConsent === 'accepted' ? 'accepted' : 'rejected');

if (savedConsent !== 'accepted' && savedConsent !== 'rejected') {
  showCookieBanner();
}
