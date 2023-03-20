import { FirebaseAuthTypes } from "@react-native-firebase/auth"

export type userType = {
    id?: string,
    phoneNumber?: string,
    email?: string,
    firstName?: string,
    birthDate?: string,
    gender?: string,
    confirm?: FirebaseAuthTypes.ConfirmationResult | undefined
}