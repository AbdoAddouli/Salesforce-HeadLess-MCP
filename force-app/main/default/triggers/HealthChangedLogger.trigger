trigger HealthChangedLogger on health_changed__e (after insert) {
    List<REST_Integration_Log__c> logs = new List<REST_Integration_Log__c>();
    for (health_changed__e e : Trigger.new) {
        logs.add(new REST_Integration_Log__c(
            AccountId__c = e.AccountId__c,
            Event_Type__c = 'HealthChanged',
            Status__c = 'PROCESSED',
            Observed_Score__c = e.New_Score__c
        ));
    }
    insert logs;
}