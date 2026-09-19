public with sharing class McpFundamentalsService {

    public enum Primitive { TOOL, RESOURCE, PROMPT }

    public static String describePrimitives() {
        return 'TOOLS (callable actions) | RESOURCES (readable data) | PROMPTS (reusable instructions)';
    }

    public static Boolean isMediated(String usageType) {
        return usageType == 'Salesforce Record Operation (CRUD)'
            || usageType == 'Salesforce Process Invocation';
    }

    public static String placement() {
        return 'MCP servers live in the Engagement (HXL) layer of Headless 360.';
    }
}