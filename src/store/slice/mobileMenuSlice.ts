import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MobileMenuState {
	isShowMobileMenu: boolean;
}

const initialState: MobileMenuState = {
	isShowMobileMenu: false,
};

const mobileMenuSlice = createSlice({
	name: 'mobileMenu',
	initialState,
	reducers: {
		setShowMobileMenu: (state, action) => {
			state.isShowMobileMenu = action.payload;
		},
	},
});

export const { setShowMobileMenu } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
