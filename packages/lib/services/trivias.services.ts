import { apiProvider, fileProvider } from "../api";
import formDataHandler from '../utils/formDataHandler'
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listTrivias(query) {
    try{
        const response = await apiProvider.get('/trivias', {
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

export async function createTrivia(data) {
    try{
        const response = await apiProvider.post(`/trivias`, data)

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

export async function editTrivia(id, data) {
    try {
        const formData = await formDataHandler(data)
        const response = await fileProvider.put(`/trivias/${id}`, formData)

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

export async function getTrivia(data) {
    try {
        const response = await apiProvider.get(`/trivias/${data}`)

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

export async function finishTrivia(data) {
    try {
        const subthemesIds = data.themes.map(({ id }) => id)
        const awardsIds = data.themes
            .map(({ award_id }) => award_id)
            .filter((value, index, self) => self.indexOf(value) === index)

        const formData = {
            subthemes_ids: subthemesIds,
            level_id: data.level,
            type: data.type,
            awards_ids: awardsIds
        }

        const response = await apiProvider.post(`/trivias/finish`, formData)

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

export async function deleteTrivia(data) {
    try {
        const response = await apiProvider.delete(`/trivias/${data}`)

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
