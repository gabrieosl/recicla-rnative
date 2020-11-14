import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { subDays } from 'date-fns';

import firebase from '../firebase';

interface RecyclingData {
  userId: string;
  userName: string;
  weightInGrams: number;
}

interface ContextData {
  userName: undefined | string;
  signUp(name: string, email: string, password: string): Promise<boolean>;
  signIn(email: string, password: string): Promise<boolean>;
  signOut(): void;
  writeNewRecycling(weightInGrams: number): Promise<boolean>;
  getRecyclingsPerUser(startDate: Date): Promise<RecyclingData[] | undefined>;
  userTotalWeightInGrams: number;
}

const AuthContext = createContext<ContextData>({} as ContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [userName, setUserName] = useState<undefined | string>(undefined);
  const [userId, setUserId] = useState<undefined | string>(undefined);
  const [userTotalWeightInGrams, setuserTotalWeightInGrams] = useState<number>(
    0,
  );

  const signUp = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      const {
        loggedUserName,
        loggedUserId,
      } = await firebase.signUpWithEmailAndPassword({
        name,
        email,
        password,
      });
      if (loggedUserName && loggedUserId) {
        setUserName(loggedUserName);
        setUserId(loggedUserId);
        return true;
      }
      return false;
    },
    [],
  );

  const signIn = useCallback(async (email: string, password: string): Promise<
    boolean
  > => {
    const {
      loggedUserName,
      loggedUserId,
    } = await firebase.signInWithEmailAndPassword({
      email,
      password,
    });
    if (loggedUserName && loggedUserId) {
      setUserName(loggedUserName);
      setUserId(loggedUserId);
      return true;
    }
    return false;
  }, []);

  const signOut = useCallback(() => {
    firebase.signOut();
    setUserName(undefined);
  }, []);

  const getRecyclingsPerUser = useCallback(async (startDate: Date): Promise<
    RecyclingData[] | undefined
  > => {
    return firebase.readLatestDocumentsFromFirestore('recyclings', startDate);
  }, []);

  const updateUserTotalWeight = useCallback(async () => {
    const result = await getRecyclingsPerUser(subDays(new Date(), 30));
    if (result) {
      const loggedUserData = result.filter(item => item.userId === userId);
      const totalWeigthInGrams = loggedUserData.reduce((total, curr) => {
        return total + curr.weightInGrams;
      }, 0);
      setuserTotalWeightInGrams(totalWeigthInGrams);
    }
  }, [getRecyclingsPerUser, userId]);

  const writeNewRecycling = useCallback(
    async (weightInGrams: number): Promise<boolean> => {
      const response = await firebase.writeToFirestore('recyclings', {
        weightInGrams,
        userName,
      });
      if (response) updateUserTotalWeight();
      return response;
    },
    [updateUserTotalWeight],
  );

  useEffect(() => {
    if (!userName) setuserTotalWeightInGrams(0);

    updateUserTotalWeight();
  }, [getRecyclingsPerUser, updateUserTotalWeight, userName]);

  return (
    <AuthContext.Provider
      value={{
        userName,
        signUp,
        signIn,
        signOut,
        writeNewRecycling,
        getRecyclingsPerUser,
        userTotalWeightInGrams,
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
