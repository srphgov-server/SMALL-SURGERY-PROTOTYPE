/* ===================================================================
   SURGIFLOW - SAMPLE CLINICAL DATA SEED
   =================================================================== */

window.DEFAULT_SURGEONS = [
  { id: 'surg-1', name: 'Dr. Arthur Vance, MD, FRCS', specialty: 'General & Minor Surgery', initials: 'AV' },
  { id: 'surg-2', name: 'Dr. Maya Lin, MD', specialty: 'Dermatologic Surgery', initials: 'ML' },
  { id: 'surg-3', name: 'Dr. Julian Ross, MBChB', specialty: 'Acute Trauma & Wound Care', initials: 'JR' },
  { id: 'surg-4', name: 'Dr. Sarah Jenkins, MD', specialty: 'Plastic & Reconstructive Care', initials: 'SJ' }
];

window.DEFAULT_ROOMS = [
  { id: 'room-1', name: 'Minor OR Suite 1', type: 'Surgical Theater', status: 'In Use', currentCase: 'Q-101' },
  { id: 'room-2', name: 'Minor OR Suite 2', type: 'Procedure Room', status: 'Available', currentCase: null },
  { id: 'room-3', name: 'Treatment Suite A', type: 'Wound Care & Suture', status: 'Available', currentCase: null }
];

window.DEFAULT_PATIENTS = [
  {
    id: 'pat-1001',
    mrn: 'MRN-4821',
    fullName: 'Robert Sterling',
    age: 48,
    gender: 'Male',
    phone: '+1 (555) 234-8901',
    bloodType: 'O+',
    allergies: 'Penicillin (Anaphylaxis)',
    notes: 'Hypertensive, well-controlled on Amlodipine. Large recurrent sebaceous cyst on upper back.',
    registeredAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString()
  },
  {
    id: 'pat-1002',
    mrn: 'MRN-4822',
    fullName: 'Clara Oswald',
    age: 29,
    gender: 'Female',
    phone: '+1 (555) 876-1234',
    bloodType: 'A+',
    allergies: 'NKDA (No Known Drug Allergies)',
    notes: 'Accidental laceration right palmar surface while preparing food. Hemostasis held by pressure bandage.',
    registeredAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString()
  },
  {
    id: 'pat-1003',
    mrn: 'MRN-4823',
    fullName: 'Marcus Brody',
    age: 56,
    gender: 'Male',
    phone: '+1 (555) 432-9012',
    bloodType: 'B-',
    allergies: 'Latex hypersensitivity',
    notes: 'Subcutaneous mobile mass on left posterior neck, 4cm, non-tender. Suspicious for lipoma.',
    registeredAt: new Date(Date.now() - 3600 * 1000 * 1.5).toISOString()
  },
  {
    id: 'pat-1004',
    mrn: 'MRN-4824',
    fullName: 'Amara Chen',
    age: 24,
    gender: 'Female',
    phone: '+1 (555) 908-1122',
    bloodType: 'AB+',
    allergies: 'Sulfa drugs',
    notes: 'Fluctuant cutaneous abscess left thigh, erythema and localized warmth. Requires immediate incision & drainage.',
    registeredAt: new Date(Date.now() - 3600 * 1000 * 1).toISOString()
  },
  {
    id: 'pat-1005',
    mrn: 'MRN-4825',
    fullName: 'David Hassel',
    age: 63,
    gender: 'Male',
    phone: '+1 (555) 345-6789',
    bloodType: 'O-',
    allergies: 'Codeine',
    notes: 'Pigmented lesion right shoulder border, irregular borders. Punch biopsy indicated.',
    registeredAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString()
  }
];

window.DEFAULT_QUEUE = [
  {
    id: 'queue-101',
    queueNumber: 'Q-101',
    patientId: 'pat-1004',
    patientName: 'Amara Chen',
    mrn: 'MRN-4824',
    age: 24,
    gender: 'Female',
    allergies: 'Sulfa drugs',
    procedure: 'Abscess Incision & Drainage',
    surgeon: 'Dr. Arthur Vance, MD, FRCS',
    room: 'Minor OR Suite 1',
    priority: 'Urgent',
    anesthesia: 'Local Infiltration (Plain Lidocaine)',
    notes: 'Left lateral thigh 4x4cm abscess. Ensure adequate irrigation and loose iodoform packing.',
    status: 'in_progress', // 'waiting', 'in_progress', 'completed'
    queuedAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    startedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 mins ago
    completedAt: null
  },
  {
    id: 'queue-102',
    queueNumber: 'Q-102',
    patientId: 'pat-1002',
    patientName: 'Clara Oswald',
    mrn: 'MRN-4822',
    age: 29,
    gender: 'Female',
    allergies: 'NKDA',
    procedure: 'Wound Debridement & Suturing',
    surgeon: 'Dr. Julian Ross, MBChB',
    room: 'Treatment Suite A',
    priority: 'High',
    anesthesia: 'Digital / Peripheral Nerve Block',
    notes: 'Laceration 4cm deep to subcutaneous tissue. Check flexor tendon excursion before closure.',
    status: 'waiting',
    queuedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    startedAt: null,
    completedAt: null
  },
  {
    id: 'queue-103',
    queueNumber: 'Q-103',
    patientId: 'pat-1003',
    patientName: 'Marcus Brody',
    mrn: 'MRN-4823',
    age: 56,
    gender: 'Male',
    allergies: 'Latex hypersensitivity',
    procedure: 'Lipoma Excision (Subcutaneous)',
    surgeon: 'Dr. Maya Lin, MD',
    room: 'Minor OR Suite 2',
    priority: 'Standard',
    anesthesia: 'Local Infiltration (1% Lidocaine w/ Epi)',
    notes: 'Latex-free gloves and drape required. 4cm lipoma dissection.',
    status: 'waiting',
    queuedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    startedAt: null,
    completedAt: null
  }
];

window.DEFAULT_COMPLETED = [
  {
    id: 'case-comp-01',
    queueNumber: 'Q-100',
    patientId: 'pat-1001',
    patientName: 'Robert Sterling',
    mrn: 'MRN-4821',
    procedure: 'Sebaceous Cyst Removal',
    surgeon: 'Dr. Arthur Vance, MD, FRCS',
    room: 'Minor OR Suite 1',
    priority: 'Standard',
    anesthesia: 'Local Infiltration (1% Lidocaine w/ Epi)',
    sutureType: '4-0 Ethilon (Non-absorbable)',
    specimen: 'Yes - Histopathology Routine',
    postOpNotes: 'Intact capsule excised completely without rupture. Hemostasis confirmed with bipolar electrocautery. Skin closed with 4 vertical mattress sutures.',
    startedAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    durationMinutes: 35
  }
];
