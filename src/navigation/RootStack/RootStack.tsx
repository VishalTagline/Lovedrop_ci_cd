import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/NavigationTypes/navigationTypes';
import HomeScreen from '../../screens/HomeScreen';
import InboxScreen from '../../screens/InboxScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import AuthStack from '../AuthStack/AuthStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="InboxScreen" component={InboxScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default RootStack