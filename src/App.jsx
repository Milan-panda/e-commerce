import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import CartContext from "./utilities/CartContext";
import { useState } from "react";

const App = () => {

  const [cartValues, setCartValues] = useState([]);


  return (
    <CartContext.Provider value={
      {
        cart: cartValues,
        setCart: setCartValues
      }
    }>
      <BrowserRouter>
        <header className="w-full flex justify-between items-center bg-gray-100 sm:px-8 px-4 py-4 border-b-[#e6ebf4]">
          <Link to="/">
            <h2>TeeRex</h2>
          </Link>
          <div className="flex">
            <Link to="/products">Products</Link>
            <Link to="/cart" className="ms-4">
              Cart
              <sup>{cartValues.length}</sup>
            </Link>
          </div>
        </header>

        <main className="sm:p-8 px-4 py-8 w-full bg-white min-h-[calc{+(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Navigate to="/products" />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </CartContext.Provider>

  );
};

export default App;
