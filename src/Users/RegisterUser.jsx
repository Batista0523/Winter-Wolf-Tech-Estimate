import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../helpers/ApiCalls";
import {
  RegisterContainer,
  FormTitle,
  Input,
  PasswordToggleButton,
  Select,
  SubmitButton,
  Notification,
} from "../style/ResgiterStyled";
function RegisterUser() {
  const navigate = useNavigate();
  const userEndpoint = import.meta.env.VITE_USER_ENDPOINT;
  const initialState = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);

  // Handle form input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setNotification("Passwords do not match");
      return;
    }

    const { confirmPassword, ...dataToSubmit } = formData;

    createItem(userEndpoint, dataToSubmit)
      .then((response) => {
        if (response) {
          alert("Registration successful");
          navigate("/login");
          setFormData(initialState); // Reset form
          setNotification(null);
        } else {
          
          setNotification("Error registering user");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setNotification("Unexpected error occurred");
        alert(error)
      });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <RegisterContainer>
      <FormTitle>Register</FormTitle>
      {notification && <Notification>{notification}</Notification>}
      <form onSubmit={handleRegister}>
        <Input
          type="text"
          id="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <Input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <PasswordToggleButton type="button" onClick={togglePasswordVisibility}>
          {showPassword ? "Hide Password" : "Show Password"}
        </PasswordToggleButton>
        <Select id="role" value={formData.role} onChange={handleInputChange}>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </Select>
        <SubmitButton type="submit">Register</SubmitButton>
      </form>
    </RegisterContainer>
  );
}

export default RegisterUser;
