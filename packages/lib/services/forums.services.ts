import { apiProvider } from "../api";

const defaultParams = {
    filter: {},
    perPage: 10,
    page: 0
}

export async function getForums({ query = defaultParams }) {
    try {
        const response = await apiProvider.get('/forums', {
            params: query
        })

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

export async function getForumsByUser({ query = defaultParams, id }) {
    try {
        const response = await apiProvider.get(`/forums/user/${id}`, {
            params: query
        })

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

export async function getForum({ id }) {
    try {
        const response = await apiProvider.get(`/forums/${id}`)

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

export async function createForum(values) {
    try {
        const response = await apiProvider.post('/forums', values)

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

export async function editForum({ values, id }) {
    try {
        const response = await apiProvider.put(`/forums/${id}`, values)

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

export async function deleteForum({ id }) {
    try {
        const response = await apiProvider.delete(`/forums/${id}`)

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
