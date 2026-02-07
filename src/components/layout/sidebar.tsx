"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutGrid, MessageSquare, Play, Settings } from "lucide-react";
import { WorkflowExecutor, type ExecutionResult } from "@/services/executor";
import { useFlowStore } from "@/store/flow-store";
import { ExecutionLog } from "@/components/flow/execution-log";
import { NodeConfig } from "@/components/flow/node-config";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const { nodes, edges, selectedNodeId, updateNodeData } = useFlowStore();
    const [isRunning, setIsRunning] = useState(false);
    const [results, setResults] = useState<Map<string, ExecutionResult>>(new Map());

    const selectedNode = nodes.find(n => n.id === selectedNodeId);

    const runWorkflow = async () => {
        setIsRunning(true);
        setResults(new Map()); // clear previous
        try {
            const executor = new WorkflowExecutor(nodes, edges);
            const res = await executor.execute();
            setResults(res);
        } catch (e) {
            console.error(e);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className={cn("pb-12 w-80 border-r min-h-screen bg-background flex flex-col transition-all duration-300", className)}>
            <div className="space-y-4 py-4 flex-1">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight truncate">
                        {selectedNode ? "Configuration" : "AutoFlow"}
                    </h2>

                    {selectedNode && selectedNode.data.configFields ? (
                        <div className="px-1">
                            <NodeConfig
                                nodeId={selectedNode.id}
                                configFields={selectedNode.data.configFields}
                                onSave={(data) => updateNodeData(selectedNode.id, data)}
                            />
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <Button variant="secondary" className="w-full justify-start">
                                <LayoutGrid className="mr-2 h-4 w-4" />
                                Workflow Editor
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Chat Assistant
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <Play className="mr-2 h-4 w-4" />
                                Executions
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Button>
                        </div>
                    )}
                </div>
                {!selectedNode && (
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Library
                        </h2>
                        <ScrollArea className="h-[200px] px-1">
                            <div className="space-y-1 p-2">
                                <div className="text-sm text-muted-foreground pl-2">
                                    Ready to generate...
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                )}
            </div>

            {/* Execution Control */}
            <div className="px-4 border-t pt-4">
                <Button
                    onClick={runWorkflow}
                    disabled={isRunning}
                    className={cn("w-full mb-4", isRunning ? "bg-amber-500" : "bg-green-600 hover:bg-green-700 text-white")}
                >
                    <Play className={cn("mr-2 h-4 w-4", isRunning && "animate-spin")} />
                    {isRunning ? "Running..." : "Run Workflow"}
                </Button>
            </div>

            {/* Mini Execution Log in Sidebar */}
            <div className="px-2 h-64 pb-4">
                <ExecutionLog className="h-full rounded-md border text-xs" executionResults={results} isRunning={isRunning} />
            </div>
        </div>
    );
}
