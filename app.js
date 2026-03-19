// SmartUrbanity Workshop — app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore(initializeApp({
  apiKey: "AIzaSyBNfMRTa3ssqgHQgYoZjMkgt2EDRFwFCH8",
  authDomain: "smarturbanity-workshop.firebaseapp.com",
  projectId: "smarturbanity-workshop",
  storageBucket: "smarturbanity-workshop.firebasestorage.app",
  messagingSenderId: "459481021725",
  appId: "1:459481021725:web:1d0abf27ac913297a8f5f4"
}));

// ── TRANSLATIONS ──
const T = {
  en: {
    header_sub: "EU DUT Partnership · Ideas Workshop",
    nav_about: "🏙️ About", nav_citizen: "📱 Citizen App", nav_dss: "🧭 DSS Platform", nav_access: "🗺️ Accessibility",
    about_title: "Building the Future of Urban Mobility",
    about_subtitle: "SmartUrbanity is a European initiative transforming cities into 15-minute places — where daily needs are reachable within a short walk or cycle. We put citizens at the heart of urban planning through digital tools and community engagement.",
    card_mission_title: "Our Mission", card_mission_text: "Enhance urban accessibility, inclusivity, and sustainability by integrating citizens directly into the planning process through a citizen-centric digital framework.",
    card_timeline_title: "Project Timeline", card_timeline_text: "Running from January 2025 to December 2027, with pilot testing across 5 European cities and the Greater Zurich Area.",
    card_zhaw_title: "ZHAW's Role", card_zhaw_text: "ZHAW leads WP6 Dissemination and the Thurgau pilot, using MATSim agent-based modeling for DRT-PT integration with PostAuto AG.",
    card_tools_title: "Three Digital Tools", card_tools_text: "The toolkit includes a Citizen Engagement App, an Accessibility Analysis Platform, and a Decision Support System for evidence-based policymaking.",
    pilot_title: "Pilot Cities",
    share_title: "Share Your Ideas",
    share_text: "This workshop is your chance to shape SmartUrbanity's tools. Use the tabs above to share your ideas — they are saved permanently and visible to everyone.<br><br>💡 <strong>Tip:</strong> After submitting, you can <strong>edit or delete your own ideas</strong> using the buttons on your submissions.<br><br>",
    session_tag: "Brainstorming Session",
    citizen_title: "Citizen Engagement App", citizen_desc: "A mobile app that brings citizens into the urban planning process. Users can report issues, track daily trips, share insights on safety and accessibility, and contribute to a data-rich understanding of mobility.",
    dss_title: "Decision Support System (DSS)", dss_desc: "A platform for policymakers to evaluate urban mobility interventions using agent-based models and data from the Citizen Engagement App. It helps assess demographic impacts, costs, equity, and urgency of transport decisions.",
    access_title: "Accessibility Analysis Platform", access_desc: "A WebGIS platform for visualizing accessibility data across communities. Features interactive maps, heatmaps, demographic filters, and community forums for upvoting transport issues and co-creating urban solutions.",
    submit_title: "Submit Your Idea",
    guided_label: "Guided Questions",
    gq_placeholder: "Select a question to get inspired…",
    gq_fill_btn: "Use this question as my starting point",
    gq_clear: "Clear selection — back to default",
    question_ref: "Question",
    guided_optional: "(optional)",
    category_label: "Category", idea_label: "Your idea or comment", idea_placeholder: "Write your idea here...",
    tag_idea: "💡 Idea", tag_feature: "⭐ Feature", tag_concern: "⚠️ Concern", tag_question: "❓ Question",
    submit_btn: "Submit Idea →", wall_title: "Ideas shared so far",
    status_connecting: "Connecting...", status_live: "Live — ideas saved in real time", status_error: "Connection error — try refreshing",
    loading: "Loading ideas...", empty: "No ideas yet — be the first!",
    mine_label: "· your idea", edit_btn: "✏️ Edit", delete_btn: "🗑️ Delete",
    edit_title: "✏️ Edit your idea", cancel_btn: "Cancel", save_btn: "Save changes",
    toast_submit: "✅ Your idea has been submitted! Thank you.", toast_update: "✅ Your idea has been updated!", toast_delete: "🗑️ Your idea has been deleted.",
    confirm_delete: "Are you sure you want to delete this idea?",
    citizen_questions: [
      "Which features within the app would you find most helpful?",
      "What would motivate you to use the app regularly?",
      "What would make this app trustworthy for you?",
      "What could make this app more accessible for different people and needs?",
      "Which gamification elements would make you use the app more frequently?"
    ],
    dss_questions: [
      "What would this platform need to offer for you to consider it reliable and usable? What features would you like to see?",
      "How could citizen contributions realistically be integrated into your current planning workflows?",
      "At which stage of your decision-making process could such a tool be most useful?",
      "What are the biggest obstacles to adopting such a tool into your workflows?",
      "How do you assess the possibility of citizen participation?"
    ],
    access_questions: [
      "Which aspects of accessibility are most important in your daily life or work?",
      "Which of these aspects would need to be represented on the platform?",
      "Which filters / profiles / heatmaps should be taken into account?",
      "How should citizen feedback be incorporated into the assessment of accessibility?",
      "What types of user data would you share — or not share — on the platform?",
      "What additional features would you like to see?"
    ]
  },
  de: {
    header_sub: "EU DUT Partnerschaft · Ideen-Workshop",
    nav_about: "🏙️ Über uns", nav_citizen: "📱 Citizen App", nav_dss: "🧭 DSS Platform", nav_access: "🗺️ Accessibility",
    about_title: "Die Zukunft der städtischen Mobilität gestalten",
    about_subtitle: "SmartUrbanity ist eine europäische Initiative, die Städte in 15-Minuten-Orte verwandelt — wo tägliche Bedürfnisse in kurzer Gehweite erreichbar sind. Wir stellen die Bürgerinnen und Bürger in den Mittelpunkt der Stadtplanung.",
    card_mission_title: "Unsere Mission", card_mission_text: "Verbesserung der städtischen Erreichbarkeit, Inklusivität und Nachhaltigkeit durch die direkte Einbeziehung der Bürger in den Planungsprozess.",
    card_timeline_title: "Projektzeitraum", card_timeline_text: "Von Januar 2025 bis Dezember 2027 mit Pilottests in 5 europäischen Städten und der Grossregion Zürich.",
    card_zhaw_title: "Rolle der ZHAW", card_zhaw_text: "Die ZHAW leitet WP6 Verbreitung und das Thurgau-Pilotprojekt mit MATSim-agentenbasierter Modellierung für die DRT-ÖV-Integration mit PostAuto AG.",
    card_tools_title: "Drei digitale Werkzeuge", card_tools_text: "Das Toolkit umfasst eine Bürger-Engagement-App, eine Erreichbarkeitsanalyseplattform und ein Entscheidungsunterstützungssystem.",
    pilot_title: "Pilotstädte",
    share_title: "Teilen Sie Ihre Ideen",
    share_text: "Dieser Workshop ist Ihre Chance, die SmartUrbanity-Tools mitzugestalten. Nutzen Sie die Registerkarten oben, um Ihre Ideen zu teilen.<br><br>💡 <strong>Tipp:</strong> Nach dem Einreichen können Sie Ihre eigenen Ideen <strong>bearbeiten oder löschen</strong>.<br><br>",
    session_tag: "Brainstorming-Sitzung",
    citizen_title: "Citizen Engagement App", citizen_desc: "Eine mobile App, die Bürgerinnen und Bürger in den Stadtplanungsprozess einbindet. Nutzer können Probleme melden, tägliche Fahrten verfolgen und Einblicke zu Sicherheit und Erreichbarkeit teilen.",
    dss_title: "Decision Support System (DSS)", dss_desc: "Eine Plattform für Entscheidungsträger zur Bewertung von Eingriffen in die städtische Mobilität mit agentenbasierten Modellen. Sie hilft bei der Bewertung demografischer Auswirkungen, Kosten und Dringlichkeit.",
    access_title: "Accessibility Analysis Platform", access_desc: "Eine WebGIS-Plattform zur Visualisierung von Erreichbarkeitsdaten in Gemeinden mit interaktiven Karten, Heatmaps und demografischen Filtern.",
    submit_title: "Ihre Idee einreichen",
    guided_label: "Leitfragen",
    gq_placeholder: "Wählen Sie eine Frage als Inspiration…",
    gq_fill_btn: "Diese Frage als Ausgangspunkt verwenden",
    gq_clear: "Auswahl aufheben — zurück zur Standardansicht",
    question_ref: "Frage",
    guided_optional: "(optional)",
    category_label: "Kategorie", idea_label: "Ihre Idee oder Ihr Kommentar", idea_placeholder: "Schreiben Sie hier Ihre Idee...",
    tag_idea: "💡 Idee", tag_feature: "⭐ Funktion", tag_concern: "⚠️ Bedenken", tag_question: "❓ Frage",
    submit_btn: "Idee einreichen →", wall_title: "Bisher geteilte Ideen",
    status_connecting: "Verbinde...", status_live: "Live — Ideen werden in Echtzeit gespeichert", status_error: "Verbindungsfehler — Bitte neu laden",
    loading: "Ideen werden geladen...", empty: "Noch keine Ideen — seien Sie der Erste!",
    mine_label: "· Ihre Idee", edit_btn: "✏️ Bearbeiten", delete_btn: "🗑️ Löschen",
    edit_title: "✏️ Ihre Idee bearbeiten", cancel_btn: "Abbrechen", save_btn: "Änderungen speichern",
    toast_submit: "✅ Ihre Idee wurde eingereicht! Danke.", toast_update: "✅ Ihre Idee wurde aktualisiert!", toast_delete: "🗑️ Ihre Idee wurde gelöscht.",
    confirm_delete: "Möchten Sie diese Idee wirklich löschen?",
    citizen_questions: [
      "Welche Funktionen innerhalb der App fänden Sie am hilfreichsten?",
      "Was würde Sie motivieren, die App regelmäßig zu verwenden?",
      "Was würde diese App für Sie vertrauenswürdig machen?",
      "Was könnte diese App für verschiedene Menschen und Bedürfnisse zugänglicher machen?",
      "Welche Gamification-Elemente würden Sie die App häufiger nutzen lassen?"
    ],
    dss_questions: [
      "Was müsste diese Plattform bieten, damit Sie sie als zuverlässig und nutzbar erachten? Welche Funktionen wünschen Sie sich?",
      "Wie könnten Beiträge der Bürger*innen realistisch in Ihre aktuellen Planungsabläufe integriert werden?",
      "In welcher Phase Ihres Entscheidungsprozesses könnte ein solches Werkzeug am nützlichsten sein?",
      "Was sind die größten Hindernisse für die Einführung eines solchen Werkzeugs in Ihre Arbeitsabläufe?",
      "Wie bewerten Sie die Möglichkeit der Teilhabe von Bürger*innen?"
    ],
    access_questions: [
      "Welche Aspekte der Erreichbarkeit sind in Ihrem Alltag oder Ihrer Arbeit am wichtigsten?",
      "Welche dieser Aspekte müssten auf der Plattform abgebildet werden?",
      "Welche Filter/Profile/Heatmaps sollen berücksichtigt werden?",
      "Wie sollte das Feedback der Bürger*innen in die Bewertung der Erreichbarkeit einfließen?",
      "Welche Art von Benutzendendaten würden Sie auf der Plattform teilen oder nicht teilen?",
      "Welche zusätzlichen Funktionen würden Sie gerne sehen?"
    ]
  },
  fr: {
    header_sub: "Partenariat EU DUT · Atelier d'idées",
    nav_about: "🏙️ À propos", nav_citizen: "📱 Citizen App", nav_dss: "🧭 DSS Platform", nav_access: "🗺️ Accessibility",
    about_title: "Construire l'avenir de la mobilité urbaine",
    about_subtitle: "SmartUrbanity est une initiative européenne transformant les villes en lieux à 15 minutes — où les besoins quotidiens sont accessibles à pied ou à vélo. Nous plaçons les citoyens au cœur de la planification urbaine.",
    card_mission_title: "Notre Mission", card_mission_text: "Améliorer l'accessibilité, l'inclusivité et la durabilité urbaines en intégrant les citoyens directement dans le processus de planification.",
    card_timeline_title: "Calendrier du projet", card_timeline_text: "De janvier 2025 à décembre 2027, avec des tests pilotes dans 5 villes européennes et la région de Zurich.",
    card_zhaw_title: "Rôle de la ZHAW", card_zhaw_text: "La ZHAW dirige WP6 Dissémination et le pilote Thurgovie, en utilisant la modélisation MATSim pour l'intégration DRT-TP avec PostAuto AG.",
    card_tools_title: "Trois outils numériques", card_tools_text: "La boîte à outils comprend une App d'engagement citoyen, une plateforme d'analyse d'accessibilité et un système d'aide à la décision.",
    pilot_title: "Villes pilotes",
    share_title: "Partagez vos idées",
    share_text: "Cet atelier est votre chance de façonner les outils SmartUrbanity. Utilisez les onglets ci-dessus pour partager vos idées — elles sont enregistrées en permanence.<br><br>💡 <strong>Conseil :</strong> Après soumission, vous pouvez <strong>modifier ou supprimer vos propres idées</strong>.<br><br>",
    session_tag: "Session de brainstorming",
    citizen_title: "Citizen Engagement App", citizen_desc: "Une application mobile qui implique les citoyens dans le processus de planification urbaine. Les utilisateurs peuvent signaler des problèmes, suivre leurs trajets et partager des insights sur la sécurité et l'accessibilité.",
    dss_title: "Decision Support System (DSS)", dss_desc: "Une plateforme pour les décideurs permettant d'évaluer les interventions de mobilité urbaine à l'aide de modèles basés sur les agents. Elle aide à évaluer les impacts démographiques, les coûts et l'équité.",
    access_title: "Accessibility Analysis Platform", access_desc: "Une plateforme WebGIS pour visualiser les données d'accessibilité dans les communautés, avec des cartes interactives, des cartes de chaleur et des filtres démographiques.",
    submit_title: "Soumettez votre idée",
    guided_label: "Questions guidées",
    gq_placeholder: "Sélectionnez une question pour vous inspirer…",
    gq_fill_btn: "Utiliser cette question comme point de départ",
    gq_clear: "Effacer la sélection — retour par défaut",
    question_ref: "Question",
    guided_optional: "(optionnel)",
    category_label: "Catégorie", idea_label: "Votre idée ou commentaire", idea_placeholder: "Écrivez votre idée ici...",
    tag_idea: "💡 Idée", tag_feature: "⭐ Fonctionnalité", tag_concern: "⚠️ Préoccupation", tag_question: "❓ Question",
    submit_btn: "Soumettre l'idée →", wall_title: "Idées partagées jusqu'ici",
    status_connecting: "Connexion...", status_live: "En direct — idées sauvegardées en temps réel", status_error: "Erreur de connexion — veuillez actualiser",
    loading: "Chargement des idées...", empty: "Pas encore d'idées — soyez le premier !",
    mine_label: "· votre idée", edit_btn: "✏️ Modifier", delete_btn: "🗑️ Supprimer",
    edit_title: "✏️ Modifier votre idée", cancel_btn: "Annuler", save_btn: "Enregistrer les modifications",
    toast_submit: "✅ Votre idée a été soumise ! Merci.", toast_update: "✅ Votre idée a été mise à jour !", toast_delete: "🗑️ Votre idée a été supprimée.",
    confirm_delete: "Êtes-vous sûr de vouloir supprimer cette idée ?",
    citizen_questions: [
      "Quelles fonctionnalités de l'application vous trouvereriez les plus utiles ?",
      "Qu'est-ce qui vous motiverait à utiliser l'application régulièrement ?",
      "Qu'est-ce qui rendrait cette application digne de confiance pour vous ?",
      "Qu'est-ce qui pourrait rendre cette application plus accessible à différentes personnes et besoins ?",
      "Quels éléments de gamification vous feraient utiliser l'application plus fréquemment ?"
    ],
    dss_questions: [
      "Que devrait offrir cette plateforme pour que vous la considériez comme fiable et utilisable ? Quelles fonctionnalités aimeriez-vous voir ?",
      "Comment les contributions des citoyens pourraient-elles être intégrées de manière réaliste dans vos flux de planification actuels ?",
      "À quelle étape de votre processus de décision un tel outil pourrait-il être le plus utile ?",
      "Quels sont les principaux obstacles à l'adoption d'un tel outil dans vos flux de travail ?",
      "Comment évaluez-vous la possibilité de participation des citoyens ?"
    ],
    access_questions: [
      "Quels aspects de l'accessibilité sont les plus importants dans votre vie quotidienne ou votre travail ?",
      "Lesquels de ces aspects devraient être représentés sur la plateforme ?",
      "Quels filtres / profils / cartes de chaleur doivent être pris en compte ?",
      "Comment les retours des citoyens devraient-ils être intégrés dans l'évaluation de l'accessibilité ?",
      "Quels types de données utilisateur partageriez-vous — ou ne partageriez-vous pas — sur la plateforme ?",
      "Quelles fonctionnalités supplémentaires aimeriez-vous voir ?"
    ]
  },
  it: {
    header_sub: "Partenariato EU DUT · Workshop di idee",
    nav_about: "🏙️ Chi siamo", nav_citizen: "📱 Citizen App", nav_dss: "🧭 DSS Platform", nav_access: "🗺️ Accessibility",
    about_title: "Costruire il futuro della mobilità urbana",
    about_subtitle: "SmartUrbanity è un'iniziativa europea che trasforma le città in luoghi a 15 minuti — dove i bisogni quotidiani sono raggiungibili a piedi o in bicicletta. Mettiamo i cittadini al centro della pianificazione urbana.",
    card_mission_title: "La nostra missione", card_mission_text: "Migliorare l'accessibilità urbana, l'inclusività e la sostenibilità integrando i cittadini direttamente nel processo di pianificazione.",
    card_timeline_title: "Cronologia del progetto", card_timeline_text: "Da gennaio 2025 a dicembre 2027, con test pilota in 5 città europee e nella regione della Grande Zurigo.",
    card_zhaw_title: "Il ruolo di ZHAW", card_zhaw_text: "ZHAW guida WP6 Disseminazione e il pilota Turgovia, utilizzando la modellazione MATSim per l'integrazione DRT-TP con PostAuto AG.",
    card_tools_title: "Tre strumenti digitali", card_tools_text: "Il toolkit include un'App di coinvolgimento cittadino, una piattaforma di analisi dell'accessibilità e un sistema di supporto alle decisioni.",
    pilot_title: "Città pilota",
    share_title: "Condividi le tue idee",
    share_text: "Questo workshop è la tua occasione per plasmare gli strumenti SmartUrbanity. Usa le schede sopra per condividere le tue idee — vengono salvate definitivamente.<br><br>💡 <strong>Suggerimento:</strong> Dopo l'invio, puoi <strong>modificare o eliminare le tue idee</strong>.<br><br>",
    session_tag: "Sessione di brainstorming",
    citizen_title: "Citizen Engagement App", citizen_desc: "Un'app mobile che coinvolge i cittadini nel processo di pianificazione urbana. Gli utenti possono segnalare problemi, tracciare i percorsi quotidiani e condividere informazioni su sicurezza e accessibilità.",
    dss_title: "Decision Support System (DSS)", dss_desc: "Una piattaforma per i decisori per valutare gli interventi di mobilità urbana usando modelli basati sugli agenti. Aiuta a valutare gli impatti demografici, i costi, l'equità e l'urgenza.",
    access_title: "Accessibility Analysis Platform", access_desc: "Una piattaforma WebGIS per visualizzare i dati di accessibilità nelle comunità, con mappe interattive, heatmap e filtri demografici.",
    submit_title: "Invia la tua idea",
    guided_label: "Domande guidate",
    gq_placeholder: "Seleziona una domanda per ispirarti…",
    gq_fill_btn: "Usa questa domanda come punto di partenza",
    gq_clear: "Annulla selezione — torna all'impostazione predefinita",
    question_ref: "Domanda",
    guided_optional: "(opzionale)",
    category_label: "Categoria", idea_label: "La tua idea o commento", idea_placeholder: "Scrivi qui la tua idea...",
    tag_idea: "💡 Idea", tag_feature: "⭐ Funzionalità", tag_concern: "⚠️ Preoccupazione", tag_question: "❓ Domanda",
    submit_btn: "Invia idea →", wall_title: "Idee condivise finora",
    status_connecting: "Connessione...", status_live: "In diretta — idee salvate in tempo reale", status_error: "Errore di connessione — ricarica la pagina",
    loading: "Caricamento idee...", empty: "Nessuna idea ancora — sii il primo!",
    mine_label: "· la tua idea", edit_btn: "✏️ Modifica", delete_btn: "🗑️ Elimina",
    edit_title: "✏️ Modifica la tua idea", cancel_btn: "Annulla", save_btn: "Salva modifiche",
    toast_submit: "✅ La tua idea è stata inviata! Grazie.", toast_update: "✅ La tua idea è stata aggiornata!", toast_delete: "🗑️ La tua idea è stata eliminata.",
    confirm_delete: "Sei sicuro di voler eliminare questa idea?",
    citizen_questions: [
      "Quali funzionalità dell'app troveresti più utili?",
      "Cosa ti motivererebbe a usare l'app regolarmente?",
      "Cosa renderebbe questa app affidabile per te?",
      "Cosa potrebbe rendere questa app più accessibile a persone e bisogni diversi?",
      "Quali elementi di gamification ti farebbero usare l'app più frequentemente?"
    ],
    dss_questions: [
      "Cosa dovrebbe offrire questa piattaforma perché tu la consideri affidabile e utilizzabile? Quali funzionalità vorresti vedere?",
      "Come potrebbero essere integrate in modo realistico le contribuzioni dei cittadini nei tuoi attuali flussi di pianificazione?",
      "In quale fase del tuo processo decisionale uno strumento del genere potrebbe essere più utile?",
      "Quali sono i principali ostacoli all'adozione di uno strumento del genere nei tuoi flussi di lavoro?",
      "Come valuti la possibilità di partecipazione dei cittadini?"
    ],
    access_questions: [
      "Quali aspetti dell'accessibilità sono più importanti nella tua vita quotidiana o nel tuo lavoro?",
      "Quali di questi aspetti dovrebbero essere rappresentati sulla piattaforma?",
      "Quali filtri / profili / heatmap dovrebbero essere presi in considerazione?",
      "Come dovrebbe essere incorporato il feedback dei cittadini nella valutazione dell'accessibilità?",
      "Quali tipi di dati utente condivideresti — o non condivideresti — sulla piattaforma?",
      "Quali funzionalità aggiuntive vorresti vedere?"
    ]
  }
};

