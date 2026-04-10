import { useState, useEffect, useRef, useCallback } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const THEME = {
  dark: {
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
    shadow: "0 8px 32px rgba(0,0,0,0.5)",
    mayoBlue: "#004B87",
    success: "#00c9a7",
    warning: "#f59e0b",
    danger: "#ef4444",
  }
};

const T = THEME.dark;

// ─── APP NAME ────────────────────────────────────────────────────────────────
const APP = {
  name: "RESTORE",
  full: "Rehabilitation Education System for Treatment Outcomes & Recovery Enhancement",
  subtitle: "Spasticity & Hand Surgery",
  institution: "Mayo Clinic",
  version: "2.0",
};

// ─── CLINICAL TOPIC CARDS ────────────────────────────────────────────────────
const TOPIC_CARDS = [
  { id: "overview", icon: "🧠", label: "Understanding Spasticity", prompt: "Can you explain what spasticity is, how it relates to spinal cord injury, and what treatment options exist?" },
  { id: "nerve_transfer", icon: "⚡", label: "Nerve Transfer Surgery", prompt: "What is nerve transfer surgery and how can it help restore hand function in spinal cord injury?" },
  { id: "neurectomy", icon: "✂️", label: "Neurectomy", prompt: "What is a neurectomy and when is it used to manage spasticity in the hand?" },
  { id: "tendon", icon: "💪", label: "Tendon Transfers", prompt: "How do tendon transfers like FPL and FDS work, and what can I expect for recovery?" },
  { id: "recovery", icon: "📅", label: "Recovery Timeline", prompt: "What is the typical recovery timeline after hand surgery for spinal cord injury patients?" },
  { id: "ot", icon: "🖐️", label: "Occupational Therapy", prompt: "What role does occupational therapy play in recovery from hand surgery for SCI patients?" },
  { id: "wound", icon: "🩹", label: "Wound & Splint Care", prompt: "How do I care for my wound and splint after hand surgery?" },
  { id: "pain", icon: "💊", label: "Pain Management", prompt: "How is pain managed after hand surgery and what medications are typically used?" },
  { id: "botox", icon: "💉", label: "Botox for Spasticity", prompt: "How does Botox help manage spasticity, and what can I expect from treatment?" },
  { id: "nerve_recovery", icon: "🔬", label: "Nerve & Sensation", prompt: "When will sensation return after nerve surgery and how does nerve recovery work?" },
  { id: "complications", icon: "⚠️", label: "Warning Signs", prompt: "What warning signs should I watch for after hand surgery?" },
  { id: "preparing", icon: "📋", label: "Preparing for Surgery", prompt: "What questions should I bring to my consultation and how do I prepare for hand surgery?" },
  { id: "emotional", icon: "💙", label: "Feeling Overwhelmed", prompt: "I have a spinal cord injury and I'm overwhelmed about my upcoming hand surgery. Where do I start?" },
];

