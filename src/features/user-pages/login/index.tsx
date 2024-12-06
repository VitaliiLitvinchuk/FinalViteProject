import { Button, Form } from "react-bootstrap"
import { useActions } from "../../../hooks/useActions"
import { useRef } from "react";

const Login = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { loginAction } = useActions('login');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (usernameRef.current && passwordRef.current) {
            loginAction({ username: usernameRef.current.value, password: passwordRef.current.value });
        }
    }

    return (
        <div className="d-flex flex-grow-1 flex-column">
            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                <div className="d-flex flex-column gap-3 w-50 mb-5">
                    <div className="d-flex justify-content-center align-items-center">
                        <h1 className="fw-bold">Login</h1>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Form className="d-flex flex-column gap-3 w-75" onSubmit={handleSubmit}>
                            <Form.Group className="d-flex flex-column gap-1">
                                <Form.Label htmlFor="username">Username</Form.Label>
                                <Form.Control ref={usernameRef} id="username" />
                            </Form.Group>
                            <Form.Group className="d-flex flex-column gap-1">
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control ref={passwordRef} id="password" type="password" />
                            </Form.Group>
                            <div className="d-flex justify-content-center align-items-center">
                                <Button className="px-5" type="submit" variant="primary">Login</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login