import { View, Text, ScrollView, StyleSheet, RefreshControl, Alert, PermissionsAndroid, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalStyles } from '../../styles/GlobalStyles'
import GradiantHeader from '../../components/GradiantHeader'
import CustomTextInput from '../../components/CustomTextInput'
import { AppStrings } from '../../utils/AppStrings'
import { useAppSelector } from '../../redux/Store'
import CustomSearchField from '../../components/CustomSearchField'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CustomPhoneNumberField from '../../components/CustomPhoneNumberField'
import CustomPrimaryButton from '../../components/CustomPrimaryButton'
import { useCustomNavigation } from '../../navigation/hooks/useCustomNavigation'
import { Dropdown } from 'react-native-element-dropdown';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { RequestContacts, getUserData } from '../../utils/CommonFunctions'
import { UserColRef } from '../../utils/Firebase/constants'
import Contacts from 'react-native-contacts';
import CustomContactFlatList from '../../components/CustomContactFlatList'
import LinearGradient from 'react-native-linear-gradient'
import MaskedView, { MaskedViewComponent } from '@react-native-masked-view/masked-view';
import messaging from '@react-native-firebase/messaging';

// import { UserContext } from '../navigation/RootStack/RootStack'


const dropdownData = [
  { label: 'I have a crush on', value: '1' },
  { label: 'I am in love with', value: '2' },
  { label: 'I really appreciate', value: '3' }
];



