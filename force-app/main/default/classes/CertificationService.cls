public with sharing class CertificationService {

    public static final Integer QUESTIONS = 60;
    public static final Integer MINUTES = 120;

    public static Map<String, Decimal> domainWeights() {
        return new Map<String, Decimal>{
            'Solution Architecture & Design' => 30.0,
            'Technical Architecture & Integrations' => 25.0,
            'Storefront / Headless Client Design' => 20.0,
            'Performance & Scalability' => 15.0,
            'Security & Compliance' => 10.0
        };
    }

    public static String studyLoop() {
        return 'read guide -> do exercise -> verify answer -> quiz -> book at ~80% practice';
    }

    public static Boolean readyToBook(Decimal practiceScorePct) {
        return practiceScorePct >= 80;
    }
}