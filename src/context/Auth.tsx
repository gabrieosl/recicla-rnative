import React, { useState, useCallback, createContext, useContext } from 'react';

import firebase from '../firebase';

interface ContextData {
  userName: undefined | string;
  signUp(name: string, email: string, password: string): void;
  signIn(email: string, password: string): void;
  signOut(): void;
  writeNewRecycling(weightInGrams: number): Promise<boolean>;
  getRecyclingsPerUser(startDate: Date): Promise<any>;
}

const AuthContext = createContext<ContextData>({} as ContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [userName, setUserName] = useState<undefined | string>(undefined);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      const createdUser = await firebase.signUpWithEmailAndPassword({
        name,
        email,
        password,
      });
      if (createdUser) setUserName(createdUser);
    },
    [],
  );

  const signIn = useCallback(async (email: string, password: string) => {
    const loggedUserName = await firebase.signInWithEmailAndPassword({
      email,
      password,
    });
    if (loggedUserName) setUserName(loggedUserName);
  }, []);

  const signOut = useCallback(() => {
    firebase.signOut();
    setUserName(undefined);
  }, []);

  const writeNewRecycling = useCallback(async (weightInGrams: number): Promise<
    boolean
  > => {
    return firebase.writeToFirestore('recyclings', { weightInGrams });
  }, []);

  const getRecyclingsPerUser = useCallback(async (startDate: Date): Promise<
    any
  > => {
    return firebase.readLatestDocumentsFromFirestore('recyclings', startDate);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userName,
        signUp,
        signIn,
        signOut,
        writeNewRecycling,
        getRecyclingsPerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): ContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
