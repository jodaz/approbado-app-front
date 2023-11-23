import { apiProvider, fileProvider } from "../api";
import formDataHandler from '../utils/formDataHandler'

const defaultParams = {
    filter: {},
    perPage: 10,
    page: 0
}

export async function getChats({ query = defaultParams }) {
    try {
        const response = await apiProvider.get('/chats', {
            params: query
        })

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

export async function getSingleChat({ id }) {
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

export async function deleteChat({ id }) {
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
