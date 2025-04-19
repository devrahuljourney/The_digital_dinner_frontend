import { useState,useEffect } from "react";
import CategorySelector from "../component/HomePage/CategorySelector";
import ProductGrid from "../component/HomePage/ProductGrid";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    console.log("Category id", selectedCategory)
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <h1 className="text-center text-3xl font-bold pt-6 text-[#2F2F2F]">Welcome to The Digital Diner</h1>
      <CategorySelector selected={selectedCategory} setSelectedCategory={setSelectedCategory} />
      {selectedCategory && <ProductGrid categoryId={selectedCategory} />}
    </div>
  );
};

export default Home;
