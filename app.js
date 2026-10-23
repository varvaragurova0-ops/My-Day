/* ============================================================
My Day — Планер: вся логика приложения
============================================================ */

// ---------- НАСТРОЙКИ И ЯЗЫК ----------
let currentLanguage = localStorage.getItem('myday_language') || 'ru';
let darkMode = localStorage.getItem('myday_darkMode') === 'true';
let notificationsEnabled = localStorage.getItem('myday_notifications') === 'true';
let autoSaveEnabled = localStorage.getItem('myday_autoSave') === 'true';

const translations = {
  ru: {
    welcome: 'Ваш день в ваших руках!',
    menuPlan: 'Планировать',
    menuProfile: 'Профиль',
    menuTimer: 'Таймер',
    menuSettings: 'Настройки',
    appName: 'Мой ежедневник',
    appDesc: 'Организуйте свой день стильно! Планируйте события, устанавливайте таймеры и следите за всем важным.',
    feature1: 'Планирование свиданий',
    feature2: 'Встроенный таймер',
    feature3: 'Запись событий',
    feature4: 'Личный профиль',
    planTitle: 'Создать план',
    recordEvent: 'Записать событие',
    viewEvents: 'Посмотреть все события',
    allEvents: 'Все события',
    close: 'Назад',
    timerTitle: 'Таймер',
    start: 'Старт',
    stop: 'Стоп',
    reset: 'Сброс',
    settingsTitle: 'Настройки',
    settingLanguage: 'Язык',
    settingDarkMode: 'Тёмная тема',
    settingNotifications: 'Уведомления',
    settingAutoSave: 'Автосохранение',
    profileTitle: 'Профиль',
    uploadPhoto: '✎ Загрузить фото',
    nameLabel: 'Имя',
    saveClose: 'Сохранить и закрыть',
    recordEventTitle: 'Записать событие',
    eventNameLabel: 'Название события',
    eventDateLabel: 'Дата',
    eventTimeLabel: 'Время',
    addEvent: 'Добавить событие',
    noEvents: 'Пока нет событий. Добавь первое!',
    deleteEvent: 'Удалить',
    saved: 'Сохранено!',
    enterName: 'Введи название события!'
  },
  en: {
    welcome: 'Your day is in your hands!',
    menuPlan: 'To plan',
    menuProfile: 'Profile',
    menuTimer: 'Timer',
    menuSettings: 'Settings',
    appName: 'My Day Planner',
    appDesc: 'Organize your day with style! Plan events, set timers, and keep track of everything important.',
    feature1: 'Date planning',
    feature2: 'Built-in timer',
    feature3: 'Event recording',
    feature4: 'Personal profile',
    planTitle: 'Create a plan',
    recordEvent: 'Record the event',
    viewEvents: 'View all events',
    allEvents: 'All Events',
    close: 'Back',
    timerTitle: 'Timer',
    start: 'Start',
    stop: 'Stop',
    reset: 'Reset',
    settingsTitle: 'Settings',
    settingLanguage: 'Language',
    settingDarkMode: 'Dark mode',
    settingNotifications: 'Notifications',
    settingAutoSave: 'Auto-save',
    profileTitle: 'Profile',
    uploadPhoto: '✎ Upload photo',
    nameLabel: 'Name',
    saveClose: 'Save & Close',
    recordEventTitle: 'Record the event',
    eventNameLabel: 'Event name',
    eventDateLabel: 'Date',
    eventTimeLabel: 'Time',
    addEvent: 'Add Event',
    noEvents: 'No events yet. Add your first event!',
    deleteEvent: 'Delete',
    saved: 'Saved!',
    enterName: 'Please enter an event name!'
  }
};

// ---------- ФУНКЦИИ НАСТРОЕК ----------
function applySettings() {
  updateLanguage(currentLanguage);
  if (darkMode) document.body.classList.add('dark-mode');
  
  const darkModeToggle = document.getElementById('darkModeToggle');
  const notificationsToggle = document.getElementById('notificationsToggle');
  const autoSaveToggle = document.getElementById('autoSaveToggle');
  
  if (darkModeToggle) darkModeToggle.checked = darkMode;
  if (notificationsToggle) notificationsToggle.checked = notificationsEnabled;
  if (autoSaveToggle) autoSaveToggle.checked = autoSaveEnabled;
  
  // Обновляем текст кастомного селекта языка
  const langText = currentLanguage === 'ru' ? 'Русский' : 'English';
  const currentLangText = document.getElementById('currentLangText');
  if (currentLangText) currentLangText.textContent = langText;
  
  // Подсвечиваем активную опцию
  document.querySelectorAll('.custom-select-options .option').forEach(opt => {
    opt.classList.remove('active');
    if (opt.textContent === langText) {
      opt.classList.add('active');
    }
  });
}

