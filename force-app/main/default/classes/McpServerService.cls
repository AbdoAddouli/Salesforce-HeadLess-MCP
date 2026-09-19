public with sharing class McpServerService {

    public static Map<String, Object> toolManifest() {
        return new Map<String, Object>{
            'name' => 'get_account_health',
            'description' => 'Returns the current health summary for an Account.',
            'inputSchema' => new Map<String, Object>{
                'type' => 'object',
                'properties' => new Map<String, Object>{
                    'accountId' => new Map<String, Object>{ 'type' => 'string', 'minLength' => 15 }
                },
                'required' => new List<String>{ 'accountId' }
            }
        };
    }

    public static Map<String, Object> fetchHealth(String accountId) {
        List<Account> matches = [
            SELECT Id, Name, Health_Score__c, Industry, Type
            FROM Account
            WHERE Id = :accountId
            LIMIT 1
        ];
        if (matches.isEmpty()) {
            return new Map<String, Object>{ 'found' => false };
        }
        Account a = matches[0];
        return new Map<String, Object>{
            'found' => true,
            'accountId' => a.Id,
            'name' => a.Name,
            'healthScore' => a.Health_Score__c,
            'industry' => a.Industry,
            'type' => a.Type
        };
    }
}