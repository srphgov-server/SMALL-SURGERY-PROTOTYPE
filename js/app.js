/* ===================================================================
   SURGIFLOW - CLINICAL MINOR SURGERY & QUEUE SYSTEM
   Application Logic & State Management
   =================================================================== */

// Global State
const state = {
  patients: [],
  queue: [],
  completed: [],
  surgeons: [],
  rooms: [],
  activeFilter: 'all',
  activePriorityFilter: 'all',
  searchQuery: ''
};

// Storage Keys
const STORAGE_KEYS = {
  PATIENTS: 'surgiflow_patients_v1',
  QUEUE: 'surgiflow_queue_v1',
  COMPLETED: 'surgiflow_completed_v1',
  ROOMS: 'surgiflow_rooms_v1',
  SURGEONS: 'surgiflow_surgeons_v1'
};

/* ===================================================================
   INITIALIZATION
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initStorage();
  initClock();
  initNavigation();
  initFilterControls();
  initModals();
  initForms();
  initExport();

  // Initialize Language Switcher (EN / KM)
  if (typeof initLanguageSwitcher === 'function') {
    initLanguageSwitcher();
  }

  // Initial renders
  renderAll();

  // Start live timers (1 sec interval)
  setInterval(updateLiveTimers, 1000);
});

/**
 * Initialize Light / Dark theme management
 */
function initTheme() {
  const savedTheme = localStorage.getItem('surgiflow_theme') || 'light';
  applyTheme(savedTheme, false);

  const btnToggleTheme = document.getElementById('btnToggleTheme');
  if (btnToggleTheme) {
    btnToggleTheme.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark-mode');
      const newTheme = isCurrentlyDark ? 'light' : 'dark';
      applyTheme(newTheme, true);
    });
  }
}

function applyTheme(theme, notify = false) {
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeText) themeText.textContent = (typeof t === 'function') ? t('theme_dark', 'Dark') : 'Dark';
    localStorage.setItem('surgiflow_theme', 'dark');
    if (notify) showToast((typeof currentLang !== 'undefined' && currentLang === 'km') ? 'បានប្តូរទៅជាទម្រង់ងងឹត (Dark Mode)' : 'Switched to Dark Mode', 'info');
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeText) themeText.textContent = (typeof t === 'function') ? t('theme_light', 'Light') : 'Light';
    localStorage.setItem('surgiflow_theme', 'light');
    if (notify) showToast((typeof currentLang !== 'undefined' && currentLang === 'km') ? 'បានប្តូរទៅជាទម្រង់ពន្លឺ (Light Mode)' : 'Switched to Light Mode', 'info');
  }
}

/**
 * Initialize storage with defaults if first run
 */
function initStorage() {
  const savedPatients = localStorage.getItem(STORAGE_KEYS.PATIENTS);
  const savedQueue = localStorage.getItem(STORAGE_KEYS.QUEUE);
  const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED);
  const savedRooms = localStorage.getItem(STORAGE_KEYS.ROOMS);
  const savedSurgeons = localStorage.getItem(STORAGE_KEYS.SURGEONS);

  if (!savedPatients || !savedQueue) {
    loadDemoData(false); // silent load on initial start
  } else {
    state.patients = JSON.parse(savedPatients);
    state.queue = JSON.parse(savedQueue);
    state.completed = savedCompleted ? JSON.parse(savedCompleted) : [];
    state.rooms = savedRooms ? JSON.parse(savedRooms) : window.DEFAULT_ROOMS;
    state.surgeons = savedSurgeons ? JSON.parse(savedSurgeons) : window.DEFAULT_SURGEONS;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(state.patients));
  localStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(state.queue));
  localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(state.completed));
  localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(state.rooms));
  localStorage.setItem(STORAGE_KEYS.SURGEONS, JSON.stringify(state.surgeons));
}

function loadDemoData(notify = true) {
  state.patients = JSON.parse(JSON.stringify(window.DEFAULT_PATIENTS || []));
  state.queue = JSON.parse(JSON.stringify(window.DEFAULT_QUEUE || []));
  state.completed = JSON.parse(JSON.stringify(window.DEFAULT_COMPLETED || []));
  state.rooms = JSON.parse(JSON.stringify(window.DEFAULT_ROOMS || []));
  state.surgeons = JSON.parse(JSON.stringify(window.DEFAULT_SURGEONS || []));
  saveState();
  renderAll();

  if (notify) {
    showToast('Loaded demo patients and surgery queue records!', 'success');
  }
}

/* ===================================================================
   NAVIGATION & TABS
   =================================================================== */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTabId = item.getAttribute('data-tab');

      navItems.forEach(n => n.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      const targetPane = document.getElementById(targetTabId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Demo data button in header
  const btnDemo = document.getElementById('btnLoadDemo');
  if (btnDemo) {
    btnDemo.addEventListener('click', () => {
      if (confirm('Load demo dataset? This will restore sample patients and active surgery cases.')) {
        loadDemoData(true);
      }
    });
  }
}

/* ===================================================================
   LIVE SYSTEM CLOCK & TIMERS
   =================================================================== */
function initClock() {
  const clockEl = document.getElementById('liveClock');
  function tick() {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }
  tick();
  setInterval(tick, 1000);
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return `${hours}h ${remainingMins}m`;
  }
  return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
}

function updateLiveTimers() {
  const runningTimers = document.querySelectorAll('[data-timer-start]');
  const now = Date.now();

  runningTimers.forEach(el => {
    const startTimeStr = el.getAttribute('data-timer-start');
    if (!startTimeStr) return;
    const startTime = new Date(startTimeStr).getTime();
    const elapsedMs = now - startTime;
    el.textContent = formatDuration(elapsedMs);
  });
}

/* ===================================================================
   RENDERERS
   =================================================================== */
function renderAll() {
  updateMetrics();
  renderQueueList();
  renderPatientTable();
  renderCompletedTable();
  renderRoomsAndSurgeons();
  populateDropdowns();
}

/**
 * Top bar metrics & badges
 */
function updateMetrics() {
  const waitingCount = state.queue.filter(q => q.status === 'waiting').length;
  const inProgressCount = state.queue.filter(q => q.status === 'in_progress').length;
  const completedCount = state.completed.length;

  // Header metrics
  const mWaiting = document.getElementById('metricWaitingCount');
  const mActive = document.getElementById('metricActiveCount');
  const mCompleted = document.getElementById('metricCompletedCount');

  if (mWaiting) mWaiting.textContent = waitingCount;
  if (mActive) mActive.textContent = inProgressCount;
  if (mCompleted) mCompleted.textContent = completedCount;

  // Nav badges
  const navQueueBadge = document.getElementById('navQueueBadge');
  const navPatientBadge = document.getElementById('navPatientBadge');
  const navCompletedBadge = document.getElementById('navCompletedBadge');

  if (navQueueBadge) navQueueBadge.textContent = state.queue.length;
  if (navPatientBadge) navPatientBadge.textContent = state.patients.length;
  if (navCompletedBadge) navCompletedBadge.textContent = completedCount;

  // Filter counters
  const cAll = document.getElementById('countFilterAll');
  const cWait = document.getElementById('countFilterWaiting');
  const cProg = document.getElementById('countFilterInProgress');

  if (cAll) cAll.textContent = state.queue.length;
  if (cWait) cWait.textContent = waitingCount;
  if (cProg) cProg.textContent = inProgressCount;
}

/**
 * Render Main Surgery Queue
 */
