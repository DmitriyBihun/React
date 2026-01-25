import { Outlet } from "react-router";
import MainMenu from "../components/MainMenu";

function MainLayout() {
    return (
        <div>

            <header>
                <MainMenu />
            </header>

            <main>
                <Outlet />
            </main>
            
        </div>
    );
}

export default MainLayout;