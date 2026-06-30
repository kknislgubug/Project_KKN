const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const statusMessage = document.querySelector('#status-message');
const toolButtons = document.querySelectorAll('[data-action]');

const defaults = {
  fontScale: 1,
  highContrast: false,
  relaxedSpacing: false,
};

const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Keep the controls usable even when storage is blocked.
    }
  },
};

const settings = {
  fontScale: Number(storage.get('fontScale')) || defaults.fontScale,
  highContrast: storage.get('highContrast') === 'true',
  relaxedSpacing: storage.get('relaxedSpacing') === 'true',
};

function clampFontScale(value) {
  return Math.min(Math.max(value, 0.9), 1.6);
}

function updateButtonState(selector, isPressed, label) {
  const button = document.querySelector(selector);
  if (!button) return;

  button.setAttribute('aria-pressed', String(isPressed));
  if (label) {
    button.textContent = label;
  }
}

function applySettings() {
  settings.fontScale = clampFontScale(settings.fontScale);
  document.documentElement.style.setProperty('--font-scale', settings.fontScale.toFixed(2));
  document.body.classList.toggle('high-contrast', settings.highContrast);
  document.body.classList.toggle('relaxed-spacing', settings.relaxedSpacing);

  updateButtonState(
    '[data-action="toggle-contrast"]',
    settings.highContrast,
    settings.highContrast ? 'Kontras Standar' : 'Kontras Tinggi',
  );
  updateButtonState(
    '[data-action="toggle-spacing"]',
    settings.relaxedSpacing,
    settings.relaxedSpacing ? 'Spasi Normal' : 'Spasi Lega',
  );
}

function saveSettings() {
  storage.set('fontScale', String(settings.fontScale));
  storage.set('highContrast', String(settings.highContrast));
  storage.set('relaxedSpacing', String(settings.relaxedSpacing));
}

function announce(message) {
  if (!statusMessage) return;
  statusMessage.textContent = message;
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
}

toolButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;

    if (action === 'increase-font') {
      settings.fontScale = clampFontScale(settings.fontScale + 0.1);
      announce(`Ukuran teks ${Math.round(settings.fontScale * 100)} persen.`);
    }

    if (action === 'decrease-font') {
      settings.fontScale = clampFontScale(settings.fontScale - 0.1);
      announce(`Ukuran teks ${Math.round(settings.fontScale * 100)} persen.`);
    }

    if (action === 'toggle-contrast') {
      settings.highContrast = !settings.highContrast;
      announce(settings.highContrast ? 'Mode kontras tinggi aktif.' : 'Mode kontras standar aktif.');
    }

    if (action === 'toggle-spacing') {
      settings.relaxedSpacing = !settings.relaxedSpacing;
      announce(settings.relaxedSpacing ? 'Spasi lega aktif.' : 'Spasi normal aktif.');
    }

    if (action === 'reset') {
      Object.assign(settings, defaults);
      announce('Tampilan kembali ke pengaturan awal.');
    }

    applySettings();
    saveSettings();
  });
});

applySettings();
