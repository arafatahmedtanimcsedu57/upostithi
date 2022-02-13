import React from "react";
import { db, dbRef, dbSet } from './../firebase';

const UserContext = React.createContext();

const initialState = {
    users: [],
    loadingUsers: false
}

function userReducer(state, action) {
    switch (action.type) {
        case 'USERS_REQUEST':
            return {
                ...state,
                loadingUsers: true
            };
        
        case 'USERS_SUCCESS':
            return {
                ...state,
                users: action.users,
                loadingUsers: false
            };
        
        case 'USERS_FAILED':
            return {
                ...state,
                loadingUsers: false
            };
        
        case 'ADD_USER':
            return {
                ...state
            }
        
        default:
            return state;
    }
}

export function UserProvider(props) {
    const [state, dispatch] = React.useReducer(userReducer, initialState);
    const value = React.useMemo(() => [state, dispatch], [state]);

    return <UserContext.Provider value={value} {...props} />;
}

export function useUser() {
    const context = React.useContext(UserContext);

    if (!context) {
        throw new Error('use User must be used within a UserProvider');
    }

    const [state, dispatch] = context;

    return {
        state,
        dispatch
    };
}

const addUser = () => ({
    type: "ADD_USER"
})

export function setUser(user, dispatch, done = () => { }) {
    const path = `users/${user.uid}`;
    const startUserRef = dbRef(db, path);
    
    dbSet(startUserRef, {email:user.email})
        .then((res) => {
            dispatch(addUser());
            done();
        }).catch(err=> console.log(err))
}