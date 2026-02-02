import { api, db } from '@/shared/api/baseApi'

export const addItemApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addItem: builder.mutation({
      async queryFn(item) {
        try {
          await db.add(item)
          return { data: true }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: ['PlannerItemsList'],
    }),
  }),
})

export const { useAddItemMutation } = addItemApi
