import { apiProvider } from "../api";
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listReports(query = {}) {
    try{
        const response = await apiProvider.get('/reports', {
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

export async function listReportReasons(query = {}) {
    try{
        const response = await apiProvider.get('/report-reasons', {
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

export async function getReport(id) {
    try {
        const response = await apiProvider.get(`/reports/${id}`)

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

export async function getReportReason(id) {
    try {
        const response = await apiProvider.get(`/report-reasons/${id}`)

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

export async function createReport(values) {
    try {
        const response = await apiProvider.post('/reports', values)

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

export async function editReport(values, id) {
    try {
        const response = await apiProvider.put(`/reports/${id}`, values)

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

export async function deleteReport(id) {
    try {
        const response = await apiProvider.delete(`/reports/${id}`)

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
