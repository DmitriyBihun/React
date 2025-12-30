import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import useTeachersApi from '../../hooks/useTeachersApi'
import TeacherCard from '../../components/teachers/TeacherCard'
import frontRoutes from '../../routes/frontRoutes'
import axios from 'axios'
import apiRoutes from '../../api/apiRoutes'
import style from './TeachersList.module.css'

function TeachersList() {
  const [selectedTeachersIdList, setSelectedTeachersIdList] = useState([])
  const navigate = useNavigate()

  const {
    data: teachersList,
    isLoading,
    error,
    fetchTeachers,
  } = useTeachersApi()

  useEffect(() => {
    fetchTeachers()
  }, [fetchTeachers])

  const onSelect = (teacherId) => {
    setSelectedTeachersIdList((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId]
    )
  }

  const handleDelete = async (teacherId) => {
    try {
      await axios.delete(apiRoutes.deleteTeacher(teacherId))
      fetchTeachers()
    } catch (error) {
      console.error('Помилка при видаленні:', error)
    }
  }

  const handleEdit = (teacherId) => {
    navigate(frontRoutes.navigate.teachers.edit.replace(':id', teacherId))
  }

  const gotoMeetings = () => {
    const selectedTeachers = teachersList.filter((teacher) =>
      selectedTeachersIdList.includes(teacher.id)
    )

    navigate(frontRoutes.navigate.meeting, {
      state: { teachersListForMeetings: selectedTeachers },
    })
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <div className={style.wrapper}>
      <div className={style.buttons}>
        <button onClick={() => navigate(frontRoutes.navigate.teachers.add)}>
          + Додати вчителя
        </button>

        {!!selectedTeachersIdList.length && (
          <button onClick={gotoMeetings}>
            {`Викликати (${selectedTeachersIdList.length}) вчителів на збори`}
          </button>
        )}
      </div>

      {teachersList.length === 0 ? (
        <div>Список порожній</div>
      ) : (
        teachersList.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            onSelect={onSelect}
            isSelected={selectedTeachersIdList.includes(teacher.id)}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}
    </div>
  )
}

export default TeachersList
