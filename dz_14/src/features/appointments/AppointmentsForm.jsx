import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
    useAddAppointmentMutation,
    useUpdateAppointmentMutation,
    useGetAppointmentByIdQuery,
    useGetAllPatientsQuery,
    useGetAllDoctorsQuery,
} from '../api/apiSlice';
import style from './AppointmentsForm.module.css'

function AppointmentsForm() {
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();

    const { data: appointment } = useGetAppointmentByIdQuery(id, {
        skip: !isEditMode,
    });

    const { data: patients = [] } = useGetAllPatientsQuery();
    const { data: doctors = [] } = useGetAllDoctorsQuery();

    const [addAppointment] = useAddAppointmentMutation();
    const [updateAppointment] = useUpdateAppointmentMutation();

    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        date: '',
        reason: '',
        status: 'scheduled',
    });

    useEffect(() => {
        if (appointment) {
            setFormData({
                patientId: appointment.patientId,
                doctorId: appointment.doctorId,
                date: appointment.date.slice(0, 16),
                reason: appointment.reason,
                status: appointment.status,
            });
        }
    }, [appointment]);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function generateAppointmentId() {
        return 'a' + Date.now();
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (isEditMode) {
            await updateAppointment({
                id,
                ...formData,
            }).unwrap();
        } else {
            await addAppointment({
                id: generateAppointmentId(),
                ...formData,
            }).unwrap();
        }

        navigate('/appointments');
    }

    return (
        <div className={style.formContainer}>
            <h2 className={style.title}>
                {isEditMode ? 'Редагувати запис' : 'Новий запис'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className='inputBox'>
                    <label>Пацієнт:</label>
                    <select name="patientId" value={formData.patientId} onChange={handleChange} required>
                        <option value="">Оберіть пацієнта</option>
                        {patients.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.fullName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='inputBox'> 
                    <label>Лікар:</label>
                    <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
                        <option value="">Оберіть лікаря</option>
                        {doctors.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.fullName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='inputBox'>
                    <label>Дата і час:</label>
                    <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className='inputBox'>
                    <label>Причина:</label>
                    <input type="text" name="reason" value={formData.reason} onChange={handleChange} required />
                </div>
                <div className='inputBox'>
                    <label>Статус:</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="scheduled">Активний</option>
                        <option value="completed">Завершений</option>
                        <option value="canceled">Скасований</option>
                    </select>
                </div>
                <button type="submit">Зберегти</button>
                <button type="button" onClick={() => navigate('/appointments')}>
                    Скасувати
                </button>
            </form>
        </div>
    );
}

export default AppointmentsForm;
