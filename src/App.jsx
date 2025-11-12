import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import Layout from "./pages/Layout/Layout";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import NotFound from "./pages/NotFound";
import Savat from "./pages/Savat/Savat";
import { Context } from "./context";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Saralangan from "./pages/saralangan/saralangan";

export default function App() {
  const [cart, setCart] = useState(() => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  });

  const [like, setLike] = useState(() => {
    const like = localStorage.getItem("like");
    return like ? JSON.parse(like) : [];
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  useEffect(() => {
    if (like) {
      localStorage.setItem("like", JSON.stringify(like));
    } else {
      localStorage.removeItem("like");
    }
  }, [like]);

  return (
    <>
      <Context.Provider value={{ cart, setCart, like, setLike }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Products />} />
            <Route path="products/:newId" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/savat" element={<Savat />} />
            <Route path="/saralangan" element={<Saralangan />} />
          </Route>
        </Routes>
      </Context.Provider>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
