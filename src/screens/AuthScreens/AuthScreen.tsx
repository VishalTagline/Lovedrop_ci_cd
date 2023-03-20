import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Images } from '../../utils/ImagePaths';
import { AppStrings } from '../../utils/AppStrings';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useGlobalStyles } from '../../styles/GlobalStyles';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import CustomSecondarybutton from '../../components/CustomSecondarybutton';
import { useCustomAuthNavigation, useCustomNavigation } from '../../navigation/hooks/useCustomNavigation';
import { useAppDispatch } from '../../redux/Store';
import { setTheme } from '../../redux/slice/CommonSlice';

// type NavigationProps=NativeStackNavigationProp<AuthStackParamList,'AuthScreen'>

// type Props = NativeStackScreenProps<AuthStackParamList, 'AuthScreen'>;

const AuthScreen = () => {

  // const navigation = useNavigation<NavigationProps>();
  const { navigation } = useCustomAuthNavigation('MobileNumberScreen');

  const GlobalStyles = useGlobalStyles()
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(false);

  useEffect(() => {
    dispatch(setTheme(value))
  }, [value]);

  return (
    <View style={GlobalStyles.centerContainer}>
      <Image source={Images.logoWithName} resizeMode="contain" style={styles.img} />
      <View style={{ marginVertical: wp(10) }}>
        <Text style={{ ...GlobalStyles.infoText, textAlign: 'center' }}>
          {AppStrings.byTapping}
          <Text style={GlobalStyles.underlinetxt}>{AppStrings.terms}</Text>
          <Text>{AppStrings.learnHow}</Text>
          <Text style={GlobalStyles.underlinetxt}>
            {AppStrings.privacypolicy}
          </Text>
          <Text>{AppStrings.and}</Text>
          <Text style={GlobalStyles.underlinetxt}>
            {AppStrings.cokkiesPolicy}
          </Text>
        </Text>
      </View>
      <CustomPrimaryButton
        title={AppStrings.createAccount}
        onPress={() => {
          navigation.navigate('MobileNumberScreen')
          //  navigation.navigate('MobileNumber');
        }}
      />
      <CustomSecondarybutton
        disabled={false}
        title={AppStrings.signIn}
        onPress={() => {
          navigation.navigate('MobileNumberScreen');
        }}
      />
      <Text style={GlobalStyles.infoText} onPress={() => setValue(false)}>Light Mode</Text>
      <Text style={GlobalStyles.infoText} onPress={() => setValue(true)}>Dark Mode</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: wp(70),
    width: wp(70)
  },
});

export default AuthScreen;
