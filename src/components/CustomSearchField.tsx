import { View, Text, TextInput, Image } from 'react-native'
import React from 'react'
import { useAppSelector } from '../redux/Store'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Images } from '../utils/ImagePaths'
import { AppStrings } from '../utils/AppStrings'

const CustomSearchField = () => {

    const { colors } = useAppSelector(state => state.CommonSlice)

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.SEARCH_INPUT_BG, borderRadius: wp(10), padding: hp(1) }}>
            <Image source={Images.search} style={{ height: wp(5), width: wp(5), resizeMode: 'contain', marginHorizontal: hp(1) }} />
            <TextInput
                placeholder={AppStrings.search}
            />
        </View>
    )
}

export default CustomSearchField