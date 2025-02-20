import styled from "styled-components";
import { Link } from "react-router-dom";

const primaryColor = '#182d40';
const lightGrey = '#e8e8e8';
const whiteText = '#ffffff';
const darkGrey = '#2e2e2e';
const darkText = '#171717';
const blueColor = '#009bdf';

// Container for the Finalestimate component
export const FinalEstimateContainer = styled.div`
  background-color: ${lightGrey};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem auto;
  color: ${darkText};
`;
export const StyledLink = styled(Link)`
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
  transition: background-color 0.3s ease;

  &:hover {
    color: ${blueColor};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
// Header for the component
export const EstimateHeader = styled.h4`
  font-size: 1.8rem;
  color: ${primaryColor};
  margin-bottom: 1.5rem;
  text-align: center;
`;

// Each final estimate block
export const EstimateBlock = styled.div`
  background-color: ${whiteText};
  border: 1px solid ${darkGrey};
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

// Paragraph for estimate details
export const EstimateParagraph = styled.p`
  font-size: 1rem;
  color: ${darkText};
  line-height: 1.6;
`;

// Formatting for specific text or highlights within the paragraph
export const HighlightText = styled.span`
  font-weight: bold;
  color: ${primaryColor};
`;
