import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/BottomTabScreens/HomeScreen';
import { BottomTabParamList } from '../../types/NavigationTypes/navigationTypes';
import InboxScreen from '../../screens/BottomTabScreens/InboxScreen';
import ProfileScreen from '../../screens/BottomTabScreens/ProfileScreen';
import { Images } from '../../utils/ImagePaths';
import { useGlobalStyles } from '../../styles/GlobalStyles';
import ChatScreen from '../../screens/BottomTabScreens/ChatScreen';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import messaging from '@react-native-firebase/messaging';


const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabbar = () => {

    useEffect(() => {

        // const unsubscribe = messaging().onMessage(async remoteMessage => {
        //     console.log("BottomTabbar remoteMessage : ", remoteMessage)

        //     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        // });

        // return unsubscribe;
    }, []);



    const GlobalStyles = useGlobalStyles()
    const { colors } = useAppSelector(state => state.CommonSlice)

    return (
        <Tab.Navigator initialRouteName='HomeScreen' screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { backgroundColor: colors.PRIMARY_BG }
        }}>
            <Tab.Screen name='HomeScreen' component={HomeScreen} options={{
                // tabBarLabel: 'Home',
                tabBarIcon: ({ focused }) =>
                    <Image
                        source={focused ? Images.homeSelectedIcon : Images.homeIcon}
                        style={GlobalStyles.tabIcon}
                    />
            }} />
            <Tab.Screen name='ChatScreen' component={ChatScreen} options={{
                // tabBarLabel: 'Chat',
                tabBarIcon: ({ focused }) =>
                    <Image
                        source={focused ? Images.chatSelectedIcon : Images.chatIcon}
                        style={GlobalStyles.tabIcon}
                    />
            }} />
            <Tab.Screen name='InboxScreen' component={InboxScreen} options={{
                // tabBarLabel: 'Inbox',
                tabBarIcon: ({ focused }) =>
                    <Image
                        source={focused ? Images.inboxSelectedIcon : Images.inboxIcon}
                        style={GlobalStyles.tabIcon}
                    />
            }} />
            <Tab.Screen name='ProfileScreen' component={ProfileScreen} options={{
                // tabBarLabel: 'Profile',
                tabBarIcon: ({ focused, size }) =>
                    <Image
                        source={focused ? Images.profileSelectedIcon : Images.profileIcon}
                        style={GlobalStyles.tabIcon}
                    />
            }} />
        </Tab.Navigator>
    )
}



export default BottomTabbar