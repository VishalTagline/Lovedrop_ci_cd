import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import GradiantHeader from '../../components/GradiantHeader'
import { useGlobalStyles } from '../../styles/GlobalStyles'
import CustomHeader from '../../components/CustomHeader'
import { AppStrings } from '../../utils/AppStrings'
import { useCustomNavigation } from '../../navigation/hooks/useCustomNavigation'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useAppSelector } from '../../redux/Store'
import { ChatColRef, MessageColRef, UserColRef, getFirebaseuserData } from '../../utils/Firebase/constants'
import { getUserData } from '../../utils/CommonFunctions'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging'

export type InboxMessageType = {
  msg: string,
  day: string
}

const inboxData: InboxMessageType[] = [
  {
    msg: AppStrings.anonymousGirlLikedyou,
    day: '2d'
  },
  {
    msg: AppStrings.anonymousBoySentNote,
    day: '4d'
  },
  {
    msg: AppStrings.youSentNote,
    day: '4d'
  },
]

const InboxScreen = () => {
  const { navigation } = useCustomNavigation('Home')
  const GlobalStyles = useGlobalStyles()
  const styles = useStyles()
  const [notificationList, setnotificationList] = useState<FirebaseMessagingTypes.RemoteMessage[]>([]);
  const [loading, setloading] = useState(true);
  const [isRefresh, setisRefresh] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getInboxList()
    })
  }, []);

  const getInboxList = async () => {

    const usr = await getUserData()
    const data = (await getFirebaseuserData(usr.id)).data()
    console.log('Inbox screen data : ', data?.notifications)
    if (data?.notifications) {
      setnotificationList(data?.notifications.reverse())
    } else {
      setnotificationList([])
    }
    setloading(false)
    setisRefresh(false)

    // ChatColRef
    //   .doc('PH3QcAQaReeO1lfBjsAqPBI4uA33-2xw9SlmyrAeOjLZNqq1gJzDDfgQ2')
    //   .get().then((val) => {
    //     console.log(val)
    //   })
    // .collection('messages')

    // MessageColRef('PH3QcAQaReeO1lfBjsAqPBI4uA33-2xw9SlmyrAeOjLZNqq1gJzDDfgQ2').get().then((val) => {
    //   console.log(val)
    // })

  }



  return (
    <View style={GlobalStyles.mainContainer}>

      <GradiantHeader
      // leftTitle={AppStrings.inbox}
      // rightTitle={AppStrings.profile}
      // onRightTitlePress={() => {
      //   // navigation.goBack()
      //   // navigation.navigate('ProfileScreen')
      // }}
      // isLeft={true}
      />

      {
        loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View> :
          notificationList.length == 0
            ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text >Your Inbox is empty !</Text>
            </View>
            :
            <FlatList
              refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={getInboxList} />}
              data={notificationList}
              renderItem={({ item, index }: { item: FirebaseMessagingTypes.RemoteMessage, index: number }) =>
                index < 5 ?
                  (

                    <TouchableOpacity onPress={() => {
                      navigation.navigate('ChatRoomScreen', {
                        chatId: item.data?.roomId ? item.data?.roomId : '',
                        user: item.data?.userData ? item.data.userData : ''
                      })
                      // navigation.navigate('ChatScreen', {
                      //   day: item.day,
                      //   msg: item.msg
                      // })
                    }}>
                      <View style={styles.container}>

                        <Text>{item.notification?.title} sent you message.</Text>
                        {/* <Text>{item.notification?.body}</Text> */}

                      </View>
                    </TouchableOpacity>
                  ) : null}
            />
      }



    </View>
  )
}

const useStyles = () => {

  const { colors } = useAppSelector(state => state.CommonSlice)

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: wp(5),
      backgroundColor: colors.INBOX_BG,
      margin: wp(2),
      marginHorizontal: wp(5),
      borderRadius: wp(3)
    }
  })
}

export default InboxScreen