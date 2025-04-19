import toast from "react-hot-toast";
import { productEndpoints } from "../api";
import { apiconnector } from "../apiconnector";


const { GET_ALL_PRODUCT_BY_CATEGORY_ID, GET_PRODUCT_BY_PRODUCT_ID } = productEndpoints;

export const fetchProductsByCategory = async (categoryId) => {
    const toastId = toast.loading("Loading Products...");
    try {
        const response = await apiconnector("GET", GET_ALL_PRODUCT_BY_CATEGORY_ID(categoryId));
        console.log("Product", response)
        
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to fetch products");
        }

        toast.success("Products fetched successfully");
        return response?.data?.products;
    } catch (error) {
        console.error("FETCH PRODUCTS ERROR:", error);
        toast.error(error?.message || "An unexpected error occurred");
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};


export const fetchProductById = async (productId) => {
    const toastId = toast.loading("Fetching Product...");
    try {
        const response = await apiconnector("GET", GET_PRODUCT_BY_PRODUCT_ID(productId));
        if (!response?.data?.success) throw new Error("Failed to fetch product");

        toast.success("Product details fetched successfully");
        return response?.data?.product;
    } catch (error) {
        console.error("FETCH PRODUCT BY ID ERROR:", error);
        toast.error(error?.response?.data?.message || error.message);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};
