import React from 'react';
import Axios from 'axios';

const AuthContext = React.createContext();

const initialState = {
    loading: false,
    token: localStorage.getItem('attendance_auth_token') ?
        localStorage.getItem('attendance_auth_token')
        : null,
    currentUser: null,
}

function authReducer(state, action) {
    switch (action.type) {
        case 'AUTH_REQUEST':
            return {
                ...state,
                loading: true
            };
        
        case 'AUTH_SUCCESS':
            return {
                ...state,
                loading: false,
                token: action.token
            };
        
        case 'AUTH_FAILED':
            return {
                ...state,
                loading: false
            };
        
        case 'PROFILE_REQUEST':
            return {
                ...state,
                loading: true
            };
        
        case 'PROFILE_SUCCESS':
            return {
                ...state,
                loading: false,
                currentUser: action.currentUser
            };
        
        case 'PROFILE_FAILED':
            return {
                ...state,
                loading: false
            };
        
        case 'REMOVE_TOKEN':
            return {
                ...state,
                currentUser: null
            }
        
        default:
            return state;
    }
}

export function AuthProvider(props) {
    const [state, dispatch] = React.useReducer(authReducer, initialState);
    const value = React.useMemo(() => [state, dispatch], [state]);

    return <AuthContext.Provider value={value} {...props}/>
}

export function useAuth() {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error('use Auth must be used within a Auth Provider');
    }

    const [state, dispatch] = context;

    return {
        state,
        dispatch
    }
}

const authRequest = () => ({
    type: 'AUTH_REQUEST'
});

const authSuccess = (token) => ({
    type: 'AUTH_SUCCESS',
    token
});

const authFailed = () => ({
    type: 'AUTH_FAILED'
});

const profileRequest = () => ({
    type: 'PROFILE_REQUEST'
});

const profileSuccess = (currentUser) => ({
    type: 'PROFILE_SUCCESS',
    currentUser
});

const profileFailed = () => ({
    type: 'PROFILE_FAILED'
});

const removeToken = () => ({
    type: 'REMOVE_TOKEN'
})

const headers = () => ({
    'Authorization': localStorage.getItem('attendance_auth_token') ? 
        `JWT ${localStorage.getItem('attendance_auth_token')}`
        : null,
    'ContentType': 'application/json'
})


export function login(user, dispatch, done = () => { }) {
    dispatch(authRequest());
    const authURL = `${process.env.REACT_APP_API_HEROKU_HOST}/api/${process.env.REACT_APP_API_VERSION}/${process.env.REACT_APP_API_TYPE}/auth/sign_in`;

    Axios
        .post(authURL, user)
        .then(res => {
            const { token } = res.data;
            token && localStorage.setItem('attendance_auth_token', token);
            dispatch(authSuccess(token));
            done(null);
        })
        .catch(err => {
            dispatch(authFailed());
            done(err);
        });
}

export function getProfile(dispatch, done = () => { }) {
    dispatch(profileRequest())
    const profileURL = `${process.env.REACT_APP_API_HEROKU_HOST}/api/${process.env.REACT_APP_API_VERSION}/${process.env.REACT_APP_API_TYPE}/auth/profile`;

    Axios
        .get(profileURL, {headers: headers()})
        .then(res => {
            const currentUser = res.data;
            dispatch(profileSuccess(currentUser));
            done(null);
        })
        .catch(err => {
            dispatch(profileFailed());
            done(err);
        });
}

export function logout(dispatch, done = () => { }) {
    localStorage.removeItem('attendance_auth_token');
    dispatch(removeToken());
    done(null);
}
