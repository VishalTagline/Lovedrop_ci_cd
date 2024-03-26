import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/Store'
import { setTheme } from '../redux/slice/CommonSlice';
import { useDispatch } from 'react-redux';
import { useGlobalStyles } from '../styles/NewGlobalStyles';

const Test = () => {

    const styles = useGlobalStyles()
    //  useStyles()
    const [value, setValue] = useState("BLACK");
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(setTheme(value))
    },[value])

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity onPress={() => setValue("RED")}>
          <Text style={styles.text}>Set Red</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setValue('BLACK')}>
          <Text style={styles.text}>Set Black</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setValue("WHITE")}>
          <Text style={styles.text}>Set White</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

export default Test

const useStyles=()=>{

    const {colors} = useAppSelector(state => state.CommonSlice);

    return StyleSheet.create({
        container:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: colors.PRIMARY_BG
        },
        text:{
            fontSize:24,
            color:colors.PRIMART_TEXT
        }
    });
}
