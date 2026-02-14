import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthUser, selectAuthLoading } from '../../features/auth/api/authSlice'

function UserProtectedRoute({ children }) {
    const user = useSelector(selectAuthUser)
    const loading = useSelector(selectAuthLoading)

    console.log('UserProtectedRoute - user:', user)
    console.log('UserProtectedRoute - loading:', loading)

    if (loading) {
        return <div>Checking authentication...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default UserProtectedRoute