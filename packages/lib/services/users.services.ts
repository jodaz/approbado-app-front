import { apiProvider, fileProvider } from "../api";
import formDataHandler from '../utils/formDataHandler'
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listUsers(query) {
    try{
        const response = await apiProvider.get('/users', {
            params: getQueryFromParams(query)
        })

        const { data, total } = response.data

        return {
            success: true,
            data: data,
            count: total
        }
    } catch (error){
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function createUser(data) {
    try{
        const response = await apiProvider.post(`/users`, data)

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

export async function editTrivia(id, data) {
    try {
        const formData = await formDataHandler(data)
        const response = await fileProvider.put(`/users/${id}`, formData)

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

export async function getUser(id: number) {
    try {
        const response = await apiProvider.get(`/users/${id}`)

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

export async function deleteUser(id: number) {
    try {
        const response = await apiProvider.delete(`/users/${id}`)

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
