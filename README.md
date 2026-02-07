# 🏆 AutoFlow

> **The UI that builds your backend.** — Build automation workflows by just describing them.

[![Built with Tambo](https://img.shields.io/badge/Built%20with-Tambo-blueviolet?style=for-the-badge)](https://tambo.ai)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

---

## 🎬 The Problem

Building automation workflows requires **coding**, **complex UIs**, and **integration expertise**. What if you could just *say* what you want?

## 💡 The Solution

**AutoFlow** is a **Generative Workflow Engine** — you describe your automation in natural language, and the AI:

1. **Generates** the workflow graph in real-time
2. **Configures** each step with relevant fields  
3. **Executes** the logic and shows live results

All powered by **Tambo's Generative UI**.

---

## ✨ Tambo Integration Highlights

| Component | Description | Tambo Magic |
|-----------|-------------|-------------|
| `FlowCanvas` | Visual workflow editor | AI generates node graphs from natural language |
| `NodeConfig` | Dynamic configuration panel | AI creates form fields based on node type |
| `ExecutionLog` | Live execution results | AI renders status and logs dynamically |

**Plus:** `generate_workflow` tool for complex reasoning before rendering.

---

## 🎮 The "Golden Path" Demo

```
User: "Create a workflow: When a GitHub issue is labeled 'bug', 
       check severity with AI, and alert Slack if critical."
```

**Watch AutoFlow:**
1. 🔮 **Generate** a 3-node graph instantly (Trigger → Logic → Action)
2. ⚙️ **Click** any node — sidebar shows context-aware config fields
3. ▶️ **Run** — execution pulses through nodes with live logs
4. 🎤 **Voice** — dictate changes hands-free

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **AI Engine:** [Tambo SDK](https://tambo.ai) — Generative UI & Tool Calling
- **Graph:** ReactFlow — Interactive node-based canvas
- **State:** Zustand — Lightweight global state
- **UI:** Tailwind CSS + Shadcn/UI — Premium glassmorphism design

---

## 🚀 Quick Start

```bash
# Clone & install
git clone https://github.com/YOUR_USERNAME/autoflow.git
cd autoflow && npm install

# Add your Tambo API key
echo "NEXT_PUBLIC_TAMBO_API_KEY=your_key_here" > .env.local

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start talking! 🎤

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Intent                          │
│         "Make a workflow that monitors stars..."        │
└───────────────────────┬─────────────────────────────────┘
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   Tambo SDK                             │
│   • Parses intent → Selects component → Generates UI    │
└───────────────────────┬─────────────────────────────────┘
                        ▼
┌─────────────┬─────────────────┬─────────────────────────┐
│ FlowCanvas  │   NodeConfig    │     ExecutionLog        │
│ (ReactFlow) │ (Dynamic Forms) │ (Live Results)          │
└─────────────┴─────────────────┴─────────────────────────┘
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  Mock MCP Layer                         │
│       Simulates: GitHub • Slack • Discord • LLM         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Why AutoFlow Wins

1. **Maximum Tambo Usage** — 3 Generative UI Components + 1 Tool
2. **Real-World Use Case** — Workflow automation is a $10B+ market
3. **Premium UX** — Glassmorphism, animations, voice input
4. **Complete Demo** — Create → Configure → Execute → View Results

---

*Built for "The UI Strikes Back" Hackathon* ⚔️

**AutoFlow — The UI that builds your backend.**
