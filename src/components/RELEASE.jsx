import { useState, useEffect, useRef, useCallback } from "react";
import { Component as TurbulentFlow } from "./ui/turbulent-flow";

// ─── THEMES ──────────────────────────────────────────────────────────────────
const DARK_THEME = {
  bg: "#0a0f1a",
  bgCard: "#0f1829",
  bgCardHover: "#141e35",
  bgInput: "#0d1527",
  primary: "#1a6ed8",
  primaryLight: "#2d84f0",
  primaryGlow: "rgba(26,110,216,0.15)",
  accent: "#00c9a7",
  accentGlow: "rgba(0,201,167,0.12)",
  text: "#e8edf5",
  textMuted: "#8899aa",
  textDim: "#4a5a70",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.14)",
  borderAccent: "rgba(26,110,216,0.25)",
  shadow: "0 8px 32px rgba(0,0,0,0.5)",
  citeBg: "rgba(0,201,167,0.06)",
  citeBorder: "rgba(0,201,167,0.2)",
  citeText: "#00c9a7",
  mayoBlue: "#004B87",
  success: "#00c9a7",
  warning: "#f59e0b",
  danger: "#ef4444",
};

const LIGHT_THEME = {
  bg: "#f4f7fb",
  bgCard: "#ffffff",
  bgCardHover: "#f0f4fa",
  bgInput: "#f8fafd",
  primary: "#1565c8",
  primaryLight: "#1a6ed8",
  primaryGlow: "rgba(21,101,200,0.08)",
  accent: "#009e7a",
  accentGlow: "rgba(0,158,122,0.08)",
  text: "#0d1f35",
  textMuted: "#4a6080",
  textDim: "#8ba0b8",
  border: "rgba(0,0,0,0.08)",
  borderHover: "rgba(0,0,0,0.16)",
  borderAccent: "rgba(21,101,200,0.25)",
  shadow: "0 8px 32px rgba(0,0,0,0.12)",
  citeBg: "rgba(0,158,122,0.06)",
  citeBorder: "rgba(0,158,122,0.2)",
  citeText: "#007a60",
  mayoBlue: "#004B87",
  success: "#009e7a",
  warning: "#d97706",
  danger: "#dc2626",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ─── APP NAME ────────────────────────────────────────────────────────────────
const APP = {
  name: "RELEASE",
  full: "Rehabilitation & Learning for Extremity And Spasticity Surgery Education",
  subtitle: "Spasticity & Hand Surgery",
  institution: "Mayo Clinic",
};

// ─── CITATIONS ───────────────────────────────────────────────────────────────
const CITATIONS = {
  msktc_spasticity:  { title: "Spasticity and Spinal Cord Injury", org: "Model Systems Knowledge Translation Center (MSKTC)", url: "https://msktc.org/sci/factsheets/spasticity-and-spinal-cord-injury", type: "patient" },
  reeve_spasticity:  { title: "Spasticity – Living with Paralysis", org: "Christopher & Dana Reeve Foundation", url: "https://www.christopherreeve.org/todays-care/living-with-paralysis/health/secondary-conditions/spasticity/", type: "patient" },
  aans_spasticity:   { title: "Spasticity – Conditions & Treatments", org: "American Association of Neurological Surgeons (AANS)", url: "https://www.aans.org/patients/conditions-treatments/spasticity/", type: "clinical" },
  scire_nerve:       { title: "Nerve Transfer Surgery for SCI", org: "SCIRE Community / SCIRE Project", url: "https://community.scireproject.com/wp-content/uploads/SCIRE-C_Nerve-Transfer_Download.pdf", type: "clinical" },
  wustl_nerve:       { title: "Nerve Transfer Surgery for SCI – What to Expect", org: "Washington University / nervetransfer.wustl.edu", url: "https://nervetransfer.wustl.edu/nerve-transfers-to-treat-sci/what-to-expect-with-a-nerve-transfer/", type: "clinical" },
  hopkins_nerve:     { title: "Nerve Transfer Surgery", org: "Johns Hopkins Medicine", url: "https://www.hopkinsmedicine.org/health/treatment-tests-and-therapies/nerve-transfer-surgery", type: "clinical" },
  barrow_nerve:      { title: "Nerve Transfer Surgery – Reanimating the Hand after SCI", org: "Barrow Neurological Institute", url: "https://www.barrowneuro.org/about/news-and-articles/doctors/nerve-transfer-surgery-reanimating-hand-spinal-cord-injury/", type: "clinical" },
  duke_nerve:        { title: "Nerve Transfer Surgery for Nerve Damage", org: "Duke Health", url: "https://www.dukehealth.org/blog/nerve-transfer-surgery-relieves-pain-restores-function-lost-nerve-damage", type: "clinical" },
  pmc_neurectomy:    { title: "Hyperselective Neurectomy for Upper Limb Spasticity", org: "PubMed Central (EFORT Open Reviews)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5706056/", type: "clinical" },
  assh_tendon:       { title: "Tendon Transfer Surgery", org: "American Society for Surgery of the Hand (ASSH)", url: "https://www.handcare.org/condition/tendon-transfer-surgery", type: "clinical" },
  sralab_tendon:     { title: "Tendon Transfer Surgery for SCI", org: "Shirley Ryan AbilityLab", url: "https://www.sralab.org/lifecenter/resources/spinal-cord-injury-tendon-transfer-surgery", type: "patient" },
  wustl_tendon:      { title: "Decision Aid: Tendon vs. Nerve Transfer after SCI", org: "Washington University Collaborative Care", url: "https://collaborativecare.wustl.edu/items/decision-aid-about-tendon-vs-nerve-transfer-vs-no-surgery-after-spinal-cord-injury/", type: "clinical" },
  reeve_ue:          { title: "Upper Extremity Care after SCI", org: "Christopher & Dana Reeve Foundation", url: "https://www.christopherreeve.org/todays-care/living-with-paralysis/health/secondary-conditions/upper-extremity-care/", type: "patient" },
  cleveland_botox:   { title: "Botox for Spasticity", org: "Cleveland Clinic", url: "https://health.clevelandclinic.org/botox-for-spasticity", type: "clinical" },
  sralab_botox:      { title: "Spasticity Treatment with Botulinum Toxins", org: "Shirley Ryan AbilityLab", url: "https://www.sralab.org/lifecenter/resources/spasticity-treatment-botulinum-toxins", type: "clinical" },
  cleveland_baclofen:{ title: "Intrathecal Baclofen Pump", org: "Cleveland Clinic", url: "https://my.clevelandclinic.org/health/treatments/8997-intrathecal-baclofen-pump", type: "clinical" },
  assh_nerve_injury: { title: "Nerve Injuries of the Hand", org: "American Society for Surgery of the Hand (ASSH)", url: "https://www.handcare.org/condition/nerve-injuries", type: "clinical" },
  orthoinfo_nerve:   { title: "Nerve Injuries", org: "OrthoInfo – American Academy of Orthopaedic Surgeons", url: "https://orthoinfo.aaos.org/en/diseases--conditions/nerve-injuries/", type: "patient" },
  mayo_peripheral:   { title: "Peripheral Nerve Injuries", org: "Mayo Clinic", url: "https://www.mayoclinic.org/diseases-conditions/peripheral-nerve-injuries/symptoms-causes/syc-20355631", type: "patient" },
  msktc_pain:        { title: "Pain after Spinal Cord Injury", org: "MSKTC", url: "https://msktc.org/sci/factsheets/pain-after-spinal-cord-injury", type: "patient" },
  msktc_ad:          { title: "Autonomic Dysreflexia and Spinal Cord Injury", org: "MSKTC", url: "https://msktc.org/sci/factsheets/autonomic-dysreflexia", type: "clinical" },
  msktc_rehab:       { title: "Guide to Inpatient Rehabilitation for SCI", org: "MSKTC", url: "https://msktc.org/sci/factsheets/guide-inpatient-rehabilitation-services-people-spinal-cord-injury", type: "patient" },
  stanford_postop:   { title: "After Hand Surgery – Recovery", org: "Stanford Health Care", url: "https://stanfordhealthcare.org/medical-treatments/h/hand-surgery/procedures/after.html", type: "patient" },
  flint_splint:      { title: "Splinting and Upper Extremity Care after SCI", org: "Christopher & Dana Reeve Foundation", url: "https://www.christopherreeve.org/todays-care/living-with-paralysis/health/secondary-conditions/upper-extremity-care/", type: "patient" },
  pvc_upperlimb:     { title: "Upper Limb Function after SCI", org: "Paralyzed Veterans of America (PVA)", url: "https://www.pva.org/", type: "clinical" },
};

// ─── CITATION HELPERS ────────────────────────────────────────────────────────
function parseCitations(text) {
  const found = [];
  const seen = new Set();
  const regex = /\[([a-z_]+)\]/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    const id = m[1];
    if (CITATIONS[id] && !seen.has(id)) {
      found.push(id);
      seen.add(id);
    }
  }
  return found;
}