function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('myday_language', lang);
  updateLanguage(lang);
  
  if (notificationsEnabled && 'Notification' in window) {
    Notification.requestPermission();
  }
}

function updateLanguage(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (el.tagName === 'INPUT' && el.type !== 'button') {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });
}

function toggleDarkMode(enabled) {
  darkMode = enabled;
  localStorage.setItem('myday_darkMode', enabled);
  if (enabled) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

function toggleNotifications(enabled) {
  notificationsEnabled = enabled;
  localStorage.setItem('myday_notifications', enabled);
  if (enabled && 'Notification' in window) {
    Notification.requestPermission().then(permission => {
      console.log('[App] Разрешение на уведомления:', permission);
    });
  }
}

function toggleAutoSave(enabled) {
  autoSaveEnabled = enabled;
  localStorage.setItem('myday_autoSave', enabled);
  console.log('[App] Автосохранение:', enabled ? 'включено' : 'выключено');
}

// ---------- КАСТОМНЫЙ ВЫБОР ЯЗЫКА ----------
function toggleLangDropdown() {
  const select = document.getElementById('languageSelect');
  select.classList.toggle('open');
}

function selectLanguage(lang, text) {
  document.getElementById('currentLangText').textContent = text;
  document.getElementById('languageSelect').classList.remove('open');
  
  document.querySelectorAll('.custom-select-options .option').forEach(opt => {
    opt.classList.remove('active');
  });
  
  event.target.classList.add('active');
  
  changeLanguage(lang);
}

document.addEventListener('click', (e) => {
  const select = document.getElementById('languageSelect');
  if (select && !select.contains(e.target)) {
    select.classList.remove('open');
  }
});

// ---------- 1. РЕГИСТРАЦИЯ SERVICE WORKER ----------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('[App] Service Worker зарегистрирован:', registration.scope);
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[App] Доступна новая версия. Перезагрузите страницу.');
            }
          });
        });
      })
      .catch((error) => {
        console.log('[App] Ошибка регистрации Service Worker:', error);
      });
  });
}

// ---------- 2. PWA: КНОПКА УСТАНОВКИ ----------
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('installBtn');
  if (btn) btn.style.display = 'block';
});
window.addEventListener('appinstalled', () => {
  console.log('[App] Приложение установлено');
  const btn = document.getElementById('installBtn');
  if (btn) btn.style.display = 'none';
  deferredPrompt = null;
});
function installPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    console.log('[App] Выбор пользователя:', choiceResult.outcome);
    deferredPrompt = null;
    const btn = document.getElementById('installBtn');
    if (btn) btn.style.display = 'none';
  });
}

// ---------- 3. ПРОФИЛЬ ----------
let savedPhoto = localStorage.getItem('myday_profile_photo') || '';
function updateAllAvatars() {
  const h1 = document.getElementById('headerAvatar1');
  const modalA = document.getElementById('modalAvatar');
  const imgHTML = savedPhoto ? `<img src="${savedPhoto}" alt="Profile">` : '';
  if (h1) h1.innerHTML = imgHTML || '👤';
  if (modalA) {
    modalA.innerHTML = savedPhoto ? `<img src="${savedPhoto}" alt="Profile">` : '<span class="placeholder-icon">📷</span>';
  }
}
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    alert('Файл слишком большой. Максимум 2 МБ.');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    savedPhoto = e.target.result;
    try {
      localStorage.setItem('myday_profile_photo', savedPhoto);
      updateAllAvatars();
    } catch (err) {
      alert('Не удалось сохранить фото (хранилище переполнено).');
      console.error(err);
    }
  };
  reader.readAsDataURL(file);
}
function saveProfile() {
  const nameInput = document.getElementById('profileName');
  const name = nameInput ? nameInput.value.trim() : '';
  if (name) {
    localStorage.setItem('myday_profile_name', name);
  }
  closeModal('profileModal');
}

