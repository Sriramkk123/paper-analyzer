# Research Paper Analyzer

A modern web app for extracting, analyzing, and interacting with research papers from arXiv. Built with React, TypeScript, Vite, and TailwindCSS.

---

## 🚀 Overview

**Research Paper Analyzer** streamlines the process of understanding academic papers. Paste an arXiv URL to get a structured, AI-powered breakdown, interact with the content, and export insights for your workflow.

---

## ✨ Features

- **arXiv URL Input:** Paste a paper link to fetch metadata, abstract, and full text.
- **AI-Powered Analysis:** Automatic breakdown into:
  - Abstract
  - Background & Related Work
  - Key Contributions
  - Problem Statement
  - Proposed Solution
  - Results & Findings
  - Evaluation Metrics
  - Dataset & Experimental Setup
  - Discussion & Real-World Applications
  - Future Work
- **PDF Viewer:** Direct link to the official arXiv PDF.
- **Export:** Download analysis as JSON or multi-page PDF.
- **Interactive Q&A:** Chat with an AI about the paper (demo/mock).
- **Smooth UX:** Animated sections, theme-consistent icons, and responsive design.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite, TailwindCSS
- **Routing:** react-router-dom
- **Animation:** framer-motion
- **Markdown:** react-markdown, rehype-katex, remark-gfm, remark-math
- **Syntax Highlighting:** react-syntax-highlighter
- **PDF/Canvas:** html2canvas, jspdf
- **API:** axios, OpenAI API

---

## ⚡ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/research-paper-analyzer.git
cd research-paper-analyzer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Backend Environment Variables
Create a `.env` file in the **server/backend root** (not needed for the frontend):
```
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run the App (Client)
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Start the Server (API/backend)
```bash
npm run start:server
```

---

## 📝 Usage

1. Enter an arXiv paper URL on the homepage.
2. Wait for the app to fetch and analyze the paper.
3. Browse the structured analysis sections.
4. Click "View PDF" for the full paper.
5. Use export options for JSON or PDF.
6. Try the Chat page for interactive Q&A (demo).

---

## ⚙️ Customization
- **Styling:** Edit Tailwind classes in component files under `src/components/analysis/`.
- **AI Prompt/Schema:** Update the breakdown schema and OpenAI prompt in `server/trpc.ts`.
- **Add Sections:** Create new components and update the schema in `src/types/paper.ts`.

---

## 🔐 Environment Variables
- `OPENAI_API_KEY`: **Backend only.** Required for AI-powered breakdowns. Get yours from [OpenAI](https://platform.openai.com/account/api-keys). The frontend does not require this variable.
---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [arXiv.org](https://arxiv.org/)
- [OpenAI](https://openai.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
