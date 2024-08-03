import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import BookPage from './pages/BookPage';
import AdminPage from './pages/AdminPage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import DataContext from './context/DataContext';



function App() {
  const [filter, setFilter] = useState({
    y1: 2023,
    y2: 1970,
    r1: 0.0,
    r2: 5.0,
    p1: 1,
    p2: 100,
    c:"",
    search:"",
    ps:"",
    order_by:"title",
    desc:"false"
  })
  const [categories, setCategories] = useState()

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8080/api/categories")
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchCategories()
    .then(categorie => {
        setCategories(categorie)
    })
    .catch(error => {
        console.log("xasame")
    });
  }, [])

  return (
    <BrowserRouter>
      <DataContext.Provider value={{ filter, setFilter, categories }}>
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
