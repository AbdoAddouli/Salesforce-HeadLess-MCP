@SuppressWarnings('PMD.AvoidDebugStatements')
public with sharing class HeadlessFundamentalsService {

    public static final Integer MAX_QUERY_ROWS = 2000;

    public enum Layer { DATA_360, BUSINESS_LOGIC_360, ORCHESTRATION_360, ENGAGEMENT_360 }

    public static void logHeadlessFact(String title, String detail, Layer layer) {
        Headless_Architecture__c fact = new Headless_Architecture__c(
            Name = 'HF-' + System.currentTimeMillis(),
            Title__c = title,
            Detail__c = detail,
            Layer__c = layer.name()
        );
        insert fact;
    }

    public static List<Headless_Architecture__c> getFactsByLayer(Layer layer) {
        return [
            SELECT Id, Name, Title__c, Detail__c
            FROM Headless_Architecture__c
            WHERE Layer__c = :layer.name()
            ORDER BY CreatedDate
        ];
    }

    public static String apiForNeed(String need) {
        Map<String, String> map = new Map<String, String>{
            'CRUD' => 'REST API / GraphQL',
            'NESTED' => 'GraphQL',
            'BACKFILL' => 'Bulk API 2.0',
            'STREAM' => 'Streaming API / Platform Events',
            'APEX' => 'Apex REST',
            'WORKER' => 'Functions / Express worker'
        };
        return map.get(need?.toUpperCase());
    }
}