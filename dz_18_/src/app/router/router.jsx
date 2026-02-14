import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/home/Home";
import Products from "../../pages/products/Products";
import Login from "../../pages/login/Login";
import MainLayout from "../layouts/MainLayout";
import ProductEdit from "../../pages/products/ProductEdit";
import AdminProtectedRoute from "../../shared/lib/AdminProtectedRoute";
import UserProtectedRoute from '../../shared/lib/UserProtectedRoute'
import SignUp from "../../pages/signup/SignUp";
import Cart from "../../pages/cart/Cart";
import Favourites from "../../pages/favorites/Favorites";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'products',
                element: (
                    <Products />
                ),
            },
            {
                path: 'products/new',
                element: (
                    <AdminProtectedRoute>
                        <ProductEdit />
                    </AdminProtectedRoute>
                ),
            },
            {
                path: 'products/:id/edit',
                element: (
                    <AdminProtectedRoute>
                        <ProductEdit />
                    </AdminProtectedRoute>
                ),
            },
            {
                path: 'favourites',
                element: (
                    <UserProtectedRoute>
                        <Favourites />
                    </UserProtectedRoute>
                ),
            },
            {
                path: 'cart',
                element: (
                    <UserProtectedRoute>
                        <Cart />
                    </UserProtectedRoute>
                )
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'signup', 
                element: <SignUp />,
            },
        ],
    },
])