import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomHeader from '../../components/CustomHeader';
import { useGlobalStyles } from '../../styles/GlobalStyles';
import { useCustomNavigation } from '../../navigation/hooks/useCustomNavigation';
import CustomSecondarybutton from '../../components/CustomSecondarybutton';
import { AppStrings } from '../../utils/AppStrings';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontSizes } from '../../utils/Fontsizes';
import CustomOTPInput from '../../components/CustomOTPInput';
import { useAppSelector } from '../../redux/Store';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthRouteProps } from '../../types/NavigationTypes/navigationTypes';
import { useRoute } from '@react-navigation/native';
import { UserColRef } from '../../utils/Firebase/constants';
// import { UserContext } from '../../navigation/RootStack/RootStack';




const OTPCodeScreen = () => {

  // const userData=useContext(UserContext)

  const [otp, setotp] = useState('');
  const [otpError, setotpError] = useState('');
  const [disabled, setdisabled] = useState(true);
  const { navigation } = useCustomNavigation('AuthStack');
  const route = useRoute<AuthRouteProps<'OTPCodeScreen'>>();
  // const { navigationMain } = useCustomNavigation('AuthStack');
  const GlobalStyles = useGlobalStyles()
  const { colors } = useAppSelector(state => state.CommonSlice);

  // const formik = useFormik({
  //   initialValues: {
  //     otp: ''
  //   },
  //   validationSchema: Yup.object().shape({
  //     otp: Yup
  //       .string()
  //       .trim()
  //       .required(AppStrings.otpError)
  //       .matches(/^\d{6}$/, AppStrings.otpError)

  //   }),
  //   onSubmit: (val) => console.log('onsubmit : ', val),
  // })


  // console.log(route.params?.number);

  const [confirm, setconfirm] = useState<FirebaseAuthTypes.ConfirmationResult | undefined>();
  let number = route.params?.data.phoneNumber;
  // let confirm = route.params?.data.confirm;

  // console.log('route.params : ', route.params)



  useEffect(() => {
    setotp('')
    setotpError('')
    setconfirm(route.params?.data.confirm)
  }, []);


  const verifyOTP = async (OTP: string) => {
    try {
      const res = await confirm?.confirm(OTP);
      // console.log('otp result : ', res);
      // console.log('USER : ', res?.user);

      const data = await UserColRef.doc(res?.user.uid).get()
      console.log("isExists  : ", data.exists)




      if (data.exists) {
        // Alert.alert('datadata : ' + data.data())
        console.log('datadata : ' + JSON.stringify(data.data()))

        AsyncStorage.setItem('USER', JSON.stringify({ id: data.data()?.id })).then(() => {
          // let userdata=data.data()
          // userData?.setUser(userdata)
          // navigationMain.replace('HomeScreen')

          navigation.replace('Home', {
            screen: 'HomeScreen'
          })

        })

      } else {

        // navigation.navigate('EmailScreen', {
        //   data: {
        //     phoneNumber: number,
        //     id: res?.user.uid
        //   }
        // });

        navigation.navigate('AuthStack', {
          screen: 'EmailScreen',
          params: {
            data: {
              phoneNumber: number,
              id: res?.user.uid
            }
          }
        })
      }

    } catch (error: any) {
      console.log('ERROR : : ', { error });
      if (error.code == 'auth/invalid-verification-code') {
        Alert.alert(AppStrings.appName, 'Invalid OTP code.')
      } else if (error.userInfo) {
        Alert.alert('Signin', error.userInfo.message);
      } else {
        Alert.alert('Signin', 'Something went wrong !');
      }
    }
  };

  // console.log(formik.values.otp)

  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader
        back
        onPress={() => {
          navigation.goBack();
          // navigation.navigate('MobileNumberScreen');
          // navigation.navigate('AuthStack',{
          //   screen:'MobileNumberScreen'
          // })

        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'height' : 'padding'}
        style={{ flex: 1 }}>
        <View style={GlobalStyles.formHeaderContainer}>
          <Text style={GlobalStyles.formHeader}>{AppStrings.myCode}</Text>
          <Text
            style={{
              ...GlobalStyles.infoText,
              color: colors.LIGHT_TEXT,
            }}>
            {number}{' '}
            {/* <TouchableOpacity onPress={async () => {
              confirm = await auth().signInWithPhoneNumber(number)
            }}> */}
            <Text style={{ color: colors.PRIMART_TEXT }}
              onPress={async () => {
                let res = number && await auth().signInWithPhoneNumber(number)
                res && setconfirm(res)
              }}>
              {AppStrings.resend}
            </Text>
            {/* </TouchableOpacity> */}
          </Text>

          <CustomOTPInput
            value={otp}
            onChangeText={
              // formik.handleChange('otp')
              (val) => {
                // console.log('otp : ', val)
                // if (val != '') {
                //   setdisabled(false)
                // } else {
                //   setdisabled(true)
                // }

                if (val.length < 6) {
                  // console.log('length :', val.length)
                  setdisabled(true)
                } else {
                  setdisabled(false)
                }

                setotp(val)
              }
            } />
          <Text style={GlobalStyles.errorText}>{otpError}</Text>
        </View>
        <View style={GlobalStyles.floatingBtnContainer}>

          <CustomSecondarybutton
            disabled={disabled}
            title={AppStrings.continue}
            onPress={
              () => {
                // formik.handleSubmit()
                // console.log(otp);
                let reg = /^\d+$/
                if (!otp || !reg.test(otp)) {
                  setotpError(AppStrings.otpError);
                } else {
                  setotpError('');
                  verifyOTP(otp)
                  // navigation.navigate('EmailScreen');
                }
              }
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default OTPCodeScreen

const styles = StyleSheet.create({})