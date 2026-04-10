// pages/api/chat.js
// RELEASE — Rehabilitation & Learning for Extremity And Spasticity Surgery Education
// Mayo Clinic · Dr. Kitty Y. Wu, M.D. | Reza Shahriarirad, M.D.
// Routes to Google Gemini (primary via ADC) or Anthropic Claude (fallback)

// ─── KNOWLEDGE BASE ───────────────────────────────────────────────────────────
// Replace this with extracted text from your Mayo Clinic patient education PDFs.
// Structure: clearly labeled Parts A–F. Target 25,000–40,000 characters.
// Extract PDFs with: pip install pdfplumber && python extract_pdfs.py
const KNOWLEDGE_BASE = `
=== PART A: SPINAL CORD INJURY & SPASTICITY OVERVIEW ===

[Source: MSKTC Factsheet — https://msktc.org/sci/factsheets/spasticity-and-spinal-cord-injury]
Spasticity is a condition where muscles are stiff and movement is difficult. It occurs in 65–78% of people with spinal cord injury. Spasticity results from disruption of signals between the brain/spinal cord and the muscles, leading to uncontrolled muscle contractions. In SCI, spasticity typically develops weeks to months after injury.

Spasticity can have both positive effects (maintaining muscle tone, preventing atrophy, assisting with standing/transfers) and negative effects (pain, interfering with positioning, hygiene, sleep, or daily activities). Treatment is indicated when spasticity is causing more harm than benefit.

[Source: Reeve Foundation — https://www.christopherreeve.org/todays-care/living-with-paralysis/health/secondary-conditions/spasticity/]
Types of muscle tone problems in SCI:
- Spasticity: velocity-dependent muscle stiffness (resistance increases with speed)
- Spasms: sudden involuntary muscle contractions
- Clonus: rhythmic oscillating contractions
- Hypertonia: general increased muscle tone

Upper motor neuron (UMN) SCI causes spasticity. Lower motor neuron (LMN) injury causes flaccidity. Most cervical and thoracic SCI are UMN injuries.

Triggers for spasticity: urinary tract infection, bladder distension, bowel impaction, pressure ulcer, ingrown toenail, temperature changes, emotional stress, tight clothing, constipation.

[Source: AANS — https://www.aans.org/patients/conditions-treatments/spasticity/]
Treatment spectrum for spasticity (step-wise approach):
1. Physical and occupational therapy (stretching, positioning, splinting)
2. Oral medications (baclofen, tizanidine, diazepam, dantrolene)
3. Botulinum toxin (Botox) injections — focal spasticity
4. Intrathecal baclofen (ITB) pump — severe, widespread spasticity
5. Surgical options: selective dorsal rhizotomy, neurectomy, nerve/tendon transfer

=== PART B: BOTOX AND INTRATHECAL BACLOFEN ===

[Source: Cleveland Clinic — https://health.clevelandclinic.org/botox-for-spasticity]
[Source: Shirley Ryan AbilityLab — https://www.sralab.org/lifecenter/resources/spasticity-treatment-botulinum-toxins]
Botulinum toxin (Botox/Dysport/Xeomin/Myobloc) injections:
- Works by blocking acetylcholine at the neuromuscular junction, reducing muscle overactivity
- Effects last 3–6 months; treatments repeated every 3–4 months
- Best for focal spasticity (specific muscles, e.g., finger flexors, wrist flexors)
- Used for: improving hygiene, positioning, reducing pain, or preparing for surgery
- Side effects: temporary weakness, injection site discomfort, rarely flu-like symptoms
- Does not cause brain fog unlike oral medications
- FDA-approved products: onabotulinumtoxinA (Botox), abobotulinumtoxinA (Dysport), incobotulinumtoxinA (Xeomin), rimabotulinumtoxinB (Myobloc)

[Source: Cleveland Clinic — https://my.clevelandclinic.org/health/treatments/8997-intrathecal-baclofen-pump]
Intrathecal baclofen (ITB) pump:
- Small device (~hockey puck size) implanted under abdominal skin
- Delivers baclofen directly into spinal fluid — 100x more potent than oral baclofen
- Appropriate for: diffuse spasticity, patients who cannot tolerate oral baclofen side effects
- Trial procedure first: baclofen injected intrathecally via lumbar puncture
- Surgery: ~2 hours, general anesthesia; refills every 1–6 months
- Risks: infection, catheter malfunction, withdrawal symptoms if pump fails
- Withdrawal symptoms: fever, confusion, muscle rigidity — medical emergency

=== PART C: NERVE TRANSFER SURGERY FOR SCI ===

[Source: SCIRE Community — https://community.scireproject.com/wp-content/uploads/SCIRE-C_Nerve-Transfer_Download.pdf]
[Source: Washington University — https://nervetransfer.wustl.edu/nerve-transfers-to-treat-sci/what-to-expect-with-a-nerve-transfer/]

What is nerve transfer surgery?
Nerve transfer surgery involves rerouting a working nerve (donor nerve, from above the injury level) to reconnect with a non-working nerve (target nerve, below the injury level). The surgery is performed on the arms and hands — NOT on the spinal cord itself.

Who is a candidate?
- Cervical SCI, most commonly C5–C7
- Within 6–12 months of injury (time-sensitive window for some transfers)
- Some transfers can be done years after injury
- Best candidates: ages 18–70, motivated to participate in rehabilitation
- Incomplete SCI may also benefit

Common nerve transfer procedures for SCI:
- Brachialis-to-ECRB: restore wrist extension (C5–C6)
- Supinator-to-PIN: restore finger/thumb extension (C6–C7)
- ECRB-to-FPL: restore key pinch (C6–C7) — very common
- AIN-to-ulnar motor: restore intrinsic hand function (C7–C8)
- Biceps branch-to-triceps: restore elbow extension (C5–C6)

[Source: Barrow Neurological Institute — https://www.barrowneuro.org/about/news-and-articles/doctors/nerve-transfer-surgery-reanimating-hand-spinal-cord-injury/]
Recovery timeline:
- Nerve regeneration occurs at approximately 1mm per day (roughly 1 inch per month)
- First signs of muscle activation: 6–12 months after surgery
- Full recovery assessment: 18–24 months
- Partial recovery is meaningful — even limited pinch function can significantly improve independence
- Motor end plates must be reinnervated within approximately 12–18 months to prevent permanent muscle denervation

[Source: Duke Health — https://www.dukehealth.org/blog/nerve-transfer-surgery-relieves-pain-restores-function-lost-nerve-damage]
What to expect:
- Surgery: 2–4 hours, outpatient or overnight, general anesthesia
- After surgery: sling or splint for 2 weeks, restricted lifting
- Physical/occupational therapy begins at 6–8 weeks
- Intensive OT continues for 3–6 months
- Some improvement by 6 months; maximum recovery takes up to 2 years
- 50–80% of patients experience meaningful functional improvement

=== PART D: NEURECTOMY FOR SPASTICITY ===

[Source: EFORT Open Reviews/PMC — https://pmc.ncbi.nlm.nih.gov/articles/PMC5706056/]
Note: This is a clinical reference. Patient-facing materials on neurectomy are limited; this content is adapted for educational use.

What is neurectomy?
Neurectomy involves cutting or removing part of a nerve to reduce abnormal muscle activity (spasticity). In hyperselective neurectomy (HSN), only the motor branches supplying spastic muscles are partially cut — preserving sensation and volitional control while reducing overactivity.

When is neurectomy used?
- Focal upper limb spasticity that doesn't respond adequately to Botox
- Patients in whom Botox effects are wearing off quickly
- As an adjunct to tendon transfer — improves positioning for surgery
- Spastic thumb-in-palm deformity, wrist/finger flexor spasticity
- Patient is not a candidate for or does not want nerve/tendon transfer

What to expect:
- Procedure: 1–3 hours, outpatient, local or general anesthesia
- 50–80% of terminal motor nerve branches are selectively cut
- Effects are intended to be long-lasting (months to years), unlike Botox
- Recovery: 1–2 weeks off-loading, hand therapy afterward
- Risks: temporary weakness, incomplete effect, potential recurrence (nerve can regenerate)
- Often combined with tendon lengthening or other procedures

=== PART E: TENDON TRANSFER SURGERY ===

[Source: ASSH HandCare — https://www.handcare.org/condition/tendon-transfer-surgery]
[Source: Shirley Ryan AbilityLab — https://www.sralab.org/lifecenter/resources/spinal-cord-injury-tendon-transfer-surgery]

What is tendon transfer?
Tendon transfer moves the attachment of a functioning muscle-tendon unit to a new location to replace the function of a non-working muscle. In SCI, tendons from muscles that still work (above the injury) are redirected to restore finger pinch, thumb function, or wrist extension.

Common tendon transfers in SCI:
- BR-to-ECRB: wrist extension (C5–C6)
- ECRB-to-FPL: thumb flexion/key pinch (C6–C7) — most common
- PT-to-FDP: finger flexion (C6–C7)
- Deltoid-to-triceps: elbow extension (C4–C5)

[Source: WashU Decision Aid — https://collaborativecare.wustl.edu/items/decision-aid-about-tendon-vs-nerve-transfer-vs-no-surgery-after-spinal-cord-injury/]
Nerve transfer vs. tendon transfer — key differences:
- Nerve transfer: requires time window; recovery takes longer (months); results may be more natural
- Tendon transfer: can be done at any time after SCI; recovery ~3–6 months; more predictable
- Some patients have both: nerve transfer first, then tendon transfer if insufficient recovery

Recovery after tendon transfer:
- Cast or splint: 4–6 weeks immobilization (tendon must heal)
- Hand therapy begins after cast removal — critical to success
- Return to full function: 3–6 months
- Compliance with therapy is the #1 predictor of good outcomes
- 65–77% of patients report they would undergo surgery again

=== PART F: POST-OPERATIVE CARE, OT, AND SAFETY ===

[Source: Stanford Health Care — https://stanfordhealthcare.org/medical-treatments/h/hand-surgery/procedures/after.html]
Post-operative wound and splint care:
- Elevate hand above heart level for first 3–5 days (reduces swelling)
- Keep dressing clean and dry; do not remove initial dressing unless instructed
- Ice packs: wrapped in cloth, 20 minutes on / 20 minutes off for first 48 hours
- Start prescribed pain medication before anesthesia wears off
- Gentle finger movement as instructed — unless told to keep immobile

Warning signs to call your surgeon:
- Fever over 101°F (38.3°C)
- Redness spreading beyond wound edges
- Discharge that is not clear (yellow, green, or foul-smelling)
- Severe pain not controlled by medication
- Numbness or tingling beyond 24 hours
- Fingers that are pale, blue, or cold

[Source: MSKTC Autonomic Dysreflexia Factsheet — https://msktc.org/sci/factsheets/autonomic-dysreflexia]
AUTONOMIC DYSREFLEXIA (AD) — CRITICAL FOR T6+ PATIENTS:
AD is a life-threatening condition that can affect people with SCI at or above T6 (thoracic 6). It occurs when a painful or uncomfortable stimulus below the injury level triggers an uncontrolled blood pressure surge.

Symptoms of AD:
- Sudden severe headache (pounding)
- High blood pressure (BP rises above 150/100 — baseline for SCI is often 90/60)
- Sweating above injury level
- Flushed or blotchy skin above injury level
- Slow heart rate
- Stuffy nose, goosebumps

Common triggers: full bladder, bowel impaction, pressure sore, tight clothing, surgical wound pain, urinary catheter problems, ingrown toenail

Emergency response:
1. Sit upright immediately (lowers BP)
2. Loosen all tight clothing, check catheter
3. Identify and remove the trigger
4. Call 911 if BP remains elevated and/or symptoms persist
5. Inform surgical team if post-operative

[Source: MSKTC Inpatient Rehabilitation Guide — https://msktc.org/sci/factsheets/guide-inpatient-rehabilitation-services-people-spinal-cord-injury]
Occupational therapy in SCI hand surgery recovery:
- Pre-operative: baseline functional assessment, splint fabrication, patient education
- Post-operative protection phase: edema management, wound monitoring, gentle ROM
- Reinnervation phase (nerve transfers): biofeedback, mental imagery, synergy training
- Strengthening phase: progressive resistance, ADL retraining
- OT also trains adaptive techniques for dressing, feeding, hygiene during recovery
- Home program compliance is as important as clinic visits

[Source: Reeve Foundation Upper Extremity Care — https://www.christopherreeve.org/todays-care/living-with-paralysis/health/secondary-conditions/upper-extremity-care/]
Splinting after SCI hand surgery:
- Type and duration depends on procedure and injury level
- Nerve transfer: protective splint 2 weeks, then gradual mobilization
- Tendon transfer: immobilization cast 4–6 weeks is essential (tendon must fully heal)
- Splint non-compliance is the most common cause of failed tendon transfer

Pain management after SCI hand surgery:
[Source: MSKTC Pain Factsheet — https://msktc.org/sci/factsheets/pain-after-spinal-cord-injury]
- SCI patients may have pre-existing neuropathic pain (60–80% prevalence)
- Post-surgical pain overlaps with pre-existing SCI pain — communicate carefully with your team
- First-line neuropathic medications: gabapentin (Neurontin), pregabalin (Lyrica)
- Non-pharmacological: elevation, ice, positioning, TENS
- Opioids used short-term only — risk of dependence higher with chronic pain history
- Alert your surgical team to all existing pain medications before surgery

=== OUT OF SCOPE ===
RELEASE does not provide: specific surgical technique selection, drug dosing recommendations, determination of surgical candidacy, or individual clinical advice. All clinical decisions must be made by the patient's surgical team at Mayo Clinic.
`;

