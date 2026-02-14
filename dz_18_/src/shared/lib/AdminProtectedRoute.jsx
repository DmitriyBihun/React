import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthUser, selectAuthLoading } from '../../features/auth/api/authSlice'

function AdminProtectedRoute({ children }) {
    const user = useSelector(selectAuthUser)
    const loading = useSelector(selectAuthLoading)

    console.log('AdminProtectedRoute - user:', user)
    console.log('AdminProtectedRoute - loading:', loading)
    console.log('AdminProtectedRoute - user?.role:', user?.role)

    if (loading) {
        return <div>Checking authentication...</div>
    }

    // Якщо немає користувача АБО користувач є але без участі - чекаємо на refresh?
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Якщо користувач є, але немає ролі - можливо, ще не підвантажили з Firestore
    if (user && !user.role) {
        return <div>Loading user role...</div>
    }

    if (user.role !== 'admin') {
        return <Navigate to="/products" replace />
    }

    return children
}

export default AdminProtectedRoute