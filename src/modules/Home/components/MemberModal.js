import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { MemberSearch } from ".";
import {
  removeSearchedResult,
  useMember,
} from "./../../../contexts/MemberContext";

const MemberModal = ({ team }) => {
  const [show, setShow] = useState(false);
  const { dispatch: memberDispatch } = useMember();

  const handleShow = (displayStatus) => {
    !displayStatus && removeSearchedResult(memberDispatch);
    setShow(displayStatus);
  };

  return (
    <>
      <button
        id="add-new-member-button"
        onClick={() => handleShow(true)}
        className="mar-y-16 pad-x-16 pad-y-8 shadow border-r-8 text-white"
      >
        Add New Member
      </button>

      <Modal show={show} size="lg" centered onHide={() => handleShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Find Your Team Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MemberSearch team={team} handleModal={handleShow} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(MemberModal);