function renderWithCitations(text) {
  const citIds = parseCitations(text);
  const indexMap = {};
  citIds.forEach((id, i) => { indexMap[id] = i + 1; });

  let html = text.replace(/\[([a-z_]+)\]/g, (match, id) => {
    if (CITATIONS[id]) {
      return `<sup style="font-size:10px;color:#2d84f0;cursor:pointer;margin-left:1px">[${indexMap[id]}]</sup>`;
    }
    return match;
  });

  html = html
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");

  return html;
}

// ─── CLINICAL TOPIC CARDS ────────────────────────────────────────────────────
const TOPIC_CARDS = [
  { id: "overview",      icon: "🧠", label: "Understanding Spasticity",  prompt: "Can you explain what spasticity is, how it relates to spinal cord injury, and what treatment options exist?" },
  { id: "nerve_transfer",icon: "⚡", label: "Nerve Transfer Surgery",    prompt: "What is nerve transfer surgery and how can it help restore hand function in spinal cord injury?" },
  { id: "neurectomy",    icon: "✂️", label: "Neurectomy",                prompt: "What is a neurectomy and when is it used to manage spasticity in the hand?" },
  { id: "tendon",        icon: "💪", label: "Tendon Transfers",          prompt: "How do tendon transfers like FPL and FDS work, and what can I expect for recovery?" },
  { id: "recovery",      icon: "📅", label: "Recovery Timeline",         prompt: "What is the typical recovery timeline after hand surgery for spinal cord injury patients?" },
  { id: "ot",            icon: "🖐️", label: "Occupational Therapy",     prompt: "What role does occupational therapy play in recovery from hand surgery for SCI patients?" },
  { id: "wound",         icon: "🩹", label: "Wound & Splint Care",       prompt: "How do I care for my wound and splint after hand surgery?" },
  { id: "pain",          icon: "💊", label: "Pain Management",           prompt: "How is pain managed after hand surgery and what medications are typically used?" },
  { id: "botox",         icon: "💉", label: "Botox for Spasticity",      prompt: "How does Botox help manage spasticity, and what can I expect from treatment?" },
  { id: "nerve_recovery",icon: "🔬", label: "Nerve & Sensation",         prompt: "When will sensation return after nerve surgery and how does nerve recovery work?" },
  { id: "complications", icon: "⚠️", label: "Warning Signs",            prompt: "What warning signs should I watch for after hand surgery?" },
  { id: "preparing",     icon: "📋", label: "Preparing for Surgery",     prompt: "What questions should I bring to my consultation and how do I prepare for hand surgery?" },
  { id: "emotional",     icon: "💙", label: "Feeling Overwhelmed",       prompt: "I have a spinal cord injury and I'm overwhelmed about my upcoming hand surgery. Where do I start?" },
];

// ─── LANGUAGES ───────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "English",        flag: "🇺🇸", bcp47: "en-US" },
  { code: "es", label: "Español",        flag: "🇪🇸", bcp47: "es-ES" },
  { code: "ar", label: "العربية",        flag: "🇸🇦", bcp47: "ar-SA", dir: "rtl" },
  { code: "fr", label: "Français",       flag: "🇫🇷", bcp47: "fr-FR" },
  { code: "zh", label: "中文 (普通话)",  flag: "🇨🇳", bcp47: "zh-CN" },
  { code: "hi", label: "हिन्दी",        flag: "🇮🇳", bcp47: "hi-IN" },
  { code: "fa", label: "فارسی",         flag: "🇮🇷", bcp47: "fa-IR", dir: "rtl" },
];

// ─── I18N ────────────────────────────────────────────────────────────────────
const I18N = {
  en: { start: "Start Personalized Session", skip: "Skip to Chat", placeholder: "Ask about spasticity, nerve transfer, recovery…", sources: "sources", listening: "Listening…" },
  es: { start: "Comenzar Sesión Personalizada", skip: "Ir al Chat", placeholder: "Pregunte sobre espasticidad, cirugía nerviosa, recuperación…", sources: "fuentes", listening: "Escuchando…" },
  ar: { start: "ابدأ جلسة مخصصة", skip: "انتقل إلى الدردشة", placeholder: "اسأل عن التشنج العضلي والجراحة والتعافي…", sources: "مصادر", listening: "جارٍ الاستماع…" },
  fr: { start: "Démarrer une session personnalisée", skip: "Aller au chat", placeholder: "Posez des questions sur la spasticité, les transferts nerveux, la récupération…", sources: "sources", listening: "Écoute en cours…" },
  zh: { start: "开始个性化咨询", skip: "直接进入聊天", placeholder: "询问痉挛、神经移植、恢复相关问题…", sources: "来源", listening: "正在聆听…" },
  hi: { start: "व्यक्तिगत सत्र शुरू करें", skip: "चैट पर जाएं", placeholder: "स्पास्टिसिटी, नर्व ट्रांसफर, रिकवरी के बारे में पूछें…", sources: "स्रोत", listening: "सुन रहा है…" },
  fa: { start: "شروع جلسه شخصی‌سازی‌شده", skip: "رفتن به چت", placeholder: "درباره اسپاستیسیتی، انتقال عصب، یا بهبودی بپرسید…", sources: "منابع", listening: "در حال گوش دادن…" },
};

