import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import Layout from "./pages/Layout/Layout";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import NotFound from "./pages/NotFound";
import Savat from "./pages/Savat/Savat";
import { Context } from "./context";
import { useEffect, useState } from "react";

export default function App() {
  const [cart, setCart] = useState(() => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  return (
    <Context.Provider value={{ cart, setCart }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Products />} />
          <Route path="products/:newId" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/savat" element={<Savat />} />
        </Route>
      </Routes>
    </Context.Provider>
  );
}
