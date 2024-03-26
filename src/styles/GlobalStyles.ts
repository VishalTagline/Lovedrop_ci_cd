import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontSizes } from '../utils/Fontsizes';
import { useAppSelector } from '../redux/Store';


export const useGlobalStyles = () => {

  const { colors } = useAppSelector(state => state.CommonSlice);

  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: colors.PRIMARY_BG,
      // padding: wp(5),
    },
    tabIcon: {
      height: wp(8),
      width: wp(8)
    },
    headerContainer: {
      // flex: 1,
      backgroundColor: colors.PRIMARY_BG,
      flexDirection: 'row',
      alignItems: 'center',
      padding: wp(5),
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.PRIMARY_BG,
      padding: wp(8),
    },
    primaryBtn: {
      //   flex:1,
      borderRadius: wp(20),
      width: wp(90),
      padding: wp(5),
      margin: wp(2),
      alignSelf: 'center',
    },
    primaryBtnText: {
      fontSize: FontSizes.FontSize_16,
      fontWeight: '500',
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
      color: colors.PRIMARY_BUTTON_TEXT,
    },
    btn: {
      // flex: 1,
      borderColor: colors.PRIMART_TEXT,
      borderRadius: wp(20),
      borderWidth: 0.5,
      width: wp(90),
      padding: wp(5),
      margin: wp(2),
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: colors.PRIMARY_BG,
      shadowOpacity: 0.3,
      shadowOffset: {
        height: 5, width: 0
      },
      shadowColor: colors.PRIMART_TEXT,
      elevation: 5
    },
    // shadowBtn: {
    //   // flex: 1,
    //   borderColor: colors.PRIMART_TEXT,
    //   borderRadius: wp(20),
    //   borderWidth: 0.5,
    //   width: wp(90),
    //   padding: wp(5),
    //   margin: wp(2),
    //   alignSelf: 'center',
    //   backgroundColor: colors.PRIMARY_BG,
    //   shadowOpacity: 0.5,
    //   shadowOffset: {
    //     height: 2, width: 0
    //   },
    //   shadowColor: colors.PRIMART_TEXT,
    //   elevation: 6
    // },
    btnText: {
      fontSize: FontSizes.FontSize_16,
      fontWeight: '500',
      fontFamily: 'PublicSans-Regular',
      textAlign: 'center',
      color: colors.PRIMART_TEXT,
    },
    underlinetxt: {
      textDecorationLine: 'underline'
    },
    floatingBtnContainer: {
      alignSelf: 'center',
      position: 'absolute',
      bottom: wp(10),
    },
    formHeaderContainer: {
      paddingHorizontal: wp(10),
      paddingVertical: wp(5),
    },
    infoText: {
      fontSize: FontSizes.FontSize_12,
      fontFamily: 'Inter-Regular',
      color: colors.PRIMART_TEXT,
      fontWeight: '500',
      marginVertical: wp(2)
    },
    formHeader: {
      fontSize: FontSizes.FontSize_30,
      fontFamily: 'PublicSans-Regular',
      color: colors.PRIMART_TEXT,
      fontWeight: '700',
    },
    errorText: {
      fontSize: FontSizes.FontSize_12,
      fontFamily: 'Inter-Regular',
      color: colors.ERROR_TEXT,
      fontWeight: '400',
    },
    inputText: {
      fontSize: FontSizes.FontSize_16,
      fontFamily: 'PublicSans-Regular',
      color: colors.PRIMART_TEXT,
      fontWeight: '400',
      borderBottomWidth: 1,
      borderColor: colors.PRIMART_TEXT
    },
    welcomeText: {
      fontSize: FontSizes.FontSize_24,
      fontFamily: 'PublicSans-Regular',
      color: colors.PRIMART_TEXT,
      fontWeight: '700',
    },
    infoTitle: {
      fontSize: FontSizes.FontSize_16,
      fontFamily: 'Inter-Regular',
      color: colors.PRIMART_TEXT,
      fontWeight: '500',
    },
    infoSubTitle: {
      fontSize: FontSizes.FontSize_12,
      fontFamily: 'Inter-Regular',
      color: colors.LIGHT_TEXT,
      fontWeight: '500',
    },
    headerSubTitle: {
      fontSize: FontSizes.FontSize_16,
      fontFamily: 'PublicSans-Regular',
      color: colors.PRIMARY_BG,
      fontWeight: '700',
    },
    usernameText: {
      fontSize: FontSizes.FontSize_26,
      fontFamily: 'PublicSans-Regular',
      color: colors.PRIMART_TEXT,
      fontWeight: '700',
    },
    phoneText: {
      fontSize: FontSizes.FontSize_12,
      fontFamily: 'PublicSans-Regular',
      color: colors.LIGHT_TEXT,
      fontWeight: '300',
    },
    dropdownText: {
      fontSize: FontSizes.FontSize_20,
      fontFamily: 'PublicSans-Regular',
      color: colors.PRIMART_TEXT,
      fontWeight: '700',
    },
    inboxHeaderTitle: {
      fontSize: FontSizes.FontSize_20,
      fontFamily: 'PublicSans-Regular',
      color: colors.PRIMARY_BG,
      fontWeight: '700',

      // flex: 1
    },
    inboxSubHeaderTitle: {
      fontSize: FontSizes.FontSize_12,
      fontFamily: 'PublicSans-Regular',
      color: colors.PRIMARY_BG,
      fontWeight: '700',
      // marginHorizontal: wp(2)
    },
    contactName: {
      fontSize: FontSizes.FontSize_17,
      fontFamily: 'Inter-Regular',
      color: colors.PRIMART_TEXT,
      fontWeight: '400',
    },
    contactNumber: {
      fontSize: FontSizes.FontSize_14,
      fontFamily: 'Inter-Regular',
      color: colors.CONTACT_NUMBER,
      fontWeight: '400',
    }
  })

}
