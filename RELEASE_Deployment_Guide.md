# RELEASE — Complete Deployment Guide & Recommendations
## Rehabilitation & Learning for Extremity And Spasticity Surgery Education
### Mayo Clinic · Dr. Kitty Y. Wu, M.D. | Reza Shahriarirad, M.D. · 2026

---

## What Changed in v2.1

| Change | Details |
|--------|---------|
| **App renamed** | RESTORE → RELEASE |
| **Full name** | Rehabilitation & Learning for Extremity And Spasticity Surgery Education |
| **Team updated** | PI: Dr. Kitty Y. Wu, M.D. · Developer: Reza Shahriarirad, M.D. |
| **Citations added** | Every AI response now includes inline [source] tags and a collapsible footnote panel with clickable links |
| **Citation system** | 25 curated sources from MSKTC, Reeve Foundation, WashU, ASSH, Hopkins, Mayo, Cleveland Clinic, Barrow, SCIRE, AAOS, Stanford, Shirley Ryan AbilityLab |
| **AD safety** | Autonomic dysreflexia warnings automatically injected for T6+ patients |
| **Knowledge base** | Structured Parts A–F with inline source URLs for transparency |

---

## Files Delivered

| File | Location in your project |
|------|--------------------------|
| `RELEASE.jsx` | `src/components/RELEASE.jsx` |
| `chat.js` | `pages/api/chat.js` |
| This guide | Reference only |

---

## CHECKPOINT 1 — Fork & Clone the BRIDGE Repository

This is your starting point. RELEASE is built on the same Next.js 14 architecture as BRIDGE.

```bash
# 1. Go to github.com/SoRRad/bridge-chatbot and click "Fork"
# 2. Clone YOUR fork (replace YOUR_USERNAME)
git clone https://github.com/YOUR_USERNAME/release-chatbot.git
cd release-chatbot

# 3. Install dependencies
npm install

# 4. Verify it runs
npm run dev
# → Open http://localhost:3000 — you should see the BRIDGE interface
```

✅ **Checkpoint passed when:** You can see BRIDGE running at localhost:3000

---

## CHECKPOINT 2 — Replace the Frontend Component

```bash
# 1. Delete the old frontend
rm src/components/BridgeChatbot.jsx

# 2. Copy in RELEASE
cp /path/to/RELEASE.jsx src/components/RELEASE.jsx

# 3. Update pages/index.js
```

**Edit `pages/index.js`:**
```javascript
// BEFORE (BRIDGE)
import BridgeChatbot from '../src/components/BridgeChatbot'
export default function Home() {
  return <BridgeChatbot />
}

// AFTER (RELEASE)
import ReleaseApp from '../src/components/RELEASE'
export default function Home() {
  return <ReleaseApp />
}
```

✅ **Checkpoint passed when:** `npm run dev` shows the RELEASE welcome screen with correct team names

---

## CHECKPOINT 3 — Replace the API Route

```bash
# 1. Back up the old API route (optional)
cp pages/api/chat.js pages/api/chat.bridge.backup.js

# 2. Replace with RELEASE version
cp /path/to/chat.js pages/api/chat.js
```

✅ **Checkpoint passed when:** No import errors in terminal (`npm run dev`)

---

## CHECKPOINT 4 — Set Up Environment Variables

Create a `.env.local` file in the root of your project. **Never commit this file to GitHub.**

```bash
touch .env.local
```

Add the following to `.env.local`:

```env
# ── REQUIRED: Choose Gemini OR Anthropic ──────────────────────────────────────

# Option A: Google Gemini via Vertex AI (recommended — same as BRIDGE)
GOOGLE_PROJECT_ID=your-gcp-project-id
GOOGLE_LOCATION=us-central1
GEMINI_MODEL=gemini-2.5-flash
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}

# Option B: Anthropic Claude (fallback — used if Gemini not configured)
ANTHROPIC_API_KEY=sk-ant-...

# ── REQUIRED: GitHub logging ───────────────────────────────────────────────────
GITHUB_TOKEN=ghp_...
GITHUB_REPO=YOUR_USERNAME/release-chatbot

# ── REQUIRED: Admin dashboard ─────────────────────────────────────────────────
ADMIN_PASSWORD=choose_a_strong_password_here
```

