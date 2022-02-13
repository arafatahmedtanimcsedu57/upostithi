import React from "react";
import { TeamMember, MemberModal, ChatBox, ChatHistory } from ".";
import BackArrow from "./../img/BackArrow.svg";

const Team = ({ currentTeam, updateCurrentTeam }) => {
    return (
        <div id="team">
            {/* { JSON.stringify(currentTeam)} */}
            <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <div className="fw-bold fs-14 d-flex align-items-center">
                        <button
                            id="back-button"
                            className="mar-r-16 shadow"
                            onClick={() => updateCurrentTeam(null)}
                        >
                            <img
                                src={BackArrow}
                                alt="back"
                                width={"24px"}
                                height={"24px"}
                            />
                        </button>
                        <div> {currentTeam.teamName} </div>
                    </div>
                    <span className="fw-light fs-10">{currentTeam._id}</span>
                </div>

                <MemberModal team={currentTeam}/>
            </div>

            <div id="chat-box">
                <TeamMember team={currentTeam} />
                {/* <ChatHistory team={currentTeam}/>
                <ChatBox team={currentTeam} /> */}
            </div>
        </div>
    )
}

export default React.memo(Team);