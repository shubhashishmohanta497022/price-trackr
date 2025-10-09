import React from 'react';
interface User {
    id: number;
    email: string;
    username: string;
}
interface AuthContextType {
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isLoading: boolean;
}
export declare const useAuth: () => AuthContextType;
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
//# sourceMappingURL=AuthContext.d.ts.map