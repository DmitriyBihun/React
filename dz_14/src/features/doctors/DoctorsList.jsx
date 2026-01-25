import { useDeleteDoctorMutation, useGetAllDoctorsQuery } from "../api/apiSlice";
import DoctorItem from "./DoctorItem";
import { Link, useNavigate } from "react-router";
import styles from './DoctorsList.module.css'

const DoctorsList = () => {
    const { data: doctors = [], isLoading, error } = useGetAllDoctorsQuery();
    const [deleteDoctor] = useDeleteDoctorMutation()

    const navigate = useNavigate()

    async function handleDelete(id) {
        try {
            await deleteDoctor(id).unwrap()
        } catch (err) {
            console.log('Помилка при видаленні: ', err);
        }
    }

    if (isLoading) return <div>Завантаження лікарів...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={styles.doctorsContainer}>
            <h2 className={styles.title}>Список лікарів</h2>

            <Link to='/doctors/new' className={styles.addDoctorBtn}>
                <button>+ Додати нового лікаря</button>
            </Link>

            {doctors.length === 0 ? (
                <p>Список лікарів пустий</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ФІО</th>
                            <th>Спеціальність</th>
                            <th>Телефон</th>
                            <th>Email</th>
                            <th>Кабінет</th>
                            <th>Нотатки</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map(doctor => (
                            <DoctorItem key={doctor.id}
                                doctor={doctor}
                                onEdit={() => navigate(`/doctors/${doctor.id}`)}
                                onDelete={() => handleDelete(doctor.id)} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DoctorsList;