import React from 'react';
import { db, dbRef, dbOnValue, dbSet } from '../firebase';
import moment from 'moment';

const AttendanceContext = React.createContext()

const initialState = {
    todayStatus: {},
    loadingTodayStatus: false
}

function attendanceReducer(state, action) {
    switch (action.type) {
        case 'STATUS_REQUEST': 
            return {
                ...state,
                loadingTodayStatus: true,
            };

        case 'STATUS_SUCCESS': 
            return {
                ...state,
                todayStatus: {...state.todayStatus, ...action.todayStatus},
                loadingTodayStatus: false
            };

        default:
            return state;
    }
}

export function AttendanceProvider(props) {
    const [state, dispatch] = React.useReducer(attendanceReducer, initialState);
    const value = React.useMemo(() => [state, dispatch], [state]);

    return <AttendanceContext.Provider value={value} {...props} />;
}

export function useAttendance() {
    const context = React.useContext(AttendanceContext);

    if (!context) {
        throw new Error('use Attendance must be used within a AttendanceProvider');
    }

    const [state, dispatch] = context;

    return {
        state,
        dispatch
    };
}

const requestAttendance = () => ({
    type: 'STATUS_REQUEST'
});

const receiveAttendance = (todayStatus) => ({
    type: 'STATUS_SUCCESS',
    todayStatus
})

const today = moment().format("YYYY/MM/DD");   

export function setTodayAttendance(team, user, dispatch, done=()=>{}) {
    const path = `teams/${team.key}/users/${user.uid}/attendance/${today}`
    const startAttendanceRef = dbRef(db, path)
    const currentTime =  new Date().toLocaleString();

    dbSet(startAttendanceRef, {
        'present': currentTime,
        'leave': null
    }).then(() => {
        done("Hello")
    })
}

export function getTodayAttendance(team, user, currentIp, dispatch, done = () => { }) {
    dispatch(requestAttendance());

    const path = `teams/${team.key}/users/${user.uid}/attendance/${today}/present`
    const startAttendanceRef = dbRef(db, path)

    dbOnValue(startAttendanceRef, (snapshot) => {
        let status = snapshot.val();
        dispatch(receiveAttendance({ [team.key]: status }));
        !status
            && team.ip_address === currentIp
            && setTodayAttendance(team, user, dispatch, done());
        
        done(status);
    })
}

