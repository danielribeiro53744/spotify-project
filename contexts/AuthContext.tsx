'use client';

import { createContext, useContext, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface AuthContextType {}

const AuthContext = createContext<AuthContextType>({});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <SessionProvider>
      <AuthContext.Provider value={{}}>
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  );
};