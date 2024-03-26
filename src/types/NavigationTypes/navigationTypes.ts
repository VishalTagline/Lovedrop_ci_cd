import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { userType } from "../UserTypes/usertype";

export type AuthStackParamList = {
  AuthScreen: undefined;
  MobileNumberScreen: undefined;
  OTPCodeScreen:
  { data: userType } | undefined
  // { number: string | undefined, confirm: FirebaseAuthTypes.ConfirmationResult | undefined }
  ;
  EmailScreen: { data: userType };
  FirstNameScreen: { data: userType };
  BirthdayScreen: { data: userType };
  GenderScreen: { data: userType };
  WelcomeScreen: undefined
};

export type BottomTabParamList = {
  HomeScreen: undefined,
  ProfileScreen: undefined,
  InboxScreen: undefined,
  // ChatScreen: InboxMessageType
  // ChatScreen: { chatId: string },
  ChatScreen: undefined
}

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>,
  // HomeScreen: undefined,
  // ProfileScreen: undefined,
  // InboxScreen: undefined,
  // // ChatScreen: InboxMessageType
  Home: NavigatorScreenParams<BottomTabParamList>
  ChatRoomScreen: { chatId: string, user: string },
  // ChatRoomScreen: { chatId: string, user: userType },
  EditProfileScreen: undefined
};

export type AuthRouteProps<RouteName extends keyof AuthStackParamList> = RouteProp<
  AuthStackParamList,
  RouteName
>;


export type MainRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;




