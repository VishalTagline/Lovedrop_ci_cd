import { Image, StyleSheet, Text, Touchable, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Images } from '../utils/ImagePaths'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { GlobalStyles } from '../styles/GlobalStyles'

interface Props {
  title?: string;
  onPress?:()=>void;
}

const CustomHeader: React.FC<Props> = ({title, onPress}) => {
  return (
    <View style={GlobalStyles.headerContainer}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Image source={Images.back} style={styles.img} />
      </TouchableWithoutFeedback>
      <Text>{title}</Text>
    </View>
  );
};

export default CustomHeader

const styles = StyleSheet.create({
    img:{
        height:wp(8),
        width:wp(8),
        resizeMode:'contain'
    }
})
