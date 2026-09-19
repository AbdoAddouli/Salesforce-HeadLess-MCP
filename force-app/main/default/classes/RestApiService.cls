public with sharing class RestApiService {

    private static final String API_VERSION = 'v68.0';

    public static HttpResponse createAccount(String name, Decimal score) {
        return call('POST', '/services/data/' + API_VERSION + '/sobjects/Account',
            '{ "Name": "' + name + '", "Health_Score__c": ' + score + ' }');
    }

    public static HttpResponse patchScore(Id accountId, Decimal score) {
        return call('PATCH', '/services/data/' + API_VERSION + '/sobjects/Account/' + accountId,
            '{ "Health_Score__c": ' + score + ' }');
    }

    public static HttpResponse getAccount(Id accountId) {
        return call('GET', '/services/data/' + API_VERSION + '/sobjects/Account/' + accountId, null);
    }

    public static HttpResponse query(String soql) {
        return call('GET', '/services/data/' + API_VERSION + '/query?q=' + EncodingUtil.urlEncode(soql, 'UTF-8'), null);
    }

    public static HttpResponse composite(List<Object> subrequests, Boolean allOrNone) {
        Map<String, Object> body = new Map<String, Object>{
            'compositeRequest' => subrequests,
            'allOrNone' => allOrNone
        };
        return call('POST', '/services/data/' + API_VERSION + '/composite', JSON.serialize(body));
    }

    private static HttpResponse call(String method, String path, String body) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Headless_Academy_Integration' + path);
        req.setMethod(method);
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Accept', 'application/json');
        if (body != null) {
            req.setBody(body);
        }
        HttpResponse res = new Http().send(req);
        logCall(method, path, res.getStatusCode());
        return res;
    }

    private static void logCall(String method, String path, Integer statusCode) {
        insert new REST_Integration_Log__c(
            Event_Type__c = method + ' ' + path,
            Status__c = String.valueOf(statusCode),
            AccountId__c = null
        );
    }
}