import { View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalStyles } from '../styles/GlobalStyles'
import GradiantHeader from '../components/GradiantHeader'
import { Images } from '../utils/ImagePaths'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CustomTextInput from '../components/CustomTextInput'
import { AppStrings } from '../utils/AppStrings'
import { getUserData } from '../utils/CommonFunctions'
import { userType } from '../types/UserTypes/usertype'
import CustomPrimaryButton from '../components/CustomPrimaryButton'
import CustomPhoneNumberField from '../components/CustomPhoneNumberField'
import { UserColRef, getFirebaseuserData } from '../utils/Firebase/constants'
import CustomDateInput from '../components/CustomDateInput'
import { Asset, launchImageLibrary } from 'react-native-image-picker'
import { Dropdown } from 'react-native-element-dropdown'
import storage from '@react-native-firebase/storage';
import { useAppSelector } from '../redux/Store'

export const genderList = [
    { label: AppStrings.male, value: '1' },
    { label: AppStrings.female, value: '2' },
    { label: AppStrings.other, value: '3' }
];

const EditProfileScreen = () => {

    const GlobalStyles = useGlobalStyles()
    const { colors } = useAppSelector(state => state.CommonSlice)

    const [phoneNumber, setphoneNumber] = useState('');
    const [id, setid] = useState('');
    const [firstName, setfirstName] = useState('');
    const [email, setemail] = useState('');
    const [birthDate, setbirthDate] = useState('');
    const [gender, setgender] = useState({
        label: '',
        value: ''
    });
    const [img, setimg] = useState('');
    const [img_url, setimg_url] = useState('');
    const [loading, setloading] = useState(true);

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        getUserData().then(async (usr) => {
            // console.log("usr : ", usr)

            let userData = (await getFirebaseuserData(usr.id)).data()
            // console.log('user data : ', userData)

            setphoneNumber(userData?.phoneNumber)
            setid(userData?.id)
            setfirstName(userData?.firstName)
            setemail(userData?.email)
            setbirthDate(userData?.birthDate)
            setgender(userData?.gender)
            setimg(userData?.image)
            setimg_url(userData?.image)
            setloading(false)
        }
        )

        // storage().ref(img).getDownloadURL().then(url => {
        //     console.log(url)
        //     setimg_url(url)
        // })

    }

    const ChooseImageFromGallery = () => {
        // try {
        let res
        launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1
        }, (response) => {
            res = response.assets
            // return response.assets

        })
        // } catch (error) {
        // console.log("error : ", error)
        // }
        return res
    }

    return (
        <View style={GlobalStyles.mainContainer}>
            <GradiantHeader back />
            {
                loading ? <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }} />
                    :
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    >
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <View >
                                <Image source={
                                    img ? { uri: img_url } :
                                        Images.noProfile
                                } style={{
                                    height: wp(35),
                                    width: wp(35),
                                    borderRadius: wp(50),
                                    alignSelf: 'center',
                                    marginTop: wp(5)
                                }} />
                                <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', bottom: wp(0), right: wp(32) }}
                                    onPress={async () => {
                                        //  ChooseImageFromGallery()
                                        let res = await launchImageLibrary({
                                            mediaType: 'photo',
                                            selectionLimit: 1
                                        },)
                                        console.log(res)
                                        if (res.assets) {
                                            let assets: Asset = res.assets[0]
                                            // if (res.assets[0].uri && res.assets[0].fileName){

                                            // setimg_url(res.assets[0].uri)
                                            // setimg(res.assets[0].fileName)
                                            // let url = res.assets[0].uri
                                            storage().ref(id + assets.fileName)
                                                .putFile(assets.uri ? assets.uri : '')
                                                .then((a) => { console.log(a) })
                                                .then(() => {
                                                    storage()
                                                        .ref(id + assets.fileName)
                                                        .getDownloadURL()
                                                        .then(url => {
                                                            // console.log('url : ', url)
                                                            setimg_url(url)
                                                            setimg(url)
                                                        })
                                                });
                                            // }
                                        }
                                    }}
                                >
                                    <Image source={Images.add} style={{
                                        height: wp(12),
                                        width: wp(12),
                                    }} />
                                </TouchableOpacity>
                            </View>
                            {/* <CustomPrimaryButton onPress={() => {
                        console.log(img)
                        storage().ref(img)
                            // .getDownloadURL().then(val => console.log(val))
                            .putFile(img_url).then((a) => {
                                console.log(a)
                            }).then(() => {
                                storage()
                                    .ref(img)
                                    .getDownloadURL()
                                    .then(url => {
                                        console.log('url : ', url)
                                        setimg_url(url)
                                    })
                            });
                    }} title='Upload image' /> */}
                            <CustomTextInput
                                // editable={false}
                                onChangeText={(val) => {
                                    setfirstName(val)

                                }}
                                value={firstName}
                                placeholder={AppStrings.firstName}
                            />
                            <CustomTextInput
                                onChangeText={(val) => {
                                    setemail(val)

                                }}
                                value={email}
                                placeholder={AppStrings.enterEmail}
                            />
                            {/* <CustomTextInput
                        onChangeText={(val) => {
                            setbirthDate(val)

                        }}
                        value={birthDate}
                        placeholder={'enter date'}
                    /> */}
                            <CustomDateInput
                                value={birthDate}
                                onChangeText={(val) => {
                                    setbirthDate(val)
                                }}
                            />
                            <Dropdown
                                itemTextStyle={GlobalStyles.inputText}
                                selectedTextStyle={GlobalStyles.inputText}
                                // containerStyle={{ backgroundColor: 'red' }}
                                itemContainerStyle={{ backgroundColor: colors.PRIMARY_BG }}
                                // selectedTextProps={{ style: { color: 'red' } }}
                                data={genderList}
                                style={{ margin: wp(3) }}
                                placeholder={'Choose Your Gender'}
                                labelField='label'
                                valueField='value'
                                value={gender}
                                onChange={(val) => {
                                    // console.log(val)
                                    setgender(val)
                                }}
                            />
                            {/* <CustomTextInput
                        onChangeText={(val) => {
                            setgender(val)

                        }}
                        value={gender}
                        placeholder={'enter gender'}
                    /> */}
                            {/* <CustomPhoneNumberField
                        value={phoneNumber}
                        onChangeText={() => { }}
                    /> */}

                            <CustomPrimaryButton title={AppStrings.updateProfile} onPress={() => {
                                let DATA = {
                                    birthDate: birthDate,
                                    gender: gender,
                                    email: email,
                                    image: img,
                                }
                                // if (img_url) {
                                //     storage()
                                //         .ref(id + img)
                                //         .putFile(img_url)
                                //         .then(() =>
                                //             storage()
                                //                 .ref(id + img)
                                //                 .getDownloadURL()
                                //                 .then(url => {
                                //                     DATA = { ...DATA, image: url }
                                //                 })
                                //         )
                                // }
                                UserColRef
                                    .doc(id)
                                    .update(DATA)
                                    .then(() => {
                                        // console.log('User updated!');
                                        Alert.alert(AppStrings.appName, 'User updated!')

                                    });
                            }} />
                        </ScrollView>
                    </KeyboardAvoidingView>
            }
        </View>
    )
}

export default EditProfileScreen