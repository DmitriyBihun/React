import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AdminRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);

    // Якщо юзер не аторизований - на логін
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Якщо юзер не адмін - на головну
    if (user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // Якщо юзер заблокований
    if (user.isBlocked) {
        return <Navigate to="/" replace />;
    }

    return children;
};