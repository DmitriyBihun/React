import Header from "@/widgets/Header";
import { Outlet } from "react-router";

function MainLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}

export default MainLayout;