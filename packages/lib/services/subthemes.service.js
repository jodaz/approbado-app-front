import { apiProvider } from "../api";
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listSubthemes(query) {
    try {
        const response = await apiProvider.get('/subthemes', {
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

export async function createSubtheme(data) {
    try{
        const response = await apiProvider.post(`/subthemes`, data)

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

export async function editSubtheme(id, data) {
    try {
        const response = await apiProvider.put(`/subthemes/${id}`, data)

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

export async function getSubtheme(data) {
    try {
        const response = await apiProvider.get(`/subthemes/${data}`)

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

export async function deleteSubtheme(data) {
    try {
        const response = await apiProvider.delete(`/subthemes/${data}`)

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