// ─── INTAKE STEPS ────────────────────────────────────────────────────────────
const INTAKE_STEPS = [
  {
    id: "injury_level",
    title: "Level of Spinal Cord Injury",
    subtitle: "This helps personalize your information",
    options: [
      { value: "cervical_high", label: "Cervical (C1–C4)", detail: "High cervical" },
      { value: "cervical_low", label: "Cervical (C5–C8)", detail: "Lower cervical" },
      { value: "thoracic", label: "Thoracic (T1–T12)", detail: "Chest level" },
      { value: "lumbar", label: "Lumbar / Sacral", detail: "Lower back" },
      { value: "unsure", label: "Not Sure", detail: "I'll check with my doctor" },
    ]
  },
  {
    id: "injury_type",
    title: "Type of Injury",
    options: [
      { value: "complete", label: "Complete SCI", detail: "No movement or sensation below injury" },
      { value: "incomplete", label: "Incomplete SCI", detail: "Some function preserved below injury" },
      { value: "unsure", label: "Not Sure", detail: "" },
    ]
  },
  {
    id: "affected_hand",
    title: "Which hand is affected?",
    options: [
      { value: "right", label: "Right Hand", detail: "" },
      { value: "left", label: "Left Hand", detail: "" },
      { value: "both", label: "Both Hands", detail: "" },
    ]
  },
  {
    id: "dominant_hand",
    title: "Is your dominant hand affected?",
    options: [
      { value: "yes", label: "Yes", detail: "My dominant hand is affected" },
      { value: "no", label: "No", detail: "Non-dominant hand is affected" },
      { value: "both", label: "Both hands", detail: "" },
    ]
  },
  {
    id: "procedure",
    title: "What procedure are you asking about?",
    subtitle: "Select the most relevant one",
    options: [
      { value: "nerve_transfer", label: "Nerve Transfer", detail: "Restoring grip or pinch" },
      { value: "neurectomy", label: "Neurectomy", detail: "Reducing spasticity" },
      { value: "tendon_transfer", label: "Tendon Transfer", detail: "FPL, FDS, or other" },
      { value: "botox", label: "Botox / Injections", detail: "Non-surgical spasticity management" },
      { value: "multiple", label: "Multiple / Unsure", detail: "" },
    ]
  },
  {
    id: "stage",
    title: "Where are you in your journey?",
    options: [
      { value: "considering", label: "Considering Surgery", detail: "Gathering information" },
      { value: "scheduled", label: "Surgery Scheduled", detail: "Preparing for procedure" },
      { value: "post_op", label: "Post-Operation", detail: "Recovering from surgery" },
      { value: "rehab", label: "In Rehabilitation", detail: "Doing therapy" },
    ]
  },
  {
    id: "diabetes",
    title: "Do you have diabetes?",
    subtitle: "This affects wound healing guidance",
    options: [
      { value: "yes", label: "Yes", detail: "" },
      { value: "no", label: "No", detail: "" },
      { value: "prefer_not", label: "Prefer not to say", detail: "" },
    ]
  },
  {
    id: "main_concern",
    title: "What is your main concern right now?",
    options: [
      { value: "function", label: "Regaining hand function", detail: "" },
      { value: "pain", label: "Managing pain & spasticity", detail: "" },
      { value: "recovery", label: "Understanding recovery", detail: "" },
      { value: "risks", label: "Risks & complications", detail: "" },
      { value: "work", label: "Returning to work / daily life", detail: "" },
    ]
  },
];

function deriveProfile(answers) {
  return {
    ...answers,
    high_cervical: answers.injury_level === "cervical_high",
    bilateral: answers.affected_hand === "both",
    dominant_affected: answers.dominant_hand === "yes" || answers.dominant_hand === "both",
    diabetic: answers.diabetes === "yes",
    nerve_case: answers.procedure === "nerve_transfer",
    post_op: answers.stage === "post_op",
    trauma_patient: false,
  };
}

