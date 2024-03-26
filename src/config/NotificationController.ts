import { View, Text, Alert, Platform } from 'react-native'
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { useCustomNavigation } from '../navigation/hooks/useCustomNavigation';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { getUserData } from '../utils/CommonFunctions';
import { UserColRef } from '../utils/Firebase/constants';
import firestore from '@react-native-firebase/firestore';
import { navigationRef } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationController = () => {

    const { navigation } = useCustomNavigation('Home')

    PushNotification.configure({
        onRegister: (token) => console.log(token),
        onNotification: (notification) => {
            console.log("notification : ", notification)
            notification.finish(PushNotificationIOS.FetchResult.NoData);


            // console.log("notification.data.userData : ", (notification.data.userData));
            if (notification.userInteraction) {
                console.log("notification.userInteraction", notification.userInteraction);

                // navigationRef.navigate('ChatRoomScreen', {
                //     chatId: notification.data.roomId,
                //     user: notification.data.userData
                // })

                // if (notification.userInteraction && notification.foreground) {
                // console.log('notification.userInteraction && notification.foreground : ', notification.userInteraction && notification.foreground)
                // console.log("navigationRef.current?.isReady() : ", navigationRef.current?.isReady())

                // AsyncStorage.removeItem('NOTIFICATION')

                navigation.navigate('ChatRoomScreen', {
                    chatId: notification.data.roomId,
                    user: notification.data.userData
                })

            }
            // Alert.alert('Opened push notification', JSON.stringify(notification));
        },
    });

    useEffect(() => {

        // messaging().setBackgroundMessageHandler(remoteMessage => {
        //     console.log('Message handled in the background!', remoteMessage);

        // });


        // When the user presses a notification displayed via FCM, 
        // this listener will be called if the app has opened from a background state.
        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            console.log(" onNotificationOpenedApp remoteMessage : ", remoteMessage)
            if (remoteMessage) {
                const usr = await getUserData()
                // console.log(usr)
                // messaging().getToken().then(tkn => {
                //     console.log('TOKEN : ', tkn)
                UserColRef.doc(usr.id).update({
                    notifications: firestore.FieldValue.arrayUnion(remoteMessage)
                })
                // })

                // navigationRef.navigate('ChatRoomScreen', {
                //     chatId: remoteMessage?.data ? remoteMessage.data.roomId : '',
                //     user: remoteMessage?.data ? remoteMessage.data.userData : ''
                // })

                // AsyncStorage.removeItem('NOTIFICATION')

                navigation.navigate('ChatRoomScreen', {
                    chatId: remoteMessage?.data ? remoteMessage.data.roomId : '',
                    user: remoteMessage?.data ? remoteMessage.data.userData : ''
                })
            }

        })


        // When a notification from FCM has triggered the application 
        // to open from a quit state
        messaging().getInitialNotification().then((remoteMessage) => {
            console.log(" getInitialNotification remoteMessage : ", remoteMessage)


            if (remoteMessage) {
                console.log(" getInitialNotification remoteMessage : new", remoteMessage)
                getUserData().then((usr) => {
                    UserColRef.doc(usr.id).update({
                        notifications: firestore.FieldValue.arrayUnion(remoteMessage)
                    }).then(() => {

                        // navigationRef.navigate('ChatRoomScreen', {
                        //     chatId: remoteMessage?.data ? remoteMessage.data.roomId : '',
                        //     user: remoteMessage?.data ? remoteMessage.data.userData : ''
                        // })

                        // AsyncStorage.removeItem('NOTIFICATION')

                        navigation.navigate('ChatRoomScreen', {
                            chatId: remoteMessage?.data ? remoteMessage.data.roomId : '',
                            user: remoteMessage?.data ? remoteMessage.data.userData : ''
                        })
                    })
                })
            } else {
                // AsyncStorage.getItem('NOTIFICATION').then((remoteMessage) => {
                //     // console.log('AsyncStorage.getItem : ', JSON.parse(remoteMessage))
                //     if (remoteMessage) {
                //         let remotemsg = JSON.parse(remoteMessage)
                //         getUserData().then((usr) => {
                //             UserColRef.doc(usr.id).update({
                //                 notifications: firestore.FieldValue.arrayUnion(remotemsg)
                //             }).then(() => {

                //                 AsyncStorage.removeItem('NOTIFICATION')
                //                 // navigationRef.navigate('ChatRoomScreen', {
                //                 //     chatId: remoteMessage?.data ? remoteMessage.data.roomId : '',
                //                 //     user: remoteMessage?.data ? remoteMessage.data.userData : ''
                //                 // })


                //                 navigation.navigate('ChatRoomScreen', {
                //                     chatId: remotemsg?.data ? remotemsg.data.roomId : '',
                //                     user: remotemsg?.data ? remotemsg.data.userData : ''
                //                 })

                //             })
                //         })
                //     }
                // })
            }



            // navigationRef.current?.reset({
            //     index: 0,
            //     routes: [
            //         {
            //             name: "ChatRoomScreen",
            //             params: {
            //                 chatId: remoteMessage?.data ? remoteMessage.data.roomId : '',
            //                 user: remoteMessage?.data ? remoteMessage.data.userData : ''
            //             }
            //         }
            //     ]
            // })

        })



        messaging().onMessage(async remoteMessage => {
            console.log(" onMessage remoteMessage : ", remoteMessage)

            if (remoteMessage.notification) {
                const usr = await getUserData()
                // console.log(usr)
                messaging().getToken().then(tkn => {
                    console.log('TOKEN : ', tkn)
                    UserColRef.doc(usr.id).update({
                        notifications: firestore.FieldValue.arrayUnion(remoteMessage)
                    })
                })


                console.log('navigationRef.current?.getCurrentRoute() : ', navigationRef.current?.getCurrentRoute())
                console.log('remoteMessage.data?.roomId : ', remoteMessage.data?.roomId)
                if (navigationRef.current?.getCurrentRoute()?.name !== 'ChatRoomScreen') {
                    if (Platform.OS == 'ios') {
                        PushNotificationIOS.addNotificationRequest({
                            id: remoteMessage.messageId ? remoteMessage.messageId : '',
                            title: remoteMessage.notification.title,
                            body: remoteMessage.notification.body,
                            userInfo: remoteMessage.data,
                        });
                        // PushNotificationIOS.presentLocalNotification({
                        //     alertBody: remoteMessage.notification.body ? remoteMessage.notification.body : '',
                        //     userInfo: remoteMessage.data,
                        // })
                    }
                    else {
                        PushNotification.localNotification({
                            message: remoteMessage.notification.body ? remoteMessage.notification.body : '',
                            title: remoteMessage.notification.title,
                            channelId: "fcm_fallback_notification_channel",
                            userInfo: remoteMessage.data,
                        })
                    }
                }
                else if (remoteMessage.data?.roomId !== navigationRef.current?.getCurrentRoute()?.params?.chatId) {
                    if (Platform.OS == 'ios') {
                        PushNotificationIOS.addNotificationRequest({
                            id: remoteMessage.messageId ? remoteMessage.messageId : '',
                            title: remoteMessage.notification.title,
                            body: remoteMessage.notification.body,
                            userInfo: remoteMessage.data,
                        });
                        // PushNotificationIOS.presentLocalNotification({
                        //     alertBody: remoteMessage.notification.body ? remoteMessage.notification.body : '',
                        //     userInfo: remoteMessage.data,
                        // })
                    }
                    else {
                        PushNotification.localNotification({
                            message: remoteMessage.notification.body ? remoteMessage.notification.body : '',
                            title: remoteMessage.notification.title,
                            channelId: "fcm_fallback_notification_channel",
                            userInfo: remoteMessage.data,
                        })
                    }
                }
                // else {
                //     PushNotification.cancelAllLocalNotifications()
                // }


                // AsyncStorage.setItem('NOTIFICATION', JSON.stringify(remoteMessage)).then(() => {
                //     console.log('NOTIFICATION remoteMessage AsyncStorage ')
                // })

                // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.notification));
            }
        });

    }, []);


    return null


}

export default NotificationController