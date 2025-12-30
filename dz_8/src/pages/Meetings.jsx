import { useLocation } from 'react-router'
import TeacherCard from '../components/teachers/TeacherCard'

function Meetings() {
  const { state } = useLocation()
  const teachersListForMeetings = state?.teachersListForMeetings
  return (
    <div>
      <h1>Збори</h1>
      {teachersListForMeetings?.length ? (
        <div>
          {teachersListForMeetings.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      ) : (
        <div>Список вчителів не задано.</div>
      )}
    </div>
  )
}

export default Meetings
