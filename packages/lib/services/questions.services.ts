import { apiProvider, fileProvider } from "../api";
import formDataHandler from "../utils/formDataHandler";
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listQuestions(query) {
    try {
        const response = await apiProvider.get('/questions', {
            params: getQueryFromParams(query)
        })

        const { data, count } = response.data

        return {
            success: true,
            data: data,
            count: count
        }
    }catch (error) {
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}

export async function createQuestion(data) {
    try{
        const response = await apiProvider.post(`/questions`, data)

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

export async function uploadQuestionsFile(data) {
    try{
        const formData = await formDataHandler(data)
        const response = await fileProvider.post(`/questions/upload`, formData)

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

export async function editQuestion(id, data) {
    try {
        const response = await apiProvider.put(`/questions/${id}`, data)

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

export async function getQuestion(data) {
    try {
        const response = await apiProvider.get(`/questions/${data}`)

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

export async function deleteQuestion(data) {
    try {
        const response = await apiProvider.delete(`/questions/${data}`)

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
