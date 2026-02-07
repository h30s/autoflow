/**
 * Mock MCP Server
 * Simulates external tool calls for the hackathon demo
 */

export async function runMockAction(actionType: string, _inputData: unknown): Promise<unknown> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    const lowerType = actionType.toLowerCase();

    if (lowerType.includes("github")) {
        if (lowerType.includes("star")) {
            return {
                event: "star_created",
                repo: "autoflow",
                sender: "octocat",
                starred_at: new Date().toISOString()
            };
        }
        // Default to issue opened for other GitHub triggers
        return {
            event: "issue_opened",
            repo: "autoflow",
            issue: {
                title: "Bug: Build failing on Vercel",
                body: "I tried deploying but got error 500.",
                author: "octocat"
            }
        };
    }

    if (actionType.toLowerCase().includes("summary") || actionType.toLowerCase().includes("llm")) {
        return {
            summary: "User 'octocat' reported a build failure (Error 500) on Vercel deployment.",
            severity: "high"
        };
    }

    if (actionType.toLowerCase().includes("slack")) {
        return {
            sentTo: "#alerts",
            message: "🚨 Critical Issue: User 'octocat' reported a build failure.",
            status: "delivered"
        };
    }

    if (actionType.toLowerCase().includes("discord")) {
        const inputStr = JSON.stringify(_inputData || {});
        let message = "Notification sent";
        if (inputStr.includes("star")) {
            message = "🌟 New Star from octocat! Repo: autoflow";
        }

        return {
            channel: "#general",
            message: message,
            status: "sent"
        };
    }

    return { result: "Generic Step Completed" };
}
