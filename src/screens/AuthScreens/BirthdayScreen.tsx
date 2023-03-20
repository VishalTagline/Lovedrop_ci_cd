import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../../components/CustomHeader';
import { useGlobalStyles } from '../../styles/GlobalStyles';
import { useCustomAuthNavigation } from '../../navigation/hooks/useCustomNavigation';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontSizes } from '../../utils/Fontsizes';
import { AppStrings } from '../../utils/AppStrings';

import CustomTextInput from '../../components/CustomTextInput';
import CustomSecondarybutton from '../../components/CustomSecondarybutton';
import CustomDateInput from '../../components/CustomDateInput';
import { useFormik } from 'formik';
import * as Yup from "yup";

const BirthdayScreen = () => {

  const [date, setdate] = useState('');
  const [disabled, setdisabled] = useState(true);

  const { navigation, route } = useCustomAuthNavigation('BirthdayScreen');

  const GlobalStyles = useGlobalStyles()

  const data = route.params?.data
  console.log('data : ', data)

  // const formik = useFormik({
  //   initialValues: {
  //     date: ''
  //   },
  //   validationSchema: Yup.object().shape({
  //     date: Yup
  //       .date()
  //       .required(AppStrings.dateRequied)
  //       .min('1900-01-01', AppStrings.dateError)
  //       .max(new Date(), AppStrings.dateError)
  //       .transform((value, originalValue) => {
  //         console.log('value : ', value)
  //         console.log('originalValue : ', originalValue)
  //         console.log(new Date(value).getDate())
  //         const date = new Date(value).getDate()
  //         const month = new Date(value).getMonth() + 1
  //         const year = new Date(value).getFullYear()
  //         console.log('yyyy-mm-dd : ' + year + '-' + month + '-' + date)
  //         return year + '-' + month + '-' + date
  //       })
  //   }),
  //   onSubmit: val => {
  //     console.log(val.date)
  //   }
  // })

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
          <Text style={GlobalStyles.formHeader}>{AppStrings.birthDate}</Text>
          <CustomDateInput
            onChangeText={
              // formik.handleChange('date')
              (val) => {
                if (val != '') {
                  setdisabled(false)
                } else {
                  setdisabled(true)
                }
                setdate(val)
              }
            } />
          {/* {formik.touched.date && formik.errors.date ? <Text style={GlobalStyles.errorText}>{formik.errors.date}</Text> : null} */}
        </View>
        <View style={GlobalStyles.floatingBtnContainer}>
          <CustomSecondarybutton
            disabled={disabled}
            // disabled={formik.values.date.length == 0 ? true : false}
            title={AppStrings.continue}
            onPress={
              // formik.handleSubmit
              () => {
                navigation.navigate('GenderScreen', {
                  data: {
                    ...data,
                    birthDate: date
                  }
                })
              }
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default BirthdayScreen

const styles = StyleSheet.create({})