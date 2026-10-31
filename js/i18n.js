/**
 * SurgiFlow - Bilingual i18n Translation Engine (English & ភាសាខ្មែរ)
 * Supports real-time switching, localStorage persistence, and dynamic re-rendering.
 */

const I18N = {
  en: {
    // Brand & App Bar
    app_title: "SURGIFLOW",
    app_tag: "Minor OR v1.2",
    app_subtitle: "Outpatient Surgery & Minor Operating Suite",
    metric_waiting: "Waiting",
    metric_in_or: "In OR",
    metric_completed: "Completed",
    theme_light: "Light",
    theme_dark: "Dark",
    btn_demo: "Demo Data",
    btn_register_patient: "Register Patient",
    btn_queue_surgery: "Queue for Surgery",

    // Navigation Menu
    nav_queue: "Surgery Queue",
    nav_kpi: "KPI Dashboard",
    nav_patients: "Patient List",
    nav_completed: "Completed Cases",
    nav_rooms: "OR Suites & Doctors",
    or_availability: "OR Availability",
    system_time: "System Time:",

    // KPI Dashboard
    kpi_title: "Minor Surgery KPI Dashboard",
    kpi_subtitle: "Real-time clinical throughput, patient waiting times, OR suite utilization, and payment scheme distribution",
    kpi_live_sync: "Live Telemetry Active",
    kpi_total_volume: "Total Case Volume",
    kpi_completion_rate: "Completion Rate",
    kpi_avg_wait: "Avg Patient Wait Time",
    kpi_wait_target_met: "Within Target (<30m)",
    kpi_wait_target_exceeded: "Elevated Wait Time (>30m)",
    kpi_avg_duration: "Avg Surgery Duration",
    kpi_fastest: "Fastest",
    kpi_longest: "Longest",
    kpi_or_utilization: "OR Suite Utilization",
    kpi_rooms_active: "Active Suites",
    kpi_rooms_available: "Available Suites",
    kpi_payment_dist: "Payment Scheme Distribution (HEF / NSSF / CASE)",
    kpi_clinical_safety: "Clinical Safety & Priority Metrics",
    kpi_urgent_stat: "STAT / Urgent Cases Handled",
    kpi_specimens_sent: "Specimens to Pathology",
    kpi_allergy_alerts: "Patients with Allergy Alerts",
    kpi_local_anesthesia: "Local Anesthesia Rate",
    kpi_surgeon_activity: "Attending Surgeons Activity & Caseload",
    kpi_top_procedures: "Top Minor Procedures Frequency",
    kpi_cases_count: "cases",
    kpi_no_data: "No procedure data recorded yet",

    // Surgery Queue Tab
    queue_title: "Active Minor Surgery Queue",
    queue_subtitle: "Track, call to OR, and complete queued outpatient surgical procedures",
    btn_add_to_queue: "Add Patient to Queue",
    filter_all: "All Cases",
    filter_waiting: "Waiting",
    filter_in_progress: "In Surgery",
    priority_all: "All Priorities",
    priority_urgent: "Urgent / STAT",
    priority_high: "High",
    priority_standard: "Standard",
    priority_elective: "Elective",
    placeholder_search_queue: "Search patient, MRN, procedure...",
    th_queue_patient: "Queue # & Patient",
    th_procedure_surgeon: "Procedure & Surgeon",
    th_room_anesthesia: "Suite & Anesthesia",
    th_priority: "Priority",
    th_status_timing: "Status & Timing",
    th_actions: "Actions",
    empty_queue_title: "No Active Surgery Cases in Queue",
    empty_queue_desc: "Queue a registered patient or click \"Demo Data\" above to quickly simulate patients and surgery cases.",
    btn_queue_now: "Queue Patient Now",
    btn_call_to_or: "Call to OR",
    btn_complete_case: "Complete",
    btn_details: "Details",
    btn_cancel: "Cancel",

    // Patient List Tab
    patients_title: "Patient List",
    patients_subtitle: "View outpatient records, register new patients, and manage patient details",
    btn_new_patient: "New Patient",
    placeholder_search_patient: "Search by name, MRN, phone...",
    th_mrn: "MRN",
    th_patient_details: "Patient Details",
    th_demographics: "Demographics",
    th_allergies_notes: "Allergies & Clinical Notes",
    th_surgery_status: "Surgery Status",
    th_action: "Action",
    btn_edit: "Edit",
    btn_delete: "Delete",
    empty_patients_desc: "No patients registered yet. Add a patient above to get started.",
    status_not_queued: "Not Queued",
    status_queued: "Queued",
    status_in_minor_or: "In Minor OR",

    // Completed Cases Tab
    completed_title: "Completed Surgery Cases",
    completed_subtitle: "Historical log of finished small surgeries, procedure durations, and post-op outcomes",
    btn_export_csv: "Export CSV",
    placeholder_search_completed: "Filter completed records...",
    th_case_time: "Case # & Time",
    th_patient: "Patient",
    th_procedure: "Procedure",
    th_surgeon_room: "Surgeon & OR",
    th_duration: "Duration",
    th_postop_specimen: "Post-Op Notes & Specimen",
    th_summary: "Summary",
    btn_summary_sheet: "Summary Sheet",
    empty_completed_desc: "No surgery cases completed yet today.",

    // Rooms & Surgeons Tab
    rooms_title: "Minor OR Suites & Medical Staff",
    rooms_subtitle: "Real-time status of procedure rooms and attending surgical practitioners",
    surgeons_heading: "Attending Surgeons & Practitioners",
    status_occupied: "● SURGERY ACTIVE",
    status_available: "✓ AVAILABLE",
    room_equipped_desc: "Equipped for local anesthesia, electrocautery, and sterile minor sets.",

    // Modal: Queue Patient for Minor Surgery
    modal_queue_title: "Queue Patient for Minor Surgery",
    modal_queue_sub: "Search patient from list, enter diagnosis, indication, and priority",
    label_search_patient: "Search Patient from Patient List *",
    search_sub_hint: "(Select below or type to filter)",
    placeholder_queue_search: "Type patient name, MRN, or phone number to search list...",
    btn_change_patient: "Change Patient",
    allergies_label: "Allergies:",
    preop_history_label: "Pre-Op History:",
    label_diagnostic: "Diagnostic / Diagnosis *",
    placeholder_diagnostic: "e.g. Abscess, Sebaceous Cyst, Wound Laceration, Lipoma...",
    label_indication: "Indication *",
    placeholder_indication: "e.g. Pain & swelling, drainage, secondary infection risk, biopsy...",
    label_priority: "Case Priority *",
    btn_confirm_queue: "Add to Queue List",

    // Walk-in Section
    walkin_banner_title: "Walk-in Patient Instant Intake",
    walkin_banner_sub: "This patient will be registered into the Patient List and placed in the Surgery Queue simultaneously.",
    label_full_name: "Patient Full Name *",
    placeholder_name: "e.g. Samuel Green",
    label_age: "Age *",
    label_gender: "Gender *",
    select_gender: "Select Gender",
    opt_female: "Female",
    opt_male: "Male",
    opt_other: "Other",
    label_phone: "Contact Phone *",
    label_blood_type: "Blood Type",
    label_payment_type: "Payment Type / Scheme *",
    opt_payment_hef: "HEF (Health Equity Fund)",
    opt_payment_nssf: "NSSF (National Social Security)",
    opt_payment_case: "CASE (Case Payment / Cash)",
    th_payment_type: "Payment Type",
    payment_type_label: "Payment:",
    label_allergies: "Known Allergies / Medical Alerts",
    placeholder_allergies: "e.g. Penicillin, Latex (or type 'NKDA')",
    label_preop_notes: "Pre-Op Assessment / Medical History",
    placeholder_preop_notes: "Brief history, vital signs, fasting status...",

    // Modal: Patient Registration
    modal_patient_title: "Register Patient for Minor Surgery",
    modal_patient_sub: "Enter outpatient identity, demographics, blood type, and allergy history",
    placeholder_patient_notes: "Brief medical history, chronic conditions, current medication...",
    btn_confirm_register: "Confirm & Register",

    // Modal: Edit Patient
    modal_edit_title: "Edit Patient Information",
    modal_edit_sub: "Update clinical outpatient record and demographics",
    btn_save_changes: "Save Changes",

    // Modal: Complete Surgery Case
    modal_complete_title: "Complete Surgery Case",
    modal_complete_sub: "Finalize case records, specimen routing, and post-op disposition",
    label_closure_type: "Closure / Suture Type *",
    label_specimen: "Specimen for Histopathology *",
    label_postop_notes: "Post-Operative Surgeon Notes",
    placeholder_postop_notes: "Hemostasis achieved; wound irrigated; dressing applied; patient instructed on wound care...",
    btn_confirm_complete: "Confirm & Complete Surgery",

    // Modal: Details & Summaries
    details_title: "Surgical Case Summary Sheet",
    btn_print: "Print Summary",
    btn_close: "Close",

    // Common
    btn_cancel_text: "Cancel",
    years_old: "years old",
    blood: "Blood:",
    surgeon: "Surgeon:",
    or_room: "OR:",
    duration: "Duration:",
    mins: "min",
    elapsed_time: "Elapsed Time:",
    already_queued: "Already Queued",
    add_queue_direct: "+ Add to Queue",
    register_new_patient_prompt: "+ Register as New Patient",
    no_patient_match: "No matching patient found in list for",
    closure: "Closure:",
    pathology: "Pathology:",
    none: "None",
    minutes: "minutes"
  },

  km: {
    // Brand & App Bar
    app_title: "SURGIFLOW",
    app_tag: "បន្ទប់វះកាត់តូច v1.2",
    app_subtitle: "បន្ទប់វះកាត់តូច និងផ្នែកព្យាបាលអ្នកជំងឺក្រៅ",
    metric_waiting: "កំពុងរង់ចាំ",
    metric_in_or: "កំពុងវះកាត់",
    metric_completed: "បានបញ្ចប់",
    theme_light: "ពន្លឺ",
    theme_dark: "ងងឹត",
    btn_demo: "ទិន្នន័យគំរូ",
    btn_register_patient: "ចុះឈ្មោះអ្នកជំងឺ",
    btn_queue_surgery: "ដាក់ចូលជួរវះកាត់",

    // Navigation Menu
    nav_queue: "ជួរវះកាត់",
    nav_kpi: "ផ្ទាំងព័ត៌មាន KPI",
    nav_patients: "បញ្ជីអ្នកជំងឺ",
    nav_completed: "ករណីបានបញ្ចប់",
    nav_rooms: "បន្ទប់វះកាត់ និងគ្រូពេទ្យ",
    or_availability: "ស្ថានភាពបន្ទប់វះកាត់",
    system_time: "ម៉ោងប្រព័ន្ធ:",

    // KPI Dashboard
    kpi_title: "ផ្ទាំងព័ត៌មានតាមដានសូចនាករគន្លឹះ (KPI Dashboard)",
    kpi_subtitle: "តាមដានបរិមាណវះកាត់ រយៈពេលរង់ចាំ ការប្រើប្រាស់បន្ទប់វះកាត់ និងប្រភេទការទូទាត់ជាក់ស្តែង",
    kpi_live_sync: "ទិន្នន័យជាក់ស្តែងសកម្ម",
    kpi_total_volume: "ចំនួនករណីវះកាត់សរុប",
    kpi_completion_rate: "អត្រាបញ្ចប់ការវះកាត់",
    kpi_avg_wait: "រយៈពេលរង់ចាំជាមធ្យម",
    kpi_wait_target_met: "ស្របតាមគោលដៅ (<៣០នាទី)",
    kpi_wait_target_exceeded: "លើសពីគោលដៅ (>៣០នាទី)",
    kpi_avg_duration: "រយៈពេលវះកាត់ជាមធ្យម",
    kpi_fastest: "លឿនបំផុត",
    kpi_longest: "យូរបំផុត",
    kpi_or_utilization: "អត្រាប្រើប្រាស់បន្ទប់វះកាត់ OR",
    kpi_rooms_active: "បន្ទប់កំពុងប្រើប្រាស់",
    kpi_rooms_available: "បន្ទប់ទំនេរ",
    kpi_payment_dist: "ការបែងចែកប្រភេទការទូទាត់ (HEF / NSSF / CASE)",
    kpi_clinical_safety: "សូចនាករសុវត្ថិភាព និងអាទិភាពគ្លីនិក",
    kpi_urgent_stat: "ករណីបន្ទាន់បំផុត / STAT",
    kpi_specimens_sent: "វត្ថុវិភាគផ្ញើកោសល្យវិច័យ",
    kpi_allergy_alerts: "អ្នកជំងឺមានប្រវត្តិប្រតិកម្មថ្នាំ",
    kpi_local_anesthesia: "អត្រាចាក់ថ្នាំស្ពឹក",
    kpi_surgeon_activity: "បន្ទុកការងារគ្រូពេទ្យវះកាត់",
    kpi_top_procedures: "ប្រភេទការវះកាត់តូចញឹកញាប់",
    kpi_cases_count: "ករណី",
    kpi_no_data: "មិនទាន់មានទិន្នន័យនៅឡើយទេ",

    // Surgery Queue Tab
    queue_title: "ជួរវះកាត់តូចសកម្ម",
    queue_subtitle: "តាមដាន ហៅចូលបន្ទប់វះកាត់ និងបញ្ចប់ការវះកាត់តូចអ្នកជំងឺក្រៅ",
    btn_add_to_queue: "បន្ថែមអ្នកជំងឺចូលជួរវះកាត់",
    filter_all: "ករណីទាំងអស់",
    filter_waiting: "កំពុងរង់ចាំ",
    filter_in_progress: "កំពុងវះកាត់",
    priority_all: "អាទិភាពទាំងអស់",
    priority_urgent: "បន្ទាន់បំផុត / STAT",
    priority_high: "ខ្ពស់",
    priority_standard: "ធម្មតា",
    priority_elective: "តាមការគ្រោងទុក",
    placeholder_search_queue: "ស្វែងរកអ្នកជំងឺ, លេខកូដ MRN, ការវះកាត់...",
    th_queue_patient: "លេខជួរ & អ្នកជំងឺ",
    th_procedure_surgeon: "ការវះកាត់ & គ្រូពេទ្យវះកាត់",
    th_room_anesthesia: "បន្ទប់ & ថ្នាំស្ពឹក",
    th_priority: "អាទិភាព",
    th_status_timing: "ស្ថានភាព & ពេលវេលា",
    th_actions: "សកម្មភាព",
    empty_queue_title: "មិនទាន់មានករណីវះកាត់ក្នុងជួរនៅឡើយទេ",
    empty_queue_desc: "សូមដាក់អ្នកជំងឺដែលបានចុះឈ្មោះចូលជួរ ឬចុច \"ទិន្នន័យគំរូ\" ខាងលើដើម្បីសាកល្បងដំណើរការ។",
    btn_queue_now: "ដាក់អ្នកជំងឺចូលជួរឥឡូវនេះ",
    btn_call_to_or: "ហៅចូលបន្ទប់",
    btn_complete_case: "បញ្ចប់",
    btn_details: "ព័ត៌មានលម្អិត",
    btn_cancel: "បោះបង់",

    // Patient List Tab
    patients_title: "បញ្ជីអ្នកជំងឺ",
    patients_subtitle: "មើលកំណត់ត្រាអ្នកជំងឺក្រៅ ចុះឈ្មោះអ្នកជំងឺថ្មី និងគ្រប់គ្រងព័ត៌មានអ្នកជំងឺ",
    btn_new_patient: "អ្នកជំងឺថ្មី",
    placeholder_search_patient: "ស្វែងរកតាមឈ្មោះ, លេខកូដ MRN, លេខទូរស័ព្ទ...",
    th_mrn: "លេខកូដ MRN",
    th_patient_details: "ព័ត៌មានអ្នកជំងឺ",
    th_demographics: "ព័ត៌មានប្រជាសាស្ត្រ",
    th_allergies_notes: "ប្រវត្តិប្រតិកម្មថ្នាំ & កំណត់ត្រាគ្លីនិក",
    th_surgery_status: "ស្ថានភាពវះកាត់",
    th_action: "សកម្មភាព",
    btn_edit: "កែប្រែ",
    btn_delete: "លុប",
    empty_patients_desc: "មិនទាន់មានអ្នកជំងឺចុះឈ្មោះនៅឡើយទេ។ សូមចុចបន្ថែមអ្នកជំងឺខាងលើដើម្បីចាប់ផ្តើម។",
    status_not_queued: "មិនទាន់ចូលជួរ",
    status_queued: "ក្នុងជួរវះកាត់",
    status_in_minor_or: "ក្នុងបន្ទប់វះកាត់",

    // Completed Cases Tab
    completed_title: "ករណីវះកាត់ដែលបានបញ្ចប់",
    completed_subtitle: "កំណត់ត្រាប្រវត្តិការវះកាត់តូច រយៈពេលវះកាត់ និងលទ្ធផលក្រោយវះកាត់",
    btn_export_csv: "ទាញយក CSV",
    placeholder_search_completed: "ស្វែងរកកំណត់ត្រាដែលបានបញ្ចប់...",
    th_case_time: "លេខករណី & ពេលវេលា",
    th_patient: "អ្នកជំងឺ",
    th_procedure: "ការវះកាត់",
    th_surgeon_room: "គ្រូពេទ្យ & បន្ទប់វះកាត់",
    th_duration: "រយៈពេល",
    th_postop_specimen: "កំណត់ត្រាក្រោយវះកាត់ & វត្ថុវិភាគ",
    th_summary: "សង្ខេប",
    btn_summary_sheet: "សន្លឹកសង្ខេប",
    empty_completed_desc: "មិនទាន់មានករណីវះកាត់ដែលបានបញ្ចប់នៅថ្ងៃនេះនៅឡើយទេ។",

    // Rooms & Surgeons Tab
    rooms_title: "បន្ទប់វះកាត់តូច និងបុគ្គលិកវេជ្ជសាស្ត្រ",
    rooms_subtitle: "ស្ថានភាពជាក់ស្តែងនៃបន្ទប់វះកាត់ និងគ្រូពេទ្យឯកទេសទទួលបន្ទុក",
    surgeons_heading: "គ្រូពេទ្យវះកាត់ និងបុគ្គលិកទទួលបន្ទុក",
    status_occupied: "● កំពុងវះកាត់",
    status_available: "✓ ទំនេរ",
    room_equipped_desc: "បំពាក់ឧបករណ៍គ្រប់គ្រាន់សម្រាប់ចាក់ថ្នាំស្ពឹក កាត់ដុតដោយចរន្តអគ្គិសនី និងឧបករណ៍វះកាត់តូចស្អាតមេរោគ។",

    // Modal: Queue Patient for Minor Surgery
    modal_queue_title: "ដាក់អ្នកជំងឺចូលជួរវះកាត់តូច",
    modal_queue_sub: "ស្វែងរកអ្នកជំងឺពីបញ្ជី បញ្ចូលរោគវិនិច្ឆ័យ សូចនាករ និងកម្រិតអាទិភាព",
    label_search_patient: "ស្វែងរកអ្នកជំងឺពីបញ្ជីអ្នកជំងឺ *",
    search_sub_hint: "(ជ្រើសរើសខាងក្រោម ឬវាយដើម្បីស្វែងរក)",
    placeholder_queue_search: "វាយឈ្មោះអ្នកជំងឺ, លេខកូដ MRN, ឬលេខទូរស័ព្ទដើម្បីស្វែងរក...",
    btn_change_patient: "ប្តូរអ្នកជំងឺ",
    allergies_label: "ប្រតិកម្មថ្នាំ:",
    preop_history_label: "ប្រវត្តិមុនវះកាត់:",
    label_diagnostic: "រោគវិនិច្ឆ័យ (Diagnostic) *",
    placeholder_diagnostic: "ឧ. បូស, គីសស្បែក, របួសរហែក, ដុំខ្លាញ់...",
    label_indication: "សូចនាករគ្លីនិក (Indication) *",
    placeholder_indication: "ឧ. ឈឺចាប់ & ហើម, ហូរខ្ទុះ, ប្រឈមការឆ្លងរោគ, ច្រឹបសាច់...",
    label_priority: "កម្រិតអាទិភាព *",
    btn_confirm_queue: "បន្ថែមចូលជួរវះកាត់",

    // Walk-in Section
    walkin_banner_title: "ការចុះឈ្មោះអ្នកជំងឺមកផ្ទាល់ភ្លាមៗ",
    walkin_banner_sub: "អ្នកជំងឺនេះនឹងត្រូវបានចុះឈ្មោះក្នុងបញ្ជីអ្នកជំងឺ និងដាក់ចូលជួរវះកាត់ក្នុងពេលតែមួយ។",
    label_full_name: "ឈ្មោះពេញរបស់អ្នកជំងឺ *",
    placeholder_name: "ឧ. សុខា ចាន់",
    label_age: "អាយុ *",
    label_gender: "ភេទ *",
    select_gender: "ជ្រើសរើសភេទ",
    opt_female: "ស្រី",
    opt_male: "ប្រុស",
    opt_other: "ផ្សេងទៀត",
    label_phone: "លេខទូរស័ព្ទទំនាក់ទំនង *",
    label_blood_type: "ប្រភេទឈាម",
    label_payment_type: "ប្រភេទការទូទាត់ (Payment Type) *",
    opt_payment_hef: "មូលនិធិសមធម៌ (HEF)",
    opt_payment_nssf: "ប.ស.ស. (NSSF)",
    opt_payment_case: "បង់ថ្លៃសេវា (CASE)",
    th_payment_type: "ការទូទាត់",
    payment_type_label: "ការទូទាត់:",
    label_allergies: "ប្រវត្តិប្រតិកម្មថ្នាំ / ការប្រុងប្រយ័ត្ន",
    placeholder_allergies: "ឧ. ប៉េនីស៊ីលីន, ជ័រកៅស៊ូ (ឬវាយ 'គ្មាន')",
    label_preop_notes: "ការវាយតម្លៃមុនវះកាត់ / ប្រវត្តិជំងឺ",
    placeholder_preop_notes: "ប្រវត្តិជំងឺសង្ខេប, សញ្ញាជីវិត, ស្ថានភាពតមអាហារ...",

    // Modal: Patient Registration
    modal_patient_title: "ចុះឈ្មោះអ្នកជំងឺសម្រាប់វះកាត់តូច",
    modal_patient_sub: "បញ្ចូលអត្តសញ្ញាណអ្នកជំងឺក្រៅ ព័ត៌មានប្រជាសាស្ត្រ ប្រភេទឈាម និងប្រវត្តិប្រតិកម្មថ្នាំ",
    placeholder_patient_notes: "ប្រវត្តិជំងឺសង្ខេប, ជំងឺប្រចាំកាយ, ថ្នាំកំពុងប្រើប្រាស់...",
    btn_confirm_register: "បញ្ជាក់ & ចុះឈ្មោះ",

    // Modal: Edit Patient
    modal_edit_title: "កែប្រែព័ត៌មានអ្នកជំងឺ",
    modal_edit_sub: "កែប្រែកំណត់ត្រាគ្លីនិក និងព័ត៌មានប្រជាសាស្ត្ររបស់អ្នកជំងឺ",
    btn_save_changes: "រក្សាទុកការកែប្រែ",

    // Modal: Complete Surgery Case
    modal_complete_title: "បញ្ចប់ករណីវះកាត់",
    modal_complete_sub: "កត់ត្រាលទ្ធផលចុងក្រោយ វត្ថុវិភាគ និងការណែនាំក្រោយវះកាត់",
    label_closure_type: "ប្រភេទដេរភ្ជាប់មុខរបួស *",
    label_specimen: "វត្ថុវិភាគផ្ញើកោសល្យវិច័យ *",
    label_postop_notes: "កំណត់ត្រារបស់គ្រូពេទ្យក្រោយវះកាត់",
    placeholder_postop_notes: "ការហូរឈាមត្រូវបានបញ្ឈប់; លាងសម្អាតមុខរបួស; បានរុំបង់ស្អាត; បានណែនាំអ្នកជំងឺពីការថែទាំមុខរបួស...",
    btn_confirm_complete: "បញ្ជាក់ & បញ្ចប់ការវះកាត់",

    // Modal: Details & Summaries
    details_title: "សន្លឹកសង្ខេបករណីវះកាត់",
    btn_print: "បោះពុម្ពសន្លឹកសង្ខេប",
    btn_close: "បិទ",

    // Common
    btn_cancel_text: "បោះបង់",
    years_old: "ឆ្នាំ",
    blood: "ឈាម:",
    surgeon: "គ្រូពេទ្យ:",
    or_room: "បន្ទប់:",
    duration: "រយៈពេល:",
    mins: "នាទី",
    elapsed_time: "រយៈពេលកន្លងទៅ:",
    already_queued: "បានដាក់ក្នុងជួរ",
    add_queue_direct: "+ បន្ថែមចូលជួរ",
    register_new_patient_prompt: "+ ចុះឈ្មោះជាអ្នកជំងឺថ្មី",
    no_patient_match: "រកមិនឃើញអ្នកជំងឺដែលត្រូវគ្នានៅក្នុងបញ្ជីសម្រាប់",
    closure: "ការដេរភ្ជាប់:",
    pathology: "កោសល្យវិច័យ:",
    none: "គ្មាន",
    minutes: "នាទី"
  }
};

