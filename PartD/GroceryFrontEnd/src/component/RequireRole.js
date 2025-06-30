import { Navigate } from "react-router-dom";
const RequireRole = ({allowedRoles, children}) => {
    // const navigate = useNavigate();
    const role = localStorage.getItem('role');
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return ( children );
}
 
export default RequireRole;