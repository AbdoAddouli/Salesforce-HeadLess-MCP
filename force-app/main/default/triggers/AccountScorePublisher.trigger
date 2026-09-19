trigger AccountScorePublisher on Account (after update) {
    List<health_changed__e> events = new List<health_changed__e>();
    for (Account a : Trigger.new) {
        Account old = Trigger.oldMap.get(a.Id);
        if (a.Health_Score__c != old.Health_Score__c) {
            events.add(new health_changed__e(
                AccountId__c = a.Id,
                New_Score__c = a.Health_Score__c,
                Old_Score__c = old.Health_Score__c
            ));
        }
    }
    if (!events.isEmpty()) {
        List<Database.SaveResult> results = EventBus.publish(events);
        for (Database.SaveResult r : results) {
            System.assert(r.isSuccess(), 'event dropped: ' + r.getErrors()[0].getMessage());
        }
    }
}