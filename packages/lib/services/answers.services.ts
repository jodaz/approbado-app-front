import { apiProvider } from "../api";

export async function sendAnswer(data) {
    try{
        const response = await apiProvider.post(`/answers`, data)
        console.log("options ", response.data)

        return {
            success: true,
            data: response.data,
        }
    }catch (error){
        console.log(error)
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}
