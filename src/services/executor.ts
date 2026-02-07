import { Edge, Node } from "reactflow";
import { runMockAction } from "./mock-mcp";

export type ExecutionResult = {
    nodeId: string;
    status: "success" | "error" | "pending";
    output?: unknown;
    logs: string[];
};

export class WorkflowExecutor {
    private nodes: Node[];
    private edges: Edge[];
    private results: Map<string, ExecutionResult> = new Map();

    constructor(nodes: Node[], edges: Edge[]) {
        this.nodes = nodes;
        this.edges = edges;
    }

    async execute(): Promise<Map<string, ExecutionResult>> {
        // Topologically sort or just find start nodes (hackathon simple mode: find node with no incoming edges)
        // For MVP: assume linear flow '1' -> '2' -> '3'

        // 1. Find start node (Node with no incoming edges)
        const targetNodeIds = new Set(this.edges.map(e => e.target));
        const startNode = this.nodes.find(n => !targetNodeIds.has(n.id));

        if (!startNode) throw new Error("No start node found (Circular dependency or empty graph?)");

        await this.processNode(startNode);

        return this.results;
    }

    private async processNode(node: Node, inputData?: unknown) {
        console.log(`Executing node: ${node.id} (${node.data.label})`);

        // Simulate processing
        const result: ExecutionResult = {
            nodeId: node.id,
            status: "pending",
            logs: [`Started ${node.data.label}...`]
        };
        this.results.set(node.id, result);

        try {
            // Execute logic based on node label/type (Mocking MCP call here)
            const output = await runMockAction(node.data.label, inputData);

            result.status = "success";
            result.output = output;
            result.logs.push(`Completed: ${JSON.stringify(output)}`);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            result.status = "error";
            result.logs.push(`Error: ${errorMessage}`);
            this.results.set(node.id, result);
            return; // Stop propagation on error
        }

        this.results.set(node.id, result);

        // Find next nodes
        const outgoingEdges = this.edges.filter(e => e.source === node.id);
        for (const edge of outgoingEdges) {
            const nextNode = this.nodes.find(n => n.id === edge.target);
            if (nextNode) {
                await this.processNode(nextNode, result.output);
            }
        }
    }
}
