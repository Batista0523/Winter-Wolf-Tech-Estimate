import React, { useState } from "react";
import { createItem } from "../helpers/ApiCalls";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  FormTitle,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
} from "../style/LogIn";
function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();

    const endpoint = "Users/login";
    try {
      const response = await createItem(endpoint, { username, password });

      if (response.payload.id) {
        console.log(response, "here response log in");
        login(response.payload);
        navigate("/profile/:id")
      } else {
        alert("problem log in");
        setError("invalid username or password");
      }
    } catch (err) {
      setError("invalid usernasme or password");
    }
  };

  return (
    <LoginContainer>
      <FormTitle>Log In</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleLogin}>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit">Log In</SubmitButton>
      </form>
    </LoginContainer>
  );
}

export default Login;
