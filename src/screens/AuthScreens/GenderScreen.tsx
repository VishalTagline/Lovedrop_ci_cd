import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useGlobalStyles } from '../../styles/GlobalStyles';
import CustomHeader from '../../components/CustomHeader';
import { useCustomNavigation } from '../../navigation/hooks/useCustomNavigation';
import { AppStrings } from '../../utils/AppStrings';
import CustomSecondarybutton from '../../components/CustomSecondarybutton';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { AuthRouteProps } from '../../types/NavigationTypes/navigationTypes';
import { UserColRef } from '../../utils/Firebase/constants';
import { genderList } from '../EditProfileScreen';


const genders = [
    AppStrings.male,
    AppStrings.female,
    AppStrings.other,
]

const GenderScreen = () => {

    const [selectedIndex, setselectedIndex] = useState(-1);
    const [disabled, setdisabled] = useState(true);
    const [gender, setgender] = useState({
        label: '', value: ''
    });
    const { navigation } = useCustomNavigation('AuthStack');
    const route = useRoute<AuthRouteProps<'GenderScreen'>>()
    const GlobalStyles = useGlobalStyles()
    const styles = useStyles()
    const { colors } = useAppSelector(state => state.CommonSlice)

    const data = route.params?.data
    // console.log('data : ', data)

    return (
        <View style={GlobalStyles.mainContainer}>
            <CustomHeader
                back
                onPress={() => {
                    navigation.goBack();
                }}
            />

            <View style={GlobalStyles.formHeaderContainer}>
                <Text style={GlobalStyles.formHeader}>{AppStrings.iam}</Text>
                {
                    genderList.map((item, index) =>
                        <TouchableWithoutFeedback onPress={() => {
                            setselectedIndex(index)
                            setgender(item)
                        }} >
                            <View style={index !== selectedIndex ? styles.btn : styles.selectedBtn}>
                                <Text style={index !== selectedIndex ? styles.txt : styles.selectedTxt}>{item.label}</Text>
                            </View>
                        </TouchableWithoutFeedback>)
                }
                {/* <CustomSecondarybutton title={AppStrings.male} onPress={() => { }} />
                <CustomSecondarybutton title={AppStrings.female} onPress={() => { }} />
                <CustomSecondarybutton title={AppStrings.other} onPress={() => { }} /> */}

            </View>
            <View style={GlobalStyles.floatingBtnContainer}>
                <CustomSecondarybutton
                    disabled={selectedIndex !== -1 ? false : true}
                    title={AppStrings.getStared}
                    onPress={() => {
                        const DATA = { ...data, gender: gender, image: '' }
                        // console.log('Data : ', DATA)


                        UserColRef
                            .doc(DATA.id)
                            .set(DATA)
                            .then(() => {
                                // console.log('User added!');
                                // Alert.alert('User added!')
                            });

                        // AsyncStorage.setItem('USER', JSON.stringify(DATA)).then(() => {
                        AsyncStorage.setItem('USER', JSON.stringify({ id: DATA.id })).then(() => {

                            // navigation.navigate('WelcomeScreen')
                            navigation.navigate('AuthStack', {
                                screen: 'WelcomeScreen'
                            })

                        })

                    }}
                />
            </View>
        </View>
    )
}

export default GenderScreen


const useStyles = () => {

    const GlobalStyles = useGlobalStyles()
    const { colors } = useAppSelector(state => state.CommonSlice)


    return StyleSheet.create({
        btn: {
            ...GlobalStyles.btn, width: wp(70), borderColor: colors.LIGHT_TEXT
        },
        selectedBtn: {
            ...GlobalStyles.btn, width: wp(70),
        },
        txt: {
            ...GlobalStyles.btnText,
            color: colors.LIGHT_TEXT
        },
        selectedTxt: GlobalStyles.btnText
    })
}
