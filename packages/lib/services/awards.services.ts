import { apiProvider, fileProvider } from "../api";
import formDataHandler from '../utils/formDataHandler'
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listAwards(query) {
    try{
        const response = await apiProvider.get('/awards', {
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

export async function createAward(data) {
    try{
        const formData = await formDataHandler(data, 'file')
        const response = await fileProvider.post(`/awards`, formData)

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

export async function editAward(id, data) {
    try {
        const formData = await formDataHandler(data)
        const response = await fileProvider.put(`/awards/${id}`, formData)

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

export async function getAward(data) {
    try {
        const response = await apiProvider.get(`/awards/${data}`)

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

export async function listAwardsWithSubthemes(id) {
    try {
        const response = await apiProvider.get(`/awards/subthemes/${id}`)

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

export async function deleteAward(data) {
    try {
        const response = await apiProvider.delete(`/awards/${data}`)

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
