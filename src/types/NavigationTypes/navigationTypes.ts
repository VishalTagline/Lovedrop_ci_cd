import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigatorScreenParams } from "@react-navigation/native";
import { userType } from "../UserTypes/usertype";
export type AuthStackParamList = {
  AuthScreen: undefined;
  MobileNumberScreen: undefined;
  OTPCodeScreen: { data: userType }
  // { number: string, confirm: FirebaseAuthTypes.ConfirmationResult | undefined }
  ;
  EmailScreen: { data: userType };
  FirstNameScreen: { data: userType };
  BirthdayScreen: { data: userType };
  GenderScreen: { data: userType };
  WelcomeScreen: undefined
};

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>,
  HomeScreen: undefined,
  ProfileScreen: undefined,
  InboxScreen: undefined
};

