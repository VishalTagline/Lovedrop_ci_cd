import { Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Images } from '../utils/ImagePaths'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useGlobalStyles } from '../styles/GlobalStyles'

interface Props {
  title?: string;
  onPress?: () => void;
  back: boolean
}

const CustomHeader: React.FC<Props> = ({ title, onPress, back }) => {

  const GlobalStyles = useGlobalStyles()

  return (
    <SafeAreaView>
      <View style={GlobalStyles.headerContainer}>
        {back && <TouchableWithoutFeedback onPress={onPress}>
          <Image source={Images.back} style={styles.img} />
        </TouchableWithoutFeedback>}
        <Text>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader

const styles = StyleSheet.create({
  img: {
    height: wp(8),
    width: wp(8),
    resizeMode: 'contain'
  }
})
