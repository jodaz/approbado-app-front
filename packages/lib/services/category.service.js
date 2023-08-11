import { apiProvider } from "../api";
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listCategories(query) {
    try {
        const response = await apiProvider.get('/configurations/categories', {
            params: getQueryFromParams(query)
        })

        const { data, count } = response.data

        return {
            success: true,
            data: data,
            count: count
        }
    }catch (error) {
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function createCategory(data) {
    try{
        const response = await apiProvider.post(`/configurations/categories`, data)

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

export async function editCategory(id, data) {
    try {
        const response = await apiProvider.put(`/configurations/categories/${id}`, data)

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

export async function getCategory(data) {
    try {
        const response = await apiProvider.get(`/configurations/categories/${data}`)

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

export async function deleteCategory(data) {
    try {
        const response = await apiProvider.delete(`/configurations/categories/${data}`)

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
