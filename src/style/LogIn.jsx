import styled from 'styled-components';
const primaryColor = '#182d40';
const secondaryColor = '#ffffff';
const lightGrey = '#e8e8e8';

const darkGrey = '#2e2e2e';

const blueColor = '#009bdf';

const darkText = '#171717';



// Container for the login form
export const LoginContainer = styled.div`
  background-color: ${lightGrey};
  color: ${darkText};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 2rem auto;

  @media (max-width: 768px) {
    padding: 1rem;
    max-width: 100%;
  }
`;

// Form title
export const FormTitle = styled.h4`
  font-size: 1.8rem;
  color: ${primaryColor};
  margin-bottom: 1rem;
`;

// Form labels
export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: ${darkText};
`;

// Form inputs
export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid ${darkGrey};
  border-radius: 4px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.6rem;
  }
`;

// Submit button
export const SubmitButton = styled.button`
  background-color: ${blueColor};
  color: ${secondaryColor};
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${darkGrey};
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

// Error message
export const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1rem;
`;
