import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import toast from "react-hot-toast";
import axios from "axios";
import { removeFromCart, resetCart } from "../slices/cartSlice";
import { createOrder } from "../services/operations/orderAPI";


const Cart = () => {
  const dispatch = useDispatch();
  const { cart, total, totalItems } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
    toast.success("Item removed from cart");
  };

  const handleBuyNow = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields (name, phone, address)");
      return;
    }

    const payload = {
      ...formData,
      cartItems: cart.map((item) => ({
        ...item,
        quantity: item.quantity || 1, 
        menu_item_id: item._id,
      })),
    };

    try {
      const res = await createOrder(payload); 
      if (res.data.success) {
        toast.success("Order placed successfully");
        dispatch(resetCart());
        setFormData({ name: "", email: "", phone: "", address: "" });
      } else {
        toast.error(res.data.message || "Failed to place order");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#2F2F2F]">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-lg text-[#7C7C7C]">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center bg-white shadow p-4 rounded-lg">
                <img src={item.image?.[0]} alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-[#7C7C7C]">₹{item.price} × {item.quantity || 1}</p>
                </div>
                <button
                  onClick={() => handleRemove(item)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total & Checkout */}
          <div className="mt-8 p-6 bg-[#FFF8F0] rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-[#2F2F2F]">Total Items: {totalItems}</h2>
            <h2 className="text-xl font-semibold text-[#2F2F2F]">Total Price: ₹{total}</h2>

            <form className="grid grid-cols-1 gap-4 mt-4">
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email (optional)"
                value={formData.email}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
              />
              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
                required
              />
              <textarea
                name="address"
                placeholder="Delivery Address"
                value={formData.address}
                onChange={handleChange}
                className="border px-4 py-2 rounded"
                required
              ></textarea>
            </form>

            <button
              onClick={handleBuyNow}
              className="mt-4 bg-[#FF4E42] hover:bg-[#e74438] text-white py-3 px-6 rounded-lg transition-all"
            >
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
