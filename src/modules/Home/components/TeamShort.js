import React, { useCallback, useEffect, useState } from "react";
import { useAttendance, getTodayAttendance } from "../../../contexts/AttendanceContext";

const TeamShort = ({ currentIp, team, updateCurrentTeam }) => {
    const [ status, setStatus ] = useState(<div>You are absent</div>);

    const { state: attendanceState, dispatch: attendanceDispatch } = useAttendance();

    const updateStatus = useCallback(
        (currentStatus) => setStatus(currentStatus)
        , [setStatus]
    );
    
    const getCurrentStatus = useCallback(() =>
        attendanceState.todayStatus[team.key]?
            team.ip_address === currentIp ?
                updateStatus(<>
                    <div className="text-success">You are with this team</div>
                    <div className="text-success fs-12"> Today you join at
                        <span className="mar-x-16 fw-bold">{attendanceState.todayStatus[team.key].split(',')[1]}</span>
                    </div>
                </>)
                : updateStatus(<>
                    <div className="text-info">You were with this team</div>
                    <div className="text-info fs-12"> Today you join at  
                        <span className="mar-x-16 fw-bold">{attendanceState.todayStatus[team.key].split(',')[1]}</span>
                    </div>
                </>
                )
            : updateStatus(<div className="text-danger">You are absent</div>)
            ,[attendanceState.todayStatus, currentIp, team.ip_address, team.key, updateStatus])
            

    // useEffect(
    //     () => {
    //         getTodayAttendance(
    //             team,
    //             currentUser,
    //             currentIp,
    //             attendanceDispatch,
    //             status => console.log(status)
    //         );
            
    //     }, [attendanceDispatch, currentUser, currentIp, team])
    
    useEffect(()=>getCurrentStatus(),[getCurrentStatus])
    
    return (
         <div
            id="team"
            className="bg-white pad-16 border-r-15 mar-y-16 mar-x-8"
            onClick={()=>updateCurrentTeam(team)}
        >
            <div className="fw-bold fs-14">{team.teamName}</div>
            {/* <div className="fs-10">{status}</div> */}
        </div>
    )
}

export default TeamShort;