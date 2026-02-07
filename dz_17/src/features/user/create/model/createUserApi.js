import { baseApi } from "@/shared/api/baseApi"
import { apiRoutes } from "@/shared/config/routes/apiRoutes"

export const createUserApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation({
            query: (data) => ({
                url: apiRoutes.users,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    })
})

export const { useCreateUserMutation } = createUserApi
