import React from "react";
import { db, dbRef, dbSet, dbPush, dbOnValue } from './../firebase';
import Axios from "axios";

const TeamContext = React.createContext();

const initialState = {
    teams: [],
    loadingTeams: false
}

function teamReducer(state, action) {
    switch (action.type) {
        case 'TEAMS_REQUEST':
            return {
                ...state,
                loadingTeams: true
            };
        
        case 'TEAMS_SUCCESS':
            return {
                ...state,
                teams: action.teams,
                loadingTeams: false
            };
        
        case 'TEAMS_FAILED':
            return {
                ...state,
                loadingTeams: false
            };
        
        case 'ADD_TEAM':
            return {
                ...state
            }
        
        default:
            return state;
    }
}

export function TeamProvider(props) {
    const [state, dispatch] = React.useReducer(teamReducer, initialState);
    const value = React.useMemo(() => [state, dispatch], [state]);

    return <TeamContext.Provider value={value} {...props} />;
}

export function useTeam() {
    const context = React.useContext(TeamContext);

    if (!context) {
        throw new Error('use Team must be used within a TeamProvider');
    }

    const [state, dispatch] = context;

    return {
        state,
        dispatch
    };
}

const requestTeams = () => ({
    type: 'TEAMS_REQUEST'
});

const receiveTeams = (teams) => ({
    type: 'TEAMS_SUCCESS',
    teams
}); 

const failedTeams = () => ({
    type: 'TEAMS_FAILED'
})

const updateTeams = () => ({
    type: 'ADD_TEAM'
})


const headers = () => ({
    'Authorization': localStorage.getItem('attendance_auth_token') ? 
        `JWT ${localStorage.getItem('attendance_auth_token')}`
        : null,
    'ContentType': 'application/json'
})

export function setTeam(user, team, dispatch, done=() => { }) {
    let path = `teams`;
    let startTeamRef = dbRef(db, path);

    dbPush(startTeamRef, {
        ...team,
    }).then((newTeam) => {
        let pathTeams = `teams/${newTeam.key}/users/${user.uid}`;
        let pathUsers = `users/${user.uid}/teams/${newTeam.key}`;

        let startTeamsRef = dbRef(db, pathTeams);
        let startUsersRef = dbRef(db, pathUsers);

        dbSet(startUsersRef, { ...team })
            .then(() => {
                dbSet(startTeamsRef, { email: user.email })
                    .then(() => {
                        dispatch(updateTeams());
                        getTeam(user, dispatch, done);
                    });
            })        
    });
}

export function getTeam(userId, dispatch, done = () => { }) {
    dispatch(requestTeams());
    const userTeamURL = `${process.env.REACT_APP_API_HEROKU_HOST}/api/${process.env.REACT_APP_API_VERSION}/${process.env.REACT_APP_API_TYPE}/user/team/${userId}`;

    Axios
        .get(userTeamURL, {headers: headers()})
        .then(res => {
            const {teams} = res.data;
            dispatch(receiveTeams(teams));
            done(null, teams);
        })
        .catch(err => {
            dispatch(failedTeams());
            done(err, []);
        });
}
