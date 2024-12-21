import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const generateEmailContent = createAsyncThunk(
	'email/generateEmailContent',
	async (formData: any) => {
		const response = await axios.post('/api/ai/gpt/generate-email', {
			email_description: formData.subject,
			from_name: formData.from,
			to_name: `${formData.toStart}`,
			style: formData.setting
		});
		return response.data;
	}
);
