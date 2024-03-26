import { StyleSheet, TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useGlobalStyles } from '../styles/GlobalStyles';
import { useAppSelector } from '../redux/Store';

interface Props {
  value: string,
  onChangeText: (val: string) => void;
}

const CustomOTPInput: React.FC<Props> = ({ value, onChangeText }) => {

  const styles = useStyle()

  const inpt1 = useRef<TextInput>(null);
  const inpt2 = useRef<TextInput>(null);
  const inpt3 = useRef<TextInput>(null);
  const inpt4 = useRef<TextInput>(null);
  const inpt5 = useRef<TextInput>(null);
  const inpt6 = useRef<TextInput>(null);

  // console.log(value)


  const [inp1, setinp1] = useState(value.charAt(0));
  const [inp2, setinp2] = useState(value.charAt(1));
  const [inp3, setinp3] = useState(value.charAt(2));
  const [inp4, setinp4] = useState(value.charAt(3));
  const [inp5, setinp5] = useState(value.charAt(4));
  const [inp6, setinp6] = useState(value.charAt(5));

  return (
    <View style={styles.container}>
      <TextInput
        ref={inpt1}
        // maxLength={1}
        value={inp1}
        style={styles.input}
        keyboardType="number-pad"
        onChangeText={val => {
          setinp1(val[0]);
          if (val == '') {
            inpt1.current?.focus();
          } else {
            inpt2.current?.focus();
            if (val.length == 2) {
              setinp2(val[1]);
              inpt2.current?.focus();
            }
          }
        }}
      // onChangeText={val => {
      //   if (val == '') {
      //     inpt1.current?.focus();
      //   } else {
      //     // onChangeText((prev: string) => prev + val);
      //     setinp1(val);
      //     inpt2.current?.focus();
      //   }
      // }}
      />
      <TextInput
        ref={inpt2}
        // maxLength={1}
        value={inp2}
        style={styles.input}
        keyboardType="number-pad"
        // onChangeText={val => {
        //   if (val == '') {
        //     inpt1.current?.focus();
        //   } else {
        //     // onChangeText((prev: string) => prev + val);
        //     setinp2(val);
        //     inpt3.current?.focus();
        //   }
        // }}
        onChangeText={val => {
          setinp2(val[0]);
          if (val == '') {
            inpt1.current?.focus();
          } else {
            inpt3.current?.focus();
            if (val.length == 2) {
              setinp3(val[1]);
              inpt3.current?.focus();
            }
          }
        }}
      />
      <TextInput
        ref={inpt3}
        // maxLength={1}
        value={inp3}
        style={styles.input}
        keyboardType="number-pad"
        // onChangeText={val => {
        //   if (val == '') {
        //     inpt2.current?.focus();
        //   } else {
        //     // onChangeText((prev: string) => prev + val);
        //     setinp3(val);
        //     inpt4.current?.focus();
        //   }
        // }}
        onChangeText={val => {
          setinp3(val[0]);
          if (val == '') {
            inpt2.current?.focus();
          } else {
            inpt4.current?.focus();
            if (val.length == 2) {
              setinp4(val[1]);
              inpt4.current?.focus();
            }
          }
        }}
      />
      <TextInput
        ref={inpt4}
        // maxLength={1}
        value={inp4}
        style={styles.input}
        keyboardType="number-pad"
        // onChangeText={val => {
        //   if (val == '') {
        //     inpt3.current?.focus();
        //   } else {
        //     // onChangeText((prev: string) => prev + val);
        //     setinp4(val);
        //     inpt5.current?.focus();
        //   }
        // }}
        onChangeText={val => {
          setinp4(val[0]);
          if (val == '') {
            inpt3.current?.focus();
          } else {
            inpt5.current?.focus();
            if (val.length == 2) {
              setinp5(val[1]);
              inpt5.current?.focus();
            }
          }
        }}
      />
      <TextInput
        ref={inpt5}
        // maxLength={1}
        value={inp5}
        style={styles.input}
        keyboardType="number-pad"
        // onChangeText={val => {
        //   if (val == '') {
        //     inpt4.current?.focus();
        //   } else {
        //     // onChangeText((prev: string) => prev + val);
        //     setinp5(val);
        //     inpt6.current?.focus();
        //   }
        // }}
        onChangeText={val => {
          setinp5(val[0]);
          if (val == '') {
            inpt4.current?.focus();
          } else {
            inpt6.current?.focus();
            if (val.length == 2) {
              setinp6(val[1]);
              inpt6.current?.focus();
            }
          }
        }}
      />
      <TextInput
        ref={inpt6}
        maxLength={1}
        value={inp6}
        style={styles.input}
        keyboardType="number-pad"
        onChangeText={val => {
          if (val == '') {
            inpt5.current?.focus();
          }
          setinp6(val);
          let otp = inp1 + inp2 + inp3 + inp4 + inp5 + val;
          onChangeText(otp);
        }}
      />
    </View>
  );
};

export default CustomOTPInput;

const useStyle = () => {

  const GlobalStyles = useGlobalStyles()
  const { colors } = useAppSelector(state => state.CommonSlice)

  return StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'space-evenly' },
    input: {
      width: wp(8),
      marginVertical: wp(8),
      textAlign: 'center',
      ...GlobalStyles.inputText
    },
  });
}

// const styles = StyleSheet.create({
//   container: { flexDirection: 'row', justifyContent: 'space-evenly' },
//   input: {
//     borderBottomWidth: 1,
//     width: wp(8),
//     marginVertical: wp(8),
//     textAlign: 'center',
//     ...GlobalStyles.inputText
//   },
// });
