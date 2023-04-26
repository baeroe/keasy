import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  path: '',
  password: '',
  triggerUpdate: false,
  selectedFolder: 0
}

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setPath: (state, action) => {
      state.path = action.payload
    },
    setTriggerUpdate: (state, action) => {
      state.triggerUpdate = action.payload
    },
    selectFolder: (state, action) => {
      state.selectedFolder = action.payload
    }
  }
})

export const { setPassword, setPath, setTriggerUpdate, selectFolder } = optionsSlice.actions

export default optionsSlice.reducer
