import { useGetListQuery } from '@/entities/planner-item/model/itemApi'
import AddButton from '@/features/planner/add/ui/AddButton'
import PlannerList from '@/widgets/PlannerList'
import style from './PlannerDashboard.module.css'

function PlannerDashboard() {
  const { data: plannerList, isLoading, isError } = useGetListQuery()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Download error!</div>
  return (
    <div className={style.containerDashboard}>
      <AddButton />
      <PlannerList items={plannerList} />
    </div>
  )
}

export default PlannerDashboard
