import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../index'


export const fetchTestEmail = createAsyncThunk('email/fetchTestEmail', async () => {
	const response = await axios.get('/api/ai/gpt/generate-email');
	return response.data;
});

// export const fetchTestEmail = createAsyncThunk('email/fetchTestEmail', async (_, { getState }) => {
// 	const state = getState() as RootState;
// 	const token = state.auth.user?.access_token;
//
// 	const response = await axios.get('/api/ai/gpt/generate-email', {
// 		headers: {
// 			Authorization: `Bearer ${token}`,
// 		},
// 	});
//
// 	return response.data;
// });

const emailSlice = createSlice({
	name: 'email',
	initialState: {
		emailContent: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTestEmail.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTestEmail.fulfilled, (state, action) => {
				state.loading = false;
				state.emailContent = action.payload;
			})
			.addCase(fetchTestEmail.rejected, (state, action) => {
				state.loading = false;
				// @ts-ignore
				state.error = 'Error';
			});
	},
});

export default emailSlice.reducer;
