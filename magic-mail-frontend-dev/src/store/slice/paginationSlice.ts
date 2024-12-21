import { createSlice } from '@reduxjs/toolkit'

interface PaginationState {
  page: number
}

const initialState: PaginationState = {
  page: 0,
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
})

export const { setPage } = paginationSlice.actions
export default paginationSlice.reducer
