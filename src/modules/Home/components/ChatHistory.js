import React, { useEffect, useRef } from 'react';
import { useChat, getChats } from '../../../contexts/ChatContext';
import { useAuth } from '../../../contexts/AuthContext';
import { getRandomColor, createImageFromInitials } from '../../../utils';

const ChatHistory = ({ team }) => {
    const { state: chatState, dispatch: chatDispatch } = useChat();
    const { currentUser } = useAuth();

    const chatHistoryRef = useRef(null)

    useEffect(() =>
        getChats(team, chatDispatch, chats => {
            console.log(chats)
        })
        , [chatDispatch, team]
    );

    useEffect(()=> scrollToBottom(),[chatState])
    
    const scrollToBottom = () => {
        chatHistoryRef.current?.scroll({ 
            top: chatHistoryRef.current.scrollHeight - chatHistoryRef.current.clientHeight,
            behavior: 'smooth'
        })
    };

    return (
        <div
            ref={chatHistoryRef} 
            id="chat-history"
            className='d-flex flex-column flex-grow-1 pad-x-16'
        >
            {chatState.chats.map(chat =>
                <div key={chat.key} className={`d-flex mar-8 align-items-end justify-content-${chat.user.email === currentUser.email? "end":"start"}`}>
                    {!(chat.user.email === currentUser.email) && <div className="mar-r-16">
                        <img
                            src={
                                chat.user.photoURL ?
                                    chat.user.photoURL
                                    : createImageFromInitials(25, chat.user.email, getRandomColor())
                            }
                            alt="user"
                            className="shadow border-r-15"
                        /> 
                    </div>}
                    <div
                        id={`msg-${chat.user.email === currentUser.email?"right":"left"}`}
                        className={`pad-x-24 fs-14 fw-light pad-y-12 shadow badge bg-${chat.user.email === currentUser.email?"primary":"gray"} text-${chat.user.email === currentUser.email?"white":"dark"}`}
                    >
                        {chat.msg}
                    </div>
                </div> 
            )}
        </div>
    )
}

export default ChatHistory;