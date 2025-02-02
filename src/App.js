import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import BookPage from './pages/BookPage';
import AdminPage from './pages/AdminPage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import DataContext from './context/DataContext';



function App() {
  const [filter, setFilter] = useState({
    yearHigh: 2023,
    yearLow: 1970,
    ratingLow: 0.0,
    ratingHigh: 5.0,
    priceLow: 1,
    priceHigh: 150,
    category:"",
    search:"",
    pageSize:"",
    order_by:"title",
    desc:"false"
  })
  // const [categories, setCategories] = useState()

  // const fetchCategories = async () => {
  //   const response = await fetch("http://localhost:8080/api/categories")
  //   const data = await response.json();
  //   return data;
  // }

  // useEffect(() => {
  //   fetchCategories()
  //   .then(categorie => {
  //       setCategories(categorie)
  //   })
  //   .catch(error => {
  //       console.log("xasame")
  //   });
  // }, [])

  return (
    <BrowserRouter>
      <DataContext.Provider value={{ filter, setFilter }}>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/Home" element={<HomePage />} />
            <Route path="/books/:id" element={<BookPage />} />
            <Route path="/Admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to='/Home' replace />}>
            </Route>
          </Route>
        </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
