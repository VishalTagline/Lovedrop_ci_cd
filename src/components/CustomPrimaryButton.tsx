import { Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useGlobalStyles } from '../styles/GlobalStyles'
import LinearGradient from 'react-native-linear-gradient'

import { useAppSelector } from '../redux/Store'

interface Props {
  title: string,
  onPress: () => void
}

const CustomPrimaryButton: React.FC<Props> = ({ title, onPress }) => {

  const { colors } = useAppSelector(state => state.CommonSlice);

  const GlobalStyles = useGlobalStyles()

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <LinearGradient
        colors={[colors.PRIMARY_COLOR, colors.SECONDARY_COLOR]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={GlobalStyles.primaryBtn}>
        <Text style={GlobalStyles.primaryBtnText}>{title}</Text>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

export default CustomPrimaryButton

