import { View, Text, KeyboardAvoidingView, Platform, FlatList, StyleSheet, Alert, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import GradiantHeader from '../components/GradiantHeader'
import { useGlobalStyles } from '../styles/GlobalStyles'
import CustomTextInput from '../components/CustomTextInput'
import { userType } from '../types/UserTypes/usertype'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useAppSelector } from '../redux/Store'
import { MainRouteProps } from '../types/NavigationTypes/navigationTypes'
import { useRoute } from '@react-navigation/native'
import { getUserData } from '../utils/CommonFunctions'
import { MessageColRef, getFirebaseuserData } from '../utils/Firebase/constants'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import ContactCard from '../components/ContactCard'
import { sendMessageNotification } from '../config/NotificationServices'
import { AppStrings } from '../utils/AppStrings'
import PushNotification from 'react-native-push-notification'
import { navigationRef } from '../../App'
// import firebase from 'react-native-firebase';

type Message = {
    msg: string,
    createdAt: number,
    from: string | undefined
}

const ChatRoomScreen = () => {
    const [text, settext] = useState('');
    const [user, setuser] = useState<userType>({});
    const [senderUser, setsenderUser] = useState<FirebaseFirestoreTypes.DocumentData | undefined>({});
    const [chatList, setchatList] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
    const GlobalStyles = useGlobalStyles()
    const styles = useStyles()
    const { colors } = useAppSelector(state => state.CommonSlice)
    const route = useRoute<MainRouteProps<'ChatRoomScreen'>>()

    console.log('ChatRoomScreen user :  ', route.params.user)

    useEffect(() => {
        getChat()

        // console.log('navigationRef.current?.getCurrentRoute : ', navigationRef.current?.getCurrentRoute()?.name);
        // if (navigationRef.current?.getCurrentRoute()?.name == 'ChatRoomScreen') {
        //     PushNotification.cancelAllLocalNotifications()
        // }
        // if (navigationRef.isFocused()) {
        //     PushNotification.cancelAllLocalNotifications()
        // }

    }, [route.params.user]);

    const getChat = async () => {

        const sender = (await getFirebaseuserData(route.params.user)).data()
        setsenderUser(sender)



        const usr = await getUserData()
        // console.log(usr)
        setuser(usr)
        // ChatColRef
        //     .doc(route.params.chatId)
        //     .collection('messages')

        MessageColRef(route.params.chatId, false)
            .orderBy('createdAt', 'desc')
            .onSnapshot((qeurySnapshot) => {
                // qeurySnapshot
                //     .docChanges()
                //     .forEach((val) => {
                //         console.log('qeurySnapshot.docChanges : ', val.type)
                //         if (val.type == 'added') {
                //             sendNotification()
                //         }
                //     })
                let list: FirebaseFirestoreTypes.DocumentData[] = []
                // console.log("qeurySnapshot.docs : ", qeurySnapshot.docs)
                qeurySnapshot.forEach(documentSnapshot => {
                    // console.log("documentSnapshot : ", documentSnapshot.data())
                    list.push(documentSnapshot.data())
                })
                // console.log(list)
                setchatList(list)
            })
    }

    const sendMessage = () => {
        let msgData: Message = {
            msg: text,
            createdAt: Date.now(),
            from: user.id
        }
        settext('')
        // ChatColRef
        //     .doc(route.params.chatId)
        //     .collection('messages')
        MessageColRef(route.params.chatId, true)
            .add(msgData)
            .then(async () => {
                settext('')
                // sendNotification()
                let IDs = route.params.chatId.split('-')
                IDs.forEach(async id => {
                    if (id != user.id) {
                        // console.log('ID : ', id)
                        let senderUser = (await getFirebaseuserData(user.id ? user.id : '')).data()
                        let receiverUser = (await getFirebaseuserData(id)).data()
                        // console.log('RECIEVER user data : ', receiverUser)
                        sendMessageNotification({
                            roomId: route.params.chatId,
                            body: msgData.msg,
                            title: senderUser?.firstName,
                            senderId: user.id,
                            receiverId: id
                            // sender: senderUser,
                            // receiver: receiverUser
                        })
                    }
                })
                // let time = new Date(Date.now()).toLocaleString()
                // console.log(Date.now().toLocaleString())
            })
    }

    const sendNotification = async () => {
        console.log('sendNotification')

        // await sendMessageNotification({})

        // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
        //     title: 'notification',
        //     message: 'msg',
        //     buttonPositive: 'ok'
        // }).then(val => {
        //     console.log(val)
        // });

        // messaging().getToken().then(tkn => console.log(tkn))


        // messaging().setBackgroundMessageHandler(async msg => {
        //     console.log('setBackgroundMessageHandler : ', msg)
        //     // Alert.alert('A new FCM message arrived!', JSON.stringify(msg));
        // })
        // firebase.notifications().onNotification((noti) => console.log(noti))
        // messaging().onMessage(async remoteMessage => {
        //     console.log("remoteMessage : ", remoteMessage)
        //     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        // });

        // messaging().sendMessage({
        //     data: {
        //         title: 'title', msg: 'msg'
        //     }

        // })

    }


    return (
        // <View style={GlobalStyles.mainContainer}>
        <LinearGradient
            colors={[colors.PRIMARY_COLOR, colors.SECONDARY_COLOR]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={GlobalStyles.mainContainer}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <GradiantHeader
                    // title={
                    //     <View style={{ marginHorizontal: widthPercentageToDP(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    //         <Text style={{ ...GlobalStyles.inboxHeaderTitle, flex: 1, }} numberOfLines={2} >{route.params.msg}</Text>
                    //         <Text style={{ ...GlobalStyles.inboxHeaderTitle, marginHorizontal: 15 }}>{route.params.day}</Text>
                    //         <Text style={GlobalStyles.inboxSubHeaderTitle}>100🪙</Text>
                    //     </View>
                    // }
                    title={
                        <View>
                            <ContactCard item={senderUser} />
                        </View>
                    }
                    back={true}
                />

                <FlatList
                    inverted={true}
                    style={{ marginHorizontal: wp(5) }}
                    data={chatList}
                    renderItem={({ item }) => {
                        // console.log("item : ", item)
                        return (
                            <View style={{
                                ...styles.chatContainer,
                                alignSelf: item.from == user.id ? 'flex-end' : 'flex-start',
                                borderBottomLeftRadius: item.from == user.id ? wp(5) : 0,
                                borderBottomRightRadius: item.from == user.id ? 0 : wp(5),
                            }}>
                                <Text >{item.msg}</Text>
                                {/* <Text>{item.createdAt?.toDate().toLocaleString()}</Text> */}
                                <Text>{moment(item.createdAt).format('hh:mm a')}</Text>
                            </View>
                        )
                    }
                    }
                />
                <View style={styles.msgBox}>
                    <View style={{ flex: 1 }}>

                        <CustomTextInput
                            placeholder={'Enter message..'}
                            onChangeText={(val) => {
                                settext(val)
                            }}
                            value={text}
                        />

                    </View>
                    <Text style={GlobalStyles.btnText} onPress={() => {
                        if (text !== '') {
                            sendMessage()
                        }
                    }}>Send</Text>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
        // </View>
    )
}

export default ChatRoomScreen

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice)

    return StyleSheet.create({
        chatContainer: {
            backgroundColor: colors.INBOX_BG,
            padding: wp(3),
            borderRadius: wp(5),
            margin: wp(3)
        },
        msgBox: {
            // position: 'absolute',
            // bottom: wp(8),
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginHorizontal: 20
        }
    })

}