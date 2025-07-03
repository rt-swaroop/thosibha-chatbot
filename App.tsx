import React, { useEffect } from 'react';
import { AppState, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider } from './src/context/AuthContext';
import { PromptProvider } from './src/context/PromptContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { ChatProvider } from './src/context/ChatContext';

import { checkMicrophonePermission } from './src/utils/checkMicrophonePermissions';
import Navigation from './src/navigation';
import ErrorBoundary from './src/ErrorBoundary/ErrorBoundary'; // ✅ Import the separate ErrorBoundary

const App = () => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === 'active') {
        checkMicrophonePermission();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    checkMicrophonePermission();

    return () => subscription.remove();
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <ChatProvider>
            <PromptProvider>
              <GestureHandlerRootView style={styles.rootView}>
                <Navigation />
              </GestureHandlerRootView>
            </PromptProvider>
          </ChatProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});

export default App;