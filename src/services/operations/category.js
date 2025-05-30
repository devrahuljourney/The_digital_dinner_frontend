import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { categoryEndpoints } from "../api";

const { GET_ALL_CATEGORY } = categoryEndpoints;

export const fetchAllCategories = async () => {
  const toastId = toast.loading("Loading Categories...");
  try {
    const response = await apiconnector("GET", GET_ALL_CATEGORY);
    console.log("Response:", response);

    
    if (!response?.data?.success) throw new Error("Failed to fetch categories");

    toast.success("Categories fetched successfully");
    return response?.data?.categories;  
  } catch (error) {
    console.error("FETCH CATEGORIES ERROR:", error);

    
    const errorMessage = error?.response?.data?.message || error.message || "An unknown error occurred.";
    toast.error(errorMessage);

    return null;
  } finally {
    toast.dismiss(toastId);
  }
};
