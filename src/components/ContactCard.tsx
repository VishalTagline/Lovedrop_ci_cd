import { View, Text, TouchableWithoutFeedback, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppSelector } from '../redux/Store'
import { Images } from '../utils/ImagePaths'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { MessageColRef } from '../utils/Firebase/constants'
import { getUserData } from '../utils/CommonFunctions'
import { useCustomNavigation } from '../navigation/hooks/useCustomNavigation'
import { useGlobalStyles } from '../styles/GlobalStyles'

const ContactCard = ({ item }: any
    // Contacts.Contact
    // FirebaseFirestoreTypes.DocumentData
) => {

    const { navigation } = useCustomNavigation('Home')
    const GlobalStyles = useGlobalStyles()
    const styles = useStyles()
    // console.log("item : ", item)

    const createChatRoom = async (userID: string) => {
        const user = await getUserData()
        // console.log('contact id : ', userID)
        // console.log('self id : ', user.id)
        // console.log('userID > user.id', userID < user.id)

        let ids: string[] = user.id ? [userID, user.id] : []
        ids = ids.sort((a: string, b: string) => a.localeCompare(b))
        // console.log(ids)
        // console.log(`doc : ${userID}-${user.id}`)


        // ChatColRef
        //   .doc(`${userID}-${user.id}`)
        //   .collection('messages')
        // MessageColRef(`${userID}-${user.id}`, false)
        //   .count()
        //   .get()
        //   .then(val => {
        //     console.log('val : ', val.data().count)
        //     if (val.data().count) {
        //       navigation.navigate('ChatRoomScreen', {
        //         chatId: `${userID}-${user.id}`
        //       })
        //     } else {
        //       // ChatColRef
        //       //   .doc(`${user.id}-${userID}`)
        //       //   // .get().then(data => {
        //       //   //   console.log('doc : ', data.exists)
        //       //   // })
        //       //   .collection('messages')
        MessageColRef(`${ids[0]}-${ids[1]}`, false)
            .get()
            // .doc('test_chat_1')
            // .set({
            //   // msg: 'Hello.'
            // })
            .then(() => {
                navigation.navigate('ChatRoomScreen', {
                    chatId: `${ids[0]}-${ids[1]}`,
                    user: item.id
                })
            })
        //     }
        //   })


        // firestore()
        //   .collection('Chats')
        //   .doc(`${userFNM}-${user.firstName}`)
        //   .collection('message')
        //   .get().then(val => {
        //     console.log('val empty : ', val.empty)
        //     if (val.empty) {
        //       navigation.navigate('ChatScreen', {
        //         chatId: `${userFNM}-${user.firstName}`
        //       })
        //     } else {

        //       firestore()
        //         .collection('Chats')
        //         // .doc(`sender_${user.id}-receiver_${userFNM}`)
        //         .doc(`${user.firstName}-${userFNM}`)
        //         // .get().then(data => {
        //         //   console.log('doc : ', data.exists)
        //         // })
        //         .collection('messages')
        //         .doc('test_chat_1')
        //         .set({
        //           msg: 'Hello.'
        //         })
        //         .then(() => {
        //           navigation.navigate('ChatScreen', {
        //             chatId: `${user.firstName}-${userFNM}`
        //           })
        //         })
        //     }
        //   })



        // firestore()
        //   .collection('Chats')
        //   .doc(`sender_${user.id}-receiver_${userId}`)
        //   // .get().then(data => {
        //   //   console.log('doc : ', data.exists)
        //   // })
        //   .collection('messages')
        //   .doc('test_chat_1')
        //   .set({
        //     msg: 'Hello.'
        //   })
        //   .then(() => {
        //     navigation.navigate('ChatScreen', {
        //       chatId: `sender_${user.id}-receiver_${userId}`
        //     })
        //   })
    }

    if (item) {

        return (
            <TouchableOpacity
                // style={{ backgroundColor: 'blue' }} 
                onPress={() => { createChatRoom(item.id) }}>
                <View style={styles.contactCard}>
                    <Image source={item.image ? { uri: item.image } : Images.noProfile} style={styles.imgProfile} />
                    <View style={{ marginHorizontal: wp(2) }}>
                        <Text style={GlobalStyles.contactName}>{item.firstName}</Text>
                        <Text style={GlobalStyles.contactNumber}>{item.phoneNumber}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
    } else {
        return null
    }

}

const useStyles = () => {

    const { colors } = useAppSelector(state => state.CommonSlice)

    return StyleSheet.create({
        seperator: {
            borderWidth: 0.5,
            borderColor: colors.LIGHT_TEXT,
            marginLeft: wp(15)
        },
        contactCard: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: wp(2)
        },
        imgProfile: {
            height: wp(12),
            width: wp(12),
            resizeMode: 'cover',
            borderRadius: wp(50)
        },
    })

}

export default ContactCard