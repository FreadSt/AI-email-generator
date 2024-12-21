import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { getPrices, Price } from '../../lib/api/checkout'

interface PricingState {
  prices: Price[]
  loading: boolean
  error: string
}

const initialState: PricingState = {
  prices: [
    {
      id: 'price_1QD5I3RvvFXDgqgE63eOfx0Z',
      name: 'A pinch',
      price: 4.99,
      credits: 20,
      is_top: false,
    },
    {
      id: 'price_1QD5J5RvvFXDgqgEIwLOOkDy',
      name: 'A sprinkle',
      price: 9.99,
      credits: 50,
      is_top: true,
      save_price: 20,
    },
    {
      id: 'price_1QD5JZRvvFXDgqgEApqV4CCU',
      name: 'A handfull',
      price: 16.99,
      credits: 100,
      is_top: false,
      save_price: 32,
    },
  ],
  loading: false,
  error: '',
}

export const fetchPrices = createAsyncThunk(
  'pricing/fetchPrices',
  async (coupon: string | undefined, { rejectWithValue }) => {
    try {
      const response = await getPrices(coupon)
      if (response?.status === 200) {
        return response.data
      }
      return initialState.prices
    } catch (e) {
      const error = e as Error | AxiosError
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data)
        return rejectWithValue(error.response?.data)
      }
      console.log(error.message)
      return rejectWithValue(error.message)
    }
  },
)

const pricingSlice = createSlice({
  name: 'pricing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.loading = false
        state.prices = action.payload
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error on fetching prices'
      })
  },
})

export default pricingSlice.reducer
