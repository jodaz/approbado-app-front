import { apiProvider, fileProvider } from "../api";
import formDataHandler from '../utils/formDataHandler'

export async function listFiles(page = 1, query ='') {
    try{
        const response = await apiProvider.get('/files', {
            params: {
                query: query,
                page: page
            }
        })

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