// Procedure localized names
const PROCEDURE_TRANSLATIONS = {
  "Abscess Incision & Drainage": {
    en: "Abscess Incision & Drainage",
    km: "វះ និងបង្ហូរខ្ទុះ (Abscess Incision & Drainage)"
  },
  "Lipoma Excision (Subcutaneous)": {
    en: "Lipoma Excision (Subcutaneous)",
    km: "វះកាត់ដុំខ្លាញ់ក្រោមស្បែក (Lipoma Excision)"
  },
  "Sebaceous Cyst Removal": {
    en: "Sebaceous Cyst Removal",
    km: "វះកាត់ដុំគីសស្បែក (Sebaceous Cyst Removal)"
  },
  "Wound Debridement & Suturing": {
    en: "Complex Wound Debridement & Primary Suturing",
    km: "សម្អាតមុខរបួសស្មុគស្មាញ និងដេរភ្ជាប់ (Wound Debridement)"
  },
  "Punch / Shave Skin Biopsy": {
    en: "Punch / Shave Skin Biopsy",
    km: "ច្រឹបយកសាច់ស្បែកវិភាគ (Skin Biopsy)"
  },
  "Ingrown Toenail Wedge Resection": {
    en: "Ingrown Toenail Partial Matrixectomy",
    km: "វះកាត់ក្រចកចាក់សាច់ (Ingrown Toenail Resection)"
  },
  "Foreign Body Removal (Soft Tissue)": {
    en: "Foreign Body Removal (Soft Tissue)",
    km: "វះយកវត្ថុប្លែកចេញពីសាច់ (Foreign Body Removal)"
  },
  "Scar Revision / Minor Excision": {
    en: "Scar Revision / Minor Excision",
    km: "កែសម្រួលស្លាកស្នាម / កាត់សាច់តូច (Scar Revision)"
  },
  "Other Minor Surgical Procedure": {
    en: "Other Minor Surgical Procedure...",
    km: "ការវះកាត់តូចផ្សេងទៀត..."
  }
};

