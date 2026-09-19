public with sharing class GraphQLService {

    private static final String GRAPHQL_PATH = 'callout:Headless_Academy_Integration/services/data/v68.0/graphql';

    public static String getAccountsWithContacts(Integer accountLimit, Integer contactLimit) {
        String queryName = 'GetAccountsWithContacts';
        String gql =
            'query ' + queryName + '($n: Int!, $m: Int!){ uiapi { query { Account(first: $n) {' +
            ' edges { node { Id Name { value } Health_Score__c { value }' +
            '   Contacts(first: $m) { edges { node { Id LastName { value } } } } } } } } } }';

        Map<String, Object> variables = new Map<String, Object>{
            'n' => accountLimit,
            'm' => contactLimit
        };
        return execute(gql, variables);
    }

    public static String upsertHealth(Id accountId, Decimal score) {
        String gql =
            'mutation { uiapi { Account { update(recordId: "' + accountId +
            '", fields: { Health_Score__c: ' + score + ' }) {' +
            ' record { Id Health_Score__c { value } } } } } }';
        return execute(gql, null);
    }

    private static String execute(String gql, Map<String, Object> variables) {
        Map<String, Object> body = new Map<String, Object>();
        body.put('query', gql);
        if (variables != null) {
            body.put('variables', variables);
        }

        HttpRequest req = new HttpRequest();
        req.setEndpoint(GRAPHQL_PATH);
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setBody(JSON.serialize(body));
        return new Http().send(req).getBody();
    }
}