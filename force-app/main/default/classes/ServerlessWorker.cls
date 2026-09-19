public with sharing class ServerlessWorker {

    public static Decimal computeScore(Id accountId, Map<String, Object> input) {
        Account acct = [SELECT Id, Health_Score__c FROM Account WHERE Id = :accountId LIMIT 1];
        Decimal base = acct.Health_Score__c != null ? acct.Health_Score__c : 0;
        Decimal delta = input.containsKey('delta') ? (Decimal) input.get('delta') : 0;
        Decimal capped = Math.min(100, base + delta);
        return capped;
    }

    public static void writeBack(Id accountId, Decimal score) {
        update new Account(Id = accountId, Health_Score__c = score);
    }
}