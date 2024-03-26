import { Alert, SafeAreaView, StatusBar } from 'react-native';
import React, { createRef, useEffect, useRef } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer, NavigationContainerRef, createNavigationContainerRef } from '@react-navigation/native';
import RootStack from './src/navigation/RootStack/RootStack';
import Test from './src/screens/Test';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import messaging from '@react-native-firebase/messaging';
import NotificationController from './src/config/NotificationController';
import { RootStackParamList } from './src/types/NavigationTypes/navigationTypes';
// import PushNotification from 'react-native-push-notification';

export const navigationRef = createNavigationContainerRef()

const App = () => {

  // const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>();

  // PushNotification.configure({
  //   onRegister: (token) => console.log(token),
  //   onNotification: (notification) => {
  //     console.log("notification : ", notification)
  //     if (notification) {
  //       console.log(notification);
  //       Alert.alert('Opened push notification', JSON.stringify(notification));
  //     }
  //   },
  // });


  useEffect(() => {
    SplashScreen.hide();

    // const unsubscribe = 
    messaging().onMessage(async remoteMessage => {
      console.log(" App onMessage remoteMessage : ", remoteMessage)

      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // messaging().getInitialNotification().then(remoteMessage => {
    //   console.log(" App getInitialNotification remoteMessage : ", remoteMessage)
    // })

    // return unsubscribe;

  }, []);


  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor={'transparent'} />
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <NavigationContainer ref={navigationRef}>
        <NotificationController />
        <RootStack />
        {/* <Test /> */}
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </Provider>
  );
};

export default App;
