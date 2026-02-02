import { useDeleteItemMutation } from '../model/deleteApi'

function DeleteTodoButton({ id }) {
  const [deleteItem, { isLoading }] = useDeleteItemMutation()
  const handleDelete = async () => {
    if (confirm('Are you shure?')) {
      try {
        await deleteItem(id)
      } catch {
        alert('Error!')
      }
    }
  }
  const buttonTitle = isLoading ? 'Deleting ...' : 'Delete'
  return <button onClick={handleDelete}>{buttonTitle}</button>
}

export default DeleteTodoButton
