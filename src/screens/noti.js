import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './screens/AuthStack';
import HomeStack from './screens/HomeStack';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import NotificationPopup from 'react-native-push-notification-popup';

const Stack = createStackNavigator();

function App() {
    const [hasUnreadNotification, setHasUnreadNotification] = useState(false)
    const [hasUnreadMessage, setHasUnreadMessage] = useState(false)
    const popupRef = useRef(null);


    useEffect(() => {
        SplashScreen.hide();
        registerNotificatinListeners()
        notificationListener
        notificationOpenedListener
    }, []);

    const registerNotificatinListeners = async () => {
        await requestUserPermission()
        const token = await messaging().getToken()
        console.log("FCM-Token", token)

    }
    const showNotification = (title, body, data) => {
        if (popupRef.current) {
            popupRef.current.show({
                appIconSource: require('./../assets/images/Avatar.png'),
                appTitle: 'Khizar Driver',
                timeText: 'Now',
                title: title,
                body: body,
                slideOutTime: 5000
            });
        }
    }
    const notificationListener = messaging().onMessage(async remoteMessage => {
        console.log("notificationListener-remoteMessage", JSON.stringify(remoteMessage))
        const {notification, data} = remoteMessage;
        if (!!notification) {
            const {title, body} = notification;
            console.log("notificationListener-asdfa");
            showNotification("title", body, data);

            setHasUnreadNotification(true)
        } else {
            console.log("notificationListener-dat")
            setHasUnreadMessage(true)
        }
    });

    const notificationOpenedListener = messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log("notificationOpenedListener-remoteMessage", JSON.stringify(remoteMessage))
        const {notification, data} = remoteMessage;
        if (notification?.title) {
            const {title, body} = notification;
            showNotification(title, body, data);
            console.log("notificationListener-asdfa")
            setHasUnreadNotification(true)
        } else {
            console.log("notificationListener-dat")
            setHasUnreadMessage(true)
        }    });


    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        console.log("requestUserPermission", 'enabled', enabled)
    }

    return (
        <View
            style={{flex: 1}}>
            <NavigationContainer>
                <Stack.Navigator headerMode="none">
                    <Stack.Screen name="AuthStack" component={AuthStack}/>
                    <Stack.Screen name="HomeStack" component={HomeStack}/>
                </Stack.Navigator>
            </NavigationContainer>
            <NotificationPopup
                ref={popupRef}
            />
        </View>
    );
}

export default App;