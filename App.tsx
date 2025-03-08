import React from 'react';
import { View } from 'react-native'
import AppNavigator from './src/navigation/AppNavigator';
import FlashMessage from "react-native-flash-message";
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
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