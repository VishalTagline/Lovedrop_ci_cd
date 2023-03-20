import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Images } from '../utils/ImagePaths'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useAppSelector } from '../redux/Store'

interface Props {
    isCheck: boolean,
    onPress: () => void
}

const CustomCheckBox: React.FC<Props> = ({ isCheck, onPress }) => {

    const styles = useStyles(isCheck)

    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={isCheck ? Images.checked : Images.unchecked} style={styles.checkbox} />
        </TouchableOpacity>
    )
}

export default CustomCheckBox

const useStyles = (isCheck: boolean) => {

    const { colors } = useAppSelector(state => state.CommonSlice);

    return StyleSheet.create({
        checkbox: {
            width: wp(5),
            height: wp(5),
            tintColor: isCheck ? colors.PRIMARY_COLOR : colors.LIGHT_TEXT,
            margin: wp(2)
        }
    })
}

