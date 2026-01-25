import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://beck-14-2.onrender.com',
    }),

    tagTypes: ['Doctors', 'Patients', 'Appointments'],

    endpoints: (builder) => ({
        // ============ Doctors

        getAllDoctors: builder.query({
            query: () => '/admin/doctors',
            providesTags: ['Doctors'],
        }),

        getDoctorById: builder.query({
            query: (id) => `/admin/doctors/${id}`,
            providesTags: (result, error, id) => [{ type: 'Doctors', id }],
        }),

        createDoctor: builder.mutation({
            query: (newDoctor) => ({
                url: '/admin/doctors',
                method: 'POST',
                body: newDoctor,
            }),
            invalidatesTags: ['Doctors'],
        }),

        updateDoctor: builder.mutation({
            query: ({ id, ...doctor }) => ({
                url: `/admin/doctors/${id}`,
                method: 'PUT',
                body: doctor,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Doctors', id },
                'Doctors',
            ],
        }),

        patchDoctor: builder.mutation({
            query: ({ id, ...updates }) => ({
                url: `/admin/doctors/${id}`,
                method: 'PATCH',
                body: updates,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Doctors', id },
                'Doctors',
            ],
        }),

        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `/admin/doctors/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Doctors'],
        }),

        // ============ Patients
        getAllPatients: builder.query({
            query: () => '/patients',
            providesTags: ['Patients']
        }),
        getPatientById: builder.query({
            query: (id) => `/patients/${id}`,
            providesTags: (result, error, id) => [{ type: 'Patients', id }]
        }),
        createPatient: builder.mutation({
            query: (newPatien) => ({
                url: '/patients',
                method: 'POST',
                body: newPatien
            }),
            invalidatesTags: ['Patients']
        }),
        updatePatient: builder.mutation({
            query: ({ id, ...patient }) => ({
                url: `/patients/${id}`,
                method: 'PUT',
                body: patient
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Patients', id },
                'Patients'
            ]
        }),
        patchPatient: builder.mutation({
            query: ({ id, ...updates }) => ({
                url: `/patients/${id}`,
                method: 'PATCH',
                body: updates
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Patients', id },
                'Patients'
            ]
        }),
        deletePatient: builder.mutation({
            query: (id) => ({
                url: `/patients/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Patients']
        }),
        // ============ Appointments
        getAppointments: builder.query({
            query: () => '/appointments',
            providesTags: ['Appointments']
        }),
        getAppointmentById: builder.query({
            query: (id) => `/appointments/${id}`,
            providesTags: (result, error, id) => [{ type: 'Appointments', id }]
        }),
        addAppointment: builder.mutation({
            query: (appointment) => ({
                url: '/appointments',
                method: 'POST',
                body: appointment,
            }),
            invalidatesTags: ['Appointments'],
        }),
        updateAppointment: builder.mutation({
            query: ({ id, ...appointment }) => ({
                url: `/appointments/${id}`,
                method: 'PUT',
                body: appointment,
            }),
            invalidatesTags: ['Appointments'],
        }),
        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `/appointments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Appointments'],
        }),
        patchAppointment: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/appointments/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['Appointments'],
        }),
    }),
});

export const {
    useGetAllDoctorsQuery,
    useGetDoctorByIdQuery,
    useCreateDoctorMutation,
    useUpdateDoctorMutation,
    usePatchDoctorMutation,
    useDeleteDoctorMutation,

    useGetAllPatientsQuery,
    useGetPatientByIdQuery,
    useCreatePatientMutation,
    useUpdatePatientMutation,
    usePatchPatientMutation,
    useDeletePatientMutation,

    useGetAppointmentsQuery,
    useGetAppointmentByIdQuery,
    useAddAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation,
    usePatchAppointmentMutation,
} = api;