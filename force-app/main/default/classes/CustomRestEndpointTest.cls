@IsTest(isParallel=false)
private class CustomRestEndpointTest {

    private static final String URL = '/services/apexrest/acme/health/v1/';

    @IsTest
    static void createThenUpdateHappyPath() {
        RestResponse create = call('ext-1000', 82);
        System.assertEquals(201, create.statusCode, 'first call creates -> 201');

        Map<String, Object> created = (Map<String, Object>) JSON.deserializeUntyped(create.responseBody.toString());
        String id = (String) created.get('id');
        System.assertNotEquals(null, id, 'created record returned an Id');

        RestResponse update = call('ext-1000', 91);
        System.assertEquals(200, update.statusCode, 'second call updates -> 200');

        Map<String, Object> updated = (Map<String, Object>) JSON.deserializeUntyped(update.responseBody.toString());
        System.assertEquals(id, (String) updated.get('id'), 'same record updated');
        System.assertEquals(91, ((Decimal) updated.get('score')).intValue());
    }

    @IsTest
    static void missingBodyReturns400() {
        RestRequest req = new RestRequest();
        req.requestURI = URL;
        req.httpMethod = 'POST';
        req.requestBody = Blob.valueOf('');
        RestContext.request = req;
        RestContext.response = new RestResponse();

        CustomRestEndpoint.upsertHealth(null);
        System.assertEquals(400, RestContext.response.statusCode, 'blank body -> 400');
    }

    private static RestResponse call(String externalId, Decimal score) {
        RestRequest req = new RestRequest();
        req.requestURI = URL;
        req.httpMethod = 'POST';
        req.requestBody = Blob.valueOf(
            '{ "externalId": "' + externalId + '", "score": ' + score + ' }');
        RestContext.request = req;
        RestContext.response = new RestResponse();

        CustomRestEndpoint.HealthRequest payload = (CustomRestEndpoint.HealthRequest)
            JSON.deserialize(req.requestBody.toString(), CustomRestEndpoint.HealthRequest.class);
        CustomRestEndpoint.upsertHealth(payload);
        return RestContext.response;
    }
}