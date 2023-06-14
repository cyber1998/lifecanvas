// Create a functional react component to display a login form which uses reactstrap card component and boilerplate API call to login
import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert} from "reactstrap";
import { BASE_URL } from "../../constants";

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}token/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                        })
                    });
            if (response.ok) {
                const { access, refresh } = await response.json();
                localStorage.setItem('token', access);
                localStorage.setItem('refresh', refresh);
            }
            else {
              const errorData = await response.json();
                setError(errorData.detail);
            }
          } catch (e) {
            setError("Login failed, please try again later");
          }
    };

    return (
      <div className="container">
        <h2>Login</h2>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label for="username">Username:</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button type="submit" color="primary">Login</Button>
        </Form>
      </div>
    );
};

export default LoginPage;