// Priority localized names
const PRIORITY_TRANSLATIONS = {
  "Standard": { en: "Standard", km: "ធម្មតា (Standard)" },
  "High": { en: "High", km: "ខ្ពស់ (High)" },
  "Urgent": { en: "Urgent / STAT", km: "បន្ទាន់បំផុត / STAT" },
  "Elective": { en: "Elective", km: "តាមការគ្រោងទុក (Elective)" }
};

// Current active language: default from localStorage or 'en'
let currentLang = localStorage.getItem('surgiflow_lang') || 'en';

/**
 * Translate a key into the active language
 */
function t(key, fallback = '') {
  if (I18N[currentLang] && I18N[currentLang][key]) {
    return I18N[currentLang][key];
  }
  if (I18N.en && I18N.en[key]) {
    return I18N.en[key];
  }
  return fallback || key;
}

/**
 * Get localized procedure name
 */
function localizeProcedure(procName) {
  if (!procName) return '';
  if (PROCEDURE_TRANSLATIONS[procName]) {
    return PROCEDURE_TRANSLATIONS[procName][currentLang] || procName;
  }
  return procName;
}

/**
 * Get localized priority name
 */
function localizePriority(priorityName) {
  if (!priorityName) return '';
  if (PRIORITY_TRANSLATIONS[priorityName]) {
    return PRIORITY_TRANSLATIONS[priorityName][currentLang] || priorityName;
  }
  return priorityName;
}

