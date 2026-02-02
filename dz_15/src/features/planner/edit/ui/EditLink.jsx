import { Link } from 'react-router'
import style from './EditLink.module.css'

function EditLink({ id }) {
  return <Link to={`/planner/${id}/edit`} className={style.editLink}>Edit</Link>
}

export default EditLink
