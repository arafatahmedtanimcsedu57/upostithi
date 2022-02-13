import React from "react";
import { useHistory } from "react-router-dom";
import { logout, useAuth } from '../../../contexts/AuthContext';

const LogoutCard = () => {
    const { dispatch: authDispatch } = useAuth();
    const history = useHistory()

    const handleLogout = () => logout(authDispatch, (err)=>!err && history.push("/login"))
    
    return (
        <div
            id="logout-card"
            onClick={() => handleLogout()}
            className="d-flex align-items-center fw-medium fs-14"
        >
            Logout
        </div>
    )
}

export default LogoutCard;