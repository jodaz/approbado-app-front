import { apiProvider, fileProvider } from "../api";
import formDataHandler from '../utils/formDataHandler'
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listSchedules(query) {
    try{
        const response = await apiProvider.get('/schedules', {
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

export async function createSchedule(data) {
    try{
        const response = await apiProvider.post(`/schedules`, data)

        return {
            success: true,
            data: response.data,
        }
    }catch (error){
        console.log(error)
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function editSchedule(id, data) {
    try {
        const response = await apiProvider.put(`/schedules/${id}`, data)

        return {
            success: true,
            data: response.data,
        }
    }catch (error){
        console.log(error)
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function getSchedule(data) {
    try {
        const response = await apiProvider.get(`/schedules/${data}`)

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

export async function deleteSchedule(data) {
    try {
        const response = await apiProvider.delete(`/schedules/${data}`)

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
