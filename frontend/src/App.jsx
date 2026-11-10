import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider, LoadingContext } from './contexts/LoadingContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { registerLoadingInterceptors } from './api/axiosClient';
import { useLoading } from './hooks/useLoading';
import AppRoutes from './routes/AppRoutes';
import SplashScreen from './components/loading/SplashScreen';
import GlobalLoader from './components/loading/GlobalLoader';
import ExportLoader from './components/loading/ExportLoader';

const AppContent = () => {
  const { isInitializing, connectionError, startApiRequest, finishApiRequest, setInitializingComplete } = useLoading();
  const { verifyAuthentication } = useAuth();

  useEffect(() => {
    registerLoadingInterceptors(
      (isSilent) => startApiRequest(isSilent),
      (isSilent) => finishApiRequest(isSilent)
    );
  }, [startApiRequest, finishApiRequest]);

  return (
    <>
      {isInitializing && (
        <SplashScreen
          connectionError={connectionError}
          onRetry={() => {
            setInitializingComplete();
            verifyAuthentication();
          }}
          isComplete={!isInitializing}
        />
      )}
      <GlobalLoader />
      <ExportLoader />
      <AppRoutes />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;
