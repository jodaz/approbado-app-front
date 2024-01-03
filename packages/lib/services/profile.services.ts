import { apiProvider, fileProvider } from "../api";
import formDataHandler from '../utils/formDataHandler'

export async function updateProfile(data) {
    try{
        const values = await formDataHandler(data)
        const response = await fileProvider.post(`/profile`, values)

        return {
            success: true,
            data: response.data,
        }
    }catch (error){
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function getProfile() {
    try {
        const response = await apiProvider.get('/profile')

        return {
            success: true,
            data: response.data,
        }
    }catch (error){
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}
