import { AuthContext } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';

const PrivateRoute = ({roles}) => {
    const {user} = useContext(AuthContext);

    if(!user) {
        return <Navigate to="/login" />;
    }
    if(roles && !roles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default PrivateRoute;