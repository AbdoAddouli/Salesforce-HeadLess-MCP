public with sharing class AuthService {

    public static final String SCOPE_API = 'api';
    public static final String SCOPE_REFRESH = 'refresh_token';
    public static final String SCOPE_FULL = 'full';

    public static String refreshAccessToken(String instanceUrl, String refreshToken, String clientId) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(instanceUrl + '/services/oauth2/token');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.setBody('grant_type=refresh_token'
            + '&refresh_token=' + EncodingUtil.urlEncode(refreshToken, 'UTF-8')
            + '&client_id=' + EncodingUtil.urlEncode(clientId, 'UTF-8'));
        HttpResponse res = new Http().send(req);
        Map<String, Object> parsed = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        if (res.getStatusCode() == 200) {
            return (String) parsed.get('access_token');
        }
        throw new AuthException('refresh failed: ' + parsed.get('error_description'));
    }

    public static String buildAuthorizationUrl(String instanceUrl, String clientId, String redirectUri) {
        return instanceUrl + '/services/oauth2/authorize'
            + '?response_type=code'
            + '&client_id=' + EncodingUtil.urlEncode(clientId, 'UTF-8')
            + '&redirect_uri=' + EncodingUtil.urlEncode(redirectUri, 'UTF-8')
            + '&scope=' + EncodingUtil.urlEncode(SCOPE_API + ' ' + SCOPE_REFRESH, 'UTF-8');
    }

    public class AuthException extends Exception {}
}