import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../../components/CustomHeader';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { AppStrings } from '../../utils/AppStrings';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import { Images } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../styles/Colors';

const DataList = [
    {
        id: 1,
        title: AppStrings.dontLose,
        subtitle: AppStrings.dontLoseAccess
    },
    {
        id: 2,
        title: AppStrings.dontLose,
        subtitle: AppStrings.dontLoseAccess
    },
    {
        id: 3,
        title: AppStrings.dontLose,
        subtitle: AppStrings.dontLoseAccess
    },
    {
        id: 4,
        title: AppStrings.dontLose,
        subtitle: AppStrings.dontLoseAccess
    },
]

const WelcomeScreen = () => {

    const [isNext, setisNext] = useState(false);
    const [isCheck, setisCheck] = useState(false);




    return (
        <View style={GlobalStyles.mainContainer}>
            {isNext && <CustomHeader
                back
            />}
            <View style={{ ...GlobalStyles.centerContainer, }}>
                <Image source={Images.logo} style={styles.img} />
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', height: wp(10) }}> */}
                <Text style={{ ...GlobalStyles.welcomeText }}>{AppStrings.welcomeTo}
                    <Text style={{ color: Colors.secondary_color }}>
                        Love
                    </Text>
                    <Text style={{ color: Colors.primary_color }}>
                        Drop
                    </Text>
                </Text>
                {/* <Image source={Images.appName} style={{ backgroundColor: 'red', height: wp(10), width: wp(50), resizeMode: 'contain' }} /> */}
                {/* </View> */}
                {isNext
                    ?
                    <View style={{ flex: 1 }}>
                        <FlatList
                            // style={{ flex: 1 }} 
                            data={DataList}
                            renderItem={({ item }) =>
                                <View style={{ margin: wp(2) }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: wp(2) }}>
                                        <Image source={Images.heart} style={styles.icon} />
                                        <Text style={GlobalStyles.infoTitle}>{item.title}</Text>
                                    </View>
                                    <Text style={GlobalStyles.infoSubTitle}>{item.subtitle}</Text>
                                </View>
                            }
                        />
                    </View>
                    : <>
                        <View style={styles.imgContainer}>
                            <Image source={Images.welcomeImage1} style={styles.displayImg} />
                            <Image source={Images.welcomeImage2} style={styles.displayImg} />
                            <Image source={Images.welcomeImage3} style={styles.displayImg} />
                        </View>
                        <View >
                            <Text>{AppStrings.connectContact}</Text>
                        </View></>}
                <CustomPrimaryButton
                    title={isNext ? AppStrings.reveal : AppStrings.getStared}
                    onPress={() => {
                        setisNext(!isNext)
                    }}
                />
            </View>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    img: {
        height: wp(35),
        width: wp(35),
        resizeMode: 'cover',
    },
    displayImg: {
        height: wp(60),
        width: wp(60),
        resizeMode: 'contain'
    },
    imgContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: wp(15),
    },
    icon: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain',
        marginRight: wp(2)
    }
})