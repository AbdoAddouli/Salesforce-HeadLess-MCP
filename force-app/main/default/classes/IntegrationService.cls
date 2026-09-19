public with sharing class IntegrationService {

    public static HttpResponse callErpCustomers(HttpResponse authResponse) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:External_ERP/customers');
        req.setMethod('GET');
        req.setHeader('Accept', 'application/json');
        return new Http().send(req);
    }

    public static HttpResponse callWithRetry(String calloutPath,
        Map<String, String> headers, String method) {
        return callOnce(method, calloutPath, headers, null);
    }

    public static HttpResponse callOnce(String method, String calloutPath,
        Map<String, String> headers, String body) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(calloutPath);
        req.setMethod(method);
        req.setHeader('Accept', 'application/json');
        if (headers != null) {
            for (String k : headers.keySet()) {
                req.setHeader(k, headers.get(k));
            }
        }
        if (body != null) {
            req.setHeader('Content-Type', 'application/json');
            req.setBody(body);
        }
        return new Http().send(req);
    }
}