let currentLang = localStorage.getItem('su_lang') || 'en';
let editDocId = null, editTab = null;
// Per-tab selected question index
const selectedQ = { citizen: -1, dss: -1, access: -1 };

let sk = localStorage.getItem('su_sk');
if (!sk) { sk = 'u_' + Math.random().toString(36).substr(2,14) + '_' + Date.now(); localStorage.setItem('su_sk', sk); }

// ── DROPDOWN LOGIC ──
// Dropdown toggle handled via DOMContentLoaded event delegation below

function buildDropdown(tab) {
  const t = T[currentLang];
  const questions = t[tab+'_questions'] || [];
  const menu = document.getElementById(tab+'-gq-menu');
  // "Clear" option at top, only shown when something is selected
  const clearRow = selectedQ[tab] >= 0
    ? `<div class="gq-option gq-clear-option" data-qclear="${tab}" style="color:#9CA3AF;font-style:italic;border-bottom:2px solid var(--border);">
         <span class="gq-option-num" style="background:#F3F4F6;color:#9CA3AF;">✕</span>
         <span>${t.gq_clear||'Clear selection'}</span>
       </div>`
    : '';
  menu.innerHTML = clearRow + questions.map((q, i) => `
    <div class="gq-option${selectedQ[tab]===i?' selected':''}" data-qsel-tab="${tab}" data-qsel-idx="${i}">
      <span class="gq-option-num">${i+1}</span>
      <span>${q}</span>
    </div>`).join('');
  // Wire click listeners on newly rendered options
  menu.querySelectorAll('[data-qsel-tab]').forEach(el => {
    el.addEventListener('click', () => {
      selectQuestion(el.getAttribute('data-qsel-tab'), parseInt(el.getAttribute('data-qsel-idx')));
    });
  });
  const clearEl = menu.querySelector('[data-qclear]');
  if (clearEl) clearEl.addEventListener('click', () => clearQuestion(clearEl.getAttribute('data-qclear')));
  // Update button display
  const btn = document.querySelector('#'+tab+'-gq .gq-select-btn');
  if (selectedQ[tab] >= 0) {
    btn.innerHTML = `<span class="gq-selected-text">${questions[selectedQ[tab]]}</span>
      <svg class="gq-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`;
  } else {
    btn.innerHTML = `<span class="gq-placeholder">${t.gq_placeholder}</span>
      <svg class="gq-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`;
  }
}

