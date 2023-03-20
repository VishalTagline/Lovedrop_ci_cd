import { View, Text, FlatList, Image, ScrollView, StyleSheet, ImageSourcePropType } from 'react-native'
import React, { useState } from 'react'
import { useGlobalStyles } from '../styles/GlobalStyles'
import GradiantHeader from '../components/GradiantHeader'
import CustomTextInput from '../components/CustomTextInput'
import { AppStrings } from '../utils/AppStrings'
import { useAppSelector } from '../redux/Store'
import CustomSearchField from '../components/CustomSearchField'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CustomPhoneNumberField from '../components/CustomPhoneNumberField'
import CustomPrimaryButton from '../components/CustomPrimaryButton'
import { Images } from '../utils/ImagePaths'
import LinearGradient from 'react-native-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view';

export interface Contact {
  id: number,
  name: string,
  number: string,
  image: ImageSourcePropType
}

const contactList: Contact[] = [
  {
    id: 1,
    name: 'Jane Cooper',
    number: '(270) 555-0117',
    image: Images.person1
  },
  {
    id: 2,
    name: 'Devon Lane',
    number: '(308) 555-0121',
    image: Images.person2
  },
  {
    id: 3,
    name: 'Darrell Steward',
    number: '(684) 555-0102',
    image: Images.person3
  },
  {
    id: 4,
    name: 'Devon Lane',
    number: '(704) 555-0127',
    image: Images.person1
  },
  {
    id: 5,
    name: 'Courtney Henry',
    number: '(505) 555-0125',
    image: Images.person2
  },
]


const HomeScreen = () => {

  const [name, setname] = useState('');
  const [number, setnumber] = useState('');
  const GlobalStyles = useGlobalStyles()
  const styles = useStyles()
  const { colors } = useAppSelector(state => state.CommonSlice)



  const itemSeparatorComponent = () => (
    <View style={styles.seperator} />
  )

  const ContactCard = ({ item }: { item: Contact }) => (
    <View style={styles.contactCard}>
      <Image source={item.image} style={styles.imgProfile} />
      <View style={{ marginHorizontal: wp(2) }}>
        <Text>{item.name}</Text>
        <Text>{item.number}</Text>
      </View>
    </View>
  )

  return (
    <View style={GlobalStyles.mainContainer}>
      <GradiantHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>

          {/* <MaskedView
            // style={{ flex: 1, flexDirection: 'row', height: size }}
            maskElement={
              <View
                style={{
                  // backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderWidth: 1,
                  // height: 60,
                }}>
                <Text style={{ alignSelf: 'center' }}>
                  {AppStrings.sendNote}
                </Text>
              </View>
            }>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              colors={[colors.PRIMARY_COLOR, colors.SECONDARY_COLOR]}
              style={{
                flex: 1,
                height: '100%',
              }}
            />
          </MaskedView> */}



          <LinearGradient colors={[colors.PRIMARY_COLOR, colors.SECONDARY_COLOR]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
          >
            <Text style={{ alignSelf: 'center' }}>
              {AppStrings.sendNote}
            </Text>
          </LinearGradient>


          <CustomTextInput placeholder={AppStrings.firstName} value={name} onChangeText={setname} background={colors.HOME_INPUT_BG} />
          <View style={styles.contactContainer}>
            <Text style={GlobalStyles.infoSubTitle}>{AppStrings.byContact}</Text>
            <CustomSearchField />
            <FlatList
              data={contactList}
              ItemSeparatorComponent={itemSeparatorComponent}
              renderItem={({ item }) => <ContactCard item={item} />}
            />
            <Text style={GlobalStyles.infoSubTitle}>{AppStrings.orAddByPhoneNumber}</Text>
            <CustomPhoneNumberField onChangeText={setnumber} value={number} />
          </View>
          <CustomPrimaryButton title={AppStrings.sendDrop} onPress={() => { }} />
        </View>
      </ScrollView>
    </View >
  )
}


const useStyles = () => {

  const { colors } = useAppSelector(state => state.CommonSlice)

  return StyleSheet.create({
    mainContainer: {
      padding: wp(8)
    },
    contactContainer: {
      marginVertical: wp(5)
    },
    seperator: {
      borderWidth: 0.5,
      borderColor: colors.LIGHT_TEXT,
      marginLeft: wp(15)
    },
    contactCard: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: wp(2)
    },
    imgProfile: {
      height: wp(12),
      width: wp(12),
      resizeMode: 'cover'
    }
  })
}


export default HomeScreen