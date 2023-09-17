import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  carpark: {} as {[key: string]: any}
}

const carpark = createSlice({
  name: 'carpark',
  initialState: initialState,
  reducers: {
    setCarpark: (state, action) => {
      state.carpark = action.payload;
    }
  }
})

export const { setCarpark } = carpark.actions
export default carpark.reducer