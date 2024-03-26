import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalStyles } from '../../styles/GlobalStyles'
import GradiantHeader from '../../components/GradiantHeader'
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useAppDispatch, useAppSelector } from '../../redux/Store'
import { AppStrings } from '../../utils/AppStrings'
import { Images } from '../../utils/ImagePaths'
import CustomPrimaryButton from '../../components/CustomPrimaryButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCustomNavigation } from '../../navigation/hooks/useCustomNavigation'
import { getUserData } from '../../utils/CommonFunctions'
import { setTheme } from '../../redux/slice/CommonSlice'
import { UserColRef, getFirebaseuserData } from '../../utils/Firebase/constants'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
// import { UserContext } from '../navigation/RootStack/RootStack'


const Seperator = () => {
  const styles = useStyles()
  return (
    <View style={styles.seperator} />
  )
}

const ProfileScreen = () => {

  const { navigation } = useCustomNavigation('Home')
  const GlobalStyles = useGlobalStyles()
  const styles = useStyles()
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(false);
  const [user, setuser] = useState<FirebaseFirestoreTypes.DocumentData | undefined>({});
  // const userData = useContext(UserContext);
  // console.log('profile screen data :: ', userData?.User)
  const [loading, setloading] = useState(true);

  useEffect(() => {
    dispatch(setTheme(value))
  }, [value]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData()
    })
    getData()
  }, []);

  const getData = async () => {
    // console.log('userData : ', userData)
    const usr = await getUserData()
    // console.log(usr)

    let userData = (await getFirebaseuserData(usr.id)).data()
    // console.log('user data : ', userData)
    setuser(userData)
    setloading(false)

    // let userdata = auth().currentUser
    // console.log(userdata)
  }




  return (
    <View style={{ ...GlobalStyles.mainContainer }}>
      <GradiantHeader
      // leftTitle={AppStrings.inbox}
      // rightTitle={AppStrings.profile}
      // onLeftTitlePress={() => {
      //   // navigation.goBack()
      //   // navigation.navigate('InboxScreen')
      // }}
      // isRight={true}
      />
      {
        loading
          ?
          <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }} />
          :

          <View style={{ ...GlobalStyles.centerContainer, }}>
            <Image source={user?.image ? { uri: user.image } : Images.noProfile} style={styles.img} />
            <View style={styles.profileCard}>
              <View style={{ paddingTop: wp(8), paddingHorizontal: wp(25) }}>
                <Text style={{ ...GlobalStyles.usernameText, textAlign: 'center' }}>{user?.firstName}</Text>
                <Text style={GlobalStyles.phoneText}>{user?.phoneNumber}</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('EditProfileScreen') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={Images.edit} style={styles.edit} />
                  <Text style={GlobalStyles.infoText}>{AppStrings.editProfile}</Text>
                </TouchableOpacity>
              </View>
              <Seperator />
              <View style={{ padding: wp(10) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                  <Text style={GlobalStyles.infoText}>{AppStrings.notes}</Text>
                  <Text style={GlobalStyles.infoText}>:</Text>
                  <Text style={GlobalStyles.infoText}>5</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Text style={GlobalStyles.infoText}>{AppStrings.coins}🪙</Text>
                  <Text style={GlobalStyles.infoText}>:</Text>
                  <Text style={GlobalStyles.infoText}>100</Text>
                </View>

                <Text style={GlobalStyles.infoText}>{AppStrings.termsPrivacy}</Text>

                <TouchableOpacity onPress={async () => {
                  await AsyncStorage.setItem('USER', JSON.stringify('logout')).then(() => {
                    // navigationMain.replace('AuthStack')

                    // navigation.replace('AuthStack', {
                    //   screen: 'AuthScreen'
                    // })
                    // userData?.setUser({ firstName: 'logout' })


                    UserColRef.doc(user?.id).update({
                      FCMToken: ''
                    })

                    navigation.reset({
                      routes: [{ name: 'AuthStack' }]
                    })

                  })
                }}>
                  <Text style={GlobalStyles.infoText}>{AppStrings.logout}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ position: 'absolute', bottom: wp(2) }}>
              {/* <CustomPrimaryButton title={AppStrings.sendDrop} onPress={() => { }} /> */}
              <Text style={GlobalStyles.infoText} onPress={() => setValue(false)}>Light Mode</Text>
              <Text style={GlobalStyles.infoText} onPress={() => setValue(true)}>Dark Mode</Text>
            </View>
          </View>
      }
    </View>
  )
}

const useStyles = () => {

  const { colors } = useAppSelector(state => state.CommonSlice)
  return StyleSheet.create({
    profileCard: {
      paddingVertical: wp(10),
      // borderWidth: 1,
      borderRadius: wp(5),
      backgroundColor: colors.PROFILE_CARD_BG,
      shadowOpacity: 0.4,
      shadowOffset: {
        height: 25, width: 0
      },
      shadowRadius: 20,
      shadowColor: colors.PROFILE_CARD_SHADOW,
      elevation: 30
    },
    seperator: {
      borderWidth: 1,
      borderColor: colors.PROFILE_CARD_SHADOW
    },
    img: {
      position: 'absolute',
      top: heightPercentageToDP(4),
      // top: wp(25),
      // bottom: wp(130),
      height: wp(35),
      width: wp(35),
      zIndex: 1,
      borderRadius: wp(50),
      // resizeMode: 'cover'
    },
    edit: {
      height: wp(5),
      width: wp(5),
      marginRight: wp(2)
    }
  })

}

export default ProfileScreen