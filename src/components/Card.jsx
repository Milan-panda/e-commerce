import React from "react";

const Card = ({id, imageURL, name, type, price, currency, color, gender, quantity}) => {
  return (
    <>
      <div key={id} className="w-[30%] rounded-xl group relative card border-solid border-2 m-2 p-2">
        <div>
          <img
            src={imageURL}
            alt={`${color} ${type}`}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between px-1">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="" className="font-bold">
                {name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500 font-semibold">Rs. {price}</p>
          </div>
          <button className="bg-gray-500 text-white p-2">Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default Card;
