import { apiProvider, fileProvider } from "../api";
import formDataHandler from '../utils/formDataHandler'
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listFiles(query) {
    try{
        const response = await apiProvider.get('/files', {
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

export async function createFile(data) {
    try{
        const formData = await formDataHandler(data, 'file')
        const response = await fileProvider.post(`/files`, formData)

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

export async function editFile(id, data) {
    try {
        const formData = await formDataHandler(data)
        const response = await fileProvider.put(`/files/${id}`, formData)

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

export async function getFile(data) {
    try {
        const response = await apiProvider.get(`/files/${data}`)

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

export async function downloadFile(id) {
    try {
        const { data } = await apiProvider.get(`/files/download/${id}`)

        return { success: true, data: data }
    }catch (error){
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function deleteFile(data) {
    try {
        const response = await apiProvider.delete(`/files/${data}`)

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
