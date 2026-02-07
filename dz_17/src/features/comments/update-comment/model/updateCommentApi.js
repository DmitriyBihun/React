import { baseApi } from "@/shared/api/baseApi";
import { apiRoutes } from "@/shared/config/routes/apiRoutes";

export const updateCommentApi = baseApi.injectEndpoints({
    endpoints: build => ({
        updateComment: build.mutation({
            query: ({ id, data }) => ({
                url: `${apiRoutes.comments}/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Comment', id: arg.postId },
            ],
        })
    })
})

export const { useUpdateCommentMutation } = updateCommentApi