import { apiProvider } from "../api";
import getQueryFromParams from "../utils/getQueryFromParams";

export async function loginUser(values) {
    try {
        const response = await apiProvider.post(`/auth/login`, values)

        const { data } = response

        return {
            success: true,
            data: data
        }
    } catch (error) {
        console.log(error)
        // return {
        //     success: false,
        //     status: error.response.status,
        //     data: error.response.data.errors
        // };
    }
}


export async function listAwards(query) {
    try{
        const response = await apiProvider.get('/awards', {
            params: getQueryFromParams(query)
        })

        const { data, count } = response.data

        return {
            success: true,
            data: data,
            count: count
        }
    }catch (error){
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}
