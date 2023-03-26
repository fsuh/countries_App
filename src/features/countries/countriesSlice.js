import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  countries: [],
  filteredCountries: [],
  isLoading: true,
};
const baseUrl = "https://restcountries.com/v3.1/all";

export const getAllCountries = createAsyncThunk(
  "countries/getAllCountries",
  async (name, thunkApI) => {
    try {
      const resp = await axios(baseUrl);
      return resp.data;
    } catch (error) {
      return thunkApI.rejectWithValue("something went wrong");
    }
  }
);

export const filterRegion = (region) => (dispatch, getState) => {
  const countries = getState().countries.countries;
  let filteredCountries = [];

  if (!region) {
    filteredCountries = countries;
  } else {
    filteredCountries = countries.filter(
      (country) => country.region.toLowerCase() === region.toLowerCase()
    );
  }
  dispatch(setFilteredCountries(filteredCountries));
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setFilteredCountries(state, action) {
      state.filteredCountries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countries = action.payload;
        state.filteredCountries = action.payload;
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilteredCountries } = countriesSlice.actions;

export default countriesSlice.reducer;
