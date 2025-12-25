import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default Layout;