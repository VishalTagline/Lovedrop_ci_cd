import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList, RootStackParamList } from "../../types/NavigationTypes/navigationTypes";
import { useNavigation, useRoute } from "@react-navigation/native";

export const useCustomAuthNavigation = (screenName: keyof AuthStackParamList) => {
  type Props = NativeStackScreenProps<AuthStackParamList, typeof screenName>;

  type ScreenNavigationProp = Props['navigation'];

  type ScreenRouteProp = Props['route'];
  // const navigationParams = route?.params ?? null;


  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  //    return navigation;
  return { navigation, route };
}


export const useCustomNavigation = (
  screenName: keyof RootStackParamList,
) => {
  type Props = NativeStackScreenProps<RootStackParamList, typeof screenName>;

  type ScreenNavigationProp = Props['navigation'];

  type ScreenRouteProp = Props['route'];

  const navigationMain = useNavigation<ScreenNavigationProp>();
  const routeMain = useRoute<ScreenRouteProp>();

  // return navigation;
  return { navigationMain, routeMain };
};