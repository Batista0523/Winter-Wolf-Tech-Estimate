import styled from "styled-components";
const primaryColor = '#182d40';
// Styled Components
export const PDFContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

export const StyledSelect = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #007bff;
  }
`;
export const StyledButtonG = styled.button`
  background-color: ${primaryColor}; 
  border: none;
  color: white; /* White text */
  padding: 12px 24px; /* Padding */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px; /* Button text size */
  margin: 4px 2px; /* Margin between buttons */
  cursor: pointer;
  border-radius: 8px; /* Rounded corners */
  transition: background-color 0.3s ease; /* Smooth background transition */



  &:disabled {
    background-color: #c8c8c8; /* Gray background when disabled */
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px; /* Responsive padding for mobile devices */
    font-size: 14px; /* Responsive font size for mobile devices */
  }
`;