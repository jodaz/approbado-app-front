import { apiProvider, fileProvider } from "../api";
import getQueryFromParams from "../utils/getQueryFromParams";

const defaultParams = {
    filter: {},
    perPage: 10,
    page: 0
}

export async function getChats(query = {}) {
    try {
        const response = await apiProvider.get('/chats', {
            params: getQueryFromParams({ ...defaultParams, ...query })
        })

        return {
            success: true,
            status: response.status,
            data: response.data.data,
        }
    }catch (error){
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function sendMessage(id: number, values: any) {
    try {
        console.log(values)
        const response = await fileProvider.post(`/chats/${id}/messages`, values)

        return {
            success: true,
            status: response.status,
            data: response.data.data,
        }
    }catch (error){
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function sendInvitation(values) {
    try {
        const response = await apiProvider.post('/chats', values)

        return {
            success: true,
            status: response.status,
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

export async function getSingleChat(id: number) {
    try {
        const response = await apiProvider.get(`/chats/${id}`)

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

export async function deleteChat(id: number) {
    try {
        const response = await apiProvider.delete(`/chat/${id}`)

        return {
            success: true,
            status: response.status,
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
