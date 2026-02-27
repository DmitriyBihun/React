import CoinPage from "../pages/coinPage/ui/CoinPage";
import Dashboard from "../pages/dashboard/Dashboard";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import ProtectedRoute from "../../features/auth/ui/ProtectedRoute";
import Register from "../pages/register/Register";
import { AdminRoute } from "../../features/auth/ui/AdminRoute";
import AdminPanel from "../pages/admin/AdminPanel";


export const routesConfig = [
    {
        index: true,
        label: 'Home',
        element: <Home />
    },
    {
        path: "login",
        label: "Login",
        element: <Login />,
    },
    {
        path: "register",
        label: null,
        element: <Register />,
    },
    {
        path: "dashboard",
        label: "Dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "profile",
        label: "Profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    },
    {
        path: "admin",
        label: "Admin Panel",
        element: (
            <AdminRoute>
                <AdminPanel />
            </AdminRoute>
        ),
    },
    {
        path: "coin/:id",
        label: null,
        element: (
            <ProtectedRoute>
                <CoinPage />
            </ProtectedRoute>
        ),
    },
];