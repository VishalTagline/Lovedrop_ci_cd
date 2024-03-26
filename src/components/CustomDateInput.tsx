import { ActivityIndicator, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useGlobalStyles } from '../styles/GlobalStyles';
import { useAppSelector } from '../redux/Store';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomSlash from './CustomSlash';
import DatePicker from 'react-native-date-picker';


interface Props {
  value?: string,
  onChangeText: (val: string) => void;
}
const CustomDateInput: React.FC<Props> = ({ value, onChangeText }) => {

  console.log('VALUE : ', value)
  const styles = useStyle()
  const { colors } = useAppSelector(state => state.CommonSlice)

  const inpt1 = useRef<TextInput>(null);
  const inpt2 = useRef<TextInput>(null);
  const inpt3 = useRef<TextInput>(null);
  const inpt4 = useRef<TextInput>(null);
  const inpt5 = useRef<TextInput>(null);
  const inpt6 = useRef<TextInput>(null);
  const inpt7 = useRef<TextInput>(null);
  const inpt8 = useRef<TextInput>(null);


  const [inp1, setinp1] = useState('');
  const [inp2, setinp2] = useState('');
  const [inp3, setinp3] = useState('');
  const [inp4, setinp4] = useState('');
  const [inp5, setinp5] = useState('');
  const [inp6, setinp6] = useState('');
  const [inp7, setinp7] = useState('');
  const [inp8, setinp8] = useState('');


  const [date, setDate] = useState('')
  const [open, setOpen] = useState(false)

  let now = new Date()
  console.log('now : ', now)


  useEffect(() => {
    // console.log('useeffect date field')
    getFieldValues()
  },);

  const getFieldValues = () => {
    if (value) {
      console.log(value)
      let date = value.split('/')

      if (date[0].length == 1) {
        setinp1('0')
        setinp2(date[0][0])
      } else {
        setinp1(date[0][0])
        setinp2(date[0][1])
      }
      if (date[1].length == 1) {
        setinp3('0')
        setinp4(date[1][0])
      } else {
        setinp3(date[1][0])
        setinp4(date[1][1])
      }

      setinp5(date[2][0])
      setinp6(date[2][1])
      setinp7(date[2][2])
      setinp8(date[2][3])
    }
    // console.log(' date field')
  }


  return (
    <View style={styles.container}>
      {/* <Text>{inp1}</Text> */}
      {
        // value && (inp1 == '' || inp2 == '' || inp3 == '' || inp4 == '' || inp5 == '' || inp6 == '' || inp7 == '' || inp8 == '') ?
        //   <ActivityIndicator />
        //   :
        <>
          <TextInput

            onFocus={() => {
              // Keyboard.dismiss()
            }}
            onPressOut={() => {
              // Keyboard.dismiss()
            }}
            onPressIn={() => {
              // Keyboard.dismiss()
              setOpen(true)
            }}
            ref={inpt1}
            // maxLength={1}
            // onChangeText={val => {
            //   setinp1(val[0]);
            //   if (val == '') {
            //     inpt1.current?.focus();
            //   } else {
            //     // onChangeText((prev: string) => prev + val);
            //     setinp1(val);
            //     inpt2.current?.focus();
            //   }
            // }}

            // onChangeText={val => {
            //   setinp1(val[0]);
            //   if (val == '') {
            //     inpt1.current?.focus();
            //   } else {
            //     inpt2.current?.focus();
            //     if (val.length == 2) {
            //       setinp2(val[1]);
            //       inpt2.current?.focus();
            //     }
            //   }
            // }}
            value={inp1}
            style={styles.input}
            placeholderTextColor={colors.LIGHT_TEXT}
            placeholder='M'
            keyboardType="number-pad"
          />
          <TextInput

            ref={inpt2}
            onFocus={() => {
              // Keyboard.dismiss()
            }}
            onPressOut={() => {
              // Keyboard.dismiss()
            }}
            onPressIn={() => {
              // Keyboard.dismiss()
              setOpen(true)
            }}
            // maxLength={1}
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
            value={inp2}
            style={styles.input}
            placeholderTextColor={colors.LIGHT_TEXT}
            placeholder='M'
            keyboardType="number-pad"
            onKeyPress={(e) => (e.nativeEvent.key == "Backspace" && inpt1.current?.focus())}
          />
          <CustomSlash />
          <TextInput

            onFocus={() => {
              // Keyboard.dismiss()
            }}
            onPressOut={() => {
              // Keyboard.dismiss()
            }}
            onPressIn={() => {
              // Keyboard.dismiss()
              setOpen(true)
            }}
            ref={inpt3}
            // maxLength={1}
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
            value={inp3}
            style={styles.input}
            placeholderTextColor={colors.LIGHT_TEXT}
            placeholder='D'
            keyboardType="number-pad"
            onKeyPress={(e) => (e.nativeEvent.key == "Backspace" && inpt2.current?.focus())}
          />
          <TextInput

            onFocus={() => {
              // Keyboard.dismiss()
            }}
            onPressOut={() => {
              // Keyboard.dismiss()
            }}
            onPressIn={() => {
              // Keyboard.dismiss()
              setOpen(true)
            }}
            ref={inpt4}
            // maxLength={1}
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
            value={inp4}
            style={styles.input}
            placeholderTextColor={colors.LIGHT_TEXT}
            placeholder='D'
            keyboardType="number-pad"
            onKeyPress={(e) => (e.nativeEvent.key == "Backspace" && inpt3.current?.focus())}
          />
          <CustomSlash />
          <TextInput

            onFocus={() => {
              // Keyboard.dismiss()
            }}
            onPressOut={() => {
              // Keyboard.dismiss()
            }}
            onPressIn={() => {
              // Keyboard.dismiss()
              setOpen(true)
            }}
            ref={inpt5}
            // maxLength={1}
            // onKeyPress={(e) => (e.nativeEvent.key == "Backspace" && inpt4.current?.focus())}
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
            value={inp5}
            style={styles.input}
            placeholderTextColor={colors.LIGHT_TEXT}
            placeholder='Y'
            keyboardType="number-pad"
          />
          <TextInput

            onFocus={() => {
              // Keyboard.dismiss()
            }}
            onPressOut={() => {
              // Keyboard.dismiss()
            }}
            onPressIn={() => {
              // Keyboard.dismiss()
              setOpen(true)
            }}
            ref={inpt6}
            // maxLength={1}
            // onEndEditing={e => console.log(e)}
            onChangeText={val => {
              setinp6(val[0]);
              if (val == '') {
                inpt5.current?.focus();
              } else {
                inpt7.current?.focus();
                if (val.length == 2) {
                  setinp7(val[1]);
                  inpt7.current?.focus();
                }
              }
            }}
            style={styles.input}
            placeholderTextColor={colors.LIGHT_TEXT}
            placeholder='Y'
            keyboardType="number-pad"
            onKeyPress={(e) => (e.nativeEvent.key == "Backspace" && inpt5.current?.focus())}
            value={inp6}
          />
          <TextInput

            onFocus={() => {
              // Keyboard.dismiss()
            }}
            onPressOut={() => {
              // Keyboard.dismiss()
            }}
            onPressIn={() => {
              // Keyboard.dismiss()
              setOpen(true)
            }}
            ref={inpt7}
            // maxLength={1}
            // onChange={e => e.preventDefault()}
            onChangeText={val => {
              setinp7(val[0]);
              if (val == '') {
                inpt6.current?.focus();
              } else {
                inpt8.current?.focus();
                if (val.length == 2) {
                  setinp8(val[1]);
                  inpt8.current?.focus();
                }
              }
            }}
            style={styles.input}
            placeholderTextColor={colors.LIGHT_TEXT}
            placeholder='Y'
            value={inp7}
            keyboardType="number-pad"
            onKeyPress={(e) => (e.nativeEvent.key == "Backspace" && inpt6.current?.focus())}
          />
          <TextInput

            onFocus={() => {
              // Keyboard.dismiss()
            }}
            onPressOut={() => {
              // Keyboard.dismiss()
            }}
            onPressIn={() => {
              // Keyboard.dismiss()
              setOpen(true)
            }}
            ref={inpt8}
            onChangeText={val => {
              if (val == '') {
                inpt7.current?.focus();
              }
              setinp8(val);
              // let date = inp1 + inp2 + inp3 + inp4 + inp5 + inp6 + inp7 + val;
              let date = inp5 + inp6 + inp7 + val + inp1 + inp2 + inp3 + inp4;

              onChangeText(date);
            }}
            maxLength={1}
            value={inp8}
            style={styles.input}
            placeholderTextColor={colors.LIGHT_TEXT}
            onKeyPress={(e) => (e.nativeEvent.key == "Backspace" && inpt7.current?.focus())}
            placeholder='Y'
            keyboardType="number-pad"
          />
        </>
      }
      <DatePicker
        // maximumDate={value ? new Date(parseInt(value)) : now}
        maximumDate={now}
        modal
        open={open}
        mode='date'
        date={value ? new Date(value) : now}
        // date={new Date()}
        onConfirm={(dt) => {
          Keyboard.dismiss()
          setOpen(false)

          let month = (dt.getMonth() + 1).toString()
          if (month.length == 2) {
            setinp1(month.charAt(0))
            setinp2(month.charAt(1))
          } else {
            setinp1('0')
            setinp2(month.charAt(0))
          }

          if (dt.getDate().toString().length == 2) {
            setinp3(dt.getDate().toString().charAt(0))
            setinp4(dt.getDate().toString().charAt(1))
          } else {
            setinp3('0')
            setinp4(dt.getDate().toString().charAt(0))
          }

          setinp5(dt.getFullYear().toString().charAt(0))
          setinp6(dt.getFullYear().toString().charAt(1))
          setinp7(dt.getFullYear().toString().charAt(2))
          setinp8(dt.getFullYear().toString().charAt(3))

          let date = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear()
          // setDate(date)
          onChangeText(date);
          // setDate(dt.toString())
          // onChangeText(dt.toString());
        }}
        onCancel={() => {
          Keyboard.dismiss()
          setOpen(false)
        }}
      />
      {/* <Text>{date.toString()} date</Text> */}
    </View>
  );
}

export default CustomDateInput

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