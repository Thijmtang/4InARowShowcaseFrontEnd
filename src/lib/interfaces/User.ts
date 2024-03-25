export interface User {
    accessFailedCount: number;
    concurrencyStamp: string;
    email: string;
    emailConfirmed: boolean;
    id: string;
    lockoutEnabled: boolean;
    lockoutEnd: Date | null;
    normalizedEmail: string;
    normalizedUserName: string;
    passwordHash: string;
    phoneNumber: string | null;
    phoneNumberConfirmed: boolean;
    securityStamp: string;
    twoFactorEnabled: boolean;
    userName: string;
}