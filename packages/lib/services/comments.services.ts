import { apiProvider } from "../api";
import getQueryFromParams from "../utils/getQueryFromParams";

const defaultParams = {
    filter: {},
    perPage: 10,
    page: 0
}

export async function getComments(query = {}) {
    try {
        const { status, data } = await apiProvider.get('/comments', {
            params: getQueryFromParams({ ...defaultParams, ...query })
        })

        return {
            success: true,
            status: status,
            data: data.data,
        }
    }catch (error){
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function getComment(id) {
    try {
        const response = await apiProvider.get(`/comments/${id}`)

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

export async function createComment(values) {
    try {
        const response = await apiProvider.post('/comments', values)

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

export async function editComment(id, values) {
    try {
        const response = await apiProvider.put(`/comments/${id}`, values)

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

export async function deleteComment(id) {
    console.log(id)
    try {
        const response = await apiProvider.delete(`/comments/${id}`)

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
