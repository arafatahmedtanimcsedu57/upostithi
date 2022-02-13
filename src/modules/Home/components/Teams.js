import React, {useEffect} from "react";
import { useTeam, getTeam } from "../../../contexts/TeamContext";

import { TeamShort } from ".";

const Teams = ({ currentIp, updateCurrentTeam, currentUser }) => {
    const { state:teamsState, dispatch: teamDispatch } = useTeam();
    const { currentUser: user } = currentUser;
    const { _id: userId } = user;

    useEffect(
        () => getTeam(
            userId,
            teamDispatch,
            (err, teams) => !err && console.log(teams)
        )
        , [teamDispatch, userId]);
    
    return (
        <div id="team-list">
            {teamsState.teams.map(team =>
                <TeamShort
                    key={team._id}
                    currentIp={currentIp}
                    team={team}
                    updateCurrentTeam={updateCurrentTeam}
                />
            )}
        </div>
    )
}

export default Teams;