// ─── INTAKE STEPS ────────────────────────────────────────────────────────────
const INTAKE_STEPS = [
  {
    id: "injury_level",
    title: "Where is your spinal cord injury?",
    subtitle: "This helps us give you the most relevant information",
    options: [
      { value: "cervical_high", label: "Neck — upper (C1 to C4)", detail: "Affects breathing and arm movement" },
      { value: "cervical_low",  label: "Neck — lower (C5 to C8)", detail: "Most common level for hand surgery" },
      { value: "thoracic",      label: "Mid-back (T1 to T12)",    detail: "Chest and trunk level" },
      { value: "lumbar",        label: "Lower back",              detail: "Hips and legs" },
      { value: "unsure",        label: "I'm not sure",            detail: "Your doctor can help confirm this" },
    ],
  },
  {
    id: "injury_type",
    title: "How would you describe your injury?",
    subtitle: "There's no wrong answer — this just helps us personalize things",
    options: [
      { value: "complete",   label: "Complete — no movement or feeling below my injury", detail: "" },
      { value: "incomplete", label: "Incomplete — I still have some movement or feeling", detail: "" },
      { value: "unsure",     label: "I'm not sure", detail: "That's okay" },
    ],
  },
  {
    id: "affected_hand",
    title: "Which hand are you getting surgery on?",
    subtitle: "",
    options: [
      { value: "right", label: "Right Hand", detail: "" },
      { value: "left",  label: "Left Hand",  detail: "" },
      { value: "both",  label: "Both Hands", detail: "" },
    ],
  },
  {
    id: "dominant_hand",
    title: "Is this your dominant hand — the one you write with?",
    subtitle: "This affects how we talk about recovery and daily activities",
    options: [
      { value: "yes",  label: "Yes, it's my dominant hand", detail: "" },
      { value: "no",   label: "No, it's my other hand",     detail: "" },
      { value: "both", label: "Both hands",                 detail: "" },
    ],
  },
  {
    id: "procedure",
    title: "What type of surgery or treatment are you here to learn about?",
    subtitle: "Pick the closest one — you can always ask about others in the chat",
    options: [
      { value: "nerve_transfer",  label: "Nerve transfer",   detail: "Moving a nerve to restore hand grip or pinch" },
      { value: "neurectomy",      label: "Neurectomy",       detail: "Cutting a nerve branch to reduce stiffness and spasms" },
      { value: "tendon_transfer", label: "Tendon transfer",  detail: "Moving a tendon to help the hand move better" },
      { value: "botox",           label: "Botox injections", detail: "Injections to relax tight or spastic muscles" },
      { value: "multiple",        label: "Not sure yet",     detail: "I'm still exploring my options" },
    ],
  },
  {
    id: "stage",
    title: "Where are you in your journey right now?",
    subtitle: "",
    options: [
      { value: "considering", label: "Just exploring",       detail: "I'm looking into my options" },
      { value: "scheduled",   label: "Surgery is coming up", detail: "I want to prepare" },
      { value: "post_op",     label: "I just had surgery",   detail: "I'm in recovery" },
      { value: "rehab",       label: "I'm doing therapy",    detail: "Working with a therapist or rehab team" },
    ],
  },
  {
    id: "diabetes",
    title: "Do you have diabetes?",
    subtitle: "This changes some of the wound healing advice we give you",
    options: [
      { value: "yes",        label: "Yes",                detail: "" },
      { value: "no",         label: "No",                 detail: "" },
      { value: "prefer_not", label: "I'd rather not say", detail: "" },
    ],
  },
  {
    id: "main_concern",
    title: "What matters most to you right now?",
    subtitle: "We'll make sure to focus on this throughout your session",
    options: [
      { value: "function",  label: "Getting my hand working again",        detail: "" },
      { value: "pain",      label: "Reducing stiffness and pain",          detail: "" },
      { value: "recovery",  label: "Knowing what to expect from recovery", detail: "" },
      { value: "risks",     label: "Understanding the risks",              detail: "" },
      { value: "work",      label: "Getting back to normal life",          detail: "" },
    ],
  },
];

// ─── PROFILE DERIVATION ───────────────────────────────────────────────────────
function deriveProfile(answers) {
  return {
    ...answers,
    high_cervical:     answers.injury_level === "cervical_high",
    bilateral:         answers.affected_hand === "both",
    dominant_affected: answers.dominant_hand === "yes" || answers.dominant_hand === "both",
    diabetic:          answers.diabetes === "yes",
    nerve_case:        answers.procedure === "nerve_transfer",
    post_op:           answers.stage === "post_op",
    ad_risk:           answers.injury_level === "cervical_high" ||
                       answers.injury_level === "cervical_low"  ||
                       answers.injury_level === "thoracic",
    trauma_patient: false,
  };
}

