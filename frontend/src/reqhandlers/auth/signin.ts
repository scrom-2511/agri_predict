import { BACKEND_URL } from "@/config";
import axios from "axios";

export const signinReq = async (data: any) => {
    try {
        const res = await axios.post(`${BACKEND_URL}/api/auth/signin/`, data);
        return res.data;
    } catch (error: any) {
        const errorData = error.response?.data || {};
        throw new Error(errorData.detail || errorData.non_field_errors?.[0] || "Signin failed");
    }
};
