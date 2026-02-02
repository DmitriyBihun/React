import { useAddItemMutation } from '@/features/planner/add/model/addApi'
import { useEditItemMutation, useGetItemQuery } from '@/features/planner/edit/model/editApi'
import PlannerForm from '@/shared/components/PlannerForm/ui/PlannerForm'
import { useParams, useNavigate } from 'react-router'
import style from './EditPlanner.module.css'


function EditPlanner() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: item, isLoading } = useGetItemQuery(id, { skip: !id })
  const [editItem, { isLoading: isSaving }] = useEditItemMutation()
  const [addItem, { isLoading: isAdding }] = useAddItemMutation()

  const isEdit = !!id

  if (isLoading || isSaving || isAdding) return <div>Loading...</div>
  if (isEdit && !item) return <div>Dream not found.</div>

  const handleSubmit = async (values) => {
    if (isEdit) {
      await editItem({ id, data: values })
    } else {
      await addItem(values)
    }
    navigate('/planner')
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>
        {isEdit ? 'Editing' : 'New dream'}
      </h1>
      <PlannerForm
        initialValues={item || { description: '', year: '', friend: '' }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default EditPlanner
