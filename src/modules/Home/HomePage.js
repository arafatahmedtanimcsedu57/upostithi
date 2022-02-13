import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

import { Sidebar, Team, Location } from './components';

import { getProfile, useAuth } from '../../contexts/AuthContext'; 
    
import ClipArt from './img/ClipArt.svg';
import './styles/index.scss';


const HomePage = () => {
    const [currentTeam, setCurrentTeam] = useState(null);
    const [ip, setIP] = useState('');
   
    const { state: userState, dispatch: userDispatch } = useAuth();
    const { currentUser, loading } = userState;

    const getNetworkData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
    }

    const getCurrentProfile = useCallback(() => {
        getProfile(userDispatch, (err) => err && console.log(err))
    }, [userDispatch]);

    useEffect(() => {
        getNetworkData();
        getCurrentProfile();
        
        return () => {
            setIP('')
        }

    }, [getCurrentProfile]);

    const updateCurrentTeam = (teamId) => setCurrentTeam(teamId);

    return (
        currentUser?._id ? <>
            {console.log(ip)}
            <div
                id='home-layout'
                style={{ 
                    backgroundImage: `url(${ClipArt})` 
                }}
            >
                <div className='d-flex flex-wrap'>
                    <Sidebar
                        currentIp={ip}
                        currentUserState={userState}
                        updateCurrentTeam={updateCurrentTeam}
                    />
                    
                    {currentTeam
                        ? <Team
                            currentTeam={currentTeam}
                            updateCurrentTeam={updateCurrentTeam}
                        />
                        : <div id="map-layout">
                            <Location />
                        </div>
                    }
                </div>
            </div>
        </>: <></>
    )
}

export default HomePage;