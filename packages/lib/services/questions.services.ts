import { apiProvider, fileProvider } from "../api";
import formDataHandler from '../utils/formDataHandler'
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listQuestions(query) {
    try{
        const response = await apiProvider.get('/questions', {
            params: getQueryFromParams(query)
        })

        const { data, count } = response.data

        return {
            success: true,
            data: data,
            count: count
        }
    }catch (error){
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function create(data) {
    try{
        const response = await fileProvider.post(`/questions`, data)

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

export async function upload(data) {
    try {
        const formData = await formDataHandler(data, 'file')
        const response = await fileProvider.post(`/questions/upload`, formData)

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

export async function edit(id, data) {
    try {
        const response = await fileProvider.put(`/questions/${id}`, data)

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

export async function get(id) {
    try {
        const response = await apiProvider.get(`/questions/${id}`)

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

export async function remove(id) {
    try {
        const response = await apiProvider.delete(`/questions/${id}`)

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
