import axios from 'axios';
import { BACKEND_URL } from "../../config";

export const signupReq = async (data: any) => {
    try {
        console.log(data)
        const res = await axios.post(`${BACKEND_URL}/api/auth/signup/`, data);
        return res.data;
    } catch (error: any) {
        const errorData = error.response?.data || {};
        throw new Error(errorData.detail || errorData.username?.[0] || errorData.email?.[0] || "Signup failed");
    }
};