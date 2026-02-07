import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const deleteUserApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        deleteUser: build.mutation({
            query: (id) => ({
                url: `${apiRoutes.users}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const { useDeleteUserMutation } = deleteUserApi
