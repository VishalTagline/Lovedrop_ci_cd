import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/RootStack/RootStack';
import Test from './src/screens/Test';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor={'transparent'} />
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <NavigationContainer>
        <RootStack />
        {/* <Test /> */}
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </Provider>
  );
};

export default App;
