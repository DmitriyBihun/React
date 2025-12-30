import styles from './TeacherCard.module.css'

function TeacherCard({ teacher, onSelect, isSelected, onDelete, onEdit }) {

  return (
    <div className={styles.container}>

      <div className={styles.section1}>
        <img src={teacher.photo} alt="teacher" />
        <div>
          <div>{teacher.name}</div>
          <div>{`${teacher.subject}`}</div>
        </div>
      </div>

      <div className={styles.section2}>
        {onSelect && (
          <button onClick={() => onSelect(teacher.id)} className={styles.buttonBasic}>
            {isSelected ? 'Вибраний' : 'Вибрати'}
          </button>
        )}

        {onEdit && (
          <button onClick={() => onEdit(teacher.id)} className={styles.buttonBlue}>
            Редагувати
          </button>
        )}

        {onDelete && (
          <button onClick={() => onDelete(teacher.id)} className={styles.buttonRed}>
            Видалити
          </button>
        )}
      </div>
    </div>
  )
}

export default TeacherCard
