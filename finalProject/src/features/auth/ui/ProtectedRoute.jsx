import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.auth);

    // Якщо юзер не авторизований - редирект на логін
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Якщо юзер заблокований
    if (user.isBlocked) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;