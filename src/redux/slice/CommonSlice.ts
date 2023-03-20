import { createSlice } from '@reduxjs/toolkit';
import { colorTypes, darkThemeColors, lightThemeColors, } from '../../styles/Colors';

interface initialStateTypes {
  isDarkMode: boolean;
  colors: colorTypes
}

const INITIAL_STATE: initialStateTypes = {
  isDarkMode: false,
  colors: lightThemeColors
};

export const CommonSlice = createSlice({
  name: 'CommonSlice',
  initialState: INITIAL_STATE,
  reducers: {
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
      // state.colors = action.payload == "RED" ? 
      //     redTemeColors: action.payload == "WHITE"?
      //      lightThemeColors : darkThemeColors;
      state.colors = action.payload ? darkThemeColors : lightThemeColors
    },
  },
});

export const { setTheme } = CommonSlice.actions;
export default CommonSlice.reducer;