const HomeScreen = () => {

  // const userData: userType = useContext(UserContext);
  // const [user, setuser] = useState<userType>({});
  // const [contactList, setcontactList] = useState<Contacts.Contact[]>([]);
  const [name, setname] = useState('');
  const [number, setnumber] = useState('');
  const [isRefresh, setisRefresh] = useState(false);
  const [loading, setloading] = useState(true);
  const [userList, setuserList] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
  const [finalContactList, setfinalContactList] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
  const GlobalStyles = useGlobalStyles()
  const styles = useStyles()
  const { colors } = useAppSelector(state => state.CommonSlice)

  const { navigation } = useCustomNavigation('Home')



  useEffect(() => {
    // navigation.addListener('focus', () => {
    // getUserList()
    // reqestPermission()
    // })
    // console.log("userData : : home : : ", userData)
    // getUserList()

    reqestPermission()
    getFCMToken()




  }, []);


  const getFCMToken = async () => {
    const usr = await getUserData()
    // console.log(usr)
    messaging().getToken().then(tkn => {
      console.log('TOKEN : ', tkn)
      UserColRef.doc(usr.id).update({
        FCMToken: tkn
      })
    })
  }

  // const getUserList = async () => {
  //   console.log("getUserList : ")

  //   const usr = await getUserData()
  //   console.log(usr)
  //   // setuser(usr)

  //   UserColRef.onSnapshot((qeurySnapshot) => {
  //     console.log(qeurySnapshot.docs)
  //     let list: FirebaseFirestoreTypes.DocumentData[] = []
  //     qeurySnapshot.forEach(documentSnapshot => {
  //       // console.log('User : ', documentSnapshot.data())
  //       if (documentSnapshot.data().id != usr.id) {
  //         list.push(documentSnapshot.data())
  //       }
  //     })
  //     console.log('list length : : ', list.length)
  //     setuserList(list)
  //     reqestPermission()
  //     setisRefresh(false)
  //   });
  // }


  const reqestPermission = () => {
    // console.log("reqestPermission : ")
    if (Platform.OS == 'android') {
      RequestContacts().then((granted) => {
        // console.log(granted)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getContactList()
        } else {
          Alert.alert(AppStrings.appName, 'Permission to access contacts was denied');
          console.warn('Permission to access contacts was denied');
        }
      })
    } else if (Platform.OS == 'ios') {
      Contacts.checkPermission().then(permission => {
        // console.log(permission)
        if (permission === 'undefined') {
          Contacts.requestPermission().then(permission => {
            console.log('Request permission : ', permission)
            if (permission === 'authorized') {
              getContactList()
            }
          })
        } else if (permission === 'authorized') {
          getContactList()
        } else if (permission === 'denied') {
          Alert.alert(AppStrings.appName, 'Permission to access contacts was denied',);
          console.warn('Permission to access contacts was denied');
          setisRefresh(false)
        }
      })
    }
    setisRefresh(false)
  }

  const getContactList = async () => {
    // console.log("getUserList : ")

    let userlist: FirebaseFirestoreTypes.DocumentData[] = []

    const usr = await getUserData()
    // console.log(usr)
    // setuser(usr)
    UserColRef.onSnapshot((qeurySnapshot) => {
      // console.log(qeurySnapshot.docs)
      // let list: FirebaseFirestoreTypes.DocumentData[] = []
      qeurySnapshot.forEach(documentSnapshot => {
        console.log('UserColRef documentSnapshot  : ', documentSnapshot.data())
        console.log('userlist : ', userlist)
        if (documentSnapshot.data().id != usr.id) {
          if (userlist.length) {
            let temp = userlist.some(item => item.id == documentSnapshot.data().id)
            if (!temp) {
              userlist.push(documentSnapshot.data())
            }
            // userlist.forEach(item => {
            //   if (item.id !== documentSnapshot.data().id) {
            //     userlist.push(documentSnapshot.data())
            //   }
            // })
          } else {
            userlist.push(documentSnapshot.data())
          }
        }
      })
      console.log('list length : : ', userlist.length)
      if (userlist.length) {
        // console.log("getContactList :")
        Contacts.getAll()
          .then(contacts => {
            let finalList: FirebaseFirestoreTypes.DocumentData[][] = []
            // console.log("contacts : ", contacts)
            // setcontactList(contacts)
            contacts.forEach((val) => {
              // console.log(val.phoneNumbers)
              val.phoneNumbers.forEach((val) => {
                // console.log('Number : ', val.number)
                let num = val.number.replace(/[-\(\)\s]/g, '')
                // console.log('Formated Number : ', num)

                let list = userlist.filter((val) => val.phoneNumber == num)
                if (list.length !== 0) {
                  // console.log('list : : ', list)
                  finalList = finalList.concat(list)
                }
              })
              // console.log('FINAL LIST : ', finalList)
              setfinalContactList(finalList)
              setloading(false)
            })
          })
          .catch(e => {
            Alert.alert(AppStrings.appName, 'Permission to access contacts was denied',);
            console.warn('Permission to access contacts was denied');
          });
      }
    });

    setisRefresh(false)
    setloading(false)
  }

  return (
    <View style={GlobalStyles.mainContainer}>
      <GradiantHeader />
      {
        // isProfile
        //   ? <ProfileScreen />
        //   : isInbox
        //     ? <InboxScreen />
        //     :

        loading ? <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }} /> :
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefresh}
                onRefresh={() => {
                  // getUserList()
                  // getContactList()
                  reqestPermission()
                }}
              />
            }
          >
            <View style={styles.mainContainer}>
              <Dropdown
                style={styles.dropdownContainer}
                containerStyle={{ backgroundColor: colors.PRIMARY_BG }}
                itemTextStyle={GlobalStyles.dropdownText}
                selectedTextStyle={GlobalStyles.dropdownText}
                itemContainerStyle={{ backgroundColor: colors.PRIMARY_BG }}
                data={dropdownData}
                labelField='label'
                onChange={(val) => {
                  console.log(val)
                }}
                valueField='value'
              />
              <CustomTextInput
                placeholder={AppStrings.firstName}
                value={name}
                onChangeText={setname}
                background={colors.HOME_INPUT_BG}
              />
              <View style={styles.contactContainer}>
                <Text style={GlobalStyles.infoSubTitle}>{AppStrings.byContact}</Text>
                <CustomSearchField />
                {/* <FlatList
                // data={contactList}
                data={finalContactList}
                ItemSeparatorComponent={itemSeparatorComponent}
                renderItem={({ item }) => {

                  // console.log('name', item.givenName)

                  return (

                    <ContactCard item={item} />
                  )
                }
                }
              /> */}
                <CustomContactFlatList
                  data={finalContactList}
                />
                <Text style={GlobalStyles.infoSubTitle}>{AppStrings.orAddByPhoneNumber}</Text>
                <CustomPhoneNumberField onChangeText={setnumber} value={number} />
              </View>
              <CustomPrimaryButton title={AppStrings.sendDrop} onPress={() => { }} />
            </View>
          </ScrollView>
      }
    </View >
  )
}


const useStyles = () => {

  const { colors } = useAppSelector(state => state.CommonSlice)

  return StyleSheet.create({
    mainContainer: {
      padding: wp(8)
    },
    contactContainer: {
      marginVertical: wp(5)
    },
    dropdownContainer: {
      backgroundColor: colors.HOME_INPUT_BG,
      padding: wp(2)
    }
  })
}


export default HomeScreen

{/* <MaskedView
    // style={{ flex: 1, flexDirection: 'row', height: size }}
      maskElement={
        <View
          style={{
            // backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
            // height: 60,
          }}>
          <Text style={{ alignSelf: 'center' }}>
            {AppStrings.sendNote}
          </Text>
        </View>
      }>
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      colors={[colors.PRIMARY_COLOR, colors.SECONDARY_COLOR]}
      style={{
        flex: 1,
        height: '100%',
      }}
    />
  </MaskedView> */}



{/* <LinearGradient colors={[colors.PRIMARY_COLOR, colors.SECONDARY_COLOR]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
    >
        <Text style={{ alignSelf: 'center' }}>
           {AppStrings.sendNote}
        </Text>
    </LinearGradient> */}