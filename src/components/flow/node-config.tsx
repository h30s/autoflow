"use client";

import React from "react";
import { z } from "zod";
import { useFlowStore } from "@/store/flow-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Schema for this component - Tambo generates this based on user intent
export const nodeConfigSchema = z.object({
    nodeId: z.string().describe("The ID of the node being configured"),
    configFields: z.array(z.object({
        key: z.string(),
        label: z.string(),
        type: z.enum(["text", "select", "boolean", "number"]),
        value: z.any().optional(),
        options: z.array(z.string()).optional(),
    })).describe("The fields to render in the config form"),
});

interface NodeConfigProps extends React.HTMLAttributes<HTMLDivElement> {
    nodeId?: string;
    configFields?: {
        key: string;
        label: string;
        type: "text" | "select" | "boolean" | "number";
        value?: unknown;
        options?: string[];
    }[];
    onSave?: (data: Record<string, unknown>) => void;
}

export function NodeConfig({ nodeId, configFields, onSave, className, ...props }: NodeConfigProps) {
    const [formValues, setFormValues] = React.useState<Record<string, unknown>>({});

    // Reset form when node changes
    React.useEffect(() => {
        if (configFields) {
            const initialValues: Record<string, unknown> = {};
            configFields.forEach(f => {
                initialValues[f.key] = f.value;
            });
            setFormValues(initialValues);
        }
    }, [nodeId, configFields]);

    const handleChange = (key: string, value: unknown) => {
        setFormValues(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        console.log("Saving config for node", nodeId, formValues);
        if (onSave) {
            // Update the configFields with new values to persist them in the node data
            const updatedConfigFields = configFields?.map(field => ({
                ...field,
                value: formValues[field.key] ?? field.value
            }));

            onSave({ configFields: updatedConfigFields });
        }
    };

    if (!nodeId || !configFields) return <div>Waiting for selection...</div>;

    return (
        <div className={cn("p-4 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-md border-border", className)} {...props}>
            <h3 className="font-semibold mb-4">Node Configuration</h3>
            <div className="space-y-4">
                {configFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {field.label}
                        </label>
                        {field.type === "text" && (
                            <input
                                type="text"
                                value={(formValues[field.key] as string) || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        )}
                        {field.type === "select" && (
                            <select
                                value={(formValues[field.key] as string) || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                            >
                                {field.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        )}
                    </div>
                ))}
                <Button onClick={handleSave} className="w-full">Save Configuration</Button>
            </div>
        </div>
    );
}
