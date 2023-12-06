import { apiProvider } from "../api";
import getQueryFromParams from "../utils/getQueryFromParams";

const defaultParams = {
    filter: {},
    perPage: 10,
    page: 0
}

export async function listReports(query = {}) {
    try {
        const { status, data } = await apiProvider.get('/reports', {
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

export async function listReportReasons(query = {}) {
    try {
        const { status, data } = await apiProvider.get('/report-reasons', {
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
