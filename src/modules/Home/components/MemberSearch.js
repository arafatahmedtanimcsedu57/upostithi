import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import {
  useMember,
  searchMember,
  setMember,
} from "../../../contexts/MemberContext";

const MemberSearch = ({ team, handleModal }) => {
  const [searchEmail, setSearchEmail] = useState("");
  const { state: memberState, dispatch: memberDispatch } = useMember();

  const updateSearchEmail = (email) => setSearchEmail(email);

  return (
    <div>
      <InputGroup className="mb-3 border-r-10">
        <FormControl
          type="email"
          placeholder="User Email"
          onChange={(e) => updateSearchEmail(e.target.value)}
        />
        <Button
          variant="outline-secondary"
          onClick={() =>
            searchMember(searchEmail, memberDispatch, (member) =>
              console.log(member)
            )
          }
        >
          Search
        </Button>
      </InputGroup>
      {searchEmail && <div>{memberState.currentMember?.email}</div>}
      {memberState.currentMember?.uid && (
        <Button
          onClick={() =>
            setMember(
              team,
              memberState.currentMember,
              memberDispatch,
              (members) => {
                console.log(members);
                handleModal(false);
              }
            )
          }
        >
          Add
        </Button>
      )}
    </div>
  );
};

export default React.memo(MemberSearch);
