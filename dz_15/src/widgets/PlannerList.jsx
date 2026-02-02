import PlannerCard from "@/entities/planner-item";
import DeleteTodoButton from "@/features/planner/delete/ui/DeleteTodoButton";
import EditLink from "@/features/planner/edit/ui/EditLink";
import style from './PlannerList.module.css'

function PlannerList({ items }) {

    if (!items || items.length === 0) return <p>The dream list is empty.</p>

    return (

        <ol className={style.containerList}>
            {items.map(item => (
                <li key={item.id}>
                    <PlannerCard
                        item={item}
                        actions={[
                            <DeleteTodoButton id={item.id} />,
                            <EditLink id={item.id} />
                        ]} />
                </li>
            ))}
        </ol>

    );
}

export default PlannerList;