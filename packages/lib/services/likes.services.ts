import { apiProvider } from "../api";

export async function likePost(id) {
    try {
        const { status, data } = await apiProvider.put(`/like-posts/${id}`)

        return {
            success: true,
            status: status,
            data: data.data,
        }
    }catch (error){
        return {
            success: false,
            status: error.response.status,
            data: error.response.data.errors
        };
    }
}
