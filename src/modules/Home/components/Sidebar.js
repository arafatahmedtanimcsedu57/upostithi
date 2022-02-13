import React from 'react';
import { LogoCard, ProfileCard, LogoutCard, TeamModal, Teams } from '.';

const Sidebar = ({ currentIp, currentUserState, updateCurrentTeam }) => {
    return (
        <div id="sidebar" className='d-flex flex-column justify-content-between'>
            <div>
                <LogoCard />
                <ProfileCard
                    currentUser={currentUserState}
                />

                <Teams
                    currentIp={currentIp}
                    updateCurrentTeam={updateCurrentTeam}
                    currentUser={currentUserState}
                />
                
            </div>
            <div id="menu">
                <TeamModal />
            </div>
            <div>
                <LogoutCard/>
            </div>
        </div>
    )
}

export default React.memo(Sidebar);