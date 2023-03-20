import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-native-phone-number-input';
import { useGlobalStyles } from '../styles/GlobalStyles';
import { useAppSelector } from '../redux/Store';

interface Props {
    onChangeText: (val: string) => void,
    value: string
}

const CustomPhoneNumberField: React.FC<Props> = ({ onChangeText, value }) => {
    // console.log({ value })

    const styles = useStyles()
    const GlobalStyles = useGlobalStyles()
    const [val, setVal] = useState(value)
    // console.log({ val })

    useEffect(() => {
        setVal(value)
        setTimeout(() => {

            setVal('')
        }, 2000);
    }, [value]);

    // const { colors } = useAppSelector(state => state.CommonSlice);

    const numberField = () => <PhoneInput
        textContainerStyle={styles.bgColor}
        textInputStyle={GlobalStyles.inputText}
        containerStyle={styles.bgColor}
        codeTextStyle={{ ...GlobalStyles.inputText, borderBottomWidth: 0 }}
        // placeholder={' '}
        // containerStyle={{marginVertical: wp(5)}}
        // onChangeText={onChangeText}
        value={value}
        onChangeFormattedText={onChangeText}
    />

    return (

        numberField()

    )
}

export default CustomPhoneNumberField

const useStyles = () => {

    const GlobalStyles = useGlobalStyles()
    const { colors } = useAppSelector(state => state.CommonSlice)

    return StyleSheet.create({
        bgColor: {
            backgroundColor: colors.PRIMARY_BG
        },
        phoneInput: {
            ...GlobalStyles.inputText,
            // borderBottomWidth: 1,
            // borderColor: colors.PRIMART_TEXT
        }

    })

}