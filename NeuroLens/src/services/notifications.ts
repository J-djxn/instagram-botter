import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export async function requestNotificationPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  return enabled;
}

export async function getFcmToken() {
  const token = await messaging().getToken();
  return token;
}

export async function sendLocalStressNotification() {
  // Placeholder: integrate local notifications library (e.g., notifee) for actual display.
  console.log('You seem stressed. Want to take a break?');
}

