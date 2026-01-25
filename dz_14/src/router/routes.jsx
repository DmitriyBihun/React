import PatientsList from "../features/patients/PatientsList";
import DoctorsList from "../features/doctors/DoctorsList";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import PatientsForm from "../features/patients/PatientsForm";
import DoctorsForm from "../features/doctors/DoctorsForm";
import AppointmentsList from "../features/appointments/AppointmentsList";
import AppointmentsForm from "../features/appointments/AppointmentsForm";

export const routes = [
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
                meta: { title: 'Головна' }
            },
            {
                path: 'patients',
                meta: { title: 'Пацієнти' },
                children: [
                    {
                        index: true,
                        Component: PatientsList
                    },
                    {
                        path: ':id',
                        Component: PatientsForm
                    },
                    {
                        path: 'new',
                        Component: PatientsForm
                    },
                ]
            },
            {
                path: 'doctors',
                meta: { title: 'Лікарі' },
                children: [
                    {
                        index: true,
                        Component: DoctorsList
                    },
                    {
                        path: ':id',
                        Component: DoctorsForm
                    },
                    {
                        path: 'new',
                        Component: DoctorsForm
                    }
                ]
            },
            {
                path: 'appointments',
                meta: { title: 'Записи на прийом' },
                children: [
                    {
                        index: true,
                        Component: AppointmentsList
                    },
                    {
                        path: 'new',
                        Component: AppointmentsForm
                    },
                    {
                        path: ':id',
                        Component: AppointmentsForm
                    }
                ]
            }
        ]
    }
]