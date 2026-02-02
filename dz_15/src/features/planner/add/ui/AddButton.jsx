import { Link } from "react-router"
import style from './AddButton.module.css'

function AddButton() {
  return <Link to="/planner/new" className={style.addBtn}>+ Add dream</Link>
}

export default AddButton
