import DbOperations from "../services/DbOperations";
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const db = new DbOperations('planner')

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['PlannerItem', 'PlannerItemsList'],
    endpoints: () => ({})
})