public with sharing class BulkService {

    public static String createIngestJob(String objectName, String operation) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Headless_Academy_Integration/services/data/v68.0/jobs/ingest');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setBody(JSON.serialize(new Map<String, Object>{
            'object' => objectName,
            'operation' => operation,
            'contentType' => 'CSV'
        }));
        HttpResponse res = new Http().send(req);
        Map<String, Object> parsed = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        return (String) parsed.get('id');
    }

    public static void uploadBatch(String jobId, String csv) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Headless_Academy_Integration/services/data/v68.0/jobs/ingest/'
            + jobId + '/batches');
        req.setMethod('PUT');
        req.setHeader('Content-Type', 'text/csv');
        req.setBody(csv);
        new Http().send(req);
    }

    public static void closeJob(String jobId, String state) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Headless_Academy_Integration/services/data/v68.0/jobs/ingest/' + jobId);
        req.setMethod('PATCH');
        req.setHeader('Content-Type', 'application/json');
        req.setBody(JSON.serialize(new Map<String, Object>{ 'state' => state }));
        new Http().send(req);
    }

    public static Map<String, Object> pollJob(String jobId) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Headless_Academy_Integration/services/data/v68.0/jobs/ingest/' + jobId);
        req.setMethod('GET');
        HttpResponse res = new Http().send(req);
        return (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
    }
}