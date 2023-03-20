import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomSecondarybutton from '../../components/CustomSecondarybutton';
import { AppStrings } from '../../utils/AppStrings';
import CustomTextInput from '../../components/CustomTextInput';
import { useCustomAuthNavigation } from '../../navigation/hooks/useCustomNavigation';
import { useGlobalStyles } from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontSizes } from '../../utils/Fontsizes';
import { useAppSelector } from '../../redux/Store';
import { useFormik } from 'formik';
import * as Yup from "yup";


const FirstNameScreen = () => {

  const [name, setname] = useState('');
  const [nameError, setnameError] = useState('');
  const [disabled, setdisabled] = useState(true);
  const { navigation, route } = useCustomAuthNavigation('FirstNameScreen');
  const GlobalStyles = useGlobalStyles()
  const { colors } = useAppSelector(state => state.CommonSlice);

  const data = route.params?.data
  console.log('data : ', data)


  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object().shape({
      name: Yup
        .string()
        .trim()
        .required(AppStrings.nameRequied)
        .min(3, AppStrings.nameMin)
        .matches(/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/, AppStrings.nameError)
    }),
    onSubmit: val => {
      console.log(val)
      formik.resetForm()
      if (!formik.errors.name) {
        navigation.navigate('BirthdayScreen', {
          data: {
            ...data,
            firstName: formik.values.name
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
          <Text style={GlobalStyles.formHeader}>{AppStrings.myFirstName}</Text>
          <CustomTextInput
            placeholder={AppStrings.firstName}
            value={formik.values.name}
            onChangeText={
              formik.handleChange('name')
              //   val => {
              //   if (val != '') {
              //     setdisabled(false)
              //   } else {
              //     setdisabled(true)
              //   }
              //   setname(val);
              // }
            }
          />
          {formik.touched.name && formik.errors.name ? <Text style={GlobalStyles.errorText}>{formik.errors.name}</Text> : null}
          <Text style={{ ...GlobalStyles.infoText, color: colors.LIGHT_TEXT }}>
            {AppStrings.youWillNotable}
          </Text>
        </View>
        <View style={GlobalStyles.floatingBtnContainer}>
          <CustomSecondarybutton
            // disabled={disabled}
            disabled={formik.values.name.length == 0 ? true : false}
            title={AppStrings.continue}
            onPress={
              formik.handleSubmit
              //   () => {
              //   if (!name) {
              //     setnameError(AppStrings.nameError)
              //   } else {
              //     navigation.navigate('BirthdayScreen')
              //   }
              // }
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default FirstNameScreen

const styles = StyleSheet.create({})