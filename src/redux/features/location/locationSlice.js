import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
  locationDetails: {},
  isLoading: false,
};

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setLocationDetails: (state, action) => {
      state.locationDetails = action.payload;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLocations, setLocationDetails, startLoading, stopLoading } =
  locationSlice.actions;
export default locationSlice.reducer;
