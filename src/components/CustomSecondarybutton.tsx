import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useGlobalStyles } from '../styles/GlobalStyles'
import { useAppSelector } from '../redux/Store'

interface Props {
  title: string,
  onPress: () => void,
  disabled?: boolean
}

const CustomSecondarybutton: React.FC<Props> = ({ title, onPress, disabled = false }) => {

  const GlobalStyles = useGlobalStyles()
  const { colors } = useAppSelector(state => state.CommonSlice)

  return (

    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View style={disabled ? { ...GlobalStyles.btn, borderColor: colors.LIGHT_TEXT } : GlobalStyles.btn}>
        <Text style={disabled ? { ...GlobalStyles.btnText, color: colors.LIGHT_TEXT } : GlobalStyles.btnText}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>

  );
}

export default CustomSecondarybutton