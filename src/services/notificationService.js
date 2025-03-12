import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AndroidImportance } from '@notifee/react-native';

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
        console.log(fcmToken, 'the new generated token');
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('check token error', error);
    }
  }
};

// Show Foreground Notification using Notifee
const showForegroundNotification = async (remoteMessage) => {
  await notifee.requestPermission();

  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'New Notification',
    body: remoteMessage.notification?.body || 'You have a new message',
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
    },
  });
};

// Handle Foreground Notifications
export const setupNotificationListeners = () => {
  const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    console.log('Foreground Notification:', remoteMessage);
    
    // ✅ Show notification popup in foreground
    await showForegroundNotification(remoteMessage);
  });

  // Handle Background & Quit State Notifications
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background Notification:', remoteMessage);
  });

  return () => {
    unsubscribeOnMessage(); // ✅ Unsubscribe when component unmounts
  };
};
