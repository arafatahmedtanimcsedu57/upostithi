import React from 'react';
import { db, dbOnValue, dbRef, dbSet } from './../firebase';

const MemberContext = React.createContext();

const initialState = {
    currentMember: null,
    searching: false,
    searchResult: null,

    members: [],
    loadingMembers: false
};

function memberReducer(state, action) {
    switch (action.type) {
        case 'SEARCH_MEMBER':
            return {
                ...state,
                searching: true,
                searchResult:null,
            };
        
        case 'FOUND_MEMBER':
            return {
                ...state,
                currentMember: action.searchedMember,
                searching: false,
                searchResult: action.searchResult
            };
        
        case 'ADD_MEMBER':
            return {
                ...state
            };
        
        case 'RESET_SEARCH_MEMBER':
            return {
                ...state,
                currentMember: null,
                searching: false,
                searchResult: null,   
            }
        
        case 'REQUEST_MEMBERS':
            return {
                ...state,
                loadingMembers: true
            };
        
        case 'GET_MEMBERS':
            return {
                ...state,
                members: action.members,
                loadingMembers: false
            }
        
        default:
            return state;
    }
}

export function MemberProvider(props) {
    const [state, dispatch] = React.useReducer(memberReducer, initialState);
    const value = React.useMemo(() => [state, dispatch], [state]);

    return <MemberContext.Provider value={value} {...props}/>
}

export function useMember() {
    const context = React.useContext(MemberContext);

    if (!context) {
        throw new Error('use Member must be used within a MemberProvider');
    }

    const [state, dispatch] = context;

    return {
        state,
        dispatch
    }
}

const findMember = () => ({
    type: 'SEARCH_MEMBER'
});

const successSearchMember = (searchedMember, searchResult) => ({
    type: 'FOUND_MEMBER',
    searchedMember,
    searchResult
});

const addMember = () => ({
    type: 'ADD_MEMBER'
});

const requestMembers = () => ({
    type: 'REQUEST_MEMBERS'
});

const getMembers = (members) => ({
    type: 'GET_MEMBERS',
    members
});

const resetSearchMember = () => ({
    type: 'RESET_SEARCH_MEMBER'
});

export function searchMember(uid, dispatch, done = () => { }) {
    dispatch(findMember())

    const path = `users/${uid}`;
    const startUserRef = dbRef(db, path);

    dbOnValue(startUserRef, (snapshot) => {
        let _user = snapshot.val();
        let _result = _user ? 'Found' : 'Not Found';

        let user = {
            email: _user.email,
            uid: uid
        }
        
        dispatch(successSearchMember(user, _result));
        done(user);
    })
}

export function setMember(team, member, dispatch, done = () => { }) {
    const teamsPath = `teams/${team.key}/users/${member.uid}`;
    const usersPath = `users/${member.uid}/teams/${team.key}`
    
    const startTeamsRef = dbRef(db, teamsPath);
    const startUsersRef = dbRef(db, usersPath);

    dbSet(startTeamsRef, {email: member.email})
        .then(() => {
            dbSet(startUsersRef, { ip_address: team.ip_address, team_name: team.team_name })
                .then(() => {
                    dispatch(addMember());
                    fetchMembers(team, dispatch, done)
                })
        })
}

export function fetchMembers(team, dispatch, done = () => { }) {
    dispatch(requestMembers());

    const usersPath = `teams/${team.key}/users`;
    const startUsersRef = dbRef(db, usersPath);

    dbOnValue(startUsersRef, (snapshot) => {
        let _members = snapshot.val();
        let _memberKeys = _members ? Object.keys(_members) : [];

        let members = _memberKeys.map(key => ({
            ..._members[key], uid: key
        }))

        dispatch(getMembers(members));
        done(members);
    })
}

export function removeSearchedResult(dispatch) {
    dispatch(resetSearchMember())
}