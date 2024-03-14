import { apiProvider } from "../api";
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listPlans(query) {
    try{
        const response = await apiProvider.get('/memberships/plans', {
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

export async function createPlan(data) {
    try{
        const response = await apiProvider.post(`/memberships/plans`, data)

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

export async function editPlan(id, data) {
    try {
        const response = await apiProvider.put(`/memberships/plans/${id}`, data)

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

export async function getPlan(data) {
    try {
        const response = await apiProvider.get(`/memberships/plans/${data}`)

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

export async function deletePlan(data) {
    try {
        const response = await apiProvider.delete(`/memberships/plans/${data}`)

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