// ─── SYSTEM PROMPT BUILDER ────────────────────────────────────────────────────
function buildSystemPrompt(profile, lang) {
  let prompt = `You are RELEASE, an expert patient education assistant for spinal cord injury patients who need hand surgery to manage spasticity. You are part of the Mayo Clinic Plastic & Reconstructive Surgery department.

Your specialty is helping SCI patients understand: spasticity management, nerve transfers, neurectomy, tendon transfers (FPL/FDS), Botox injections, occupational therapy, wound care, and recovery expectations.

You communicate with warmth, clarity, and clinical accuracy. You do not provide medical advice — you provide education and help patients prepare informed questions for their surgical team.

CITATION INSTRUCTIONS — FOLLOW EXACTLY:
After every factual claim, immediately place one or more citation tags in square brackets using the IDs listed below. Do NOT group citations at the end of paragraphs. Place them inline, directly after the fact they support. Example: "Nerves regenerate at approximately 1mm per day [barrow_nerve][wustl_nerve], which means recovery takes 6–18 months [scire_nerve]."

Available citation IDs (use only these exact strings):
msktc_spasticity, reeve_spasticity, aans_spasticity, scire_nerve, wustl_nerve,
hopkins_nerve, barrow_nerve, duke_nerve, pmc_neurectomy, assh_tendon, sralab_tendon,
wustl_tendon, reeve_ue, cleveland_botox, sralab_botox, cleveland_baclofen,
assh_nerve_injury, orthoinfo_nerve, mayo_peripheral, msktc_pain, msktc_ad,
msktc_rehab, stanford_postop, flint_splint, pvc_upperlimb

CRITICAL: You MUST place [citation_id] immediately after every factual claim. Do not group citations at the end of paragraphs.

__KNOWLEDGE_BASE_INJECTED_SERVER_SIDE__
`;

  if (profile) {
    prompt += `\n\nPATIENT PROFILE:\n`;
    if (profile.injury_level)  prompt += `- Injury level: ${profile.injury_level.replace(/_/g, " ")}\n`;
    if (profile.injury_type)   prompt += `- Injury type: ${profile.injury_type}\n`;
    if (profile.affected_hand) prompt += `- Affected hand: ${profile.affected_hand}\n`;
    if (profile.procedure)     prompt += `- Procedure of interest: ${profile.procedure.replace(/_/g, " ")}\n`;
    if (profile.stage)         prompt += `- Journey stage: ${profile.stage.replace(/_/g, " ")}\n`;
    if (profile.main_concern)  prompt += `- Main concern: ${profile.main_concern.replace(/_/g, " ")}\n`;

    prompt += `\nACTIVE CLINICAL FILTERS:\n`;
    if (profile.high_cervical)     prompt += `⚠️ HIGH CERVICAL INJURY (C1-C4): Patient may have limited respiratory reserve and more complex functional limitations. Use extra care discussing surgical risks and functional goals.\n`;
    if (profile.diabetic)          prompt += `⚠️ DIABETES: Emphasize wound healing risks, elevated infection risk, neuropathy complications, and the importance of blood glucose control before and after surgery.\n`;
    if (profile.dominant_affected) prompt += `⚠️ DOMINANT HAND AFFECTED: Include ADL impact, adaptive strategies during recovery, and realistic return-to-function expectations.\n`;
    if (profile.bilateral)         prompt += `⚠️ BILATERAL INVOLVEMENT: Both hands affected. Emphasize need for home help, caregiver support, and occupational therapy for ADL management during recovery.\n`;
    if (profile.nerve_case)        prompt += `⚠️ NERVE TRANSFER: Emphasize that nerve regeneration is slow (1mm/day) [barrow_nerve]. Recovery of sensation and motor function takes months to over a year. Set realistic expectations for incomplete recovery.\n`;
    if (profile.post_op)           prompt += `⚠️ POST-OP PATIENT: Patient is currently recovering. Prioritize wound care, splinting, therapy compliance, and warning signs over procedural information.\n`;
    if (profile.ad_risk)           prompt += `⚠️ AUTONOMIC DYSREFLEXIA RISK: Patient has SCI at or above thoracic level and is at risk for autonomic dysreflexia (AD), a potentially life-threatening emergency [msktc_ad]. For any topic touching on wound care, surgical procedures, pain, or catheter use, mention AD risk and cite [msktc_ad]. Remind the patient to sit upright and call 911 if they experience sudden severe headache with high blood pressure.\n`;
  }

  if (lang && lang !== "en") {
    const langObj = LANGUAGES.find(l => l.code === lang);
    if (langObj) {
      prompt += `\nLANGUAGE INSTRUCTION: The user has selected ${langObj.label}. Respond entirely in ${langObj.label}. Translate all medical terms and explain them in ${langObj.label}. Keep citations in English.\n`;
    }
  }

  prompt += `\nOUT OF SCOPE (never answer): specific surgical technique selection, drug dosing, implant sizing, whether a specific patient is a surgical candidate. Always direct these to the surgical team.

TONE: Warm, reassuring, clear. Avoid jargon. When using medical terms, always explain them. Use short paragraphs. End responses with an offer to explain more or suggest a related topic.`;

  return prompt;
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function ReleaseApp() {
  const [screen, setScreen]               = useState("welcome");
  const [intakeStep, setIntakeStep]       = useState(0);
  const [intakeAnswers, setIntakeAnswers] = useState({});
  const [profile, setProfile]             = useState(null);
  const [messages, setMessages]           = useState([]);
  const [inputText, setInputText]         = useState("");
  const [isLoading, setIsLoading]         = useState(false);
  const [openCitePanels, setOpenCitePanels] = useState({});
  const [darkMode, setDarkMode]           = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("release-theme") !== "light";
    }
    return true;
  });
  const [lang, setLang]                   = useState("en");
  const [isListening, setIsListening]     = useState(false);
  const [interimText, setInterimText]     = useState("");
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [speakingId, setSpeakingId]       = useState(null);
  const [speechRate, setSpeechRate]       = useState(1.0);
  const [speechPitch, setSpeechPitch]     = useState(1.0);
  const [voices, setVoices]               = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStep, setEditingStep]     = useState(null);
  const [feedbackOpen, setFeedbackOpen]   = useState(false);
  const [feedbackText, setFeedbackText]   = useState("");
  const [feedbackSent, setFeedbackSent]   = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const [isMobile, setIsMobile]           = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const canvasRef      = useRef(null);
  const animRef        = useRef(null);
  const recognitionRef = useRef(null);

  const theme = darkMode ? DARK_THEME : LIGHT_THEME;
  const strings = I18N[lang] || I18N.en;
  const selectedLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  const isRTL = selectedLang.dir === "rtl";

  // ── Theme persistence ─────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("release-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // ── Mobile detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Voice recognition setup (continuous, real-time) ───────────────────────
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    setVoiceSupported(true);
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLang?.bcp47 || "en-US";

    recognition.onresult = (event) => {
      let finalText = "";
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += t;
        else interim += t;
      }
      if (finalText) setInputText(prev => prev + finalText);
      setInterimText(interim);
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimText("");
    };

    recognition.onerror = () => {
      setIsListening(false);
      setInterimText("");
    };

    recognitionRef.current = recognition;
  }, [selectedLang]);

  // ── TTS voices loading ────────────────────────────────────────────────────
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) {
        setVoices(v);
        setSelectedVoice(prev => prev || v[0]);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // ── Particle canvas animation (theme-aware) ───────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      o: Math.random() * 0.4 + 0.1,
    }));

    const primaryRgb = hexToRgb(theme.primary);

    function draw() {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryRgb},${p.o})`;
        ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${primaryRgb},${0.08 * (1 - d / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }));
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [screen, darkMode]);

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Intake ────────────────────────────────────────────────────────────────
  const handleIntakeSelect = (value) => {
    const step = INTAKE_STEPS[intakeStep];
    const newAnswers = { ...intakeAnswers, [step.id]: value };
    setIntakeAnswers(newAnswers);
    if (intakeStep < INTAKE_STEPS.length - 1) {
      setIntakeStep(s => s + 1);
    } else {
      const p = deriveProfile(newAnswers);
      setProfile(p);
      setMessages([{
        role: "assistant",
        content: `Welcome to RELEASE. I'm here to help you understand your options for managing spasticity and hand surgery as a spinal cord injury patient.\n\nBased on what you've shared, I can give you personalized information about **${(p.procedure || "your treatment options").replace(/_/g, " ")}**. You can ask me anything, or tap one of the topic cards to get started.\n\nRemember: I'm an educational resource. Your surgical team at Mayo Clinic is always your best source for personalized medical decisions. 💙`,
        id: Date.now(),
      }]);
      setScreen("chat");
    }
  };

  const handleIntakeBack = () => {
    if (intakeStep === 0) setScreen("welcome");
    else setIntakeStep(s => s - 1);
  };

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInputText("");
    const userMsg = { role: "user", content: trimmed, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const systemPrompt = buildSystemPrompt(profile, lang);
    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, systemPrompt }),
      });
      const data = await res.json();
      const reply = data.reply || "I'm sorry, I couldn't generate a response. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: reply, id: Date.now() + 1 }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please check your network and try again.", id: Date.now() + 1 }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, profile, isLoading, lang]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(inputText); }
  };

  const handleTextareaInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 110) + "px";
  };

  const toggleCitePanel = (id) => {
    setOpenCitePanels(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // ── Voice input (continuous, real-time) ───────────────────────────────────
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // ── Voice output ──────────────────────────────────────────────────────────
  const speakMessage = (msgId, content) => {
    window.speechSynthesis.cancel();
    if (speakingId === msgId) { setSpeakingId(null); return; }
    const plain = content.replace(/\[[a-z_]+\]/g, "").replace(/\*\*/g, "").replace(/\*/g, "");
    const utt = new SpeechSynthesisUtterance(plain);
    utt.lang  = selectedLang.bcp47 || "en-US";
    utt.rate  = speechRate;
    utt.pitch = speechPitch;
    if (selectedVoice) utt.voice = selectedVoice;
    utt.onend   = () => setSpeakingId(null);
    utt.onerror = () => setSpeakingId(null);
    setSpeakingId(msgId);
    window.speechSynthesis.speak(utt);
  };

  // ── Edit modal ────────────────────────────────────────────────────────────
  const handleEditAnswer = (stepIndex, value) => {
    const step = INTAKE_STEPS[stepIndex];
    const newAnswers = { ...intakeAnswers, [step.id]: value };
    setIntakeAnswers(newAnswers);
    setProfile(deriveProfile(newAnswers));
    setEditingStep(null);
  };

  const handleEditDone = () => {
    setShowEditModal(false);
    setEditingStep(null);
    setMessages(prev => [...prev, {
      role: "assistant",
      content: "✏️ Your profile has been updated. I'll tailor my answers to reflect your new information.",
      id: Date.now(),
      ids: [],
    }]);
  };

  // ── Feedback ──────────────────────────────────────────────────────────────
  const handleFeedbackSend = () => {
    const subject = encodeURIComponent("RELEASE Chatbot Feedback");
    const body = encodeURIComponent(
      `Message:\n${feedbackText}\n\n---\nSession details:\n` +
      `Procedure: ${profile?.procedure || "not specified"}\n` +
      `Stage: ${profile?.stage || "not specified"}\n` +
      `Language: ${selectedLang?.label || "English"}\n` +
      `Theme: ${darkMode ? "Dark" : "Light"}`
    );
    window.open(`mailto:Shahriarirad.reza@mayo.edu?subject=${subject}&body=${body}`);
    setFeedbackText("");
    setFeedbackOpen(false);
    setFeedbackSent(true);
    setTimeout(() => setFeedbackSent(false), 3000);
  };

  // ══════════════════════════════════════════════════════════════════════════
  // WELCOME SCREEN
  // ══════════════════════════════════════════════════════════════════════════
  if (screen === "welcome") return (
    <TurbulentFlow>
      <div style={{ position: "fixed", inset: 0, background: "rgba(4,8,18,0.68)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, color: "#fff", fontFamily: "'DM Sans','Segoe UI',sans-serif", maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#1a6ed8,#00c9a7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚕</div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: 3, color: "#fff" }}>RELEASE</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(15,24,41,0.75)", backdropFilter: "blur(8px)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c9a7", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Mayo Clinic · Plastic &amp; Reconstructive Surgery</span>
            </div>
            <button
              onClick={() => setDarkMode(d => !d)}
              style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontSize: 14, color: theme.textMuted, fontFamily: "inherit" }}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >{darkMode ? "☀️" : "🌙"}</button>
          </div>
        </header>

        {/* Hero */}
        <div style={{ textAlign: "center", padding: "88px 0 72px" }}>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(52px,8vw,96px)", lineHeight: 1.0, margin: "0 0 10px", letterSpacing: -3, color: "#fff", textShadow: "0 4px 40px rgba(0,0,0,0.6)" }}>
            RELEASE
          </h1>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: "clamp(13px,2.2vw,17px)", color: "rgba(255,255,255,0.65)", margin: "0 0 14px", letterSpacing: 0.5, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            {APP.full}
          </h2>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 500, fontSize: "clamp(12px,1.8vw,15px)", color: "rgba(255,255,255,0.40)", margin: "0 0 32px", letterSpacing: 2, textTransform: "uppercase" }}>
            Spasticity · Nerve Transfer · Hand Surgery
          </h3>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.70)", maxWidth: 540, margin: "0 auto 52px", lineHeight: 1.75, fontWeight: 300 }}>
            Personalized education for spinal cord injury patients navigating spasticity and hand surgery. Built on evidence-based Mayo Clinic protocols.
          </p>

          <button
            onClick={() => setScreen("intake")}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 40px", borderRadius: 50, background: "rgba(26,110,216,0.9)", backdropFilter: "blur(10px)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer", fontSize: 16, fontWeight: 600, fontFamily: "inherit", boxShadow: "0 0 50px rgba(26,110,216,0.5),0 2px 20px rgba(0,0,0,0.4)", transition: "all 0.25s", letterSpacing: 0.3 }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.background = "rgba(45,132,240,0.95)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "rgba(26,110,216,0.9)"; }}
          >
            {strings.start} <span style={{ fontSize: 18 }}>→</span>
          </button>

          <div style={{ marginTop: 18 }}>
            <button
              onClick={() => {
                setProfile(null);
                setMessages([{ role: "assistant", content: "Welcome to RELEASE. I'm here to help you understand spasticity management and hand surgery options for spinal cord injury. What would you like to know?", id: 1 }]);
                setScreen("chat");
              }}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontSize: 13, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}
            >
              {strings.skip}
            </button>
          </div>

          {/* Language selector */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32, flexWrap: "wrap" }}>
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 20, border: lang === l.code ? "1px solid #1a6ed8" : "1px solid rgba(255,255,255,0.18)", background: lang === l.code ? "rgba(26,110,216,0.25)" : "rgba(255,255,255,0.06)", color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: "inherit", transition: "all 0.2s", backdropFilter: "blur(6px)" }}
              >
                <span>{l.flag}</span><span>{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer with team cards */}
        <footer style={{ textAlign: "center", padding: "24px 0 48px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.30)", lineHeight: 1.7, marginBottom: 24 }}>
            RELEASE is an educational tool only. It does not provide medical advice, diagnoses, or treatment recommendations.<br />
            Always consult your Mayo Clinic surgical team for personalized medical decisions.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 14 }}>
            {[
              { initials: "KW", name: "Dr. Kitty Y. Wu, M.D.", href: "https://www.mayoclinic.org/biographies/wu-kitty-y-m-d/bio-20552093", subtitle: "Principal Investigator · Mayo Clinic" },
              { initials: "RS", name: "Reza Shahriarirad, M.D.", href: "https://sorrad.github.io/RezaShahriarirad_CV", subtitle: "Research Fellow · Mayo Clinic" },
            ].map(p => (
              <div key={p.initials} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "16px 20px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(15,24,41,0.70)", minWidth: 160 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(26,110,216,0.2)", border: "1px solid rgba(26,110,216,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#2d84f0" }}>{p.initials}</div>
                <a href={p.href} target="_blank" rel="noreferrer" style={{ color: "#2d84f0", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{p.name}</a>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.40)" }}>{p.subtitle}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.20)", margin: 0 }}>
            Mayo Clinic · Plastic &amp; Reconstructive Surgery · Rochester, Minnesota · 2026
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }
      `}</style>
    </TurbulentFlow>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // INTAKE SCREEN
  // ══════════════════════════════════════════════════════════════════════════
  if (screen === "intake") {
    const step = INTAKE_STEPS[intakeStep];
    const progress = (intakeStep / INTAKE_STEPS.length) * 100;
    return (
      <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text, fontFamily: "'DM Sans','Segoe UI',sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 560 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
            <button
              onClick={handleIntakeBack}
              style={{ background: "none", border: `1px solid ${theme.border}`, color: theme.textMuted, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}
            >← Back</button>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: 3, color: theme.textMuted }}>RELEASE</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: theme.textMuted }}>{intakeStep + 1} / {INTAKE_STEPS.length}</span>
              <button
                onClick={() => setDarkMode(d => !d)}
                style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontSize: 14, color: theme.textMuted, fontFamily: "inherit" }}
              >{darkMode ? "☀️" : "🌙"}</button>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 2, background: theme.border, borderRadius: 1, marginBottom: 48, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg,${theme.primary},${theme.accent})`, borderRadius: 1, transition: "width 0.4s ease" }} />
          </div>

          {/* Step content */}
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 26, marginBottom: 8, lineHeight: 1.2 }}>{step.title}</h2>
            {step.subtitle ? <p style={{ color: theme.textMuted, fontSize: 14, marginBottom: 32 }}>{step.subtitle}</p> : <div style={{ marginBottom: 32 }} />}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {step.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleIntakeSelect(opt.value)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bgCard, color: theme.text, cursor: "pointer", fontSize: 15, fontFamily: "inherit", fontWeight: 500, textAlign: "left", transition: "all 0.2s", minHeight: 52 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.background = theme.primaryGlow; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.bgCard; e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <span>{opt.label}</span>
                  {opt.detail && <span style={{ fontSize: 12, color: theme.textMuted, fontWeight: 400 }}>{opt.detail}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box;}`}</style>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // CHAT SCREEN
  // ══════════════════════════════════════════════════════════════════════════
  const sidebarTopics = (
    <>
      <div style={{ fontSize: 10, fontWeight: 600, color: theme.textDim, letterSpacing: 2, textTransform: "uppercase", padding: "4px 8px", marginBottom: 4 }}>Topics</div>
      {TOPIC_CARDS.map(card => (
        <button
          key={card.id}
          onClick={() => { sendMessage(card.prompt); setShowMobileDrawer(false); }}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", borderRadius: 8, border: "none", background: "transparent", color: theme.textMuted, cursor: "pointer", fontSize: 12, fontFamily: "inherit", textAlign: "left", width: "100%", transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.background = theme.bgCardHover; e.currentTarget.style.color = theme.text; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = theme.textMuted; }}
        >
          <span style={{ fontSize: 14, flexShrink: 0 }}>{card.icon}</span>
          <span style={{ lineHeight: 1.3 }}>{card.label}</span>
        </button>
      ))}

      {/* Edit answers button */}
      <button
        onClick={() => { setShowEditModal(true); setShowMobileDrawer(false); }}
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", borderRadius: 8, border: "none", background: "transparent", color: theme.textMuted, cursor: "pointer", fontSize: 12, fontFamily: "inherit", textAlign: "left", width: "100%", transition: "all 0.15s", marginTop: 8 }}
        onMouseEnter={e => { e.currentTarget.style.background = theme.bgCardHover; e.currentTarget.style.color = theme.text; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = theme.textMuted; }}
      >
        <span style={{ fontSize: 14 }}>✏️</span>
        <span>Edit my answers</span>
      </button>

      {/* Care Team */}
      <div style={{ marginTop: "auto", padding: "12px 8px 4px", borderTop: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: theme.textDim, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Care Team</div>
        <div style={{ fontSize: 10, color: theme.textDim, lineHeight: 1.9 }}>
          <a href="https://www.mayoclinic.org/biographies/wu-kitty-y-m-d/bio-20552093" target="_blank" rel="noopener noreferrer" style={{ color: theme.primaryLight, textDecoration: "none", display: "block" }}>Dr. Kitty Y. Wu, M.D.</a>
          <span style={{ color: theme.textDim, display: "block", fontSize: 9, marginTop: -2, marginBottom: 4 }}>Principal Investigator · Mayo Clinic</span>
          <a href="https://sorrad.github.io/RezaShahriarirad_CV" target="_blank" rel="noopener noreferrer" style={{ color: theme.primaryLight, textDecoration: "none", display: "block" }}>Reza Shahriarirad, M.D.</a>
          <span style={{ color: theme.textDim, display: "block", fontSize: 9, marginTop: -2 }}>Research Fellow · Mayo Clinic</span>
        </div>
      </div>
    </>
  );

  return (
    <div style={{ height: "100vh", background: theme.bg, color: theme.text, fontFamily: "'DM Sans','Segoe UI',sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Top bar */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderBottom: `1px solid ${theme.border}`, background: theme.bgCard, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setScreen("welcome")} style={{ background: "none", border: `1px solid ${theme.border}`, color: theme.textMuted, borderRadius: 8, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>←</button>
          {isMobile && (
            <button onClick={() => setShowMobileDrawer(true)} style={{ background: "none", border: `1px solid ${theme.border}`, color: theme.textMuted, borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>☰ Topics</button>
          )}
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${theme.primary},${theme.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚕</div>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: 2 }}>RELEASE</div>
            <div style={{ fontSize: 11, color: theme.textMuted }}>Spasticity &amp; Hand Surgery · Mayo Clinic</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {profile && !isMobile && (
            <div style={{ padding: "4px 10px", borderRadius: 12, background: theme.primaryGlow, border: `1px solid ${theme.borderAccent}`, fontSize: 11, color: theme.primaryLight }}>
              {(profile.procedure || "General").replace(/_/g, " ")}
              {profile.stage ? ` · ${profile.stage.replace(/_/g, " ")}` : ""}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 12, border: `1px solid ${theme.border}`, fontSize: 11, color: theme.textMuted }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: theme.accent, animation: "pulse 2s infinite" }} />
            Online
          </div>
          <button
            onClick={() => setDarkMode(d => !d)}
            style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontSize: 14, color: theme.textMuted, fontFamily: "inherit" }}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >{darkMode ? "☀️" : "🌙"}</button>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside style={{ width: 220, borderRight: `1px solid ${theme.border}`, padding: "16px 12px", overflowY: "auto", flexShrink: 0, display: "flex", flexDirection: "column", gap: 4 }}>
            {sidebarTopics}
          </aside>
        )}

        {/* Mobile Drawer */}
        {isMobile && showMobileDrawer && (
          <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setShowMobileDrawer(false)} />
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 260, background: theme.bgCard, padding: "16px 12px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 4, boxShadow: "4px 0 24px rgba(0,0,0,0.3)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: 2 }}>RELEASE</span>
                <button onClick={() => setShowMobileDrawer(false)} style={{ background: "none", border: "none", color: theme.textMuted, cursor: "pointer", fontSize: 18, lineHeight: 1 }}>✕</button>
              </div>
              {sidebarTopics}
            </div>
          </div>
        )}

        {/* Main chat column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Voice options bar */}
          <div style={{ background: theme.bgCard, borderBottom: `1px solid ${theme.border}`, padding: "7px 16px", display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: theme.textMuted, flexShrink: 0, flexWrap: "wrap" }}>
            {/* Language selector */}
            <select
              value={lang}
              onChange={e => setLang(e.target.value)}
              style={{ background: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.text, borderRadius: 6, padding: "3px 6px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", outline: "none" }}
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.flag} {l.code.toUpperCase()}</option>
              ))}
            </select>

            {/* Voice selector */}
            {voices.length > 0 && (
              <select
                value={selectedVoice ? voices.indexOf(selectedVoice) : 0}
                onChange={e => setSelectedVoice(voices[parseInt(e.target.value)])}
                style={{ background: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.text, borderRadius: 6, padding: "3px 6px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", outline: "none", maxWidth: 150 }}
              >
                {voices.map((v, i) => (
                  <option key={i} value={i}>🔊 {v.name} ({v.lang})</option>
                ))}
              </select>
            )}

            {/* Speed slider */}
            <label style={{ display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              Speed {speechRate.toFixed(1)}x
              <input type="range" min="0.5" max="2.0" step="0.1" value={speechRate}
                onChange={e => setSpeechRate(parseFloat(e.target.value))}
                style={{ width: 70 }}
              />
            </label>

            {/* Pitch slider */}
            <label style={{ display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              Pitch {speechPitch.toFixed(1)}
              <input type="range" min="0.5" max="2.0" step="0.1" value={speechPitch}
                onChange={e => setSpeechPitch(parseFloat(e.target.value))}
                style={{ width: 70 }}
              />
            </label>
          </div>

          {/* Messages area */}
          <div
            style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {messages.map(msg => {
              const citations = msg.role === "assistant" ? parseCitations(msg.content) : [];
              const isOpen = openCitePanels[msg.id] || false;
              const isSpeaking = speakingId === msg.id;
              return (
                <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", animation: "fadeUp 0.25s ease" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", width: "100%", gap: 8 }}>
                    {msg.role === "assistant" && (
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${theme.primary},${theme.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, marginTop: 2 }}>⚕</div>
                    )}
                    <div style={{
                      maxWidth: "72%",
                      padding: "12px 16px",
                      borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
                      background: msg.role === "user" ? theme.primary : theme.bgCard,
                      border: msg.role === "assistant" ? `1px solid ${theme.border}` : "none",
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: msg.role === "user" ? "#fff" : theme.text,
                      textAlign: isRTL ? "right" : "left",
                    }}>
                      <div dangerouslySetInnerHTML={{ __html: `<p style="margin:0">${renderWithCitations(msg.content)}</p>` }} />
                    </div>
                    {/* Speak button on assistant messages */}
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => speakMessage(msg.id, msg.content)}
                        title={isSpeaking ? "Stop" : "Read aloud"}
                        style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: 8, padding: "4px 8px", cursor: "pointer", fontSize: 13, color: isSpeaking ? theme.primary : theme.textMuted, flexShrink: 0, marginTop: 2, transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.color = theme.primary; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = isSpeaking ? theme.primary : theme.textMuted; }}
                      >
                        {isSpeaking ? "⏹" : "🔊"}
                      </button>
                    )}
                  </div>

                  {/* Citation panel */}
                  {msg.role === "assistant" && citations.length > 0 && (
                    <div style={{ marginLeft: isRTL ? 0 : 38, marginRight: isRTL ? 38 : 0, marginTop: 6 }}>
                      <button
                        onClick={() => toggleCitePanel(msg.id)}
                        style={{ background: "none", border: `1px solid ${theme.border}`, color: theme.textMuted, borderRadius: 8, padding: "3px 10px", cursor: "pointer", fontSize: 11, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}
                      >
                        📚 {citations.length} {strings.sources} {isOpen ? "▲" : "▼"}
                      </button>
                      {isOpen && (
                        <div style={{ marginTop: 6, padding: "10px 14px", borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.bgCard, display: "flex", flexDirection: "column", gap: 8, maxWidth: 480 }}>
                          {citations.map((id, idx) => {
                            const c = CITATIONS[id];
                            return (
                              <div key={id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                <span style={{ fontSize: 11, color: theme.primaryLight, fontWeight: 600, minWidth: 20, flexShrink: 0 }}>[{idx + 1}]</span>
                                <div>
                                  <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ color: theme.primaryLight, fontSize: 12, textDecoration: "none", fontWeight: 500 }}>{c.title}</a>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                                    <span style={{ fontSize: 11, color: theme.textMuted }}>{c.org}</span>
                                    {c.type === "clinical" && (
                                      <span style={{ fontSize: 10, color: theme.warning, border: `1px solid ${theme.warning}`, borderRadius: 4, padding: "0 4px" }}>Clinical</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, animation: "fadeUp 0.25s ease" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${theme.primary},${theme.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>⚕</div>
                <div style={{ padding: "14px 18px", borderRadius: "4px 18px 18px 18px", background: theme.bgCard, border: `1px solid ${theme.border}`, display: "flex", gap: 5, alignItems: "center" }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: theme.primary, animation: `bounce 1.2s ${i * 0.2}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div style={{ padding: "16px 24px", borderTop: `1px solid ${theme.border}`, background: theme.bgCard, flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", maxWidth: 800, margin: "0 auto" }}>
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                onInput={handleTextareaInput}
                placeholder={isListening ? strings.listening : strings.placeholder}
                rows={1}
                dir={isRTL ? "rtl" : "ltr"}
                style={{ flex: 1, padding: "12px 16px", borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bgInput, color: theme.text, fontSize: 14, fontFamily: "inherit", resize: "none", outline: "none", lineHeight: 1.5, maxHeight: 110, overflowY: "auto", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = theme.primary}
                onBlur={e => e.target.style.borderColor = theme.border}
              />

              {voiceSupported && (
                <button
                  onClick={toggleListening}
                  title={isListening ? "Stop listening" : "Voice input"}
                  style={{ width: 44, height: 44, borderRadius: 12, border: "none", background: isListening ? "#ef4444" : theme.bgCardHover, color: isListening ? "#fff" : theme.textMuted, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s", animation: isListening ? "pulse 1s infinite" : "none" }}
                >🎤</button>
              )}

              <button
                onClick={() => sendMessage(inputText)}
                disabled={isLoading || !inputText.trim()}
                style={{ width: 44, height: 44, borderRadius: 12, border: "none", background: inputText.trim() ? theme.primary : theme.bgCardHover, color: inputText.trim() ? "#fff" : theme.textDim, cursor: inputText.trim() ? "pointer" : "default", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}
                onMouseEnter={e => { if (inputText.trim()) e.currentTarget.style.background = theme.primaryLight; }}
                onMouseLeave={e => { if (inputText.trim()) e.currentTarget.style.background = theme.primary; }}
              >↑</button>
            </div>

            {/* Interim text display */}
            {interimText && (
              <div style={{ fontSize: 11, color: theme.textMuted, fontStyle: "italic", padding: "2px 15px", marginTop: 2, maxWidth: 800, margin: "2px auto 0" }}>
                {interimText}
              </div>
            )}

            <p style={{ fontSize: 11, color: theme.textDim, textAlign: "center", marginTop: 8, marginBottom: 0 }}>
              Educational resource only · Not medical advice · Mayo Clinic Plastic &amp; Reconstructive Surgery
            </p>
          </div>

          {/* Feedback bar */}
          <div style={{ background: theme.bgCard, borderTop: `1px solid ${theme.border}`, flexShrink: 0 }}>
            {!feedbackOpen && !feedbackSent && (
              <div style={{ padding: "8px 24px", textAlign: "center", fontSize: 11, color: theme.textDim }}>
                Have feedback or suggestions?{" "}
                <span
                  onClick={() => setFeedbackOpen(true)}
                  style={{ color: theme.primaryLight, cursor: "pointer", textDecoration: "underline" }}
                >Share with us</span>
              </div>
            )}
            {feedbackSent && (
              <div style={{ padding: "8px 24px", textAlign: "center", fontSize: 11, color: theme.citeText }}>
                Thank you for your feedback 💙
              </div>
            )}
            {feedbackOpen && (
              <div style={{ padding: "12px 24px 16px" }}>
                <textarea
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or report an issue…"
                  rows={3}
                  style={{ width: "100%", background: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.text, borderRadius: 10, padding: "10px 14px", fontSize: 13, fontFamily: "inherit", resize: "none", outline: "none", boxSizing: "border-box" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <button
                    onClick={() => { setFeedbackOpen(false); setFeedbackText(""); }}
                    style={{ background: "none", border: "none", color: theme.textMuted, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}
                  >Cancel</button>
                  <button
                    onClick={handleFeedbackSend}
                    disabled={!feedbackText.trim()}
                    style={{ padding: "7px 18px", borderRadius: 10, border: "none", background: feedbackText.trim() ? theme.primary : theme.bgCardHover, color: feedbackText.trim() ? "#fff" : theme.textDim, cursor: feedbackText.trim() ? "pointer" : "default", fontSize: 13, fontFamily: "inherit", fontWeight: 600 }}
                  >Send Feedback →</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Intake Answers Modal */}
      {showEditModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.55)" }}>
          <div style={{
            background: theme.bgCard,
            borderRadius: isMobile ? 0 : 16,
            padding: 24,
            border: `1px solid ${theme.border}`,
            width: isMobile ? "100%" : "100%",
            maxWidth: isMobile ? "100%" : 480,
            maxHeight: isMobile ? "100%" : "80vh",
            height: isMobile ? "100%" : "auto",
            position: isMobile ? "fixed" : "relative",
            inset: isMobile ? 0 : "auto",
            overflowY: "auto",
          }}>
            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: theme.text }}>Your Answers</h3>
              <button
                onClick={() => { setShowEditModal(false); setEditingStep(null); }}
                style={{ background: "none", border: "none", color: theme.textMuted, cursor: "pointer", fontSize: 20, lineHeight: 1 }}
              >✕</button>
            </div>

            {/* Answer rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {INTAKE_STEPS.map((step, idx) => {
                const currentValue = intakeAnswers[step.id];
                const currentOption = step.options.find(o => o.value === currentValue);
                const isExpandedHere = editingStep === idx;
                return (
                  <div key={step.id} style={{ borderRadius: 10, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
                    <div style={{ padding: "10px 14px" }}>
                      <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 6 }}>{step.title}</div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                        {currentOption ? (
                          <span style={{ padding: "3px 10px", borderRadius: 12, background: theme.primaryGlow, color: theme.primaryLight, fontSize: 12, fontWeight: 500 }}>
                            {currentOption.label}
                          </span>
                        ) : (
                          <span style={{ fontSize: 12, color: theme.textDim }}>Not answered</span>
                        )}
                        <button
                          onClick={() => setEditingStep(isExpandedHere ? null : idx)}
                          style={{ background: "transparent", border: "none", color: theme.primaryLight, cursor: "pointer", fontSize: 11, fontFamily: "inherit", flexShrink: 0 }}
                        >{isExpandedHere ? "Cancel" : "Change"}</button>
                      </div>
                    </div>
                    {isExpandedHere && (
                      <div style={{ borderTop: `1px solid ${theme.border}`, padding: "10px 14px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                        {step.options.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => handleEditAnswer(idx, opt.value)}
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 8, border: `1px solid ${opt.value === currentValue ? theme.primary : theme.border}`, background: opt.value === currentValue ? theme.primaryGlow : theme.bgInput, color: theme.text, cursor: "pointer", fontSize: 13, fontFamily: "inherit", textAlign: "left" }}
                          >
                            <span>{opt.label}</span>
                            {opt.detail && <span style={{ fontSize: 11, color: theme.textMuted }}>{opt.detail}</span>}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Done button */}
            <div style={{ marginTop: 20 }}>
              <button
                onClick={handleEditDone}
                style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", background: theme.primary, color: "#fff", cursor: "pointer", fontSize: 15, fontFamily: "inherit", fontWeight: 600 }}
              >Done</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse  { 0%,100%{opacity:1}  50%{opacity:0.4} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(128,128,128,0.2);border-radius:2px;}
      `}</style>
    </div>
  );
}
