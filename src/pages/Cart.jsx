import React, { useContext, useEffect, useState } from "react";
import CartContext from "../utilities/CartContext";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(
      cart.reduce((acc, cart) => {
        return acc + cart.price;
      }, 0)
    );
  }, [cart]);

  const handleDelete = (itemToDelete) => {
    const indexToDelete = cart.indexOf(itemToDelete);
    if (indexToDelete !== -1) {
      cart.splice(indexToDelete, 1);
      setCart([...cart]);
    }
  };

  const handleQuantity = (item) => {
    let qty = [];

    for (let i = 1; i <= item.quantity; i++) {
      qty.push(i);
    }

    return qty;
  };

  // const { id, imageURL, name, price, quantity } = cart;
  return (
    <div className=" w-[30%]">
      {cart.length == 0 ? (
        <h1>Cart is Empty</h1>
      ) : (
        cart.map((item) => (
          <>
            <div
              key={item.id}
              className="flex justify-between border-solid border-2 items-center"
            >
              <img
                src={item.imageURL}
                alt={item.name}
                className="h-[30px] w-[30px]"
              />
              <div>
                <h2>{item.name}</h2>
                <h3>Rs. {item.price}</h3>
              </div>
              <div className="flex border-solid border-2 border-gray-400 h-[fit-content] px-4 py-1">
              <h3>Qty: </h3>
              <select className="outline-none">
                <option value="1">1</option>
                <option value="1">2</option>
                <option value="1">3</option>
              </select>
              </div>
              <button onClick={() => handleDelete(item)}>Delete</button>
            </div>
          </>
        ))
      )}

      {cart.length > 0 && (
        <>
          <hr className="my-4 border-solid border-2 border-black" />
          <div className="text-center">
            <h1 className="text-xl font-bold">
              Total Amount:{" "}
              <span className="font-medium"> Rs.{totalAmount}</span>
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
