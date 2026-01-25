import styles from './DoctorItem.module.css'

function DoctorItem({ doctor, onEdit, onDelete }) {
    return (
        <tr>
            <td>{doctor.fullName}</td>
            <td>{doctor.specialty}</td>
            <td>{doctor.phone}</td>
            <td>{doctor.email}</td>
            <td>{doctor.room}</td>
            <td>{doctor.notes}</td>
            <td className={styles.buttons}>
                <button onClick={onEdit}>Редагувати</button>
                <button onClick={onDelete} className={styles.deleteBtn}>Видалити</button>
            </td>
        </tr>
    );
}

export default DoctorItem;