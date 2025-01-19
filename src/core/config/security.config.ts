export const SECURITY_CONFIG = {
    encryption: {
        algorithm: "AES-256-GCM",
        keySize: 256
    },
    tokenStorage: {
        useSecureStorage: true,
        encryptionEnabled: true
    },
    apiSecurity: {
        usePinning: true,
        validateCertificates: true
    }
};
