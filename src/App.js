import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import BookPage from "./pages/BookPage";
import AdminPage from "./pages/AdminPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import DataContext from "./context/DataContext";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { RequireAuth } from "./utils/auth/RequireAuth";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [filter, setFilter] = useState({
    yearHigh: 2023,
    yearLow: 1970,
    ratingLow: 0.0,
    ratingHigh: 5.0,
    priceLow: 1,
    priceHigh: 150,
    category: "",
    search: "",
    pageSize: "",
    order_by: "title",
    desc: "false",
  });

  const [cart, setCart] = useState([]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <DataContext.Provider value={{ filter, setFilter, cart, setCart }}>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route element={<Layout />}>
              <Route index path="/Home" element={<HomePage />} />
              <Route path="/books/:id" element={<BookPage />} />
              <Route element={<RequireAuth />}>
                <Route path="/Admin" element={<AdminPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/Home" replace />}></Route>
            </Route>
          </Routes>
        </DataContext.Provider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
