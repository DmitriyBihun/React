import { api, db } from "@/shared/api/baseApi";

export const itemApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getList: builder.query({
            async queryFn() {
                try {
                    const { data } = await db.getList()
                    return { data }
                } catch (error) {
                    return { error }
                }
            },
            providesTags: ['PlannerItemsList'],
        }),
    }),
})

export const { useGetListQuery } = itemApi