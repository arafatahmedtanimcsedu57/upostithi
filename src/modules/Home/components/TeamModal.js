import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import { TeamForm } from ".";
import BookmarkPlus from './../img/BookmarkPlus.svg';

const TeamModal = () => {
    const [show, setShow] = useState(false);
    const handleShow = (displayStatus) => setShow(displayStatus);

    return (
        <>
            <button
                id="create-team-button"
                onClick={() => handleShow(true)}
            >
                <div className="d-flex align-items-center justify-content-between">
                    <div className="fs-14 fw-semi-bold">Create Your Team</div>
                    <div className="mar-l-8">
                        <img
                            src={BookmarkPlus}
                            alt="plus"
                            width={"32px"}
                        />
                    </div>
                </div>
            </button>
            
            <Modal
                show={show}
                size="lg"
                centered
                onHide={() => handleShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">
                        Provide Your Team Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TeamForm handleModal={handleShow}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default React.memo(TeamModal);