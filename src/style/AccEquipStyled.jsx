import styled from "styled-components";

export const FormContainer = styled.div`
  background-color: #f9f9f9;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
  height: 100px;
`;

export const SelectField = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  background-color: #182d40;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: '#182d40';
  }
`;

export const SuccessMessage = styled.p`
  color: #4caf50;
  text-align: center;
  margin-top: 1rem;
`;

export const ErrorMessage = styled.p`
  color: #ff0000;
  text-align: center;
  margin-top: 1rem;
`;
