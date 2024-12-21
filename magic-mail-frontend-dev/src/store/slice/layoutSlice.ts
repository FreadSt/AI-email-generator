import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
	layout: 'desktop' | 'mobile';
}

const initialState: LayoutState = {
	layout: 'desktop',
};

const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		setDesktop: (state) => {
			state.layout = 'desktop';
		},
		setMobile: (state) => {
			state.layout = 'mobile';
		},
	},
});

export const { setDesktop, setMobile } = layoutSlice.actions;
export default layoutSlice.reducer;
