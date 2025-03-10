import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Request Permission for Notifications
export const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted.');
    await getFCMToken();
  }
};

const getFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('check fcm token', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, 'the new genrated token');
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('check token error', error);
    }
  }
};

// Handle Foreground Notifications
export const setupNotificationListeners = () => {
  const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    console.log('Foreground Notification:', remoteMessage);
    // Alert.alert(remoteMessage.notification?.title ?? "Notification", remoteMessage.notification?.body ?? "You have a new message.");
  });

  // Handle Background & Quit State Notifications
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background Notification:', remoteMessage);
  });

  return () => {
    unsubscribeOnMessage(); // ✅ Unsubscribe when component unmounts
  };
};