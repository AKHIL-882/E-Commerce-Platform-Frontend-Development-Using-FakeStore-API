import React from "react";
import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto mt-6 flex flex-wrap">
      {/* Left: Cart Items */}
      <div className="w-full md:w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {setCart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p>Size: {item.selectedSize}</p>
                  <p>Price: ${item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span>Qty: {item.quantity}</span>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right: Order Summary */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="mb-4">
          <p className="font-semibold">Subtotal: ${calculateSubtotal().toFixed(2)}</p>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter coupon code"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold">Total: ${calculateSubtotal().toFixed(2)}</p>
          <Link to="/checkout">
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Continue to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
