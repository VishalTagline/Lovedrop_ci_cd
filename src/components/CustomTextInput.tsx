import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useGlobalStyles } from '../styles/GlobalStyles';
import { useAppSelector } from '../redux/Store';

interface Props {
  value: string;
  onChangeText: (val: string) => void;
  placeholder: string;
  background?: string
}

const CustomTextInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  background
}) => {

  const GlobalStyles = useGlobalStyles()
  const styles = useStyles()
  const { colors } = useAppSelector(state => state.CommonSlice)

  return (
    <View style={{ ...styles.inputContainer, backgroundColor: background, }}>
      <TextInput
        style={GlobalStyles.inputText}
        placeholderTextColor={colors.LIGHT_TEXT}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType='email-address'
      />
    </View>
  );
};

export default CustomTextInput;

const useStyles = () => {


  return StyleSheet.create({
    inputContainer: {
      marginTop: wp(8),
      padding: wp(2)
    }
  })
}


// const styles = StyleSheet.create({
//   input: {
//     borderBottomWidth: 1,
//     ...GlobalStyles.inputText
//   },
// });
