import { View, Text, TextInput, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useAppSelector } from '../redux/Store'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Images } from '../utils/ImagePaths'
import { AppStrings } from '../utils/AppStrings'

const CustomSearchField = () => {

    const styles = useStyles()

    return (
        <View style={styles.inputField}>
            <Image source={Images.search} style={styles.search} />
            <TextInput
                placeholder={AppStrings.search}
            />
        </View>
    )
}

const useStyles = () => {
    const { colors } = useAppSelector(state => state.CommonSlice)

    return StyleSheet.create({
        inputField: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.SEARCH_INPUT_BG,
            borderRadius: wp(10),
            padding: hp(1),
            marginVertical: wp(2)
        },
        search: {
            height: wp(5),
            width: wp(5),
            resizeMode: 'contain',
            marginHorizontal: hp(1)
        }
    })
}

export default CustomSearchField