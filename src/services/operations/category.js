import toast from "react-hot-toast";
import { apiconnector } from "../utils/apiconnector";
import { categoryEndpoints } from "./api";

const { GET_ALL_CATEGORY } = categoryEndpoints;

export const fetchAllCategories = async () => {
    const toastId = toast.loading("Loading Categories...");
    try {
        const response = await apiconnector("GET", GET_ALL_CATEGORY);
        if (!response?.data?.success) throw new Error("Failed to fetch categories");

        toast.success("Categories fetched successfully");
        return response?.data?.comment;
    } catch (error) {
        console.error("FETCH CATEGORIES ERROR:", error);
        toast.error(error?.response?.data?.message || error.message);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};
