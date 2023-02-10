import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    getFavourites(state, action) {},
    addFavourites(state, action) {
      state.favourites = [...state.favourites, action.payload];
      localStorage.setItem("Favourites", JSON.stringify(state.favourites));
    },
    clearFavourites(state, action) {
      localStorage.removeItem("Favourites");
      state.favourites = [];
    },
  },
});

export const { getFavourites, addFavourites, clearFavourites } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
