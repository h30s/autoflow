"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { type ExecutionResult } from "@/services/executor";

// Schema for Tambo component registration
export const executionLogSchema = z.object({
    status: z.enum(["success", "error", "running", "idle"]).describe("Overall execution status"),
    logs: z.array(z.object({
        nodeId: z.string(),
        message: z.string(),
        type: z.enum(["info", "success", "error"]).optional(),
    })).describe("Array of log entries from workflow execution"),
});

interface ExecutionLogProps extends React.HTMLAttributes<HTMLDivElement> {
    executionResults?: Map<string, ExecutionResult>;
    isRunning?: boolean;
    // Props from Tambo-generated schema
    status?: "success" | "error" | "running" | "idle";
    logs?: { nodeId: string; message: string; type?: "info" | "success" | "error" }[];
}

export function ExecutionLog({
    className,
    executionResults,
    isRunning,
    status,
    logs: propLogs,
    ...props
}: ExecutionLogProps) {
    const [logs, setLogs] = useState<string[]>([]);

    // Handle logs from executionResults Map (sidebar usage)
    useEffect(() => {
        if (!executionResults) return;
        const newLogs: string[] = [];
        executionResults.forEach((res) => {
            res.logs.forEach(log => newLogs.push(`[${res.nodeId}] ${log}`));
        });
        setLogs(newLogs);
    }, [executionResults]);

    // Handle logs from Tambo-generated props
    useEffect(() => {
        if (!propLogs) return;
        const newLogs = propLogs.map(l => `[${l.nodeId}] ${l.message}`);
        setLogs(newLogs);
    }, [propLogs]);

    const isActive = isRunning || status === "running";

    return (
        <div className={cn("flex flex-col h-full bg-black/90 text-green-400 font-mono text-sm p-4 border-t border-slate-800", className)} {...props}>
            <div className="flex justify-between items-center mb-2 border-b border-slate-700 pb-2">
                <span className="font-bold">Execution Log</span>
                <span className={cn("w-2 h-2 rounded-full", isActive ? "bg-green-500 animate-pulse" : "bg-slate-500")} />
            </div>
            <ScrollArea className="flex-1">
                {logs.length === 0 ? (
                    <div className="text-slate-400 italic">Ready to execute...</div>
                ) : (
                    <div className="space-y-1">
                        {logs.map((log, i) => (
                            <div key={i} className="break-all">{"> "}{log}</div>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}

