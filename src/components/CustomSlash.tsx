import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useGlobalStyles } from '../styles/GlobalStyles'
import { useAppSelector } from '../redux/Store'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomSlash = () => {
    const styles = useStyle()
    return (
        <Text style={{ ...styles.input, borderBottomWidth: 0, alignSelf: 'center', marginHorizontal: -wp(4), opacity: 0.5 }}>/</Text>
    )
}

export default CustomSlash


const useStyle = () => {

    const GlobalStyles = useGlobalStyles()

    return StyleSheet.create({
        input: {
            width: wp(8),
            marginVertical: wp(8),
            textAlign: 'center',
            ...GlobalStyles.inputText
        },
    });
}