function buildSystemPrompt(profile) {
  let prompt = `You are RESTORE, an expert patient education assistant for spinal cord injury patients who need hand surgery to manage spasticity. You are part of the Mayo Clinic Plastic & Reconstructive Surgery department.

Your specialty is helping SCI patients understand: spasticity management, nerve transfers, neurectomy, tendon transfers (FPL/FDS), Botox injections, occupational therapy, wound care, and recovery expectations.

You communicate with warmth, clarity, and clinical accuracy. You do not provide medical advice — you provide education and help patients prepare informed questions for their surgical team.

__KNOWLEDGE_BASE_INJECTED_SERVER_SIDE__
`;

  if (profile) {
    prompt += `\n\nPATIENT PROFILE:\n`;
    if (profile.injury_level) prompt += `- Injury level: ${profile.injury_level.replace("_", " ")}\n`;
    if (profile.injury_type) prompt += `- Injury type: ${profile.injury_type}\n`;
    if (profile.affected_hand) prompt += `- Affected hand: ${profile.affected_hand}\n`;
    if (profile.procedure) prompt += `- Procedure of interest: ${profile.procedure.replace("_", " ")}\n`;
    if (profile.stage) prompt += `- Journey stage: ${profile.stage.replace("_", " ")}\n`;
    if (profile.main_concern) prompt += `- Main concern: ${profile.main_concern.replace("_", " ")}\n`;

    prompt += `\nACTIVE CLINICAL FILTERS:\n`;
    if (profile.high_cervical) prompt += `⚠️ HIGH CERVICAL INJURY (C1-C4): Patient may have limited respiratory reserve and more complex functional limitations. Use extra care discussing surgical risks and functional goals.\n`;
    if (profile.diabetic) prompt += `⚠️ DIABETES: Emphasize wound healing risks, elevated infection risk, neuropathy complications, and the importance of blood glucose control before and after surgery.\n`;
    if (profile.dominant_affected) prompt += `⚠️ DOMINANT HAND AFFECTED: Include ADL impact, adaptive strategies during recovery, and realistic return-to-function expectations.\n`;
    if (profile.bilateral) prompt += `⚠️ BILATERAL INVOLVEMENT: Both hands affected. Emphasize need for home help, caregiver support, and occupational therapy for ADL management during recovery.\n`;
    if (profile.nerve_case) prompt += `⚠️ NERVE TRANSFER: Emphasize that nerve regeneration is slow (1mm/day). Recovery of sensation and motor function takes months to over a year. Set realistic expectations for incomplete recovery.\n`;
    if (profile.post_op) prompt += `⚠️ POST-OP PATIENT: Patient is currently recovering. Prioritize wound care, splinting, therapy compliance, and warning signs over procedural information.\n`;
  }

  prompt += `\nOUT OF SCOPE (never answer): specific surgical technique selection, drug dosing, implant sizing, whether a specific patient is a surgical candidate. Always direct these to the surgical team.

TONE: Warm, reassuring, clear. Avoid jargon. When using medical terms, always explain them. Use short paragraphs. End responses with an offer to explain more or suggest a related topic.`;

  return prompt;
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function RestoreApp() {
  const [screen, setScreen] = useState("welcome"); // welcome | intake | chat
  const [intakeStep, setIntakeStep] = useState(0);
  const [intakeAnswers, setIntakeAnswers] = useState({});
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode] = useState(true);
  const [particles, setParticles] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // ── Particle canvas animation ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      o: Math.random() * 0.4 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26,110,216,${p.o})`;
        ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(26,110,216,${0.08 * (1 - d / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }));
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [screen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        content: `Welcome to RESTORE. I'm here to help you understand your options for managing spasticity and hand surgery as a spinal cord injury patient.\n\nBased on what you've shared, I can give you personalized information about **${p.procedure?.replace("_", " ") || "your treatment options"}**. You can ask me anything, or tap one of the topic cards below to get started.\n\nRemember: I'm an educational resource. Your surgical team at Mayo Clinic is always your best source for personalized medical decisions. 💙`,
        id: Date.now()
      }]);
      setScreen("chat");
    }
  };

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInputText("");
    const userMsg = { role: "user", content: trimmed, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const systemPrompt = buildSystemPrompt(profile);
    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: history,
        }),
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "I'm sorry, I couldn't generate a response. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: reply, id: Date.now() + 1 }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please check your network and try again.", id: Date.now() + 1 }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, profile, isLoading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(inputText); }
  };

  function renderMarkdown(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>');
  }

  // ── SCREENS ──────────────────────────────────────────────────────────────

  if (screen === "welcome") return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,110,216,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,201,167,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚕</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: 3, color: T.text }}>RESTORE</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, border: `1px solid ${T.border}`, background: T.bgCard }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 12, color: T.textMuted }}>Mayo Clinic · Plastic & Reconstructive Surgery</span>
          </div>
        </header>

        {/* Hero */}
        <div style={{ textAlign: "center", padding: "80px 0 60px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 20, border: `1px solid rgba(26,110,216,0.3)`, background: "rgba(26,110,216,0.08)", marginBottom: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: T.primaryLight, letterSpacing: 2, textTransform: "uppercase" }}>Patient Education Platform v2.0</span>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(44px, 7vw, 80px)", lineHeight: 1.05, margin: "0 0 8px", letterSpacing: -2 }}>
            <span style={{ color: T.text }}>RESTORE</span>
          </h1>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(16px, 3vw, 22px)", color: T.textMuted, margin: "0 0 24px", letterSpacing: 1 }}>
            Spasticity · Nerve Transfer · Hand Surgery
          </h2>
          <p style={{ fontSize: 17, color: T.textMuted, maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.7, fontWeight: 300 }}>
            Personalized education for spinal cord injury patients navigating spasticity and hand surgery. Built on evidence-based Mayo Clinic protocols.
          </p>

          <button
            onClick={() => setScreen("intake")}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", borderRadius: 50, background: `linear-gradient(135deg, ${T.primary}, #1558b0)`, color: "#fff", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 600, fontFamily: "inherit", boxShadow: `0 0 40px rgba(26,110,216,0.4)`, transition: "all 0.2s", letterSpacing: 0.3 }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = `0 0 60px rgba(26,110,216,0.6)`; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = `0 0 40px rgba(26,110,216,0.4)`; }}
          >
            Start Personalized Session
            <span style={{ fontSize: 18 }}>→</span>
          </button>

          <div style={{ marginTop: 16 }}>
            <button onClick={() => { setProfile(null); setMessages([{ role: "assistant", content: "Welcome to RESTORE. I'm here to help you understand spasticity management and hand surgery options for spinal cord injury. What would you like to know?", id: 1 }]); setScreen("chat"); }} style={{ background: "none", border: "none", color: T.textMuted, fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>
              Skip intake — go straight to chat
            </button>
          </div>
        </div>

        {/* Feature cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, paddingBottom: 80 }}>
          {[
            { icon: "🧠", title: "Spasticity Education", desc: "Understand causes, treatments, and surgical options for SCI-related spasticity" },
            { icon: "⚡", title: "Nerve Transfer Guide", desc: "Learn what to expect before, during, and after nerve transfer surgery" },
            { icon: "🖐️", title: "Personalized Intake", desc: "Share your details once — get relevant information throughout your session" },
            { icon: "💙", title: "Compassionate Support", desc: "Designed for patients navigating a complex diagnosis with clarity and warmth" },
          ].map((f, i) => (
            <div key={i} style={{ padding: "24px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.bgCard, transition: "all 0.25s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.background = T.bgCardHover; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.bgCard; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <footer style={{ textAlign: "center", padding: "24px 0 40px", borderTop: `1px solid ${T.border}` }}>
          <p style={{ fontSize: 11, color: T.textDim, lineHeight: 1.7 }}>
            RESTORE is an educational tool only. It does not provide medical advice, diagnoses, or treatment recommendations.<br/>
            Always consult your Mayo Clinic surgical team for personalized medical decisions.
          </p>
          <p style={{ fontSize: 11, color: T.textDim, marginTop: 8 }}>
            Reza Shahriarirad, M.D. · Dr. Aparna Vijayasekaran, M.B.B.S. · Mayo Clinic, Rochester, Minnesota · 2026
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </div>
  );

  if (screen === "intake") {
    const step = INTAKE_STEPS[intakeStep];
    const progress = ((intakeStep) / INTAKE_STEPS.length) * 100;
    return (
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
        <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 560 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
            <button onClick={() => setScreen("welcome")} style={{ background: "none", border: `1px solid ${T.border}`, color: T.textMuted, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>← Back</button>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: 3, color: T.textMuted }}>RESTORE</span>
            <span style={{ fontSize: 13, color: T.textMuted }}>{intakeStep + 1} / {INTAKE_STEPS.length}</span>
          </div>

          {/* Progress bar */}
          <div style={{ height: 2, background: T.border, borderRadius: 1, marginBottom: 48, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${T.primary}, ${T.accent})`, borderRadius: 1, transition: "width 0.4s ease" }} />
          </div>

          {/* Step content */}
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 26, marginBottom: 8, lineHeight: 1.2 }}>{step.title}</h2>
            {step.subtitle && <p style={{ color: T.textMuted, fontSize: 14, marginBottom: 32 }}>{step.subtitle}</p>}
            {!step.subtitle && <div style={{ marginBottom: 32 }} />}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {step.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleIntakeSelect(opt.value)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: 12, border: `1px solid ${T.border}`, background: T.bgCard, color: T.text, cursor: "pointer", fontSize: 15, fontFamily: "inherit", fontWeight: 500, textAlign: "left", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.primary; e.currentTarget.style.background = T.primaryGlow; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.bgCard; e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <span>{opt.label}</span>
                  {opt.detail && <span style={{ fontSize: 12, color: T.textMuted, fontWeight: 400 }}>{opt.detail}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } } *{box-sizing:border-box;}`}</style>
      </div>
    );
  }

  // ── CHAT SCREEN ──────────────────────────────────────────────────────────
  return (
    <div style={{ height: "100vh", background: T.bg, color: T.text, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderBottom: `1px solid ${T.border}`, background: T.bgCard, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setScreen("welcome")} style={{ background: "none", border: `1px solid ${T.border}`, color: T.textMuted, borderRadius: 8, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>←</button>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚕</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: 2 }}>RESTORE</div>
            <div style={{ fontSize: 11, color: T.textMuted }}>Spasticity & Hand Surgery · Mayo Clinic</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {profile && (
            <div style={{ padding: "4px 10px", borderRadius: 12, background: T.primaryGlow, border: `1px solid rgba(26,110,216,0.3)`, fontSize: 11, color: T.primaryLight }}>
              {profile.procedure?.replace("_", " ") || "General"} · {profile.stage?.replace("_", " ") || ""}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 12, border: `1px solid ${T.border}`, fontSize: 11, color: T.textMuted }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.accent, animation: "pulse 2s infinite" }} />
            Online
          </div>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar - Topic Cards */}
        <aside style={{ width: 220, borderRight: `1px solid ${T.border}`, padding: "16px 12px", overflowY: "auto", flexShrink: 0, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.textDim, letterSpacing: 2, textTransform: "uppercase", padding: "4px 8px", marginBottom: 4 }}>Topics</div>
          {TOPIC_CARDS.map(card => (
            <button
              key={card.id}
              onClick={() => sendMessage(card.prompt)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", borderRadius: 8, border: "none", background: "transparent", color: T.textMuted, cursor: "pointer", fontSize: 12, fontFamily: "inherit", textAlign: "left", width: "100%", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = T.bgCard; e.currentTarget.style.color = T.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.textMuted; }}
            >
              <span style={{ fontSize: 14, flexShrink: 0 }}>{card.icon}</span>
              <span style={{ lineHeight: 1.3 }}>{card.label}</span>
            </button>
          ))}
        </aside>

        {/* Main chat */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", animation: "fadeUp 0.25s ease" }}>
                {msg.role === "assistant" && (
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, marginRight: 10, marginTop: 2 }}>⚕</div>
                )}
                <div style={{
                  maxWidth: "72%",
                  padding: "12px 16px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
                  background: msg.role === "user" ? T.primary : T.bgCard,
                  border: msg.role === "assistant" ? `1px solid ${T.border}` : "none",
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: T.text,
                }}>
                  <div dangerouslySetInnerHTML={{ __html: `<p style="margin:0">${renderMarkdown(msg.content)}</p>` }} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, animation: "fadeUp 0.25s ease" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>⚕</div>
                <div style={{ padding: "14px 18px", borderRadius: "4px 18px 18px 18px", background: T.bgCard, border: `1px solid ${T.border}`, display: "flex", gap: 5, alignItems: "center" }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: T.primary, animation: `bounce 1.2s ${i * 0.2}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "16px 24px", borderTop: `1px solid ${T.border}`, background: T.bgCard, flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end", maxWidth: 800, margin: "0 auto" }}>
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about spasticity, nerve transfer, recovery, or anything else…"
                rows={1}
                style={{ flex: 1, padding: "12px 16px", borderRadius: 12, border: `1px solid ${T.border}`, background: T.bgInput, color: T.text, fontSize: 14, fontFamily: "inherit", resize: "none", outline: "none", lineHeight: 1.5, maxHeight: 120, overflowY: "auto", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = T.primary}
                onBlur={e => e.target.style.borderColor = T.border}
              />
              <button
                onClick={() => sendMessage(inputText)}
                disabled={isLoading || !inputText.trim()}
                style={{ width: 44, height: 44, borderRadius: 12, border: "none", background: inputText.trim() ? T.primary : T.bgCardHover, color: inputText.trim() ? "#fff" : T.textDim, cursor: inputText.trim() ? "pointer" : "default", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}
                onMouseEnter={e => { if (inputText.trim()) e.currentTarget.style.background = T.primaryLight; }}
                onMouseLeave={e => { if (inputText.trim()) e.currentTarget.style.background = T.primary; }}
              >↑</button>
            </div>
            <p style={{ fontSize: 11, color: T.textDim, textAlign: "center", marginTop: 8, marginBottom: 0 }}>
              Educational resource only · Not medical advice · Mayo Clinic Plastic & Reconstructive Surgery
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:transparent;} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:2px;}
      `}</style>
    </div>
  );
}
