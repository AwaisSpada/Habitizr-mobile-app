import React, { useEffect } from 'react';
import { View } from 'react-native'
import AppNavigator from './src/navigation/AppNavigator';
import FlashMessage from "react-native-flash-message";
import { AuthProvider } from './src/context/AuthContext';
import { requestNotificationPermission, setupNotificationListeners } from './src/services/notificationService'
import { StripeProvider } from '@stripe/stripe-react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

const App = () => {
  
  useEffect(() => {
    requestNotificationPermission();
    setupNotificationListeners();
    createNotificationChannel()
  }, []);

  const createNotificationChannel = async () => {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <StripeProvider publishableKey="pk_test_51IEPC9JKwzZ1wTvdJSbCqbmPH6PIhd5HcDXzck2oLuIcsbnG2qSePyoO5zXQwunzCCqtq9cvXjYsbPloE4KsifKf00jRQQwMDj">
        <AuthProvider>
          <AppNavigator />
          <FlashMessage
            position="top"
          />
        </AuthProvider>
      </StripeProvider>
    </View>
  );
};

export default App;
