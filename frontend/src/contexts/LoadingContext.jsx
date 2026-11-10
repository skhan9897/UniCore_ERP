import React, { createContext, useState, useCallback, useRef } from 'react';

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [activeRequestCount, setActiveRequestCount] = useState(0);
  const [routeLoading, setRouteLoading] = useState(false);
  const [customLoadingMessage, setCustomLoadingMessage] = useState(null);
  const [customLoadingSubtext, setCustomLoadingSubtext] = useState(null);
  const [connectionError, setConnectionError] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);
  const [exportMessage, setExportMessage] = useState('');

  const activeRequestsRef = useRef(0);

  const startApiRequest = useCallback((isSilent = false) => {
    if (!isSilent) {
      activeRequestsRef.current += 1;
      setActiveRequestCount(activeRequestsRef.current);
    }
  }, []);

  const finishApiRequest = useCallback((isSilent = false) => {
    if (!isSilent) {
      activeRequestsRef.current = Math.max(0, activeRequestsRef.current - 1);
      setActiveRequestCount(activeRequestsRef.current);
    }
  }, []);

  const startRouteLoading = useCallback(() => {
    setRouteLoading(true);
  }, []);

  const stopRouteLoading = useCallback(() => {
    setRouteLoading(false);
  }, []);

  const showGlobalLoader = useCallback((message = "University ERP is processing...", subtext = "Please wait while we prepare your workspace.") => {
    setCustomLoadingMessage(message);
    setCustomLoadingSubtext(subtext);
    activeRequestsRef.current += 1;
    setActiveRequestCount(activeRequestsRef.current);
  }, []);

  const hideGlobalLoader = useCallback(() => {
    activeRequestsRef.current = 0;
    setActiveRequestCount(0);
    setCustomLoadingMessage(null);
    setCustomLoadingSubtext(null);
  }, []);

  const setInitializingComplete = useCallback(() => {
    setIsInitializing(false);
    setConnectionError(null);
  }, []);

  const setAppConnectionError = useCallback((error) => {
    setConnectionError(error);
  }, []);

  const startExportLoader = useCallback((msg = "Generating PDF/Excel Report...") => {
    setExportMessage(msg);
    setExportLoading(true);
  }, []);

  const stopExportLoader = useCallback(() => {
    setExportLoading(false);
    setExportMessage('');
  }, []);

  const isGlobalLoading = activeRequestCount > 0 || routeLoading || customLoadingMessage !== null;

  return (
    <LoadingContext.Provider
      value={{
        isInitializing,
        isGlobalLoading,
        routeLoading,
        customLoadingMessage,
        customLoadingSubtext,
        connectionError,
        exportLoading,
        exportMessage,
        startApiRequest,
        finishApiRequest,
        startRouteLoading,
        stopRouteLoading,
        showGlobalLoader,
        hideGlobalLoader,
        setInitializingComplete,
        setAppConnectionError,
        startExportLoader,
        stopExportLoader,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
