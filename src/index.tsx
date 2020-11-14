import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/Auth';
import useCachedResources from './hooks/useCachedResources';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Routes />
        <StatusBar />
        <ToastContainer />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
