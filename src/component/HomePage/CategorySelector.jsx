import { useEffect, useState } from "react";
import { fetchAllCategories } from "../../services/operations/category";

const CategorySelector = ({ selected, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await fetchAllCategories();
        if (Array.isArray(res) && res.length > 0) {
          setCategories(res);
          setError("");
        } else {
          setError("No categories found.");
        }
      } catch (err) {
        console.error("Error loading categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className="flex flex-col items-center py-8 px-4 min-h-[140px] bg-[#FFF8F0] shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-[#2F2F2F] mb-6">Browse by Category</h2>

      {loading && (
        <div className="text-[#6C9A8B] text-lg animate-pulse">
          Loading categories...
        </div>
      )}

      {!loading && error && (
        <div className="text-white bg-red-600 px-4 py-2 rounded-lg text-lg shadow-lg">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="flex flex-wrap gap-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat._id}
              className={`px-6 py-4 rounded-lg text-sm font-medium shadow-xl transition-transform transform hover:scale-110 
                ${selected === cat._id ? "bg-[#FF4E42] text-white" : "bg-[#FFD166] text-[#2F2F2F] hover:bg-[#FF4E42] hover:text-white"}`}
              onClick={() => setSelectedCategory(cat._id)}
            >
              <div className="flex items-center flex-col">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white shadow-md"
                />
                <span className="font-semibold text-lg">{cat.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