/**
 * Switch Application Language ('en' or 'km')
 */
function setLanguage(lang) {
  currentLang = (lang === 'km') ? 'km' : 'en';
  localStorage.setItem('surgiflow_lang', currentLang);

  // Update HTML tag attribute
  document.documentElement.lang = currentLang;

  // Toggle Khmer typography class on body
  if (currentLang === 'km') {
    document.body.classList.add('lang-km');
  } else {
    document.body.classList.remove('lang-km');
  }

  // Update Language Switcher Buttons
  const btnEn = document.getElementById('btnLangEn');
  const btnKm = document.getElementById('btnLangKm');
  if (btnEn && btnKm) {
    if (currentLang === 'km') {
      btnKm.classList.add('active');
      btnEn.classList.remove('active');
    } else {
      btnEn.classList.add('active');
      btnKm.classList.remove('active');
    }
  }

  // Translate all DOM elements marked with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (translation) {
      el.textContent = translation;
    }
  });

  // Translate input placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = t(key);
    if (translation) {
      el.placeholder = translation;
    }
  });

  // Translate element titles/tooltips
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const translation = t(key);
    if (translation) {
      el.title = translation;
    }
  });

  // Update theme toggle text
  const themeText = document.getElementById('themeText');
  if (themeText) {
    const isDark = document.body.classList.contains('dark-mode');
    themeText.textContent = isDark ? t('theme_dark') : t('theme_light');
  }

  // Re-populate dropdowns with localized text
  if (typeof populateDropdowns === 'function') {
    populateDropdowns();
  }

  // Re-render UI views if app is initialized
  if (typeof renderAll === 'function') {
    renderAll();
  }
}

/**
 * Initialize Language Switcher Controls
 */
function initLanguageSwitcher() {
  const btnEn = document.getElementById('btnLangEn');
  const btnKm = document.getElementById('btnLangKm');

  if (btnEn) {
    btnEn.addEventListener('click', () => {
      if (currentLang !== 'en') {
        setLanguage('en');
        if (typeof showToast === 'function') {
          showToast('Language switched to English', 'success');
        }
      }
    });
  }

  if (btnKm) {
    btnKm.addEventListener('click', () => {
      if (currentLang !== 'km') {
        setLanguage('km');
        if (typeof showToast === 'function') {
          showToast('បានប្តូរភាសាទៅជា ភាសាខ្មែរ', 'success');
        }
      }
    });
  }

  // Apply saved language on load
  setLanguage(currentLang);
}

// Expose globals
window.I18N = I18N;
window.currentLang = currentLang;
window.t = t;
window.setLanguage = setLanguage;
window.localizeProcedure = localizeProcedure;
window.localizePriority = localizePriority;
window.initLanguageSwitcher = initLanguageSwitcher;

