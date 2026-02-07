import { baseApi } from "@/shared/api/baseApi"
import { apiRoutes } from "@/shared/config/routes/apiRoutes"

export const createPostApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createPost: build.mutation({
            query: (data) => ({
                url: apiRoutes.posts,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Post'],
        }),
    }),
})

export const { useCreatePostMutation } = createPostApi