// ─── TOKEN LIMIT ─────────────────────────────────────────────────────────────
function resolveMaxTokens(messages) {
  const lastUser = messages.filter(m => m.role === "user").slice(-1)[0];
  if (!lastUser) return 4000;
  const len = lastUser.content?.length || 0;
  if (len < 60) return 2000;
  return 4000;
}

// ─── GEMINI HANDLER (ADC-based, works on Cloud Run without key file) ──────────
async function handleGemini(systemPrompt, messages, maxTokens) {
  const projectId = process.env.GOOGLE_PROJECT_ID;
  if (!projectId) throw new Error("GOOGLE_PROJECT_ID environment variable is not set");
  const location  = process.env.GOOGLE_LOCATION  || "us-central1";
  const model     = process.env.GEMINI_MODEL     || "gemini-2.5-flash-preview-04-17";

  const { GoogleAuth } = await import("google-auth-library");
  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  const token = tokenResponse.token || tokenResponse.res?.data?.access_token;

  const contents = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: {
      maxOutputTokens: maxTokens,
      temperature: 0.3,
      topP: 0.95,
    },
  };

  const url =
    `https://${location}-aiplatform.googleapis.com/v1/projects/` +
    `${projectId}/locations/${location}/publishers/google/models/${model}:generateContent`;

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Gemini ${resp.status}: ${errText}`);
  }

  const data = await resp.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "I was unable to generate a response. Please try again."
  );
}

// ─── CLAUDE HANDLER ──────────────────────────────────────────────────────────
async function handleClaude(systemPrompt, messages, maxTokens) {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages,
    }),
  });
  const data = await resp.json();
  return data.content?.[0]?.text || "I'm sorry, I couldn't generate a response.";
}

// ─── MAIN HANDLER ────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, systemPrompt: clientSystemPrompt } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "messages required" });

  // Inject knowledge base server-side (never sent to client)
  const fullSystemPrompt = (clientSystemPrompt || "").replace(
    "__KNOWLEDGE_BASE_INJECTED_SERVER_SIDE__",
    KNOWLEDGE_BASE
  );

  const maxTokens = resolveMaxTokens(messages);

  // K_SERVICE is auto-set on Cloud Run
  const hasGemini =
    process.env.GOOGLE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.K_SERVICE;

  try {
    let reply;
    if (hasGemini) {
      try {
        reply = await handleGemini(fullSystemPrompt, messages, maxTokens);
      } catch (geminiError) {
        console.error("Gemini error, trying Claude fallback:", geminiError.message);
        if (process.env.ANTHROPIC_API_KEY) {
          reply = await handleClaude(fullSystemPrompt, messages, maxTokens);
        } else {
          throw geminiError;
        }
      }
    } else {
      reply = await handleClaude(fullSystemPrompt, messages, maxTokens);
    }
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("RELEASE API error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
