import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ContactCard from './ContactCard'
import { useAppSelector } from '../redux/Store'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { Images } from '../utils/ImagePaths'
import { useGlobalStyles } from '../styles/GlobalStyles'
import { MessageColRef } from '../utils/Firebase/constants'
import { getUserData } from '../utils/CommonFunctions'
import { useCustomNavigation } from '../navigation/hooks/useCustomNavigation'

interface Props {
    data: FirebaseFirestoreTypes.DocumentData[],
}

const CustomContactFlatList: React.FC<Props> = ({ data }) => {

    const styles = useStyles()
    const GlobalStyles = useGlobalStyles()
    const { navigation } = useCustomNavigation('Home')


    // const createChatRoom = async (userID: string, item: FirebaseFirestoreTypes.DocumentData) => {
    //     const user = await getUserData()
    //     console.log('contact id : ', userID)
    //     console.log('self id : ', user.id)
    //     // console.log('userID > user.id', userID < user.id)

    //     let ids: string[] = user.id ? [userID, user.id] : []
    //     ids = ids.sort((a: string, b: string) => a.localeCompare(b))
    //     console.log(ids)
    //     console.log(`doc : ${userID}-${user.id}`)


    //     MessageColRef(`${ids[0]}-${ids[1]}`, false)
    //         .get()
    //         // .doc('test_chat_1')
    //         // .set({
    //         //   // msg: 'Hello.'
    //         // })
    //         .then(() => {
    //             navigation.navigate('ChatRoomScreen', {
    //                 chatId: `${ids[0]}-${ids[1]}`,
    //                 user: item
    //             })
    //         })
    // }

    const itemSeparatorComponent = () => (
        <View style={styles.seperator} />
    )

    return (
        <FlatList
            // style={{ backgroundColor: 'red' }}
            data={data}
            ItemSeparatorComponent={itemSeparatorComponent}
            renderItem={({ item }) => {
                // console.log( item)
                return (
                    <ContactCard item={item} />
                    // <TouchableOpacity
                    //     // style={{ backgroundColor: 'blue' }} 
                    //     onPress={() => { createChatRoom(item.id, item) }}>
                    //     <View style={styles.contactCard}>
                    //         <Image source={item.image ? { uri: item.image } : Images.noProfile} style={styles.imgProfile} />
                    //         <View style={{ marginHorizontal: wp(2) }}>
                    //             <Text style={GlobalStyles.contactName}>{item.firstName}</Text>
                    //             <Text style={GlobalStyles.contactNumber}>{item.phoneNumber}</Text>
                    //         </View>
                    //     </View>
                    // </TouchableOpacity>
                )
            }
            }
        />
    )
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


export default CustomContactFlatList