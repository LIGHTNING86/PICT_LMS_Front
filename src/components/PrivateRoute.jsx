import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const PrivateRoute = ({ children, roles }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>; // Or any loading spinner
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
