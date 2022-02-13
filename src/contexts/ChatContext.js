import React from "react";
import { db, dbRef, dbSet, dbPush, dbOnValue } from './../firebase';

const ChatContext = React.createContext();

const initialState = {
    chats: [],
    loadingChats: false
}

function chatReducer(state, action) {
    switch (action.type) {
        case 'CHATS_REQUEST':
            return {
                ...state,
                loadingChats: true,
            };
        
        case 'CHATS_SUCCESS':
            return {
                ...state,
                chats: action.chats,
                loadingChats: false
            };
        
        case 'ADD_MSG':
            return {
                ...state,
                chats: [...state.chats, action.newMsg]
            }
        
        default:
            return state
    }
}

export function ChatProvider(props) {
    const [state, dispatch] = React.useReducer(chatReducer, initialState);
    const value = React.useMemo(() => [state, dispatch], [state]);

    return <ChatContext.Provider value={value} {...props} />;
}

export function useChat() {
    const context = React.useContext(ChatContext);

    if (!context) {
        throw new Error('use Chat must be used within a ChatProvider');
    }

    const [state, dispatch] = context;

    return {
        state,
        dispatch
    };
}

const requestChats = () => ({
    type: 'CHATS_REQUEST'
});

const receiveChats = (chats) => ({
    type: 'CHATS_SUCCESS',
    chats
})

const addMsg = (newMsg) => ({
    type: 'ADD_MSG',
    newMsg
})

export function setChats(user, team, chatMsg, dispatch, done=()=>{}) {
    let path = `teams/${team.key}/chats`;    
    let startChatsRef = dbRef(db, path);

    dbPush(startChatsRef, {
        user: {
            email: user.email,
            uid: user.uid,
        },
        msg: chatMsg
    }).then(res => {
        done(res)
    });
}

export function getChats(team, dispatch, done=()=>{}) {
    let path = `teams/${team.key}/chats`;
    let startChatsRef = dbRef(db, path);

    dbOnValue(startChatsRef, (snapshot) => {
        let _chats = snapshot.val();

        let _chatKeys = _chats?Object.keys(_chats):[];

        let chats = _chatKeys.length ? _chatKeys.map(key => {
            return ({ ..._chats[key], key })
        }) : [];

        dispatch(receiveChats(chats));
        done(chats);
    })

   
}