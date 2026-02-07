import { baseApi } from "@/shared/api/baseApi";
import { apiRoutes } from "@/shared/config/routes/apiRoutes";

export const deletePostApi = baseApi.injectEndpoints({
    endpoints: build => ({
        deletePost: build.mutation({
            query: (id) => ({
                url: `${apiRoutes.posts}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
        }),
    })
})

export const { useDeletePostMutation } = deletePostApi