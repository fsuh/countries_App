import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Countries from "./components/Countries";
import CountriesSingle from "./components/CountriesSingle";
import Home from "./components/Home";
import Layout from "./pages/Layout";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";

import "bootstrap-icons/font/bootstrap-icons.css";
import Favourites from "./components/Favourites";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";
import ProtectedRoute from "./auth/ProtectedRoute";

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/landing" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={<ProtectedRoute user={user}></ProtectedRoute>}
          >
            <Route index element={<Countries />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/favourities" element={<Favourites />} />
            <Route path="/countries/:single" element={<CountriesSingle />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;
