import { apiProvider } from "../api";

export async function loginUser(values) {
    console.log(values)
    try {
        const response = await apiProvider.post(`/auth/login`, values)
        
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

export async function loginAdmin(values) {
    try {
        console.log(values)
        const response = await apiProvider.post(`/auth/admin-login`, values)

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

export async function createAccountStep1(values) {
    try {
        const response = await apiProvider.post(`/auth/mobile/create-account-verification`, values)

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

export async function socialLoginRequest(values) {
    try {
        const response = await apiProvider.post('/auth/mobile/external', values)
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

export async function getUserProfile() {
    try {
        const response = await apiProvider.get('/auth/user')
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
