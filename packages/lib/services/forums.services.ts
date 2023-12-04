import { apiProvider } from "../api";
import getQueryFromParams from "../utils/getQueryFromParams";

const defaultParams = {
    filter: {},
    perPage: 10,
    page: 0
}

export async function getPosts(query = {}) {
    try {
        const { status, data } = await apiProvider.get('/forums', {
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

export async function getUserPosts(id, query = {}) {
    try {
        const response = await apiProvider.get(`/forums/user/${id}`, {
            params: { ...defaultParams, ...query}
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

export async function getForum(id) {
    try {
        const response = await apiProvider.get(`/forums/${id}`)

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

export async function createForum(values) {
    try {
        const response = await apiProvider.post('/forums', values)

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

export async function editForum(values, id) {
    try {
        const response = await apiProvider.put(`/forums/${id}`, values)

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

export async function deletePost(id) {
    try {
        const response = await apiProvider.delete(`/forums/${id}`)

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
