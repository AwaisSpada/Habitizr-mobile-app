import React, { useEffect } from 'react';
import { View } from 'react-native'
import AppNavigator from './src/navigation/AppNavigator';
import FlashMessage from "react-native-flash-message";
import { AuthProvider } from './src/context/AuthContext';
// import { requestNotificationPermission, setupNotificationListeners } from './src/services/notificationService';
import {requestNotificationPermission, setupNotificationListeners} from './src/services/notificationService'

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
    const unsubscribe = setupNotificationListeners();

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <AuthProvider>
        <AppNavigator />
        <FlashMessage
          position="top"
        />
      </AuthProvider>
    </View>
  );
};

export default App;
