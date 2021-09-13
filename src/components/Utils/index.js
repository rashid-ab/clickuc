import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  console.log('AuthStatus',authStatus)
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken()
  }
}
const getFcmToken = async () =>{
    let fcmtoken = await AsyncStorage.getItem('fcmtoken')
    console.log(fcmtoken,'our old token')
    if(!fcmtoken){
        try {
            const fcmtoken= await messaging().getToken();
            if(fcmtoken){
                await AsyncStorage.setItem('fcmtoken',fcmtoken);
                console.log(fcmtoken,'we got our token')
            }

        } catch (error) {
            console.log(error,'Token not fetched')
        }
    }
}
export const notificationListner = async () =>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',remoteMessage.notification,
        );
      });
      messaging().onMessage(async (remoteMessage)=>{
        return  console.log('forground',remoteMessage)
      })
      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
}