public with sharing class CommerceService {

    private static final String CC_BASE = 'callout:Headless_Academy_Integration';

    public static String listProducts() {
        return get(CC_BASE + '/products?orderBy=name&limit=50');
    }

    public static String createCart(String shopperId) {
        Map<String, Object> body = new Map<String, Object>{
            'type' => 'cart',
            'shopperId' => shopperId
        };
        return post(CC_BASE + '/carts', JSON.serialize(body));
    }

    public static String getCart(String cartId) {
        return get(CC_BASE + '/carts/' + cartId + '?expand=items,totals');
    }

    public static String addItem(String cartId, String productId, Decimal quantity, String pricebookEntryId) {
        Map<String, Object> item = new Map<String, Object>{
            'productId' => productId,
            'quantity' => quantity,
            'pricebookEntryId' => pricebookEntryId
        };
        return post(CC_BASE + '/carts/' + cartId + '/items', JSON.serialize(item));
    }

    private static String get(String endpoint) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('GET');
        req.setHeader('Accept', 'application/json');
        HttpResponse res = new Http().send(req);
        return res.getBody();
    }

    private static String post(String endpoint, String body) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setBody(body);
        HttpResponse res = new Http().send(req);
        return res.getBody();
    }
}