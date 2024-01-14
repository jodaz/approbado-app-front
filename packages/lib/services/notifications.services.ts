import { apiProvider } from "../api";
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listNotifications(query) {
    try{
        const response = await apiProvider.get('/notifications', {
            params: getQueryFromParams(query)
        })

        const { data, count } = response.data

        return {
            success: true,
            data: data,
            count: count
        }
    } catch (error){
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function getNotification(data) {
    try {
        const response = await apiProvider.get(`/notifications/${data}`)

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

export async function deleteNotification(data) {
    try {
        const response = await apiProvider.delete(`/notifications/${data}`)

        return {
            success: true,
            data: response.data
        }
    }catch (error){
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}
