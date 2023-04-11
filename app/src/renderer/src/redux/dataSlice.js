import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {}
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    init: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { init } = dataSlice.actions

export default dataSlice.reducer
