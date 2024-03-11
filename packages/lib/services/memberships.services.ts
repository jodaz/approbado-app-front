import { apiProvider, fileProvider } from "../api";
import formDataHandler from '../utils/formDataHandler'
import getQueryFromParams from "../utils/getQueryFromParams";

export async function listMemberships(query) {
    try{
        const response = await apiProvider.get('/memberships', {
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
