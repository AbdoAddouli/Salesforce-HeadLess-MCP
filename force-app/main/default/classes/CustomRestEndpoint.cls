@RestResource(urlMapping='/acme/health/v1/*')
global with sharing class CustomRestEndpoint {

    @HttpPost
    global static HealthResponse upsertHealth(HealthRequest payload) {
        RestResponse res = RestContext.response;
        try {
            if (payload == null || String.isBlank(payload.externalId) || payload.score == null) {
                return respond(res, 400, 'Missing externalId or score');
            }

            List<Account> matches = [
                SELECT Id, Health_Score__c
                FROM Account
                WHERE External_Key__c = :payload.externalId
                LIMIT 1
            ];

            Account target;
            if (matches.isEmpty()) {
                target = new Account(Name = 'Health-' + payload.externalId, External_Key__c = payload.externalId);
            } else {
                target = matches[0];
            }

            Boolean isCreate = (target.Id == null);
            target.Health_Score__c = payload.score;
            upsert target External_Key__c;

            Map<String, Object> out = new Map<String, Object>{
                'id' => target.Id,
                'score' => target.Health_Score__c
            };
            return respond(res, isCreate ? 201 : 200, JSON.serialize(out));
        } catch (Exception e) {
            return respond(res, 500, e.getMessage());
        }
    }

    private static HealthResponse respond(RestResponse res, Integer code, String message) {
        res.statusCode = code;
        res.responseBody = Blob.valueOf(message);
        return new HealthResponse(code, message);
    }

    global class HealthRequest {
        global String externalId;
        global Decimal score;
    }

    global class HealthResponse {
        global Integer statusCode;
        global String body;
        global HealthResponse(Integer statusCode, String body) {
            this.statusCode = statusCode;
            this.body = body;
        }
    }
}