**To get these values:**
- `ANTHROPIC_API_KEY` → console.anthropic.com → API Keys → Create Key
- `GOOGLE_PROJECT_ID` → console.cloud.google.com → select your project
- `GITHUB_TOKEN` → github.com → Settings → Developer Settings → Personal Access Tokens → Classic → repo scope

✅ **Checkpoint passed when:** Chat responds to a test message at localhost:3000

---

## CHECKPOINT 5 — Test Citations Locally

1. Go to `localhost:3000`
2. Click "Skip to Chat"
3. Ask: *"What is spasticity in spinal cord injury?"*
4. Verify: Response contains `[1]` superscript numbers
5. Verify: "📚 1 source ▼" button appears below the response
6. Click the sources button — verify clickable links appear

**If citations are not appearing:**
- The AI may not be following the citation instruction format. Add this to the system prompt in `RELEASE.jsx` → `buildSystemPrompt()`:
  ```
  IMPORTANT: You MUST use [citation_id] notation inline. Example: "Spasticity affects 65% of SCI patients [msktc_spasticity]."
  ```

✅ **Checkpoint passed when:** Citations appear with working links in at least 3 different topic responses

---

## CHECKPOINT 6 — Add Your Patient Education PDFs (Knowledge Base)

This is where RELEASE gets its clinical depth. The knowledge base in `pages/api/chat.js` currently contains structured summaries. Replace or supplement with your actual Mayo Clinic patient education materials.

**Step 1 — Collect your PDFs**
Gather PDFs from your Mayo Clinic patient education library covering:
- Spasticity management handout
- Nerve transfer patient guide
- Post-operative instructions for hand surgery
- Splinting guide for SCI patients
- Occupational therapy after SCI hand surgery
- Autonomic dysreflexia patient wallet card

**Step 2 — Extract text with Python**
```bash
pip install pdfplumber
```

Create `extract_pdfs.py`:
```python
import pdfplumber
import os

pdf_folder = "./patient_education_pdfs"
output = []

for filename in os.listdir(pdf_folder):
    if filename.endswith(".pdf"):
        with pdfplumber.open(os.path.join(pdf_folder, filename)) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
            # Remove headers/footers (first and last 3 lines of each page)
            output.append(f"\n=== {filename.replace('.pdf', '').upper()} ===\n{text}\n")

with open("knowledge_base.txt", "w") as f:
    f.write("\n".join(output))

print(f"Extracted {len(output)} documents. Total chars: {sum(len(o) for o in output)}")
```

**Step 3 — Paste into chat.js**
Copy the contents of `knowledge_base.txt` and replace the `KNOWLEDGE_BASE` constant in `pages/api/chat.js`.

**Target size:** 25,000–40,000 characters (~6,000–10,000 tokens)

✅ **Checkpoint passed when:** Knowledge base contains your actual Mayo Clinic materials and AI references them accurately

---

## CHECKPOINT 7 — Add Your Institution Logo

```bash
# Place these files in the public/ folder:
public/mayo-logo-white.png    # white version for dark mode
public/mayo-logo-dark.png     # dark version for light mode
```

In `RELEASE.jsx`, find the header section and replace the text logo:
```jsx
// Replace this emoji logo block:
<div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(...)` }}>⚕</div>

// With this image logo:
<img src="/mayo-logo-white.png" alt="Mayo Clinic" style={{ height: 32 }} />
```

✅ **Checkpoint passed when:** Mayo logo displays correctly in header

---

## CHECKPOINT 8 — Deploy to Google Cloud Run

This is identical to BRIDGE deployment. Use the same Dockerfile and cloudbuild.yaml from your fork.

**Step 1 — GCP Setup (if not already done)**
```bash
# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable aiplatform.googleapis.com

# Create Artifact Registry repository
gcloud artifacts repositories create release-chatbot \
  --repository-format=docker \
  --location=us-central1
