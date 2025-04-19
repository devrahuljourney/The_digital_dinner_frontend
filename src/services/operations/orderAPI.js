import toast from "react-hot-toast";
import { apiconnector } from "../utils/apiconnector";
import { orderEndpoints } from "./api";

const { CREATE_ORDER, GET_ALL_ORDER } = orderEndpoints;

export const createOrder = async (orderData) => {
    const toastId = toast.loading("Creating Order...");
    try {
        const response = await apiconnector("POST", CREATE_ORDER, orderData);
        if (!response?.data?.success) throw new Error("Order creation failed");

        toast.success("Order created successfully");
        return response?.data?.order;
    } catch (error) {
        console.error("CREATE ORDER ERROR:", error);
        toast.error(error?.response?.data?.message || error.message);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};

export const fetchOrdersByPhone = async (phone) => {
    const toastId = toast.loading("Fetching Orders...");
    try {
        const response = await apiconnector("GET", GET_ALL_ORDER(phone));
        if (!response?.data?.success) throw new Error("Failed to fetch orders");

        toast.success("Orders fetched successfully");
        return response?.data?.orders;
    } catch (error) {
        console.error("FETCH ORDERS ERROR:", error);
        toast.error(error?.response?.data?.message || error.message);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};
