import { create } from "zustand";
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
} from "reactflow";

type FlowState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    selectedNodeId: string | null;
    setSelectedNode: (id: string | null) => void;
    updateNodeData: (id: string, data: Record<string, unknown>) => void;
};

const initialNodes: Node[] = [
    {
        id: "1",
        type: "custom",
        data: {
            label: "Trigger: New Issue",
            description: "When a GitHub issue opens",
            configFields: [
                { key: "repo", label: "Repository", type: "text", value: "tambo/autoflow" },
                { key: "event", label: "Event Type", type: "select", options: ["Issue Opened", "PR Merged", "Star Created"], value: "Issue Opened" }
            ]
        },
        position: { x: 250, y: 50 },
    },
    {
        id: "2",
        type: "custom",
        data: {
            label: "Action: Summary",
            description: "Summarize using LLM",
            configFields: [
                { key: "prompt", label: "System Prompt", type: "text", value: "Summarize the issue severity." },
                { key: "model", label: "Model", type: "select", options: ["Gemini 1.5 Pro", "Gemini 1.5 Flash"], value: "Gemini 1.5 Pro" }
            ]
        },
        position: { x: 250, y: 200 },
    },
    {
        id: "3",
        type: "custom",
        data: {
            label: "Discord: Send Message",
            description: "Posts a message to a Discord channel",
            configFields: [
                { key: "channel", label: "Channel ID", type: "text", value: "123456789" },
                { key: "botName", label: "Bot Name", type: "text", value: "AutoFlow Bot" }
            ]
        },
        position: { x: 250, y: 350 },
    },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true }
];

export const useFlowStore = create<FlowState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),
    selectedNodeId: null,
    setSelectedNode: (id) => set({ selectedNodeId: id }),
    updateNodeData: (id, data) => set((state) => ({
        nodes: state.nodes.map((node) =>
            node.id === id ? { ...node, data: { ...node.data, ...data } } : node
        ),
    })),
}));
