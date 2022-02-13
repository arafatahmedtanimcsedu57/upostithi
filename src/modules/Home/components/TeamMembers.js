import React, { useEffect, useState } from "react";
import { useMember, fetchMembers } from "../../../contexts/MemberContext";
import { getRandomColor, createImageFromInitials } from "../../../utils";
import { Badge, Spinner, Dropdown } from "react-bootstrap";

const TeamMember = ({ team }) => {
  const { members } = team;

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="none"
        className="fs-14 d-flex align-items-center pad-0"
      >
        <Spinner
          animation="grow"
          variant="info"
          className="mar-r-16"
          size="sm"
        />
        <div>
          This team has{" "}
          <Badge className="mar-x-8"> {members ? members.length : "0"} </Badge>{" "}
          {members && members.length > 1 ? "members" : "member"}
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="shadow">
        {members?.length &&
          members.map((member) => (
            <Dropdown.Item className="d-flex pad-16 align-items-center">
              <div className="mar-r-16">
                <img
                  key={member._id}
                  src={
                    member.photoURL
                      ? member.photoURL
                      : createImageFromInitials(
                          50,
                          member.email,
                          getRandomColor()
                        )
                  }
                  alt="user"
                  className="border-r-15"
                />
              </div>

              <div>
                <div className="fw-regular">{member.email}</div>
                <div className="fw-light fs-10">{member._id}</div>
              </div>
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default React.memo(TeamMember);
