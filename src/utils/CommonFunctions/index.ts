import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { AppStrings } from "../AppStrings";



export const getUserData = async () => {

    const data = await AsyncStorage.getItem('USER')
    let user = data && JSON.parse(data)

    // console.log('USER : ', user)

    if (user == null) {
        await AsyncStorage.setItem('USER', JSON.stringify('logout'));
        user = await AsyncStorage.getItem('USER');
        // console.log(user)
        user = user && JSON.parse(user)
        // console.log('USER  if (user == null) : ', user)
        return user
    } else {
        return user
    }
}



export const RequestContacts = async () => {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Ok'
    })
    // console.log("granted ; ", granted)
    return granted
}

const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                // {
                //     title: 'External Storage Write Permission',
                //     message: 'App needs write permission',
                // },
            );
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            // Alert.alert('Write permission err', err);
        }
        return false;
    } else return true;
};

export const ChooseImageFromGallery = async () => {
    // try {
    //     await launchImageLibrary({ mediaType: 'photo' }, res => {
    //         if (res.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (res.errorMessage) {
    //             console.log('ImagePicker Error: ', res.errorMessage);
    //         } else {
    //             console.log(res.assets);
    //         }
    //     });
    // } catch (error) {
    //     Alert.alert('Profile', error);
    // }

    try {
        launchImageLibrary({
            mediaType: 'photo'
        }, (response) => {
            // console.log(response)
            // if (response.didCancel) {
            //     Alert.alert(AppStrings.appName, 'Image selection canceled !')
            //     return
            // } else if (response.errorCode) {
            //     Alert.alert(AppStrings.appName, response.errorCode)
            //     return
            // } else if (response.errorMessage) {
            //     Alert.alert(AppStrings.appName, response.errorMessage)
            //     return
            // } else {
            //     return response.assets
            // }
            return response
        })
    } catch (error) {
        console.log("error : ", error)
    }
}