import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useAppSelector } from '../redux/Store'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useGlobalStyles } from '../styles/GlobalStyles'
import { AppStrings } from '../utils/AppStrings'
import { Images } from '../utils/ImagePaths'
import { useCustomNavigation } from '../navigation/hooks/useCustomNavigation'

interface Props {
    title?: React.ReactNode,
    // leftTitle?: string,
    // rightTitle?: string,
    // onLeftTitlePress?: () => void,
    // onRightTitlePress?: () => void,
    // isRight?: boolean,
    // isLeft?: boolean,
    back?: boolean
}

const GradiantHeader: React.FC<Props> = ({ title,
    // leftTitle, rightTitle, onLeftTitlePress, onRightTitlePress, isLeft, isRight,
    back }) => {

    const { navigation } = useCustomNavigation('Home')
    const { colors } = useAppSelector(state => state.CommonSlice)
    const GlobalStyles = useGlobalStyles()
    const styles = useStyles()


    return (
        // <SafeAreaView >
        <LinearGradient
            colors={[colors.PRIMARY_COLOR, colors.SECONDARY_COLOR]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.headerContainer}
        >
            {back ?
                <TouchableWithoutFeedback onPress={() => {
                    navigation.goBack()
                }}>
                    <Image source={Images.back} style={styles.img} />
                </TouchableWithoutFeedback>
                :
                // <TouchableOpacity onPress={
                //     // () => {
                //     onLeftTitlePress
                //     // setisLeft(true)
                //     // }
                // }>
                //     <Text style={isLeft ? { ...GlobalStyles.headerSubTitle, textDecorationLine: 'underline' } : GlobalStyles.headerSubTitle}>{leftTitle}</Text>
                // </TouchableOpacity>
                null
            }
            {
                title
                    ? <View style={{ flex: 1 }}>{title}</View>
                    : <Image source={Images.appNameWhite} style={styles.logo} />
            }
            {/* <TouchableOpacity onPress={
                onRightTitlePress
                // () => {
                // setisRight(true)
                // }
            }>
                <Text style={isRight ? { ...GlobalStyles.headerSubTitle, textDecorationLine: 'underline' } : GlobalStyles.headerSubTitle}>{rightTitle}</Text>
            </TouchableOpacity> */}
        </LinearGradient>
        // </SafeAreaView>
    )
}

export default GradiantHeader

const useStyles = () => {

    return StyleSheet.create({
        headerContainer: {
            // width: '100%',
            height: hp(12),
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: hp(5),
            paddingHorizontal: wp(3),
            // zIndex: 1,
        },
        logo: {
            flex: 1,
            // width: wp(70),
            resizeMode: 'contain',
            alignSelf: 'center',
        },
        img: {
            // flex: 1,
            // backgroundColor: 'red',
            height: wp(8),
            width: wp(8),
            resizeMode: 'contain',
        }
    })

}

// const styles = 