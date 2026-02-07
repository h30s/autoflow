# 🏆 AutoFlow: Master Blueprint (The "Winning" Spec)

**Mission:** Build the world's first **Generative Workflow Engine** and win "The UI Strikes Back" Hackathon.
**Code Name:** Genesis
**Win Strategy:** Maximize "Best Use of Tambo" by using Generative UI for *building* automation, not just chatting.

---

## 🏗️ 1. Architecture & Tech Stack

### High-Level Design
Automating workflows requires three layers. Tambo powers the **Creation** and **Configuration** layers.

```mermaid
graph TD
    User[User "Make a workflow that..."] --> Tambo[Tambo SDK]
    Tambo -->|Generates| JSON[Workflow JSON Definition]
    JSON -->|Renders| Canvas[Generative FlowCanvas]
    
    subgraph "UI Layer (Next.js)"
        Canvas --Click Node--> NodeConfig[Generative NodeConfig]
        NodeConfig --Update--> JSON
    end
    
    subgraph "Execution Layer (MCP)"
        JSON --Execute--> Runner[Workflow Engine]
        Runner --Call--> MCPServers[MCP Servers: Slack/GitHub/Linear]
    end
```

### The Stack
- **Framework:** `Next.js 14` (App Router)
- **UI Library:** `Shadcn/UI` + `Tailwind CSS` (Critical for "Premium" feel)
- **Graph Lib:** `ReactFlow` (Industry standard for node graphs)
- **State:** `Zustand` (Global store for the graph state)
- **AI:** `Tambo SDK` (The brain)
- **Integrations:** `MCP` (Model Context Protocol)

---

## 🧩 2. Component Specifications (The "Tambo Magic")

We need to register specific components to handle the generative aspects.

### A. The `FlowCanvas` (Generative)
The main workspace.
- **Description:** "A visual canvas displaying the workflow nodes."
- **Props Schema:**
  ```typescript
  z.object({
    nodes: z.array(z.object({ id: z.string(), type: z.string(), label: z.string() })),
    edges: z.array(z.object({ source: z.string(), target: z.string() }))
  })
  ```
- **Magic Moment:** User says "Add a delay after the trigger," and the AI *re-renders the entire canvas* with the new node inserted.

### B. The `NodeConfig` (Interactable)
The sidebar that appears when clicking a node.
- **Description:** "A configuration form for a specific workflow steps."
- **Props Schema:** Dynamic based on node type.
  - *Slack Node:* `channel`, `message`, `botName`
  - *GitHub Node:* `repo`, `event`, `branch`
- **Magic Moment:** User clicks "Slack Node". The sidebar isn't hardcoded. Tambo *generates the form fields* required for that specific integration.

### C. The `ExecutionLog` (Generative)
The results panel.
- **Description:** "Shows the output of a workflow run."
- **Props Schema:** `z.object({ status: 'success' | 'error', logs: z.array(...) })`
- **Magic Moment:** If the output is a JSON array, it renders a table. If it's an image url, it renders an image.

---

## 🛣️ 3. Execution Roadmap (Day-by-Day)

### 📅 Day 1: The Skeleton
1.  Initialize Next.js project with `tambo-template`.
2.  Install `reactflow` and `zustand`.
3.  Create the basic layout: Sidebar (Left), Canvas (Middle), Chat (Right/Overlay).
4.  **Goal:** A hardcoded graph renders on the screen.

### 📅 Day 2: The Brain (Tambo Integration)
1.  Register `FlowCanvas` as a Tambo Component.
2.  Implement the `generate_workflow` tool.
3.  **Goal:** "Create a 3-step workflow" -> AI generates the JSON -> Canvas updates.

### 📅 Day 3: The Body (MCP & Execution)
1.  Set up a local MCP server (using the SDK) with mock functions for Slack/GitHub.
2.  Implement the "Run" button to execute the JSON logic against the MCP tools.
3.  **Goal:** Clicking "Run" actually triggers a console log "Mock Slack Message Sent".

### 📅 Day 4: The Beauty (Polish)
1.  Style `reactflow` nodes to look like "Aceternity" glass cards.
2.  Add animations to the edges when data flows.
3.  Implement "Voice Mode" for the "Iron Man" feel.
4.  **Goal:** It looks like a production SaaS.

### 📅 Day 5: The Show (Demo Video)
1.  Record the "Golden Path" demo.
2.  Write the README.
3.  Submit.

---

## 🎬 4. The "Golden Path" Demo Script

**Scene:** Screen recording. A clean, dark-mode interface.
**Voiceover:** "Building automation shouldn't require a degree. Introducing AutoFlow."

**Action 1:**
*User:* "Create a workflow: When a GitHub issue is labeled 'bug', check with the LLM if it's critical, and if so, alert the team on Slack."
*App:* Instantly renders a 3-node graph: `Trigger (GitHub)` -> `Logic (LLM)` -> `Action (Slack)`.

**Action 2:**
*User:* Specifies details via voice. "Set the Slack channel to #emergency."
*App:* The `NodeConfig` panel flashes and updates the field automatically.

**Action 3:**
*User:* Clicks "Run Test".
*App:* A green pulse travels down the wire. The `ExecutionLog` shows the "Simulated Slack Alert".

**Closing:** "AutoFlow. The UI that builds your backend. Powered by Tambo."

---

## ⚠️ Critical Success Factors
1.  **Do NOT overcomplicate the engine.** The execution logic can be simple/mocked for the hackathon. The **UI Generation** is what judges grade.
2.  **Visuals Matter.** Spend time on the `reactflow` node styling. Standard grey nodes = boring. Custom React components for nodes = Winner.
3.  **Tambo MUST drive.** Ensure the user isn't just dragging nodes manually. The Chat should do the heavy lifting of *creating* the structure.
