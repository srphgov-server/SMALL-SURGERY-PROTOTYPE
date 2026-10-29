# SurgiFlow - Small Surgery & Minor OR Queue Management System

A responsive clinical workflow system designed for outpatient surgery departments, minor operating rooms, and wound care clinics.

## 🚀 Key Features

### 1. Active Minor Surgery Queue
- **Live Pipeline Tracker**: Track patients currently waiting vs in-procedure in minor operating theaters.
- **Real-Time Timers**: Live procedure duration counters for active cases and estimated wait times for queued patients.
- **Workflow Actions**:
  - `Start Surgery`: Call patient into OR and start live procedure tracking.
  - `Complete Surgery`: Record closure method (Ethilon, Prolene, Vicryl, Steri-Strips), pathology specimen details, and post-op outcome notes.
  - `Case Details`: Comprehensive case sheets with print-ready summary.
- **Priority Tiering**: Color-coded urgency indicators for Urgent / STAT, High, Standard, and Elective cases.

### 2. Dual-Mode Surgery Queue Intake (All-in-One)
- **Search Existing Patient**: Real-time search by Patient Name, MRN, or Phone with instant allergy alert badges and duplicate queue protection.
- **+ New Walk-in Patient (All-in-One)**: Register an unregistered walk-in patient and queue them for surgery simultaneously on a single unified form.

### 3. Patient List Management
- Full demographic records: MRN, Full Name, Age, Gender, Phone, Blood Type, Known Allergies / Alerts, and Pre-Op Notes.
- **Row Actions**:
  - `Add Queue`: Instant one-click scheduling into the surgery queue.
  - `Edit`: Update patient demographics, clinical notes, and allergies with real-time sync to active queue cards.
  - `Delete`: Delete records with safeguards against accidental deletion of active surgical cases.

### 4. Completed Surgery Log & Export
- Historical record of all finished surgical cases with closure technique, duration in minutes, and pathology status.
- **CSV Export**: One-click data export of completed surgery records.

### 5. Suite Availability & Staff Tracking
- Live occupancy indicators for Minor OR suites.
- Duty and in-procedure status of attending surgeons.

## 🛠️ Technology Stack
- **HTML5 & Vanilla CSS**: Modern clinical dark slate design system, responsive glassmorphic cards, and smooth CSS transitions.
- **Vanilla JavaScript**: State-driven architecture, event delegation, and real-time procedure clock timers.
- **Storage**: `localStorage` data persistence with one-click demo data seeding.

## 💻 Quick Start

Simply open `index.html` in any modern web browser or serve via Python / Node:

```bash
# Using Python
python -m http.server 8080

# Using Node (http-server / npx serve)
npx serve .
```

Open [http://localhost:8080](http://localhost:8080) in your browser.
