import { apiProvider } from "../api";

export async function resetPassword(values) {
    try {
        const { data, status } = await apiProvider.post(`/reset-password/mobile`, values)

        return {
            success: true,
            data: data,
            status: status
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function verifyToken(values) {
    try {
        const { data, status } = await apiProvider.get(`/reset-password`, {
            params: values
        })

        return {
            success: true,
            data: data,
            status: status
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function setNewPassword(values) {
    try {
        const response = await apiProvider.put(`/reset-password`, values)

        const { data } = response

        return {
            success: true,
            data: data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}
