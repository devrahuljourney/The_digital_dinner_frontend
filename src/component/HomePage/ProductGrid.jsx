import { useEffect, useState } from "react";
import { fetchProductsByCategory } from "../../services/operations/productAPI";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
const ProductGrid = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart);

  useEffect(() => {
    if (!categoryId) return;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetchProductsByCategory(categoryId);
        if (res && res.length > 0) {
          setProducts(res);
          setError("");
        } else {
          setError("No products found in this category.");
        }
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]);

  const isInCart = (productId) => {
    return cart.some((item) => item._id === productId);
  };

  const handleCartToggle = (product) => {
    if (isInCart(product._id)) {
      dispatch(removeFromCart(product));
    } else {
      dispatch(addToCart(product));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-[#6C9A8B] text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((prod) => (
        <div key={prod._id} className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <img
            src={prod.image?.[0]}
            alt={prod.name}
            className="w-full h-48 object-cover transition-transform transform hover:scale-105"
          />
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-[#2F2F2F]">{prod.name}</h3>
            <p className="text-sm text-[#7C7C7C]">{prod.description}</p>
            <p className="text-[#FF4E42] font-semibold text-lg">₹{prod.price}</p>
            <button
              onClick={() => handleCartToggle(prod)}
              className={`w-full ${
                isInCart(prod._id) ? "bg-red-500 hover:bg-red-600" : "bg-[#6C9A8B] hover:bg-[#567c6d]"
              } text-white py-3 rounded-lg transition-all duration-300`}
            >
              {isInCart(prod._id) ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