function renderQueueList() {
  const container = document.getElementById('queueListContainer');
  const emptyState = document.getElementById('queueEmptyState');
  if (!container) return;

  // Filter logic
  let items = [...state.queue];

  // Status Filter
  if (state.activeFilter !== 'all') {
    items = items.filter(q => q.status === state.activeFilter);
  }

  // Priority Filter
  if (state.activePriorityFilter !== 'all') {
    items = items.filter(q => q.priority.toLowerCase() === state.activePriorityFilter.toLowerCase());
  }

  // Search filter
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    items = items.filter(item =>
      item.patientName.toLowerCase().includes(q) ||
      item.mrn.toLowerCase().includes(q) ||
      item.procedure.toLowerCase().includes(q) ||
      item.surgeon.toLowerCase().includes(q) ||
      item.queueNumber.toLowerCase().includes(q)
    );
  }

  // Sort: Urgent first, then In Progress, then queued time
  items.sort((a, b) => {
    if (a.status === 'in_progress' && b.status !== 'in_progress') return -1;
    if (b.status === 'in_progress' && a.status !== 'in_progress') return 1;

    const priorityWeight = { 'Urgent': 4, 'High': 3, 'Standard': 2, 'Elective': 1 };
    const pA = priorityWeight[a.priority] || 0;
    const pB = priorityWeight[b.priority] || 0;
    if (pB !== pA) return pB - pA;

    return new Date(a.queuedAt) - new Date(b.queuedAt);
  });

  if (items.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  container.innerHTML = items.map(item => {
    const isInProgress = item.status === 'in_progress';
    const isUrgent = item.priority === 'Urgent';

    // Status pill
    let statusBadgeHtml = '';
    let timerHtml = '';

    if (isInProgress) {
      statusBadgeHtml = `
        <span class="status-badge in_progress">
          <span class="metric-dot active"></span> ${(typeof t === 'function') ? t('filter_in_progress', 'In Surgery') : 'In Procedure'}
        </span>
      `;
      const elapsedMs = item.startedAt ? (Date.now() - new Date(item.startedAt).getTime()) : 0;
      timerHtml = `
        <span class="timer-text running">
          ${(typeof t === 'function') ? t('elapsed_time', 'Elapsed:') : 'Elapsed:'} <span data-timer-start="${item.startedAt}">${formatDuration(elapsedMs)}</span>
        </span>
      `;
    } else {
      statusBadgeHtml = `
        <span class="status-badge waiting">
          ⏳ ${(typeof t === 'function') ? t('status_queued', 'Queued') : 'Queued / Waiting'}
        </span>
      `;
      const waitTime = item.queuedAt ? Math.round((Date.now() - new Date(item.queuedAt).getTime()) / (60 * 1000)) : 0;
      timerHtml = `<span class="timer-text">${(typeof currentLang !== 'undefined' && currentLang === 'km') ? `រង់ចាំ: ~${waitTime} នាទីមុន` : `Wait: ~${waitTime} min ago`}</span>`;
    }

    // Priority pill
    const pClass = item.priority.toLowerCase();
    const pLocalized = (typeof localizePriority === 'function') ? localizePriority(item.priority) : item.priority;
    const priorityPill = `
      <span class="priority-pill ${pClass}">
        ${isUrgent ? '● STAT' : pLocalized}
      </span>
    `;

    // Action buttons based on status
    let actionButtons = '';
    if (!isInProgress) {
      actionButtons = `
        <button class="btn btn-accent btn-sm" onclick="startSurgeryCase('${item.id}')" title="Call patient to OR and begin case">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>${(typeof t === 'function') ? t('btn_call_to_or', 'Start Surgery') : 'Start Surgery'}</span>
        </button>
        <button class="btn btn-secondary btn-sm" onclick="openCaseDetailsModal('${item.id}')" title="View details">
          <span>${(typeof t === 'function') ? t('btn_details', 'Details') : 'Details'}</span>
        </button>
        <button class="btn btn-danger btn-sm" onclick="cancelSurgeryCase('${item.id}')" title="Remove from queue">
          &times;
        </button>
      `;
    } else {
      actionButtons = `
        <button class="btn btn-success btn-sm" onclick="openCompleteCaseModal('${item.id}')" title="Complete procedure and finalize notes">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${(typeof t === 'function') ? t('btn_complete_case', 'Complete Surgery') : 'Complete Surgery'}</span>
        </button>
        <button class="btn btn-secondary btn-sm" onclick="openCaseDetailsModal('${item.id}')" title="View details">
          <span>${(typeof t === 'function') ? t('btn_details', 'Details') : 'Details'}</span>
        </button>
      `;
    }

    // Patient allergies alert
    const hasAllergies = item.allergies && item.allergies.toUpperCase() !== 'NKDA' && item.allergies.toUpperCase() !== 'NONE';
    const localizedProcedure = (typeof localizeProcedure === 'function') ? localizeProcedure(item.procedure) : item.procedure;
    const genderLabel = item.gender === 'Female' ? ((typeof t === 'function') ? t('opt_female', 'F') : 'F') : item.gender === 'Male' ? ((typeof t === 'function') ? t('opt_male', 'M') : 'M') : item.gender;
    const ageSuffix = (typeof currentLang !== 'undefined' && currentLang === 'km') ? 'ឆ្នាំ' : 'y';

    return `
      <div class="queue-row ${isInProgress ? 'in-progress' : ''} ${isUrgent ? 'urgent' : ''}">
        <!-- Column 1: Queue # & Patient -->
        <div class="col-patient-cell">
          <div class="queue-num-badge">${item.queueNumber}</div>
          <div class="patient-info">
            <div class="patient-name">${escapeHtml(item.patientName)}</div>
            <div class="patient-meta font-mono">
              <span>${item.mrn}</span> • <span>${item.age}${ageSuffix} / ${genderLabel}</span>
              ${hasAllergies ? `<span class="allergy-tag" title="${escapeHtml(item.allergies)}">⚠️ ${escapeHtml(item.allergies.slice(0, 15))}</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Column 2: Procedure & Surgeon -->
        <div class="proc-info">
          <div class="proc-title">${escapeHtml(localizedProcedure)}</div>
          <div class="surgeon-name">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            ${escapeHtml(item.surgeon)}
          </div>
        </div>

        <!-- Column 3: Suite & Anesthesia -->
        <div class="room-info">
          <div class="room-badge">${escapeHtml(item.room)}</div>
          <div class="anesthesia-text">${escapeHtml(item.anesthesia)}</div>
        </div>

        <!-- Column 4: Priority -->
        <div>
          ${priorityPill}
        </div>

        <!-- Column 5: Status & Timing -->
        <div class="status-cell">
          ${statusBadgeHtml}
          ${timerHtml}
        </div>

        <!-- Column 6: Actions -->
        <div class="actions-cell">
          ${actionButtons}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render Patient Directory Table
 */
function renderPatientTable() {
  const tbody = document.getElementById('patientTableBody');
  const emptyState = document.getElementById('patientsEmptyState');
  const searchInput = document.getElementById('patientSearchInput');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  if (!tbody) return;

  let list = [...state.patients];
  if (query) {
    list = list.filter(p =>
      p.fullName.toLowerCase().includes(query) ||
      p.mrn.toLowerCase().includes(query) ||
      p.phone.toLowerCase().includes(query)
    );
  }

  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }
  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = list.map(p => {
    // Check if patient is currently queued or in surgery
    const activeCase = state.queue.find(q => q.patientId === p.id);
    let queueStatusTag = '';

    if (activeCase) {
      if (activeCase.status === 'in_progress') {
        const inOrText = (typeof t === 'function') ? t('status_in_minor_or', 'In Minor OR') : 'In Minor OR';
        queueStatusTag = `<span class="status-badge in_progress" style="cursor:pointer;" onclick="openCaseDetailsModal('${activeCase.id}')" title="Click to view minor surgery details"><span class="metric-dot active"></span> ${inOrText} (${activeCase.queueNumber})</span>`;
      } else {
        const queuedText = (typeof t === 'function') ? t('status_queued', 'Queued') : 'Queued';
        queueStatusTag = `<span class="status-badge waiting" style="cursor:pointer;" onclick="openCaseDetailsModal('${activeCase.id}')" title="Click to view queued case details"><span class="metric-dot active"></span> ${queuedText} (${activeCase.queueNumber})</span>`;
      }
    } else {
      const notQueuedText = (typeof t === 'function') ? t('status_not_queued', 'Not Queued') : 'Not Queued';
      queueStatusTag = `<span class="text-muted text-xs">${notQueuedText}</span>`;
    }

    const hasAllergy = p.allergies && p.allergies.toUpperCase() !== 'NKDA' && p.allergies.toUpperCase() !== 'NONE';
    const genderLabel = p.gender === 'Female' ? ((typeof t === 'function') ? t('opt_female', 'Female') : 'Female') : p.gender === 'Male' ? ((typeof t === 'function') ? t('opt_male', 'Male') : 'Male') : p.gender;
    const ageSuffix = (typeof currentLang !== 'undefined' && currentLang === 'km') ? 'ឆ្នាំ' : 'yrs';
    const bloodLabel = (typeof t === 'function') ? t('blood', 'Blood:') : 'Blood:';

    return `
      <tr>
        <td class="font-mono"><strong>${p.mrn}</strong></td>
        <td>
          <div style="font-weight:700; color:var(--heading-color);">${escapeHtml(p.fullName)}</div>
          <div class="text-xs text-muted font-mono">${escapeHtml(p.phone)}</div>
        </td>
        <td>
          <div>${p.age} ${ageSuffix} • ${genderLabel}</div>
          <div class="text-xs text-muted">${bloodLabel} <strong style="color:#38bdf8;">${p.bloodType || 'Unknown'}</strong></div>
        </td>
        <td>
          <div style="max-width: 280px; font-size: 0.82rem;">
            ${hasAllergy ? `<span class="allergy-tag">⚠️ ${escapeHtml(p.allergies)}</span><br>` : '<span class="text-muted text-xs">NKDA</span><br>'}
            <span class="text-muted">${escapeHtml(p.notes || 'No pre-op notes.')}</span>
          </div>
        </td>
        <td>
          ${queueStatusTag}
        </td>
        <td style="text-align: right;">
          <div class="patient-actions-group">
            <button class="btn btn-secondary btn-sm" onclick="openEditPatientModal('${p.id}')" title="Edit patient details">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              <span>${(typeof t === 'function') ? t('btn_edit', 'Edit') : 'Edit'}</span>
            </button>
            <button class="btn btn-danger btn-sm" onclick="deletePatient('${p.id}')" title="Delete patient from list">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              <span>${(typeof t === 'function') ? t('btn_delete', 'Delete') : 'Delete'}</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Render Completed Surgery Cases Table
 */
function renderCompletedTable() {
  const tbody = document.getElementById('completedTableBody');
  const emptyState = document.getElementById('completedEmptyState');
  const searchInput = document.getElementById('completedSearchInput');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  if (!tbody) return;

  let list = [...state.completed];
  if (query) {
    list = list.filter(c =>
      c.patientName.toLowerCase().includes(query) ||
      c.mrn.toLowerCase().includes(query) ||
      c.procedure.toLowerCase().includes(query) ||
      c.surgeon.toLowerCase().includes(query)
    );
  }

  // Sort recent first
  list.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }
  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = list.map(c => {
    const compTime = c.completedAt ? new Date(c.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
    const compDate = c.completedAt ? new Date(c.completedAt).toLocaleDateString([], { month: 'short', day: 'numeric' }) : '';
    const localizedProc = (typeof localizeProcedure === 'function') ? localizeProcedure(c.procedure) : c.procedure;
    const closureLabel = (typeof t === 'function') ? t('closure', 'Closure:') : 'Closure:';
    const pathologyLabel = (typeof t === 'function') ? t('pathology', 'Pathology:') : 'Pathology:';
    const summaryBtnText = (typeof t === 'function') ? t('btn_summary_sheet', 'Summary Sheet') : 'Summary Sheet';
    const minSuffix = (typeof t === 'function') ? t('mins', 'min') : 'min';

    return `
      <tr>
        <td>
          <div style="font-weight:700; color:#38bdf8;" class="font-mono">${c.queueNumber}</div>
          <div class="text-xs text-muted font-mono">${compDate} ${compTime}</div>
        </td>
        <td>
          <div style="font-weight:700; color:var(--heading-color);">${escapeHtml(c.patientName)}</div>
          <div class="text-xs text-muted font-mono">${c.mrn}</div>
        </td>
        <td>
          <div style="font-weight:600; color:var(--text-main);">${escapeHtml(localizedProc)}</div>
          <div class="text-xs text-muted">${escapeHtml(c.anesthesia || 'Local')}</div>
        </td>
        <td>
          <div>${escapeHtml(c.surgeon)}</div>
          <div class="text-xs text-muted">${escapeHtml(c.room)}</div>
        </td>
        <td>
          <span class="status-badge" style="background:rgba(56, 189, 248, 0.12); color:#38bdf8; font-family:var(--font-mono);">
            ⏱️ ${c.durationMinutes || '25'} ${minSuffix}
          </span>
        </td>
        <td>
          <div style="max-width: 280px; font-size: 0.82rem;">
            <div><strong>${closureLabel}</strong> ${escapeHtml(c.sutureType || 'Primary suture')}</div>
            <div class="text-xs ${c.specimen && c.specimen.startsWith('Yes') ? 'text-danger' : 'text-muted'}">
              <strong>${pathologyLabel}</strong> ${escapeHtml(c.specimen || ((typeof t === 'function') ? t('none', 'None') : 'None'))}
            </div>
            <div class="text-xs text-muted" style="margin-top:2px;">${escapeHtml(c.postOpNotes || '')}</div>
          </div>
        </td>
        <td style="text-align: right;">
          <button class="btn btn-secondary btn-sm" onclick="openCompletedDetailsModal('${c.id}')">
            ${summaryBtnText}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Render Suites and Surgeons View
 */
function renderRoomsAndSurgeons() {
  const suitesContainer = document.getElementById('suitesGridContainer');
  const sidebarRoomList = document.getElementById('sidebarRoomList');
  const surgeonsContainer = document.getElementById('surgeonsGridContainer');

  // Dynamically update room occupancy from active surgery queue
  state.rooms.forEach(room => {
    const activeCaseInRoom = state.queue.find(q => q.status === 'in_progress' && q.room === room.name);
    if (activeCaseInRoom) {
      room.status = 'In Use';
      room.currentCase = activeCaseInRoom.queueNumber;
      room.activePatient = activeCaseInRoom.patientName;
      room.activeProcedure = activeCaseInRoom.procedure;
    } else {
      room.status = 'Available';
      room.currentCase = null;
      room.activePatient = null;
      room.activeProcedure = null;
    }
  });

  // Sidebar widget
  if (sidebarRoomList) {
    sidebarRoomList.innerHTML = state.rooms.map(room => {
      const isAvailable = room.status === 'Available';
      const label = isAvailable ? ((typeof currentLang !== 'undefined' && currentLang === 'km') ? 'រួចរាល់' : 'Ready') : ((typeof currentLang !== 'undefined' && currentLang === 'km') ? 'កំពុងវះកាត់' : 'In Use');
      return `
        <div class="room-status-item">
          <span style="font-weight:600;">${escapeHtml(room.name)}</span>
          <span class="room-status-badge ${isAvailable ? 'available' : 'occupied'}">
            ${label}
          </span>
        </div>
      `;
    }).join('');
  }

  // Full Room Grid
  if (suitesContainer) {
    suitesContainer.innerHTML = state.rooms.map(room => {
      const isOccupied = room.status === 'In Use';
      const statusText = isOccupied ? ((typeof t === 'function') ? t('status_occupied', '● SURGERY ACTIVE') : '● SURGERY ACTIVE') : ((typeof t === 'function') ? t('status_available', '✓ AVAILABLE') : '✓ AVAILABLE');
      const roomDesc = (typeof t === 'function') ? t('room_equipped_desc', 'Equipped for local anesthesia, electrocautery, and sterile minor sets.') : 'Equipped for local anesthesia, electrocautery, and sterile minor sets.';
      return `
        <div class="room-card ${isOccupied ? 'occupied' : ''}">
          <div class="room-card-header">
            <span class="room-card-title">${escapeHtml(room.name)}</span>
            <span class="room-status-badge ${isOccupied ? 'occupied' : 'available'}">
              ${statusText}
            </span>
          </div>
          <div class="room-card-body">
            <p><strong>Type:</strong> ${escapeHtml(room.type)}</p>
            ${isOccupied ? `
              <div style="margin-top:0.6rem; padding:0.6rem; background:rgba(16, 185, 129, 0.08); border-radius:6px; border:1px solid rgba(16, 185, 129, 0.2);">
                <div style="color:#059669; font-weight:700;">Case: ${room.currentCase}</div>
                <div style="color:var(--heading-color); font-weight:600;">${escapeHtml(room.activePatient)}</div>
                <div class="text-xs text-muted">${escapeHtml((typeof localizeProcedure === 'function') ? localizeProcedure(room.activeProcedure) : room.activeProcedure)}</div>
              </div>
            ` : `
              <p class="text-muted" style="margin-top:0.4rem;">${roomDesc}</p>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  // Surgeons Grid
  if (surgeonsContainer) {
    surgeonsContainer.innerHTML = state.surgeons.map(surg => {
      // Check if surgeon is in active surgery
      const isOperating = state.queue.some(q => q.status === 'in_progress' && q.surgeon === surg.name);
      const statusLabel = isOperating ? ((typeof t === 'function') ? t('filter_in_progress', 'In Surgery') : 'In Surgery') : ((typeof currentLang !== 'undefined' && currentLang === 'km') ? 'កំពុងបំពេញការងារ' : 'On Duty');

      return `
        <div class="surgeon-card">
          <div class="surgeon-avatar">${surg.initials}</div>
          <div class="surgeon-details">
            <h4>${escapeHtml(surg.name)}</h4>
            <p>${escapeHtml(surg.specialty)}</p>
            <div style="margin-top:4px;">
              <span class="status-badge ${isOperating ? 'in_progress' : 'waiting'}" style="font-size:0.68rem; padding:1px 6px;">
                ${statusLabel}
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

/**
 * Populate Modal Dropdowns
 */
const PROCEDURE_KEYS = [
  "Abscess Incision & Drainage",
  "Lipoma Excision (Subcutaneous)",
  "Sebaceous Cyst Removal",
  "Wound Debridement & Suturing",
  "Punch / Shave Skin Biopsy",
  "Ingrown Toenail Wedge Resection",
  "Foreign Body Removal (Soft Tissue)",
  "Scar Revision / Minor Excision",
  "Other Minor Surgical Procedure"
];

const PRIORITY_KEYS = ["Standard", "High", "Urgent", "Elective"];

function populateDropdowns() {
  const surgeonSelect = document.getElementById('queueSurgeon');
  const roomSelect = document.getElementById('queueRoom');
  const quickProcSelect = document.getElementById('queueQuickProcedure');
  const queueProcSelect = document.getElementById('queueProcedure');
  const quickPrioritySelect = document.getElementById('queueQuickPriority');
  const queuePrioritySelect = document.getElementById('queuePriority');

  // Procedure selects
  [quickProcSelect, queueProcSelect].forEach(sel => {
    if (sel) {
      const currentVal = sel.value;
      sel.innerHTML = PROCEDURE_KEYS.map(pKey => {
        const label = (typeof localizeProcedure === 'function') ? localizeProcedure(pKey) : pKey;
        return `<option value="${escapeHtml(pKey)}">${escapeHtml(label)}</option>`;
      }).join('');
      if (currentVal && PROCEDURE_KEYS.includes(currentVal)) {
        sel.value = currentVal;
      }
    }
  });

  // Priority selects
  [quickPrioritySelect, queuePrioritySelect].forEach(sel => {
    if (sel) {
      const currentVal = sel.value;
      sel.innerHTML = PRIORITY_KEYS.map(prKey => {
        const label = (typeof localizePriority === 'function') ? localizePriority(prKey) : prKey;
        return `<option value="${escapeHtml(prKey)}">${escapeHtml(label)}</option>`;
      }).join('');
      if (currentVal && PRIORITY_KEYS.includes(currentVal)) {
        sel.value = currentVal;
      }
    }
  });

  if (surgeonSelect && state.surgeons.length > 0) {
    surgeonSelect.innerHTML = state.surgeons.map(s =>
      `<option value="${escapeHtml(s.name)}">${escapeHtml(s.name)} (${s.specialty})</option>`
    ).join('');
  }

  if (roomSelect && state.rooms.length > 0) {
    roomSelect.innerHTML = state.rooms.map(r => {
      const isAvail = r.status === 'Available';
      const label = isAvail ? ((typeof currentLang !== 'undefined' && currentLang === 'km') ? 'ទំនេរ' : 'Available') : ((typeof currentLang !== 'undefined' && currentLang === 'km') ? 'កំពុងប្រើប្រាស់' : 'In Use');
      return `<option value="${escapeHtml(r.name)}">${escapeHtml(r.name)} (${label})</option>`;
    }).join('');
  }
}

/* ===================================================================
   SEARCH & FILTERS
   =================================================================== */
function initFilterControls() {
  // Segmented control (All / Waiting / In Surgery)
  const filterButtons = document.querySelectorAll('#queueStatusFilter .segment-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeFilter = btn.getAttribute('data-filter');
      renderQueueList();
    });
  });

  // Priority select filter
  const priorityFilter = document.getElementById('queuePriorityFilter');
  if (priorityFilter) {
    priorityFilter.addEventListener('change', (e) => {
      state.activePriorityFilter = e.target.value;
      renderQueueList();
    });
  }

  // Queue Search Input
  const queueSearchInput = document.getElementById('queueSearchInput');
  if (queueSearchInput) {
    queueSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderQueueList();
    });
  }

  // Patient Search Input
  const patientSearchInput = document.getElementById('patientSearchInput');
  if (patientSearchInput) {
    patientSearchInput.addEventListener('input', () => {
      renderPatientTable();
    });
  }

  // Completed Search Input
  const completedSearchInput = document.getElementById('completedSearchInput');
  if (completedSearchInput) {
    completedSearchInput.addEventListener('input', () => {
      renderCompletedTable();
    });
  }

  // Empty state buttons
  const emptyBtnQueue = document.getElementById('emptyBtnQueue');
  if (emptyBtnQueue) {
    emptyBtnQueue.addEventListener('click', () => openQueueModal());
  }
}

/* ===================================================================
   MODALS HANDLING & PATIENT SEARCH
   =================================================================== */
function initModals() {
  // Patient Modal triggers
  const btnOpenNewPatient = document.getElementById('btnOpenNewPatientModal');
  const btnOpenNewPatientAlt = document.getElementById('btnRegisterNewPatientAlt');
  const modalPatient = document.getElementById('modalPatient');
  const btnClosePatient = document.getElementById('btnClosePatientModal');
  const btnCancelPatient = document.getElementById('btnCancelPatientModal');

  [btnOpenNewPatient, btnOpenNewPatientAlt].forEach(btn => {
    if (btn) btn.addEventListener('click', () => {
      state.returnToQueueModal = false;
      openModal(modalPatient);
    });
  });
  [btnClosePatient, btnCancelPatient].forEach(btn => {
    if (btn) btn.addEventListener('click', () => {
      closeModal(modalPatient);
      if (state.returnToQueueModal) {
        openModal(document.getElementById('modalQueue'));
      }
    });
  });

  // Edit Patient Modal triggers
  const modalEditPatient = document.getElementById('modalEditPatient');
  const btnCloseEditPatient = document.getElementById('btnCloseEditPatientModal');
  const btnCancelEditPatient = document.getElementById('btnCancelEditPatientModal');

  [btnCloseEditPatient, btnCancelEditPatient].forEach(btn => {
    if (btn) btn.addEventListener('click', () => closeModal(modalEditPatient));
  });

  // Queue Modal triggers (Header button, Toolbar button in Surgery Queue)
  const btnOpenQueue = document.getElementById('btnOpenQueueModal');
  const btnQueueFromToolbar = document.getElementById('btnQueueFromToolbar');
  const modalQueue = document.getElementById('modalQueue');
  const btnCloseQueue = document.getElementById('btnCloseQueueModal');
  const btnCancelQueue = document.getElementById('btnCancelQueueModal');

  [btnOpenQueue, btnQueueFromToolbar].forEach(btn => {
    if (btn) btn.addEventListener('click', () => openQueueModal());
  });
  [btnCloseQueue, btnCancelQueue].forEach(btn => {
    if (btn) btn.addEventListener('click', () => closeModal(modalQueue));
  });

  // Complete Modal triggers
  const modalComplete = document.getElementById('modalCompleteCase');
  const btnCloseComplete = document.getElementById('btnCloseCompleteModal');
  const btnCancelComplete = document.getElementById('btnCancelCompleteModal');
  [btnCloseComplete, btnCancelComplete].forEach(btn => {
    if (btn) btn.addEventListener('click', () => closeModal(modalComplete));
  });

  // Details Modal triggers
  const modalDetails = document.getElementById('modalCaseDetails');
  const btnCloseDetails = document.getElementById('btnCloseDetailsModal');
  const btnCloseDetailsBtn = document.getElementById('btnCloseDetailsBtn');
  const btnPrintDetailsBtn = document.getElementById('btnPrintDetailsBtn');
  [btnCloseDetails, btnCloseDetailsBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', () => closeModal(modalDetails));
  });
  if (btnPrintDetailsBtn) {
    btnPrintDetailsBtn.addEventListener('click', () => window.print());
  }

  // Close modals on backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Initialize interactive patient search from patient list
  initPatientSearchInModal();
}

/**
 * Interactive Patient Search inside Queue Popup
 */
function initPatientSearchInModal() {
  const searchInput = document.getElementById('queuePatientSearchInput');
  const resultsContainer = document.getElementById('patientSearchResults');
  const btnClear = document.getElementById('btnClearPatientSearch');
  const btnChange = document.getElementById('btnChangeSelectedPatient');

  if (!searchInput || !resultsContainer) return;

  // Search input typing
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim();
    if (q.length > 0) {
      if (btnClear) btnClear.classList.remove('hidden');
    } else {
      if (btnClear) btnClear.classList.add('hidden');
    }
    renderPatientSearchResults(q);
  });

  // Show list on input focus
  searchInput.addEventListener('focus', () => {
    renderPatientSearchResults(searchInput.value.trim());
    resultsContainer.classList.remove('hidden');
  });

  // Clear button
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      searchInput.value = '';
      btnClear.classList.add('hidden');
      renderPatientSearchResults('');
      searchInput.focus();
    });
  }

  // Change selected patient button
  if (btnChange) {
    btnChange.addEventListener('click', () => {
      resetPatientSelection();
    });
  }

  // Hide dropdown if clicked outside
  document.addEventListener('click', (e) => {
    const picker = document.getElementById('patientSearchContainer');
    if (picker && !picker.contains(e.target) && e.target !== searchInput) {
      resultsContainer.classList.add('hidden');
    }
  });
}

/**
 * Render matching patients in Queue popup dropdown
 */
function renderPatientSearchResults(query = '') {
  const container = document.getElementById('patientSearchResults');
  if (!container) return;

  const q = query.toLowerCase().trim();
  let matches = state.patients;

  if (q !== '') {
    matches = matches.filter(p =>
      p.fullName.toLowerCase().includes(q) ||
      p.mrn.toLowerCase().includes(q) ||
      p.phone.toLowerCase().includes(q)
    );
  }

  if (matches.length === 0) {
    const emptyPrompt = (typeof t === 'function') ? t('no_patient_match', 'No matching patient found in list for') : 'No matching patient found in list for';
    const regPrompt = (typeof t === 'function') ? t('register_new_patient_prompt', '+ Register as New Patient') : '+ Register as New Patient';
    container.innerHTML = `
      <div class="patient-search-empty">
        <p>${emptyPrompt} "<strong>${escapeHtml(query)}</strong>"</p>
        <button type="button" class="btn btn-primary btn-sm" style="margin-top:0.5rem;" onclick="openPatientRegisterFromSearch()">
          ${regPrompt}
        </button>
      </div>
    `;
    container.classList.remove('hidden');
    return;
  }

  const ageSuffix = (typeof currentLang !== 'undefined' && currentLang === 'km') ? 'ឆ្នាំ' : 'y';
  const bloodLabel = (typeof t === 'function') ? t('blood', 'Blood:') : 'Blood:';
  const allergiesLabel = (typeof t === 'function') ? t('allergies_label', 'Allergies:') : 'Allergies:';
  const queuedLabel = (typeof t === 'function') ? t('status_queued', 'Queued') : 'Queued';
  const selectLabel = (typeof currentLang !== 'undefined' && currentLang === 'km') ? 'ជ្រើសរើស' : 'Select';

  container.innerHTML = matches.map(p => {
    const isQueued = state.queue.find(item => item.patientId === p.id);
    const hasAllergy = p.allergies && p.allergies.toUpperCase() !== 'NKDA' && p.allergies.toUpperCase() !== 'NONE';
    const genderLabel = p.gender === 'Female' ? ((typeof t === 'function') ? t('opt_female', 'Female') : 'Female') : p.gender === 'Male' ? ((typeof t === 'function') ? t('opt_male', 'Male') : 'Male') : p.gender;

    return `
      <div class="patient-search-item ${isQueued ? 'in-queue' : ''}" onclick="onSelectPatientResult('${p.id}')">
        <div class="patient-item-left">
          <div class="patient-item-avatar">${escapeHtml(p.fullName.charAt(0))}</div>
          <div class="patient-item-info">
            <div class="item-name-row">
              <span class="item-name">${escapeHtml(p.fullName)}</span>
              <span class="mrn-badge font-mono">${p.mrn}</span>
            </div>
            <div class="item-sub font-mono">
              ${p.phone} • ${p.age}${ageSuffix} / ${genderLabel} • ${bloodLabel} <strong style="color:#0284c7;">${p.bloodType || 'Unknown'}</strong>
            </div>
            ${hasAllergy ? `<div class="item-allergy-alert text-danger">⚠️ ${allergiesLabel} ${escapeHtml(p.allergies)}</div>` : ''}
          </div>
        </div>
        <div class="patient-item-right">
          ${isQueued ? `
            <span class="status-badge waiting">${queuedLabel} (${isQueued.queueNumber})</span>
          ` : `
            <span class="btn btn-secondary btn-sm" style="pointer-events:none;">
              <span>${selectLabel}</span>
            </span>
          `}
        </div>
      </div>
    `;
  }).join('');

  container.classList.remove('hidden');
}

window.onSelectPatientResult = function (patientId) {
  const isQueued = state.queue.find(item => item.patientId === patientId);
  if (isQueued) {
    showToast((typeof currentLang !== 'undefined' && currentLang === 'km') 
      ? `អ្នកជំងឺនេះមានក្នុងជួរវះកាត់រួចហើយ (ករណី ${isQueued.queueNumber})` 
      : `This patient is already queued under case ${isQueued.queueNumber}`, 'error');
    return;
  }
  selectPatientForQueue(patientId);
};

window.openPatientRegisterFromSearch = function () {
  state.returnToQueueModal = true;
  closeModal(document.getElementById('modalQueue'));
  openModal(document.getElementById('modalPatient'));
};

/**
 * Select Patient and Display Selected Card in Queue Modal
 */
function selectPatientForQueue(patientId) {
  const patient = state.patients.find(p => p.id === patientId);
  if (!patient) return;

  const hiddenInput = document.getElementById('queueSelectedPatientId');
  const searchContainer = document.getElementById('patientSearchContainer');
  const selectedCard = document.getElementById('selectedPatientCard');
  const resultsContainer = document.getElementById('patientSearchResults');
  const errorHint = document.getElementById('patientSelectError');

  if (hiddenInput) hiddenInput.value = patient.id;

  // Fill in card details
  const nameEl = document.getElementById('selectedPatientName');
  const mrnEl = document.getElementById('selectedPatientMRN');
  const demoEl = document.getElementById('selectedPatientDemo');
  const bloodEl = document.getElementById('selectedPatientBlood');
  const phoneEl = document.getElementById('selectedPatientPhone');
  const allergiesEl = document.getElementById('selectedPatientAllergies');
  const notesEl = document.getElementById('selectedPatientNotes');

  if (nameEl) nameEl.textContent = patient.fullName;
  if (mrnEl) mrnEl.textContent = patient.mrn;
  if (demoEl) demoEl.textContent = `${patient.age}y / ${patient.gender}`;
  if (bloodEl) bloodEl.textContent = `Blood: ${patient.bloodType || 'Unknown'}`;
  if (phoneEl) phoneEl.textContent = patient.phone;
  if (allergiesEl) {
    allergiesEl.textContent = patient.allergies || 'No Known Drug Allergies (NKDA)';
    if (patient.allergies && patient.allergies.toUpperCase() !== 'NKDA') {
      allergiesEl.className = 'text-danger';
    } else {
      allergiesEl.className = 'text-muted';
    }
  }
  if (notesEl) notesEl.textContent = patient.notes || 'No pre-op assessment notes recorded.';

  // Swap views
  if (searchContainer) searchContainer.classList.add('hidden');
  if (resultsContainer) resultsContainer.classList.add('hidden');
  if (selectedCard) selectedCard.classList.remove('hidden');
  if (errorHint) errorHint.classList.add('hidden');

  // Focus on Diagnostic input box immediately after selecting patient
  setTimeout(() => {
    const diagInput = document.getElementById('queueDiagnosis');
    if (diagInput) diagInput.focus();
  }, 100);
}

/**
 * Reset patient selection to search input
 */
function resetPatientSelection() {
  const hiddenInput = document.getElementById('queueSelectedPatientId');
  const searchContainer = document.getElementById('patientSearchContainer');
  const selectedCard = document.getElementById('selectedPatientCard');
  const searchInput = document.getElementById('queuePatientSearchInput');
  const btnClear = document.getElementById('btnClearPatientSearch');
  const resultsContainer = document.getElementById('patientSearchResults');

  if (hiddenInput) hiddenInput.value = '';
  if (selectedCard) selectedCard.classList.add('hidden');
  if (searchContainer) searchContainer.classList.remove('hidden');
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
  if (btnClear) btnClear.classList.add('hidden');
  renderPatientSearchResults('');
  if (resultsContainer) resultsContainer.classList.remove('hidden');
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('hidden');
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('hidden');
}

function openQueueModal(preselectedPatientId = null) {
  populateDropdowns();
  const modalQueue = document.getElementById('modalQueue');

  // Reset fields
  const diagInput = document.getElementById('queueDiagnosis');
  const indInput = document.getElementById('queueIndication');
  const prioritySelect = document.getElementById('queuePriority');
  const errorHint = document.getElementById('patientSelectError');

  if (diagInput) diagInput.value = '';
  if (indInput) indInput.value = '';
  if (prioritySelect) prioritySelect.value = 'Standard';
  if (errorHint) errorHint.classList.add('hidden');

  if (preselectedPatientId) {
    selectPatientForQueue(preselectedPatientId);
  } else {
    resetPatientSelection();
  }

  openModal(modalQueue);

  // Autofocus search input box immediately if no patient preselected
  if (!preselectedPatientId) {
    setTimeout(() => {
      const searchInput = document.getElementById('queuePatientSearchInput');
      const resultsContainer = document.getElementById('patientSearchResults');
      if (searchInput) {
        searchInput.focus();
        renderPatientSearchResults('');
      }
      if (resultsContainer) {
        resultsContainer.classList.remove('hidden');
      }
    }, 80);
  }
}

window.quickQueuePatient = function (patientId) {
  openQueueModal(patientId);
};

/**
 * Open Edit Patient Modal
 */
window.openEditPatientModal = function (patientId) {
  const patient = state.patients.find(p => p.id === patientId);
  if (!patient) return;

  document.getElementById('editPatientId').value = patient.id;
  document.getElementById('editPatientMRNBadge').textContent = patient.mrn;
  document.getElementById('editFullName').value = patient.fullName;
  document.getElementById('editAge').value = patient.age;
  document.getElementById('editGender').value = patient.gender;
  document.getElementById('editPhone').value = patient.phone;
  document.getElementById('editBloodType').value = patient.bloodType || 'Unknown';
  document.getElementById('editAllergies').value = patient.allergies || '';
  document.getElementById('editNotes').value = patient.notes || '';

  openModal(document.getElementById('modalEditPatient'));
};

/**
 * Delete Patient from Patient List
 */
window.deletePatient = function (patientId) {
  const patient = state.patients.find(p => p.id === patientId);
  if (!patient) return;

  const activeCase = state.queue.find(q => q.patientId === patientId);
  let confirmMsg = `Are you sure you want to delete patient "${patient.fullName}"(${patient.mrn}) from the Patient List ? `;
  if (activeCase) {
    confirmMsg += `\n\n⚠️ Warning: This patient is currently in the active Surgery Queue (Case ${activeCase.queueNumber}). Deleting them will also cancel their active surgery case.`;
  }

  if (!confirm(confirmMsg)) return;

  state.patients = state.patients.filter(p => p.id !== patientId);
  if (activeCase) {
    state.queue = state.queue.filter(q => q.patientId !== patientId);
  }

  saveState();
  renderAll();
  showToast(`Patient ${patient.fullName} (${patient.mrn}) deleted.`, 'error');
};

/* ===================================================================
   FORM SUBMISSIONS
   =================================================================== */
function initForms() {
  // 1. Patient Registration Form
  const formRegisterPatient = document.getElementById('formRegisterPatient');
  if (formRegisterPatient) {
    formRegisterPatient.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('regFullName').value.trim();
      const age = parseInt(document.getElementById('regAge').value, 10);
      const gender = document.getElementById('regGender').value;
      const phone = document.getElementById('regPhone').value.trim();
      const bloodType = document.getElementById('regBloodType').value;
      const allergies = document.getElementById('regAllergies').value.trim() || 'NKDA';
      const notes = document.getElementById('regNotes').value.trim();

      // Generate MRN
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const mrn = `MRN-${randomDigits}`;

      const newPatient = {
        id: 'pat-' + Date.now(),
        mrn,
        fullName,
        age,
        gender,
        phone,
        bloodType,
        allergies,
        notes,
        registeredAt: new Date().toISOString()
      };

      state.patients.unshift(newPatient);
      saveState();
      renderAll();

      formRegisterPatient.reset();
      closeModal(document.getElementById('modalPatient'));

      if (state.returnToQueueModal) {
        state.returnToQueueModal = false;
        openQueueModal(newPatient.id);
        showToast(`Patient ${fullName} registered and selected for surgery queue!`, 'success');
      } else {
        showToast(`Patient ${fullName} (${mrn}) registered successfully!`, 'success');
      }
    });
  }

  // 1b. Edit Patient Form
  const formEditPatient = document.getElementById('formEditPatient');
  if (formEditPatient) {
    formEditPatient.addEventListener('submit', (e) => {
      e.preventDefault();

      const patientId = document.getElementById('editPatientId').value;
      const patient = state.patients.find(p => p.id === patientId);
      if (!patient) return;

      const fullName = document.getElementById('editFullName').value.trim();
      const age = parseInt(document.getElementById('editAge').value, 10);
      const gender = document.getElementById('editGender').value;
      const phone = document.getElementById('editPhone').value.trim();
      const bloodType = document.getElementById('editBloodType').value;
      const allergies = document.getElementById('editAllergies').value.trim() || 'NKDA';
      const notes = document.getElementById('editNotes').value.trim();

      patient.fullName = fullName;
      patient.age = age;
      patient.gender = gender;
      patient.phone = phone;
      patient.bloodType = bloodType;
      patient.allergies = allergies;
      patient.notes = notes;

      // If patient is in active queue, update queued card details
      const queuedCase = state.queue.find(q => q.patientId === patientId);
      if (queuedCase) {
        queuedCase.patientName = fullName;
        queuedCase.age = age;
        queuedCase.gender = gender;
        queuedCase.allergies = allergies;
      }

      saveState();
      renderAll();
      closeModal(document.getElementById('modalEditPatient'));
      showToast(`Patient ${fullName} (${patient.mrn}) details updated!`, 'success');
    });
  }

  // 2. Queue for Surgery Form
  const formQueueSurgery = document.getElementById('formQueueSurgery');
  if (formQueueSurgery) {
    formQueueSurgery.addEventListener('submit', (e) => {
      e.preventDefault();

      const patientId = document.getElementById('queueSelectedPatientId').value;
      const patient = state.patients.find(p => p.id === patientId);
      const errorHint = document.getElementById('patientSelectError');

      if (!patientId || !patient) {
        if (errorHint) errorHint.classList.remove('hidden');
        showToast((typeof currentLang !== 'undefined' && currentLang === 'km') ? 'សូមស្វែងរក និងជ្រើសរើសអ្នកជំងឺពីបញ្ជីអ្នកជំងឺ' : 'Please search and select a patient from the patient list', 'error');
        const searchInput = document.getElementById('queuePatientSearchInput');
        if (searchInput) searchInput.focus();
        return;
      }
      if (errorHint) errorHint.classList.add('hidden');

      // Check if already in active queue
      const existing = state.queue.find(q => q.patientId === patientId);
      if (existing) {
        showToast((typeof currentLang !== 'undefined' && currentLang === 'km') ? `អ្នកជំងឺនេះមានក្នុងជួរវះកាត់រួចហើយ (ករណី ${existing.queueNumber})` : `Patient is already queued under case ${existing.queueNumber}`, 'error');
        return;
      }

      // 1. Diagnostic input
      const diagInput = document.getElementById('queueDiagnosis');
      const diagnosis = diagInput ? diagInput.value.trim() : '';
      if (!diagnosis) {
        showToast((typeof currentLang !== 'undefined' && currentLang === 'km') ? 'សូមបញ្ចូលរោគវិនិច្ឆ័យ (Diagnostic)' : 'Please enter Diagnostic / Diagnosis', 'error');
        if (diagInput) diagInput.focus();
        return;
      }

      // 2. Indication input
      const indInput = document.getElementById('queueIndication');
      const indication = indInput ? indInput.value.trim() : '';
      if (!indication) {
        showToast((typeof currentLang !== 'undefined' && currentLang === 'km') ? 'សូមបញ្ចូលសូចនាករគ្លីនិក (Indication)' : 'Please enter Clinical Indication', 'error');
        if (indInput) indInput.focus();
        return;
      }

      // 3. Case Priority
      const prioritySelect = document.getElementById('queuePriority');
      const priority = prioritySelect ? prioritySelect.value : 'Standard';

      // Default room, surgeon, and anesthesia
      let surgeon = state.surgeons.length > 0 ? state.surgeons[0].name : 'Dr. Arthur Vance, MD, FRCS';
      let room = state.rooms.length > 0 ? state.rooms[0].name : 'Minor OR Suite 1';
      const anesthesia = 'Local Infiltration (1% Lidocaine w/ Epi)';

      // Generate Queue Number (e.g., Q-104)
      const queueNumber = `Q-${100 + state.queue.length + state.completed.length + 1}`;

      const queueItem = {
        id: 'queue-' + Date.now(),
        queueNumber,
        patientId: patient.id,
        patientName: patient.fullName,
        mrn: patient.mrn,
        age: patient.age,
        gender: patient.gender,
        allergies: patient.allergies,
        diagnosis,
        procedure: diagnosis,
        indication,
        notes: indication,
        surgeon,
        room,
        priority,
        anesthesia,
        status: 'waiting',
        queuedAt: new Date().toISOString(),
        startedAt: null,
        completedAt: null
      };

      state.queue.push(queueItem);
      saveState();
      renderAll();

      formQueueSurgery.reset();
      resetPatientSelection();
      closeModal(document.getElementById('modalQueue'));

      // Switch to surgery queue tab so user sees it right away
      const navQueueTab = document.getElementById('navQueueTab');
      if (navQueueTab) navQueueTab.click();

      showToast((typeof currentLang !== 'undefined' && currentLang === 'km') 
        ? `បានដាក់អ្នកជំងឺ ${patient.fullName} (${queueNumber}) ចូលជួរវះកាត់សម្រាប់ ${diagnosis}!` 
        : `Queued ${patient.fullName} (${queueNumber}) for ${diagnosis}!`, 'success');
    });
  }

  // 3. Complete Surgery Form
  const formCompleteSurgery = document.getElementById('formCompleteSurgery');
  if (formCompleteSurgery) {
    formCompleteSurgery.addEventListener('submit', (e) => {
      e.preventDefault();

      const caseId = document.getElementById('completeCaseId').value;
      const queueIndex = state.queue.findIndex(q => q.id === caseId);

      if (queueIndex === -1) {
        showToast('Case not found in active queue', 'error');
        return;
      }

      const queueItem = state.queue[queueIndex];
      const sutureType = document.getElementById('completeSutureType').value;
      const specimen = document.getElementById('completeSpecimen').value;
      const postOpNotes = document.getElementById('completePostOpNotes').value.trim();

      const completedAt = new Date().toISOString();
      const startTime = queueItem.startedAt ? new Date(queueItem.startedAt).getTime() : (Date.now() - 30 * 60 * 1000);
      const durationMinutes = Math.max(5, Math.round((Date.now() - startTime) / (60 * 1000)));

      const completedCase = {
        ...queueItem,
        status: 'completed',
        completedAt,
        durationMinutes,
        sutureType,
        specimen,
        postOpNotes
      };

      // Move from queue to completed
      state.queue.splice(queueIndex, 1);
      state.completed.unshift(completedCase);

      saveState();
      renderAll();

      closeModal(document.getElementById('modalCompleteCase'));
      showToast(`Surgery completed for ${queueItem.patientName} (${queueItem.queueNumber})!`, 'success');
    });
  }
}

/* ===================================================================
   SURGERY WORKFLOW ACTIONS
   =================================================================== */

/**
 * Call Patient to Minor OR & Start Case
 */
window.startSurgeryCase = function (caseId) {
  const item = state.queue.find(q => q.id === caseId);
  if (!item) return;

  item.status = 'in_progress';
  item.startedAt = new Date().toISOString();

  saveState();
  renderAll();

  showToast(`Case ${item.queueNumber} started in ${item.room}. Timer running.`, 'success');
};

/**
 * Open Complete Case Modal
 */
window.openCompleteCaseModal = function (caseId) {
  const item = state.queue.find(q => q.id === caseId);
  if (!item) return;

  const modal = document.getElementById('modalCompleteCase');
  const summaryBox = document.getElementById('completeCaseSummaryBox');
  document.getElementById('completeCaseId').value = item.id;

  const elapsedMs = item.startedAt ? (Date.now() - new Date(item.startedAt).getTime()) : 0;

  summaryBox.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
      <div>
        <h4 style="font-size:1.05rem; color:var(--heading-color);">${escapeHtml(item.patientName)} <span class="font-mono text-muted text-xs">(${item.mrn})</span></h4>
        <div style="color:#0ea5e9; font-weight:600; font-size:0.9rem;">${escapeHtml(item.procedure)}</div>
      </div>
      <span class="status-badge in_progress font-mono">${item.queueNumber}</span>
    </div>
    <div style="display:flex; gap:1.5rem; font-size:0.8rem; color:var(--text-secondary); border-top:1px solid var(--border-subtle); padding-top:0.5rem;">
      <span><strong>Surgeon:</strong> ${escapeHtml(item.surgeon)}</span>
      <span><strong>OR:</strong> ${escapeHtml(item.room)}</span>
      <span><strong>Elapsed Time:</strong> ${formatDuration(elapsedMs)}</span>
    </div>
  `;

  openModal(modal);
};

/**
 * Cancel / Defer Case
 */
window.cancelSurgeryCase = function (caseId) {
  const item = state.queue.find(q => q.id === caseId);
  if (!item) return;

    if (confirm(`Are you sure you want to cancel and remove ${item.queueNumber} (${item.patientName}) from the surgery queue?`)) {
      state.queue = state.queue.filter(q => q.id !== caseId);
      saveState();
      renderAll();
      showToast(`Case ${item.queueNumber} removed from queue.`, 'error');
    }
  };

  /**
   * View Case Details Modal (Queue or Active)
   */
  window.openCaseDetailsModal = function (caseId) {
    const item = state.queue.find(q => q.id === caseId);
    if (!item) return;

    const modal = document.getElementById('modalCaseDetails');
    const title = document.getElementById('detailsModalTitle');
    const subtitle = document.getElementById('detailsModalSubtitle');
    const body = document.getElementById('caseDetailsBody');

    title.textContent = `Case Summary: ${item.queueNumber} - ${item.patientName}`;
    subtitle.textContent = `${item.procedure} • Priority: ${item.priority}`;

    const patient = state.patients.find(p => p.id === item.patientId) || {};

    body.innerHTML = `
    <div class="details-grid">
      <div class="detail-item">
        <div class="detail-label">Patient Demographics</div>
        <div class="detail-value">${escapeHtml(item.patientName)}</div>
        <div class="text-xs text-muted font-mono" style="margin-top:2px;">
          ${item.mrn} • ${item.age} years old • ${item.gender}
        </div>
        <div class="text-xs" style="margin-top:4px;">Blood: <strong>${patient.bloodType || 'Unknown'}</strong></div>
      </div>

      <div class="detail-item">
        <div class="detail-label">Surgical Procedure</div>
        <div class="detail-value" style="color:#38bdf8;">${escapeHtml(item.procedure)}</div>
        <div class="text-xs text-muted" style="margin-top:2px;">Anesthesia: ${escapeHtml(item.anesthesia)}</div>
        <div class="text-xs text-muted">Surgeon: ${escapeHtml(item.surgeon)}</div>
      </div>

      <div class="detail-item">
        <div class="detail-label">Allergies & Clinical Precautions</div>
        <div class="detail-value ${item.allergies && item.allergies !== 'NKDA' ? 'text-danger' : ''}">
          ${escapeHtml(item.allergies || 'No Known Drug Allergies')}
        </div>
        <div class="text-xs text-muted" style="margin-top:4px;">
          ${escapeHtml(item.notes || 'No special pre-op instructions provided.')}
        </div>
      </div>

      <div class="detail-item">
        <div class="detail-label">Location & Status</div>
        <div class="detail-value">${escapeHtml(item.room)}</div>
        <div style="margin-top:6px;">
          <span class="status-badge ${item.status}">${item.status === 'in_progress' ? 'In Surgery' : 'Queued / Waiting'}</span>
        </div>
      </div>
    </div>

    <div class="timeline-box">
      <div class="detail-label">Surgical Case Timeline</div>
      <div class="timeline-list">
        <div class="timeline-item">
          <span class="timeline-time">${item.queuedAt ? new Date(item.queuedAt).toLocaleTimeString() : '--:--'}</span>
          <span>Queued for Minor Surgery by triage desk</span>
        </div>
        ${item.startedAt ? `
          <div class="timeline-item">
            <span class="timeline-time">${new Date(item.startedAt).toLocaleTimeString()}</span>
            <span>Called to ${escapeHtml(item.room)}; Procedure initiated by ${escapeHtml(item.surgeon)}</span>
          </div>
        ` : `
          <div class="timeline-item text-muted">
            <span class="timeline-time">Pending</span>
            <span>Awaiting OR room prep and patient call-in</span>
          </div>
        `}
      </div>
    </div>
  `;

    openModal(modal);
  };

  /**
   * View Completed Case Details Modal
   */
  window.openCompletedDetailsModal = function (caseId) {
    const item = state.completed.find(c => c.id === caseId);
    if (!item) return;

    const modal = document.getElementById('modalCaseDetails');
    const title = document.getElementById('detailsModalTitle');
    const subtitle = document.getElementById('detailsModalSubtitle');
    const body = document.getElementById('caseDetailsBody');

    title.textContent = `Discharge Summary: ${item.queueNumber} - ${item.patientName}`;
    subtitle.textContent = `Completed Procedure • ${item.procedure}`;

    body.innerHTML = `
    <div class="details-grid">
      <div class="detail-item">
        <div class="detail-label">Patient</div>
        <div class="detail-value">${escapeHtml(item.patientName)}</div>
        <div class="text-xs text-muted font-mono">${item.mrn}</div>
      </div>

      <div class="detail-item">
        <div class="detail-label">Operating Room & Surgeon</div>
        <div class="detail-value">${escapeHtml(item.surgeon)}</div>
        <div class="text-xs text-muted">${escapeHtml(item.room)}</div>
      </div>

      <div class="detail-item">
        <div class="detail-label">Duration & Timing</div>
        <div class="detail-value" style="color:#10b981;">${item.durationMinutes || '30'} minutes</div>
        <div class="text-xs text-muted">Completed: ${item.completedAt ? new Date(item.completedAt).toLocaleString() : ''}</div>
      </div>

      <div class="detail-item">
        <div class="detail-label">Specimen & Closure</div>
        <div class="detail-value">${escapeHtml(item.sutureType || 'Primary suture')}</div>
        <div class="text-xs ${item.specimen && item.specimen.startsWith('Yes') ? 'text-danger' : 'text-muted'}">
          Pathology: ${escapeHtml(item.specimen || 'None')}
        </div>
      </div>
    </div>

    <div class="timeline-box" style="margin-bottom:1rem;">
      <div class="detail-label">Post-Operative Surgeon Notes</div>
      <p style="font-size:0.9rem; color:#f1f5f9; margin-top:0.4rem; line-height:1.5;">
        ${escapeHtml(item.postOpNotes || 'Procedure completed successfully without complications.')}
      </p>
    </div>
  `;

    openModal(modal);
  };

  /* ===================================================================
     EXPORT CSV
     =================================================================== */
  function initExport() {
    const btnExport = document.getElementById('btnExportCSV');
    if (!btnExport) return;

    btnExport.addEventListener('click', () => {
      if (state.completed.length === 0) {
        showToast('No completed surgery records to export', 'error');
        return;
      }

      const headers = ['Case #', 'MRN', 'Patient Name', 'Procedure', 'Surgeon', 'Room', 'Duration (mins)', 'Specimen', 'Suture / Closure', 'Completed Date'];
      const rows = state.completed.map(c => [
        `"${c.queueNumber}"`,
        `"${c.mrn}"`,
        `"${c.patientName}"`,
        `"${c.procedure}"`,
        `"${c.surgeon}"`,
        `"${c.room}"`,
        c.durationMinutes || 0,
        `"${c.specimen || 'None'}"`,
        `"${c.sutureType || 'Standard'}"`,
        `"${c.completedAt ? new Date(c.completedAt).toLocaleString() : ''}"`
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `SurgiFlow_Completed_Cases_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Exported completed surgery records to CSV!', 'success');
    });
  }

  /* ===================================================================
     TOAST HELPER
     =================================================================== */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
    <span style="font-weight:700;">${icon}</span>
    <span>${escapeHtml(message)}</span>
  `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Expose key UI rendering functions globally for i18n triggers
  window.renderAll = renderAll;
  window.populateDropdowns = populateDropdowns;
  window.showToast = showToast;
  window.state = state;
