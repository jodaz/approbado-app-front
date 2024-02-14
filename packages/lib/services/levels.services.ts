import { apiProvider, fileProvider } from "../api";
import formDataHandler from '../utils/formDataHandler'
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listLevels(query) {
    try{
        const response = await apiProvider.get('/configurations/levels', {
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

export async function createLevel(data) {
    try{
        const response = await apiProvider.post(`/configurations/levels`, data)

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

export async function editLevel(id, data) {
    try {
        const formData = await formDataHandler(data)
        const response = await fileProvider.put(`/configurations/levels/${id}`, formData)

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

export async function getLevel(data) {
    try {
        const response = await apiProvider.get(`/configurations/levels/${data}`)

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

export async function deleteLevel(data) {
    try {
        const response = await apiProvider.delete(`/configurations/levels/${data}`)

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
