import { apiProvider } from "../api";

export async function loginUser(values) {
    try {
        const response = await apiProvider.post(`/auth/login`, values)

        const { data } = response

        return {
            success: true,
            data: data
        }
    } catch (error) {
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function getCode(values) {
    try {
        const response = await apiProvider.post(`/auth/send`, values)

        const { data } = response

        return {
            success: true,
            data: data
        }
    } catch (error) {
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function registerAndValidateCode(values) {
    try {
        const response = await apiProvider.post(`/auth/register`, values)

        const { data } = response

        return {
            success: true,
            data: data
        }
    } catch (error) {
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}
