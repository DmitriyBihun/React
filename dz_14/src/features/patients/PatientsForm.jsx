import { useNavigate, useParams } from 'react-router';
import {
    useGetPatientByIdQuery,
    useCreatePatientMutation,
    useUpdatePatientMutation,
} from '../api/apiSlice';
import { useEffect, useState } from 'react';
import styles from './PatientsForm.module.css'

function PatientsForm() {

    const { id } = useParams()
    const navigate = useNavigate()

    const isEditMode = !!id;

    const { data: patientData, isLoading: isLoadingPatient } = useGetPatientByIdQuery(id, { skip: !isEditMode });

    const [createPatient] = useCreatePatientMutation();
    const [updatePatient] = useUpdatePatientMutation();

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        birthDate: '',
        address: '',
        notes: '',
    })

    useEffect(() => {
        if (isEditMode && patientData) {
            setForm(patientData)
        }
    }, [patientData, isEditMode])

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updatePatient({ id, ...form }).unwrap()
                alert('Пацієнта оновлено')
            }
            else {
                await createPatient(form).unwrap()
                alert('Пацієнта додано');
            }
            navigate('/patients')
        } catch (err) {
            console.log('Помилка при збереженні: ', err);
        }
    }

    if (isEditMode && isLoadingPatient) return <p>Завантаження...</p>

    return (
        <div className={styles.patientForm}>
            <h2 className={styles.title}>{isEditMode ? 'Редагувати пацієнта' : 'Додати нового пацієнта'}</h2>

            <form onSubmit={handleSubmit}>
                <div className='inputBox'>
                    <label>ПІБ:</label>
                    <input name="fullName" value={form.fullName} onChange={handleChange} required />
                </div>
                <div className='inputBox'>
                    <label>Email:</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} />
                </div>
                <div className='inputBox'>
                    <label>Телефон:</label>
                    <input name="phone" value={form.phone} onChange={handleChange} />
                </div >
                <div className='inputBox'>
                    <label>Дата народження:</label>
                    <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} />
                </div>
                <div className='inputBox'>
                    <label>Адреса:</label>
                    <input name="address" value={form.address} onChange={handleChange} />
                </div>
                <div className='inputBox'>
                    <label>Нотатки:</label>
                    <input name="notes" value={form.notes} onChange={handleChange} />
                </div>
                <div className={styles.buttons}>
                    <button type='submit'>{isEditMode ? 'Зберегти' : 'Додати пацієнта'}</button>
                    <button type='button' onClick={() => navigate('/patients')} className={styles.cancelBtn}>Cкасувати</button>
                </div>
            </form>
        </div>
    );
}

export default PatientsForm;