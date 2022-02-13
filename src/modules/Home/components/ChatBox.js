import React, {useState} from 'react';
import { useChat, setChats } from '../../../contexts/ChatContext';
import { useAuth } from '../../../contexts/AuthContext';
import InputEmoji from "react-input-emoji";

const ChatBox = ({team}) => {
    const [msg, setMsg] = useState('');
    const updateMsg = (msg) => setMsg(msg);
    const { dispatch: chatDispatch } = useChat();
    const { currentUser } = useAuth();

    
    
    const sendMsg = () => setChats(
        currentUser,
        team,
        msg,
        chatDispatch,
        (msg) => {
            updateMsg('');
        }
    )

    return (
        <div>
            <InputEmoji
                value={msg}
                onChange={updateMsg}
                cleanOnEnter
                onEnter={sendMsg}
                placeholder="Type a message"
            />
        </div>
    )
}

export default ChatBox;