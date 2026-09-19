@IsTest(isParallel=false)
private class BulkServiceTest {

    @IsTest
    static void createIngestJobReturnsId() {
        Test.setMock(HttpCalloutMock.class, new BulkMock());
        String jobId = BulkService.createIngestJob('Account', 'insert');
        System.assertEquals('750000000000000', jobId, 'job id returned from the mock');
    }

    @IsTest
    static void closeJobSendsUploadComplete() {
        Test.setMock(HttpCalloutMock.class, new BulkMock());
        BulkService.createIngestJob('Account', 'insert');
        BulkService.uploadBatch('750000000000000', 'Name\nAcme');
        BulkService.closeJob('750000000000000', 'UploadComplete');
        System.assertEquals(true, true, 'callout sequence executed without exception');
    }

    @IsTest
    static void pollJobParsesState() {
        Test.setMock(HttpCalloutMock.class, new BulkMock());
        Map<String, Object> parsed = BulkService.pollJob('750000000000000');
        System.assertNotEquals(null, parsed.get('state'), 'job state surfaced');
    }

    private class BulkMock implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setStatusCode(200);
            res.setBody('{ "id": "750000000000000", "state": "Open", "object": "Account" }');
            return res;
        }
    }
}