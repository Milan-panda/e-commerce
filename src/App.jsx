import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-gray-100 sm:px-8 px-4 py-4 border-b-[#e6ebf4]">
        <Link to="/">
          <h2>TeeRex</h2>
        </Link>
        <div className="flex">
          <Link to="/products">Products</Link>
          <Link to="/cart" className="ms-4">
            Cart
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
  );
};

export default App;
