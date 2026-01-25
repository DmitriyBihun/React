import styles from './PatientItem.module.css'

function PatientItem({ patient, onEdit, onDelete }) {
    return (
        <tr>
            <td>{patient.fullName}</td>
            <td>{patient.birthDate}</td>
            <td>{patient.phone}</td>
            <td>{patient.email}</td>
            <td>{patient.address}</td>
            <td>{patient.notes}</td>
            <td className={styles.buttons}>
                <button onClick={onEdit}>Редагувати</button>
                <button onClick={onDelete} className={styles.deleteBtn}>Видалити</button>
            </td>
        </tr>
    );
}

export default PatientItem;