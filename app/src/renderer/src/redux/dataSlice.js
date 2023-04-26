import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  folders: [],
  created: null,
  updated: null
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    init: (state, action) => {
      state.folders = action.payload.folders
      state.created = action.payload.created
      state.updated = action.payload.updated
    },
    clear: (state, action) => {
      state.folders = initialState.folders
      state.created = initialState.created
      state.updated = initialState.updated
    },
    addFolder: (state, action) => {
      state.folders = [...state.folders, { ...action.payload, id: getRandomId(), cards: [] }]
    },
    removeFolder: (state, action) => {
      state.folders = state.folders.filter((folder) => folder.id !== action.payload)
    },
    updateFolder: (state, action) => {
      state.folders = state.folders.map((folder) => {
        if (folder.id === action.payload.id) {
          return action.payload
        }
        return folder
      })
    },
    addCard: (state, action) => {
      state.folders = state.folders.map((folder) => {
        if (folder.id === action.payload.folderId) {
          return {
            ...folder,
            cards: [...folder.cards, { ...action.payload.card, id: getRandomId(), fav: false }]
          }
        }
        return folder
      })
    },
    removeCard: (state, action) => {
      state.folders = state.folders.map((folder) => {
        if (folder.id === action.payload.folderId) {
          return {
            ...folder,
            cards: folder.cards.filter((card) => card.id !== action.payload.cardId)
          }
        }
        return folder
      })
    },
    updateCard: (state, action) => {
      state.folders = state.folders.map((folder) => {
        if (folder.id === action.payload.folderId) {
          return {
            ...folder,
            cards: folder.cards.map((card) => {
              if (card.id === action.payload.card.id) {
                return action.payload.card
              }
              return card
            })
          }
        }
        return folder
      })
    }
  }
})

const getRandomId = () => {
  return Math.floor(Math.random() * 100000000)
}

export const {
  init,
  clear,
  addFolder,
  updateFolder,
  removeFolder,
  addCard,
  updateCard,
  removeCard
} = dataSlice.actions

export default dataSlice.reducer