```

**Step 2 — Store Service Account Key in Secret Manager**
```bash
# Create the secret
gcloud secrets create GOOGLE_SERVICE_ACCOUNT_KEY --data-file=./service-account.json

# Grant Cloud Run access
gcloud secrets add-iam-policy-binding GOOGLE_SERVICE_ACCOUNT_KEY \
  --member="serviceAccount:YOUR_SERVICE_ACCOUNT@YOUR_PROJECT.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

**Step 3 — Configure Cloud Run environment variables**

In GCP Console → Cloud Run → Your Service → Edit & Deploy → Variables & Secrets:

| Variable | Value |
|----------|-------|
| `GOOGLE_PROJECT_ID` | your-project-id |
| `GOOGLE_LOCATION` | us-central1 |
| `GEMINI_MODEL` | gemini-2.5-flash |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | (from Secret Manager) |
| `ANTHROPIC_API_KEY` | sk-ant-... |
| `GITHUB_TOKEN` | ghp_... |
| `GITHUB_REPO` | YOUR_USERNAME/release-chatbot |
| `ADMIN_PASSWORD` | your_secure_password |

**Step 4 — Deploy**
```bash
# Option A: Trigger via GitHub push (if Cloud Build trigger is set up)
git add .
git commit -m "Launch RELEASE v2.1"
git push origin main
# → Cloud Build automatically deploys

# Option B: Manual deployment
docker build -t us-central1-docker.pkg.dev/YOUR_PROJECT/release-chatbot/app:latest .
docker push us-central1-docker.pkg.dev/YOUR_PROJECT/release-chatbot/app:latest
gcloud run deploy release-chatbot \
  --image us-central1-docker.pkg.dev/YOUR_PROJECT/release-chatbot/app:latest \
  --region us-central1 \
  --allow-unauthenticated
```

✅ **Checkpoint passed when:** App is live at the Cloud Run URL and citations work in production

---

## CHECKPOINT 9 — Verify Critical Fixes from BRIDGE

These bugs were fixed in BRIDGE. Verify they're still working in RELEASE:

```dockerfile
# CRITICAL: This line must be in your Dockerfile
# Without it, logos return 404 in production
COPY --from=builder /app/public ./public
```

```javascript
// In pages/api/chat.js — verify this exists
function resolveMaxTokens(messages) {
  // Must return at least 2000, not 700
  return 4000; // ✓ correct
}
```

✅ **Checkpoint passed when:** Logo loads in production AND chat responses are complete (not cut off)

---

## CHECKPOINT 10 — Access Admin Dashboard

The admin dashboard from BRIDGE works unchanged.

- **URL:** `[your-live-url]/admin`
- **Password:** whatever you set for `ADMIN_PASSWORD`
- **Features:** Session analytics, message history, survey results, topic card editor, feature toggles

Update the admin page title from "BRIDGE" to "RELEASE":
In `pages/admin.js`, search for "BRIDGE" and replace with "RELEASE" (approximately 3 occurrences).

✅ **Checkpoint passed when:** Admin dashboard loads, shows analytics, and title says "RELEASE"

---

## Recommendations for Enhancement

### Priority 1 — Clinical Safety (do these first)

**A. Add a prominent AD warning for T6+ patients**
When a patient selects cervical or upper thoracic injury, display a one-time banner:
> "⚠️ Important: As someone with a cervical/upper thoracic SCI, you are at risk for autonomic dysreflexia. This is a medical emergency. [Learn more]"

**B. Add a "Save Questions for My Doctor" feature**
Let patients tap a ✚ button on any AI statement to add it to a "My Questions" list. At the end of the session, display a formatted list they can print or email to themselves. This directly bridges the education-to-consultation gap.

**C. Emergency contact button**
Add a persistent "Contact Care Team" button that opens the Mayo Clinic SCI care team phone/email. Patients in distress should not need to navigate away.

---

### Priority 2 — Content Quality

