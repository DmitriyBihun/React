import { api, db } from '@/shared/api/baseApi'

export const editItemApi = api.injectEndpoints({
  endpoints: (builder) => ({
    editItem: builder.mutation({
      async queryFn({ id, data }) {
        try {
          await db.update(id, data)
          return { data: true }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'PlannerItem', id },
        'PlannerItemsList',
      ],
    }),
    getItem: builder.query({
      async queryFn(id) {
        try {
          const data = await db.getById(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (result, error, id) => [{ type: 'PlannerItem', id }],
    }),
  }),
})

export const { useEditItemMutation, useGetItemQuery } = editItemApi
