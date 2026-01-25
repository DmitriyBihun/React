import { useNavigate, Link } from 'react-router';
import {
    useGetAppointmentsQuery,
    useDeleteAppointmentMutation,
    useGetAllPatientsQuery,
    useGetAllDoctorsQuery,
} from '../api/apiSlice';
import style from './AppointmentsList.module.css'

function AppointmentsList() {
    const navigate = useNavigate();

    const { data: appointments = [], isLoading } = useGetAppointmentsQuery();
    const { data: patients = [] } = useGetAllPatientsQuery();
    const { data: doctors = [] } = useGetAllDoctorsQuery();

    const [deleteAppointment] = useDeleteAppointmentMutation();

    const patientMap = Object.fromEntries(
        patients.map(p => [p.id, p.fullName])
    );

    const doctorMap = Object.fromEntries(
        doctors.map(d => [d.id, d.fullName])
    );

    async function handleDelete(id) {
        if (!id) return;

        if (window.confirm('Видалити запис?')) {
            await deleteAppointment(id).unwrap();
        }
    }

    if (isLoading) return <p>Завантаження...</p>;

    return (
        <div className={style.container}>
            <h1 className={style.title}>Записи на прийом</h1>

            <Link to="new">
                <button>+ Новий запис</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>Пацієнт</th>
                        <th>Лікар</th>
                        <th>Дата</th>
                        <th>Причина</th>
                        <th>Статус</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(app => (
                        <tr key={app.id}>
                            <td>{patientMap[app.patientId] || '—'}</td>
                            <td>{doctorMap[app.doctorId] || '—'}</td>
                            <td>{new Date(app.date).toLocaleString('uk-UA')}</td>
                            <td>{app.reason}</td>
                            <td>{app.status}</td>
                            <td className={style.buttons}>
                                <button onClick={() => navigate(app.id)}>
                                    Редагувати
                                </button>
                                <button onClick={() => handleDelete(app.id)} className={style.deleteBtn}>
                                    Видалити
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentsList;
