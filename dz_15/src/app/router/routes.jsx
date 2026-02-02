import MainLayout from "../layouts/MainLayout";
import Home from "@/pages/Home";
import PlannerDashboard from "@/pages/planner/PlannerDashboard";
import EditPlanner from "@/pages/planner/EditPlanner";

export const routes = [
    {
        Component: MainLayout,
        children: [
            {
                path: '/',
                Component: Home,
                meta: { title: '_home' }
            },
            {
                path: '/planner',
                meta: { title: '_dream_planner' },
                children: [
                    {
                        index: true,
                        Component: PlannerDashboard
                    },
                    {
                        path: 'new',
                        Component: EditPlanner
                    },
                    {
                        path: ':id/edit',
                        Component: EditPlanner
                    },
                ]
            }
        ]
    }
]