function clearQuestion(tab) {
  selectedQ[tab] = -1;
  buildDropdown(tab);
  document.getElementById(tab+'-gq-fill').style.display = 'none';
// Close dropdown
  document.getElementById(tab+'-gq-menu').classList.remove('open');
  document.querySelector('#'+tab+'-gq .gq-select-btn').classList.remove('open');
};

function selectQuestion(tab, idx) {
  selectedQ[tab] = idx;
  buildDropdown(tab);
// Close dropdown
  const menu = document.getElementById(tab+'-gq-menu');
  const btn = document.querySelector('#'+tab+'-gq .gq-select-btn');
  menu.classList.remove('open');
  btn.classList.remove('open');
};



// ── APPLY LANGUAGE ──
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('su_lang', lang);
  const t = T[lang];

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.textContent === lang.toUpperCase());
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Rebuild dropdowns with new language
  ['citizen','dss','access'].forEach(tab => buildDropdown(tab));

  // Re-render walls
  ['citizen','dss','access'].forEach(tab => {
    const wall = document.getElementById(tab+'-wall');
    if (wall.dataset.rendered) renderWall(tab, JSON.parse(wall.dataset.rendered));
  });
}

// Tab switching and language handled via DOMContentLoaded event delegation below

// Tag selection
document.querySelectorAll('.tag-row').forEach(row => {
  row.querySelectorAll('.tag-option').forEach(opt => {
    opt.addEventListener('click', () => {
      row.querySelectorAll('.tag-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });
});

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function tagLabel(t) {
  const tl = T[currentLang];
  return {idea: tl.tag_idea, feature: tl.tag_feature, concern: tl.tag_concern, question: tl.tag_question}[t] || t;
}

function showToast(msg) {
  const el = document.getElementById('toast'); el.textContent = msg;
  el.classList.add('show'); setTimeout(()=>el.classList.remove('show'), 3000);
}

function renderWall(tab, docs) {
  const wall = document.getElementById(tab+'-wall');
  const t = T[currentLang];
  document.getElementById(tab+'-count').textContent = docs.length;
  wall.dataset.rendered = JSON.stringify(docs);
  if (!docs.length) {
    wall.innerHTML = `<div class="empty-state"><div class="empty-icon">💬</div>${t.empty}</div>`;
    return;
  }
  wall.innerHTML = docs.map(d => {
    const mine = d.sessionKey === sk;
    const ts = d.createdAt ? new Date(d.createdAt) : new Date();
    const time = ts.toLocaleDateString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
    const questionBadge = d.guidedQuestionIdx
      ? `<div style="display:inline-flex;align-items:center;gap:5px;background:#F0FDF4;border:1px solid #86EFAC;border-radius:100px;padding:3px 10px;margin-bottom:0.5rem;">
           <span style="font-size:0.7rem;font-weight:700;color:#15803D;">❓</span>
           <span style="font-size:0.75rem;font-weight:600;color:#15803D;">${t.question_ref||'Question'} ${d.guidedQuestionIdx}</span>
         </div><br>`
      : '';
    return `<div class="idea-card ${mine?'mine':''}">
      <div class="idea-card-top">
        <span class="idea-card-name">👤 ${esc(d.name)}${mine?` <span class="mine-label">${t.mine_label}</span>`:''}</span>
        <span class="idea-card-tag ${d.tag}">${tagLabel(d.tag)}</span>
      </div>
      ${questionBadge}
      <div class="idea-card-text">${esc(d.text)}</div>
      <div class="idea-card-footer">
        <span class="idea-card-time">${time}</span>
        ${mine?`<div class="idea-card-actions">
          <button class="action-btn edit-btn" onclick="openEdit('${tab}','${d.id}',\`${esc(d.text)}\`)">${t.edit_btn}</button>
          <button class="action-btn delete-btn" onclick="deleteIdea('${tab}','${d.id}')">${t.delete_btn}</button>
        </div>`:''}
      </div>
    </div>`;
  }).join('');
}

// Live listeners
['citizen','dss','access'].forEach(tab => {
  onSnapshot(query(collection(db,tab+'-ideas'),orderBy('createdAt','desc')), snap => {
    const docs = snap.docs.map(d => {
      const data = d.data();
      return {id:d.id, ...data, createdAt: data.createdAt ? data.createdAt.toDate().getTime() : Date.now()};
    });
    renderWall(tab, docs);
  }, err => console.error(err));
});

window.submitIdea = async (tab) => {
  const nameEl=document.getElementById(tab+'-name'), textEl=document.getElementById(tab+'-text');
  const tagEl=document.querySelector('#'+tab+'-tags .tag-option.selected'), btn=document.getElementById(tab+'-submit');
  const text=textEl.value.trim();
  if(!text){textEl.style.borderColor='#EF4444';textEl.focus();return;}
  textEl.style.borderColor=''; btn.disabled=true; btn.textContent='...';
  // Get the selected guided question (in English for storage, for consistency)
  const qIdx = selectedQ[tab];
  const guidedQuestion = qIdx >= 0 ? (T['en'][tab+'_questions'] || [])[qIdx] || null : null;
  const guidedQuestionIdx = qIdx >= 0 ? qIdx + 1 : null; // 1-based number
  try {
    await addDoc(collection(db,tab+'-ideas'),{
      name:nameEl.value.trim()||'Anonymous', text, tag:tagEl?tagEl.dataset.val:'idea',
      sessionKey:sk, createdAt:serverTimestamp(),
      guidedQuestion: guidedQuestion || null,
      guidedQuestionIdx: guidedQuestionIdx || null
    });
    nameEl.value=''; textEl.value='';
    showToast(T[currentLang].toast_submit);
  } catch(e){console.error(e);alert('Error saving.');}
  finally{btn.disabled=false;btn.textContent=T[currentLang].submit_btn;}
};

window.openEdit = (tab, id, text) => {
  editTab=tab; editDocId=id;
  document.getElementById('edit-textarea').value=text;
document.getElementById('edit-modal').classList.add('open');
};
window.closeModal = () => { document.getElementById('edit-modal').classList.remove('open'); editDocId=null; editTab=null; };
window.saveEdit = async () => {
  const newText=document.getElementById('edit-textarea').value.trim();
  if(!newText) return;
  try { await updateDoc(doc(db,editTab+'-ideas',editDocId),{text:newText}); closeModal(); showToast(T[currentLang].toast_update); }
  catch(e){console.error(e);alert('Error updating.');}
};
window.deleteIdea = async (tab, id) => {
  if(!confirm(T[currentLang].confirm_delete)) return;
  try { await deleteDoc(doc(db,tab+'-ideas',id)); showToast(T[currentLang].toast_delete); }
  catch(e){console.error(e);alert('Error deleting.');}
};

// ── EVENT DELEGATION ──
// (ES module scripts run after DOM is parsed, no DOMContentLoaded needed)

// Tab buttons
document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const n = btn.getAttribute('data-tab');
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('[data-tab]').forEach(x => x.classList.remove('active'));
      document.getElementById('tab-' + n).classList.add('active');
      btn.classList.add('active');
    });
  });

// Language buttons
document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

// Dropdown toggle buttons
document.querySelectorAll('[data-dropdown]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-dropdown');
      const menu = document.getElementById(id + '-menu');
      const isOpen = menu.classList.contains('open');
      document.querySelectorAll('.gq-menu').forEach(m => m.classList.remove('open'));
      document.querySelectorAll('.gq-select-btn').forEach(b => b.classList.remove('open'));
      if (!isOpen) {
        menu.classList.add('open');
        btn.classList.add('open');
      }
    });
  });

// Submit buttons
document.querySelectorAll('[data-submit]').forEach(btn => {
    btn.addEventListener('click', () => submitIdea(btn.getAttribute('data-submit')));
  });

// Modal close/save buttons
const cancelBtn = document.getElementById('modal-cancel-btn');
const saveBtn   = document.getElementById('modal-save-btn');
if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
if (saveBtn)   saveBtn.addEventListener('click', saveEdit);

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.gq-dropdown')) {
      document.querySelectorAll('.gq-menu').forEach(m => m.classList.remove('open'));
      document.querySelectorAll('.gq-select-btn').forEach(b => b.classList.remove('open'));
    }
  });

// Modal backdrop close
document.getElementById('edit-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

// Init language
applyLang(currentLang);
