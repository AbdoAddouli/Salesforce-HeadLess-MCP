public with sharing class ConnectService {

    public static List<External_Account__x> queryExternalAccounts() {
        return [
            SELECT Id, Name__c, Status__c, Erp_Id__c
            FROM External_Account__x
            ORDER BY Erp_Id__c
            LIMIT 200
        ];
    }

    public static List<AggregateResult> mixedJoin() {
        return [
            SELECT Account.Name localName, External_Account__r.Name__c externalName
            FROM External_Account__x
            LIMIT 200
        ];
    }

    public static Integer sourceCount() {
        return [SELECT COUNT() FROM External_Account__x];
    }
}