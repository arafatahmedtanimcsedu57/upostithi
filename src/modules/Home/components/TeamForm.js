import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useTeam, setTeam } from "../../../contexts/TeamContext";
import { useAuth } from '../../../contexts/AuthContext';

const TeamForm = ({handleModal}) => {
    const [teamInfo, setTeamInfo] = useState({})
    const updateTeamInfo = (key, value) => setTeamInfo(teamInfo=>({...teamInfo, [key]: value}))
    const { dispatch: teamDispatch } = useTeam();
    const { currentUser } = useAuth();


    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                setTeam(
                    currentUser,
                    teamInfo,
                    teamDispatch,
                    (teams) => handleModal(false)
                );
            }}
        >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Team Name</Form.Label>
                <Form.Control
                    name="team_name"
                    type="text"
                    placeholder="Enter your team name"
                    className="border-r-8 fw-medium"
                    onChange={e => updateTeamInfo(e.target.name, e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>IP Address</Form.Label>
                <Form.Control
                    name="ip_address"
                    type="text"
                    placeholder="Enter IP address"
                    className="border-r-8 fw-medium"
                    onChange={e => updateTeamInfo(e.target.name, e.target.value)}
                />
            </Form.Group>
            
            <Button
                variant="info"
                type="submit"
                className="border-r-8 fw-semi-bold text-white"
            >
                Submit
            </Button>
        </Form>
    )
}

export default React.memo(TeamForm);