import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { login, useAuth } from "../../contexts/AuthContext";
import "./styles/index.scss";

export default function Login() {
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {  state: loginState, dispatch: loginDispatch } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            login({
                "userName": userNameRef.current.value,
                "email": emailRef.current.value,
                "password": passwordRef.current.value
            }, loginDispatch, (err)=> !err && history.push("/"));

        } catch {
            setError("Failed to log in");
        }

        setLoading(false);
    }

    return (
        <div
            id="login-layout"
            className="d-flex justify-content-center flex-column align-items-center"
        >
            <div id="login-card" className="bg-white">
                <div className="fs-32 fw-extra-bold text-secondary">
                    Uposthiti
                </div>
                <div>
                    <div className="mar-b-4 text-center fw-semi-bold fs-18">Welcome Back</div>
                    <div className="mar-b-32 text-center fw-light fs-14 text-light">Enter your credentials to access your account</div>
            
                    {error && <Alert variant="danger">{error}</Alert>}
            
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="userName" className="mar-b-16">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                className="border-r-8 pad-16 fs-16"
                                type="text"
                                ref={userNameRef}
                                required
                                placeholder="Enter your user name"
                            />
                        </Form.Group>
                        <Form.Group id="email" className="mar-b-16">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                className="border-r-8 pad-16 fs-16"
                                type="email"
                                ref={emailRef}
                                required
                                placeholder="Enter your email"
                            />
                        </Form.Group>
                        <Form.Group id="password" className="mar-b-16">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className="border-r-8 pad-16 fs-16"
                                type="password"
                                ref={passwordRef}
                                required
                                placeholder="Enter your password"
                            />
                        </Form.Group>
                        <Button
                            disabled={loading}
                            className="w-100 pad-16 fw-bold fs-16 border-r-8 btn-secondary text-white"
                            type="submit"
                        >
                            Log In
                        </Button>
                    </Form>
            
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </div>
            </div>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}
