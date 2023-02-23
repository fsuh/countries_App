import { createSlice } from "@reduxjs/toolkit";

const favourites =
  localStorage.getItem("Favourites") !== null
    ? JSON.parse(localStorage.getItem("Favourites"))
    : [];

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: favourites,
  },
  reducers: {
    getFavourites(state, action) {},
    addFavourites(state, action) {
      state.favourites = [...state.favourites, action.payload];
      localStorage.setItem("Favourites", JSON.stringify(state.favourites));
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (item) => item !== action.payload
      );
    },
    clearFavourites(state, action) {
      localStorage.removeItem("Favourites");
      state.favourites = [];
    },
  },
});

export const {
  getFavourites,
  addFavourites,
  clearFavourites,
  removeFavourite,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
