import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalStyles } from '../../styles/GlobalStyles'
import GradiantHeader from '../../components/GradiantHeader'
import { useAppSelector } from '../../redux/Store'
import { ChatColRef, UserColRef } from '../../utils/Firebase/constants'
import { getUserData } from '../../utils/CommonFunctions'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { useCustomNavigation } from '../../navigation/hooks/useCustomNavigation'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CustomContactFlatList from '../../components/CustomContactFlatList'
import { AppStrings } from '../../utils/AppStrings'
// import { UserContext } from '../navigation/RootStack/RootStack'



const ChatScreen = () => {

    const { navigation } = useCustomNavigation('Home')
    const GlobalStyles = useGlobalStyles()
    const styles = useStyles()
    const [chattedList, setchattedList] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
    const [loading, setloading] = useState(true);
    const [isRefresh, setisRefresh] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', () => {
            getChattedList()
        })
    }, []);


    const getChattedList = async () => {

        const usr = await getUserData()
        // console.log(usr)

        let list: any = []
        ChatColRef.onSnapshot(querySnapshot => {
            // console.log("querySnapshot : ", querySnapshot.docs)
            querySnapshot.forEach((documentSnapshot) => {
                console.log("documentSnapshot : ", documentSnapshot.data().user1)
                if (usr.id == documentSnapshot.data().user1) {
                    console.log('matched')
                    list.push(documentSnapshot.data().user2)
                } else if (usr.id == documentSnapshot.data().user2) {
                    console.log('matched')
                    list.push(documentSnapshot.data().user1)
                }
            })
            console.log('Chatted list : ', list)

            let chattedList: FirebaseFirestoreTypes.DocumentData[] = []
            UserColRef.onSnapshot((qeurySnapshot) => {
                // console.log(qeurySnapshot.docs)
                // let list: FirebaseFirestoreTypes.DocumentData[] = []
                qeurySnapshot.forEach(documentSnapshot => {
                    // console.log('User : ', documentSnapshot.data())
                    // if (documentSnapshot.data().id != usr.id) {
                    //     list.push(documentSnapshot.data())
                    // }
                    // console.log(list)
                    list.forEach((item: any) => {
                        // console.log('chat : ', item)
                        if (item == documentSnapshot.data().id) {
                            chattedList.push(documentSnapshot.data())
                        }
                    })
                })
                // console.log('chattedList : : ', chattedList)
                setchattedList(chattedList)
                setloading(false)
                setisRefresh(false)
            });

        })
    }


    return (
        <View style={GlobalStyles.mainContainer}>
            <GradiantHeader />
            {
                loading
                    ? <ActivityIndicator style={styles.centerItems} />
                    : <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={getChattedList} />}>
                        {chattedList.length
                            ?
                            <CustomContactFlatList
                                data={chattedList}
                            />
                            :
                            <View style={styles.centerItems}><Text>{AppStrings.noChatsFound}</Text></View>
                        }
                    </ScrollView>
            }
        </View>
    )
}

export default ChatScreen

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
        centerItems: { flex: 1, justifyContent: 'center', alignItems: 'center' }
    })

}

