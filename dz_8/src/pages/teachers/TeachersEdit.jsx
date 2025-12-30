import { useNavigate, useParams } from "react-router"
import useForm from "../../hooks/useForm"
import { useEffect } from "react"
import axios from "axios"
import apiRoutes from "../../api/apiRoutes"
import style from "./TeachersEdit.module.css"

function TeachersEdit() {
  const { id } = useParams() 
  const navigate = useNavigate()
  const { values, handleChange, setValues } = useForm({
    name: '',
    subject: '',
    photo: ''
  })

  useEffect(() => {
    const fetchTeacher = async () => {
      if (!id) return
      try {
        const res = await axios.get(apiRoutes.getTeacherById(id))
        setValues(res.data)
      } catch (error) {
        console.error('Ошибка при получении учителя:', error)
      }
    }

    fetchTeacher()
  }, [id, setValues])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if(id) {
        await axios.put(apiRoutes.updateTeacher(id), values)
      }
      else {
        await axios.post(apiRoutes.addTeacher, values)
      }
      navigate('/teachers')
    } catch (error) {
      console.error('Помилка при додаванні:', error)
    }
  }


  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Ім'я"
        required
        className={style.input}
      />
      <input
        name="subject"
        value={values.subject}
        onChange={handleChange}
        placeholder="Предмет"
        required
        className={style.input}
      />
      <input
        name="photo"
        value={values.photo}
        onChange={handleChange}
        placeholder="Фото (URL)"
        className={style.input}
      />
      <button type="submit">{id ? 'Зберегти' : 'Додати'}</button>
    </form>
  )
}

export default TeachersEdit
