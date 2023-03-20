import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useAppSelector } from '../redux/Store'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useGlobalStyles } from '../styles/GlobalStyles'
import { AppStrings } from '../utils/AppStrings'
import { Images } from '../utils/ImagePaths'

const GradiantHeader = () => {

    const { colors } = useAppSelector(state => state.CommonSlice)
    const GlobalStyles = useGlobalStyles()
    const styles = useStyles()


    return (
        // <SafeAreaView >
        <LinearGradient
            colors={[colors.PRIMARY_COLOR, colors.SECONDARY_COLOR]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.headerContainer}>
            <Text style={GlobalStyles.headerSubTitle}>{AppStrings.inbox}</Text>
            <Image source={Images.appNameWhite} style={styles.logo} />
            <Text style={GlobalStyles.headerSubTitle}>{AppStrings.profile}</Text>
        </LinearGradient>
        // </SafeAreaView>
    )
}

export default GradiantHeader

const useStyles = () => {

    return StyleSheet.create({
        headerContainer: {
            height: hp(13),
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingTop: hp(5),
            paddingHorizontal: wp(5)
        },
        logo: {
            width: wp(60),
            resizeMode: 'contain',
        }
    })

}

// const styles = 