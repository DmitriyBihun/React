import { useGetAllPatientsQuery, useDeletePatientMutation } from "../api/apiSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import PatientItem from "./PatientItem";
import styles from './PatientsList.module.css'


function PatientsList() {

    const { data: patients = [], isLoading, error } = useGetAllPatientsQuery()
    const [deletePatient] = useDeletePatientMutation()

    const navigate = useNavigate()

    async function handleDelete(id) {
        try {
            await deletePatient(id).unwrap()
        } catch (err) {
            console.log('Помилка при видаленні: ', err)
        }
    }

    if (isLoading) return <div>Загрузка пацієнтів...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={styles.patientsContainer}>
            <h2 className={styles.title}>Список пацієнтів</h2>

            <Link to='/patients/new' className={styles.addPatientBtn}>
                <button>+ Додати нового пацієнта</button>
            </Link>

            {patients.length === 0 ? (
                <p>Список пацієнтів порожній</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ФІО</th>
                            <th>Дата народження</th>
                            <th>Телефон</th>
                            <th>Email</th>
                            <th>Адреса</th>
                            <th>Нотатки</th>
                        </tr>
                    </thead>

                    <tbody>
                        {patients.map(patient => (
                            <PatientItem key={patient.id}
                                patient={patient}
                                onEdit={() => navigate(`/patients/${patient.id}`)}
                                onDelete={() => handleDelete(patient.id)}
                            />
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
}

export default PatientsList;