// ---------- 4. НАВИГАЦИЯ ПО ЭКРАНАМ ----------
function showScreen(name) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  const target = document.getElementById('screen-' + name);
  if (target) target.classList.add('active');
  const backBtn = document.getElementById('backBtn');
  if (backBtn) backBtn.classList.toggle('visible', name !== 'main');
}

// ---------- 5. МОДАЛЬНЫЕ ОКНА ----------
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}
document.querySelectorAll('.modal-overlay').forEach((overlay) => {
  overlay.addEventListener('click', function (e) {
    if (e.target === this) this.classList.remove('active');
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach((m) => {
      m.classList.remove('active');
    });
  }
});

// ---------- 6. ТАЙМЕР ----------
let timerInterval = null;
let timerSeconds = 0;
function updateTimerDisplay() {
  const m = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
  const s = (timerSeconds % 60).toString().padStart(2, '0');
  const display = document.getElementById('timerDisplay');
  if (display) display.textContent = `${m}:${s}`;
}
function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}
function resetTimer() {
  stopTimer();
  timerSeconds = 0;
  updateTimerDisplay();
}

// ---------- 7. СОБЫТИЯ ----------
let events = [];
try {
  events = JSON.parse(localStorage.getItem('myday_events') || '[]');
  if (!Array.isArray(events)) events = [];
} catch {
  events = [];
}
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
function addEvent() {
  const nameInput = document.getElementById('eventName');
  const dateInput = document.getElementById('eventDate');
  const timeInput = document.getElementById('eventTime');
  const name = nameInput.value.trim();
  const date = dateInput.value;
  const time = timeInput.value;
  if (!name) {
    alert(translations[currentLanguage].enterName);
    return;
  }
  events.push({
    id: Date.now(),
    name,
    date: date || 'No date',
    time: time || 'No time',
  });
  localStorage.setItem('myday_events', JSON.stringify(events));
  nameInput.value = '';
  dateInput.value = '';
  timeInput.value = '';
  closeModal('eventModal');
  renderEvents();
  
  if (notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
    new Notification(translations[currentLanguage].recordEventTitle, {
      body: `${name} - ${date || ''} ${time || ''}`,
      icon: 'icons/icon-192x192.png'
    });
  }
}
function deleteEvent(id) {
  events = events.filter((e) => e.id !== id);
  localStorage.setItem('myday_events', JSON.stringify(events));
  renderEvents();
}
function renderEvents() {
  const list = document.getElementById('eventsList');
  if (!list) return;
  const t = translations[currentLanguage];
  if (events.length === 0) {
    list.innerHTML = `<p style="color:#fff;font-style:italic;text-align:center;">${t.noEvents}</p>`;
    return;
  }
  const html = events.map((e) => `
    <div class="event-item">
      <div>
        <div class="event-name">${escapeHTML(e.name)}</div>
        <div class="event-date">
          ${escapeHTML(e.date)}${e.time && e.time !== 'No time' ? ' at ' + escapeHTML(e.time) : ''}
        </div>
      </div>
      <button class="event-delete" data-id="${e.id}" aria-label="${t.deleteEvent}">✕</button>
    </div>
  `).join('');
  list.innerHTML = html;
  list.querySelectorAll('.event-delete').forEach((btn) => {
    btn.addEventListener('click', () => {
      deleteEvent(Number(btn.dataset.id));
    });
  });
}

// ---------- 8. СОХРАНЕНИЕ ПЛАНА ----------
function savePlan() {
  const t = translations[currentLanguage];
  const infoBox = document.querySelector('.info-box');
  if (infoBox) {
    const originalContent = infoBox.innerHTML;
    infoBox.innerHTML = `<h4>${t.saved}</h4>`;
    setTimeout(() => {
      infoBox.innerHTML = originalContent;
    }, 1500);
  }
}

// ---------- 9. ИНИЦИАЛИЗАЦИЯ ----------
document.addEventListener('DOMContentLoaded', () => {
  applySettings();
  
  const savedName = localStorage.getItem('myday_profile_name');
  const nameInput = document.getElementById('profileName');
  if (savedName && nameInput) nameInput.value = savedName;
  updateAllAvatars();
  
  renderEvents();
  updateTimerDisplay();
  
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.addEventListener('click', installPWA);
  }
  
  const params = new URLSearchParams(location.search);
  const screen = params.get('screen');
  if (screen === 'plan') {
    showScreen('plan');
  } else if (screen === 'timer') {
    openModal('timerModal');
  }
});