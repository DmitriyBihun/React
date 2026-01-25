import { useNavigate, useParams } from "react-router";
import { useCreateDoctorMutation, useGetDoctorByIdQuery, useUpdateDoctorMutation } from "../api/apiSlice";
import { useEffect, useState } from "react";
import styles from './DoctorsForm.module.css'

function DoctorsForm() {

    const { id } = useParams()
    const navigate = useNavigate()
    const isEditMode = !!id;

    const { data: doctorData, idLoading: isLoadingDoctor } = useGetDoctorByIdQuery(id, { skip: !isEditMode })
    const [createDoctor] = useCreateDoctorMutation();
    const [updateDoctor] = useUpdateDoctorMutation();

    const [form, setForm] = useState({
        fullName: '',
        specialty: '',
        email: '',
        phone: '',
        room: '',
        notes: '',
    });

    useEffect(() => {
        if (isEditMode && doctorData) {
            setForm(doctorData);
        }
    }, [doctorData, isEditMode]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateDoctor({ id, ...form }).unwrap();
                alert('Лікаря оновлено!');
            } else {
                await createDoctor(form).unwrap();
                alert('Лікаря додано!');
            }
            navigate('/doctors');
        } catch (err) {
            alert('Помилка при збереженні: ', err);
        }
    };

    if (isEditMode && isLoadingDoctor) return <div>Завантаження...</div>;

    return (
        <div className={styles.doctorForm}>
            <h2 className={styles.title}>{isEditMode ? 'Редагувати лікаря' : 'Додати нового лікаря'}</h2>

            <form onSubmit={handleSubmit}>
                <div className='inputBox'>
                    <label>ПІБ</label>
                    <input name="fullName" value={form.fullName} onChange={handleChange} required />
                </div>
                <div className='inputBox'>
                    <label>Спеціальність</label>
                    <input name="specialty" value={form.specialty} onChange={handleChange} required />
                </div>
                <div className='inputBox'>
                    <label>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} />
                </div>
                <div className='inputBox'>
                    <label>Телефон</label>
                    <input name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <div className='inputBox'>
                    <label>Кабінет</label>
                    <input name="room" value={form.room} onChange={handleChange} />
                </div>
                <div className='inputBox'>
                    <label>Нотатки</label>
                    <input name="notes" value={form.notes} onChange={handleChange} />
                </div>

                <div className={styles.buttons}>
                    <button type="submit">{isEditMode ? 'Зберегти зміни' : 'Додати лікаря'}</button>
                    <button type="button" onClick={() => navigate('/doctors')} className={styles.cancelBtn}>Скасувати</button>
                </div>
            </form>
        </div>
    );

}

export default DoctorsForm;