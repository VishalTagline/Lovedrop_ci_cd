import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useGlobalStyles } from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import { useCustomAuthNavigation } from '../../navigation/hooks/useCustomNavigation';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontSizes } from '../../utils/Fontsizes';
import { AppStrings } from '../../utils/AppStrings';
import CustomSecondarybutton from '../../components/CustomSecondarybutton';
import CustomTextInput from '../../components/CustomTextInput';
import { useAppSelector } from '../../redux/Store';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EmailScreen = () => {
  const [email, setemail] = useState('');
  const [emailError, setemailError] = useState('');
  const [disabled, setdisabled] = useState(true);
  const { navigation, route } = useCustomAuthNavigation('EmailScreen');
  const GlobalStyles = useGlobalStyles()
  const { colors } = useAppSelector(state => state.CommonSlice);

  const data = route.params?.data
  console.log('data :  ', data)

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup
        .string()
        .trim()
        .email(AppStrings.emailError)
        .required(AppStrings.emailRequied)
        .matches(/^\w+([\..-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/, AppStrings.emailError)
    }),
    onSubmit: val => {
      console.log(val)
      formik.resetForm()
      if (!formik.errors.email) {
        console.log('done ')
        navigation.navigate('FirstNameScreen', {
          data: {
            ...data,
            email: formik.values.email
          }
        })
      }
    }
  })


  return (
    <View style={GlobalStyles.mainContainer}>
      <CustomHeader
        back
        onPress={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'height' : 'padding'}
        style={{ flex: 1 }}>
        <View style={GlobalStyles.formHeaderContainer}>
          <Text style={GlobalStyles.formHeader}>{AppStrings.whatsYourEmail}</Text>
          <Text style={{ ...GlobalStyles.infoText, color: colors.LIGHT_TEXT }}>
            {AppStrings.dontLoseAccess}
          </Text>
          <CustomTextInput
            placeholder={AppStrings.enterEmail}
            value={formik.values.email}
            onChangeText={
              formik.handleChange('email')
              // val => {
              //   if (val != '') {
              //     setdisabled(false)
              //   } else {
              //     setdisabled(true)
              //   }
              //   setemail(val);
              // }
            }
          />
          {formik.touched.email && formik.errors.email ? <Text style={GlobalStyles.errorText}>{formik.errors.email}</Text> : null}
        </View>
        <View style={GlobalStyles.floatingBtnContainer}>
          <CustomSecondarybutton
            disabled={formik.values.email.length == 0}
            // disabled={formik.errors.email ? true : false}
            // disabled={disabled}
            title={AppStrings.continue}
            onPress={
              formik.handleSubmit
              // () => {
              //   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
              //   if (!reg.test(email)) {
              //     setemailError(AppStrings.emailError)
              //   } else {
              //     navigation.navigate('FirstNameScreen')
              //   }
              // }
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({});
