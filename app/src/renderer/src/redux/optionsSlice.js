import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    path: '',
    password: ''
  }
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setPassword: (state, action) => {
      state.value.password = action.payload
    },
    setPath: (state, action) => {
      state.value.path = action.payload
    },
    setOptions: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setPassword, setPath, setOptions } = dataSlice.actions

export default dataSlice.reducer
