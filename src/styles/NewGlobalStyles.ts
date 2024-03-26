import { StyleSheet } from "react-native";
import { useAppSelector } from "../redux/Store";

export const useGlobalStyles = () => {
  const {colors} = useAppSelector(state => state.CommonSlice);

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.PRIMARY_BG,
    },
    text: {
      fontSize: 24,
      color: colors.PRIMART_TEXT,
    },
  });
};
