import { apiProvider } from "../api";

export async function updateSettings(values: any) {
    try {
        const { data } = await apiProvider.post(`/profile`, values)

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

export async function deleteAccount() {
    try {
        const response = await apiProvider.get(`/auth/delete-account`)

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

export async function updatePassword(values: any) {
    try {
        const response = await apiProvider.post(`/update-password`, values)

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
