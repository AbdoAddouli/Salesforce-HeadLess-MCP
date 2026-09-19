public with sharing class PlatformEventService {

    public static List<Database.SaveResult> publishHealthChanged(Id accountId, Decimal newScore) {
        Account old = [SELECT Id, Health_Score__c FROM Account WHERE Id = :accountId LIMIT 1];
        return publishHealthChanged(accountId, old.Health_Score__c, newScore);
    }

    public static List<Database.SaveResult> publishHealthChanged(
        Id accountId, Decimal oldScore, Decimal newScore) {
        health_changed__e event = new health_changed__e(
            AccountId__c = accountId,
            Old_Score__c = oldScore,
            New_Score__c = newScore
        );
        List<Database.SaveResult> results = EventBus.publish(new List<health_changed__e>{ event });
        for (Database.SaveResult r : results) {
            if (!r.isSuccess()) {
                System.debug('event dropped: ' + r.getErrors()[0].getMessage());
            }
        }
        return results;
    }

    public static List<REST_Integration_Log__c> logFromEvents(List<health_changed__e> events) {
        List<REST_Integration_Log__c> logs = new List<REST_Integration_Log__c>();
        for (health_changed__e e : events) {
            logs.add(new REST_Integration_Log__c(
                AccountId__c = e.AccountId__c,
                Event_Type__c = 'HealthChanged',
                Status__c = 'PROCESSED',
                Observed_Score__c = e.New_Score__c
            ));
        }
        insert logs;
        return logs;
    }
}