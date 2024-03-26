import React, { createContext, useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/NavigationTypes/navigationTypes';

import AuthStack from '../AuthStack/AuthStack';


import { ActivityIndicator, View } from 'react-native';
import { getUserData } from '../../utils/CommonFunctions';


import BottomTabbar from '../BottomTab/BottomTabbar';
import ChatRoomScreen from '../../screens/ChatRoomScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import messaging from '@react-native-firebase/messaging';

// export type contextType = {
//   User: userType,
//   setUser: React.Dispatch<React.SetStateAction<userType | null>>
// }

// export const UserContext = createContext<contextType | null>(null);

const Stack = createNativeStackNavigator<RootStackParamList>();


const RootStack = () => {

  // const [user, setuser] = useState<userType | null>(null);
  const [user, setuser] = useState(null);


  useEffect(() => {
    getUser()
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log("root stack remoteMessage : ", remoteMessage)
    //   // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    // return unsubscribe;
  }, []);

  const getUser = async () => {
    getUserData().then((val) => {
      // console.log('root val : ', val)
      setuser(val)
    })
  }

  if (user == null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }


  return (
    // <UserContext.Provider value={{ User: user, setUser: setuser }}>
    <Stack.Navigator
      initialRouteName={user == 'logout' ? 'AuthStack' : 'Home'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="Home" component={BottomTabbar} />
      <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />

      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="InboxScreen" component={InboxScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
    </Stack.Navigator>
    // </UserContext.Provider>
  );
}

export default RootStack