import React from "react";
import { getRandomColor, createImageFromInitials } from '../../../utils';

const ProfileCard = ({ currentUser }) => {
    const { currentUser:user, loading } = currentUser;

    return (
        !loading && <div
            id="profile-card"
            className="d-flex pad-8 align-items-center"
        >
            <div className="mar-r-16">
                <img
                    src={
                        user?.photoURL ?
                            user?.photoURL
                            : createImageFromInitials(50, user?.email, getRandomColor())
                    }
                    alt="user"
                    className="shadow border-r-15"
                /> 
            </div>
            <div>
                <div className="fw-regular">{user?.email}</div>
                <div className="fw-light fs-10">{user?.userName}</div>
            </div>
        </div>
    )
}

export default React.memo(ProfileCard);