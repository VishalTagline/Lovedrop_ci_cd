import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CustomHeader from '../../components/CustomHeader';
import { useGlobalStyles } from '../../styles/GlobalStyles';
import { AppStrings } from '../../utils/AppStrings';
import CustomSecondarybutton from '../../components/CustomSecondarybutton';
import { useCustomNavigation } from '../../navigation/hooks/useCustomNavigation';
import CustomPhoneNumberField from '../../components/CustomPhoneNumberField';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import CustomTextInput from '../../components/CustomTextInput';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';


const MobileNumberScreen = () => {

  const [phoneNum, setphoneNum] = useState('');
  const [phoneNumError, setphoneNumError] = useState('');
  const [disabled, setdisabled] = useState(true);
  const [confirm, setconfirm] = useState<FirebaseAuthTypes.ConfirmationResult>();
  // const [confirm, setconfirm] = useState<FirebaseAuthTypes.PhoneAuthListener>();

  const { navigation } = useCustomNavigation('AuthStack');

  const GlobalStyles = useGlobalStyles()

  const formik = useFormik({
    initialValues: {
      phoneNumber: ''
    },
    onSubmit: val => {
      // console.log(val)
      // resetForm()
      // navigation.navigate('OTPCodeScreen', {
      //   number: val.phoneNumber,
      // });
    },
    validationSchema: Yup.object().shape({
      phoneNumber: Yup
        .string()
        .trim()
        .required(AppStrings.phoneRequied)
        .min(10, AppStrings.phoneNumError)
        .matches(/^\+?([0-9]{2})\)?([0-9]{10})$/, AppStrings.phoneNumError)

    })
  })



  useEffect(() => {
    navigation.addListener('focus', () => {
      // setphoneNum('')
      setphoneNumError('')
    })
    // setphoneNum('');
    setphoneNumError('');
  }, []);


  const signinPhoneNumber = async (number: string) => {
    try {

      // const res = auth().verifyPhoneNumber(number)
      // console.log('result of verify Phone Number : ', res);
      // const credential = auth.PhoneAuthProvider.credential((await res).verificationId, '123456');
      // console.log("credential : ", credential)

      // const user = auth().currentUser
      // console.log(user)


      const res = await auth().signInWithPhoneNumber(number, true);
      console.log('result of phone number signin : ', res);
      setconfirm(res);


      navigation.navigate('AuthStack', {
        screen: 'OTPCodeScreen',
        params: {
          data: {
            phoneNumber: number,
            confirm: res,
          },
        },
      })

      // navigation.navigate('OTPCodeScreen', {
      //   // number: number,
      //   // confirm: res
      //   data: {
      //     phoneNumber: number,
      //     confirm: res,
      //   },
      // });

    } catch (error: any) {
      console.log('ERROR : : ', { error });
      if (error.code == 'auth/invalid-phone-number') {
        Alert.alert(AppStrings.appName, 'Invalid Phone number.')
      } else {
        Alert.alert('Signin', 'Something went wrong !');
      }
      // Alert.alert('Signin', error.userInfo.message);
    }
  }


  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader
        back
        onPress={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'height' : 'padding'} style={{ flex: 1 }}>
        {/* <View style={GlobalStyles.formHeaderContainer}>
          <Text style={GlobalStyles.formHeader}>{AppStrings.myNumber}</Text>
          <CustomPhoneNumberField
            value={formik.values.phoneNumber}
            onChangeText={
              formik.handleChange('phoneNumber')
              // (val) => {
              //   if (val != '') {
              //     setdisabled(false)
              //   } else {
              //     setdisabled(true)
              //   }
              //   setphoneNum(val)
              // }
            }
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? <Text style={GlobalStyles.errorText}>{formik.errors.phoneNumber}</Text> : null}
          
          <Text style={GlobalStyles.infoText}>{AppStrings.weWillSendCode}</Text>
        </View>
        <View style={GlobalStyles.floatingBtnContainer}>
          <CustomSecondarybutton
            disabled={formik.values.phoneNumber ? false : true}
            title={AppStrings.continue}
            onPress={() => {
              formik.handleSubmit()
              // console.log(phoneNum);
              // if (formik.values.phoneNumber.length != 10) {
              //   setphoneNumError(AppStrings.phoneNumError);
              // } else {
              //   setphoneNumError('');
              //   navigation.navigate('OTPCodeScreen', {
              //     number: phoneNum,
              //   });
              // }
            }}
          />
        </View> */}

        <Formik
          initialValues={{
            phoneNumber: ''
          }}
          validationSchema={
            Yup.object().shape({
              phoneNumber: Yup
                .string()
                .trim()
                .required(AppStrings.phoneRequied)
                .min(10, AppStrings.phoneNumError)
                .matches(/^\+?([0-9]{2})\)?([0-9]{10})$/, AppStrings.phoneNumError)

            })}
          onSubmit={values => {

            // console.log(values)
            // navigation.navigate('OTPCodeScreen', {
            //   number: values.phoneNumber,
            // });
          }}
        >
          {({ values, errors, setFieldValue, }) => (
            <>
              <View style={GlobalStyles.formHeaderContainer}>

                <Text style={GlobalStyles.formHeader}>{AppStrings.myNumber}</Text>

                <CustomPhoneNumberField
                  value={values.phoneNumber}
                  onChangeText={
                    (val) => {
                      setFieldValue('phoneNumber', val)
                    }
                  }

                />
                {(errors.phoneNumber) ? <Text style={GlobalStyles.errorText}>{errors.phoneNumber}</Text> : null}
                <Text style={GlobalStyles.infoText}>{AppStrings.weWillSendCode}</Text>
              </View>
              <View style={GlobalStyles.floatingBtnContainer}>
                <CustomSecondarybutton
                  disabled={!!errors.phoneNumber || values.phoneNumber.length == 0}
                  // disabled={formik.errors.phoneNumber ? true : false}
                  title={AppStrings.continue}
                  onPress={
                    () => {
                      signinPhoneNumber(values.phoneNumber)
                      // navigation.navigate('OTPCodeScreen', {
                      //   number: values.phoneNumber,
                      // });
                    }
                  }
                />
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   floatingBtnContainer: {alignSelf: 'center', position: 'absolute', bottom: wp(10)},
// });

export default MobileNumberScreen;