**D. Connect your Mayo Clinic patient education API**
When your center's API is ready, replace the static `KNOWLEDGE_BASE` constant with a dynamic RAG call:
```javascript
// In pages/api/chat.js
const knowledgeBase = await fetch(`${process.env.MAYO_EDU_API}/search?q=${query}`)
  .then(r => r.json())
  .then(data => data.documents.map(d => d.content).join("\n\n"));
```

**E. Neurectomy original content**
No patient-facing neurectomy materials exist publicly (confirmed by our research). Work with Dr. Wu to write a plain-language neurectomy guide specifically for your patients. This is a unique contribution your platform can make.

**F. Add Mayo Clinic-specific citation sources**
Add your center's published papers by Dr. Wu to the `CITATIONS` object in `RELEASE.jsx`:
```javascript
wu_nerve_2024: {
  id: "wu_nerve_2024",
  short: "Wu et al. 2024",
  title: "Your paper title",
  org: "Mayo Clinic Plastic & Reconstructive Surgery",
  url: "https://pubmed.ncbi.nlm.nih.gov/...",
  type: "clinical",
}
```

---

### Priority 3 — Platform Features

**G. Session summary email**
After chat, offer to email the patient a summary of topics discussed + sources. Use a simple transactional email service (SendGrid free tier, or Resend.com).

**H. Pre-op / post-op mode toggle**
Add a prominent mode indicator. Pre-op patients need different emphasis than post-op patients. The intake form captures this, but a persistent visible indicator helps the AI stay focused.

**I. Multilingual support**
Priority languages for SCI patients at Mayo Rochester:
1. Spanish (largest non-English population)
2. Arabic
3. Somali
Use the same I18N pattern from BRIDGE. The citation links are already in English but the UI text can be translated.

**J. Validation survey**
The BRIDGE ValidationSurvey component works as-is. Update Section 2 clinical topics to:
- Spasticity education
- Nerve transfer surgery
- Neurectomy
- Tendon transfer
- Botox/injection therapy
- Post-operative care
- Occupational therapy
- Autonomic dysreflexia
- Pain management
- Recovery timeline accuracy

---

### Priority 4 — Technical Improvements

**K. Modularize the component**
Break `RELEASE.jsx` into smaller files when the project grows:
```
src/components/release/
  WelcomeScreen.jsx
  IntakeWizard.jsx
  ChatWindow.jsx
  CitationFootnote.jsx
  TopicSidebar.jsx
  constants/citations.js
  constants/topics.js
  utils/systemPrompt.js
```

**L. Add streaming responses**
Long AI answers currently wait until fully generated. Add Server-Sent Events (SSE) streaming so text appears word-by-word:
```javascript
// In pages/api/chat.js — use streaming API endpoint
const stream = await anthropic.messages.stream({ ... });
res.setHeader('Content-Type', 'text/event-stream');
for await (const chunk of stream) {
  res.write(`data: ${chunk.delta?.text || ''}\n\n`);
}
```

**M. Citation quality scoring**
Track which citations patients click most. Add a click event to the citation links that logs to `events.json`. Use this data to prioritize which sources to expand in the knowledge base.

---

## Known Issues to Watch

| Issue | Risk | Mitigation |
|-------|------|-----------|
| AI doesn't always use citation format | Medium | System prompt reinforces citation requirement; may need temperature tuning |
| Neurectomy content is clinical-only | Medium | Original content development needed |
| No session persistence | Low | Patients lose context on refresh; consider localStorage for session recovery |
| Autonomic dysreflexia not triggered for T7-T12 | Low | Currently only flagged for T6+; extend to T7-T8 range |

---

## Contact

| Role | Name | Contact |
|------|------|---------|
| Principal Investigator | Dr. Kitty Y. Wu, M.D. | mayoclinic.org/biographies/wu-kitty-y-m-d/bio-20554877 |
| Developer / Research Fellow | Reza Shahriarirad, M.D. | Shahriarirad.Reza@mayo.edu |
| Repository | — | github.com/SoRRad/bridge-chatbot (fork for RELEASE) |
| Platform | Mayo Clinic · Plastic & Reconstructive Surgery | Rochester, Minnesota |

---

*RELEASE v2.1 · April 2026 · Built on BRIDGE architecture*
