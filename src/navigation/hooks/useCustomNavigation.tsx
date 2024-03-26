import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList, RootStackParamList } from "../../types/NavigationTypes/navigationTypes";
import { useNavigation, useRoute } from "@react-navigation/native";

// export const useCustomAuthNavigation = (screenName: keyof AuthStackParamList) => {
//   type Props = NativeStackScreenProps<AuthStackParamList, typeof screenName>;

//   type ScreenNavigationProp = Props['navigation'];

//   type ScreenRouteProp = Props['route'];
//   // const navigationParams = route?.params ?? null;


//   const navigation = useNavigation<ScreenNavigationProp>();
//   const route = useRoute<ScreenRouteProp>();
//   //    return navigation;
//   return { navigation, route };
// }


export const useCustomNavigation = (
  screenName: keyof RootStackParamList,
) => {
  type Props = NativeStackScreenProps<RootStackParamList, typeof screenName>;


  type ScreenNavigationProp = Props['navigation'];

  type ScreenRouteProp = Props['route'];

  const navigation = useNavigation<ScreenNavigationProp>();
  // const route = useRoute<ScreenRouteProp>();
  // const route = useRoute<ScreenRouteProp>();
  // const navigationParams = route?.params ?? null;

  // return { navigation, route, navigationParams };

  // return navigation;
  return { navigation };
};