import styled from 'styled-components';

// Define colors
const primaryColor = '#182d40';
const secondaryColor = '#ffffff';
const lightGrey = '#e8e8e8';
const blue = '#009bdf';
const darkGrey = '#2e2e2e';
const greyText = '#d1d1d1';
const darkText = '#171717';
export const Spinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0,0,0,0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
  margin: 20px auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Main Container
export const EstimateContainer = styled.div`
  padding: 2rem;
  background-color: ${lightGrey};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

export const SearchBar = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 1.5rem;

  input {
    width: 100%;
    padding: 12px;
    border: 1px solid ${darkGrey};
    border-radius: 8px;
    font-size: 1rem;
    outline: none;

    &:focus {
      border-color: ${blue};
    }

    @media (max-width: 768px) {
      padding: 10px;
    }

    @media (max-width: 480px) {
      padding: 8px;
      font-size: 0.9rem;
    }
  }
`;
export const SearchOptions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;

  label {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: ${darkText};

    input {
      margin-right: 8px;
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;

export const StyledButton = styled.button`
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

  &:hover {
    background-color: red; /* Darker green on hover */
  }

  &:disabled {
    background-color: #c8c8c8; /* Gray background when disabled */
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px; /* Responsive padding for mobile devices */
    font-size: 14px; /* Responsive font size for mobile devices */
  }
`;
// Title of the estimate
export const Title = styled.h2`
  font-size: 2rem;
  color: ${primaryColor};
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

// Client information section
export const ClientInfo = styled.div`
  background-color: ${secondaryColor};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  width: auto;
  max-width: 800px;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

export const ClientInfoTitle = styled.h3`
  font-size: 1.5rem;
  color: ${primaryColor};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const ClientDetail = styled.p`
  font-size: 1rem;
  color: ${darkText};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

// Job breakdown section
export const JobBreakdown = styled.div`
  width: auto;
  max-width: 800px;
  margin-bottom: 2rem;
`;

export const JobTitle = styled.h3`
  font-size: 1.5rem;
  color: ${primaryColor};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const FloorSection = styled.div`
  margin-bottom: 1rem;
`;

export const FloorTitle = styled.h4`
  font-size: 1.25rem;
  color: ${darkGrey};
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const RoomSection = styled.div`
  margin-left: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-left: 1rem;
  }

  @media (max-width: 480px) {
    margin-left: 0.75rem;
  }
`;

export const RoomTitle = styled.h5`
  font-size: 1.2rem;
  color: ${blue};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const Item = styled.li`
  font-size: 1rem;
  color: ${darkText};
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

// Cost breakdown section
export const CostBreakdown = styled.div`
  background-color: ${secondaryColor};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width:auto;
  max-width: 800px;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

export const CostTitle = styled.h3`
  font-size: 1.5rem;
  color: ${primaryColor};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const CostDetail = styled.p`
  font-size: 1rem;
  color: ${darkText};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const NoEstimateMessage = styled.p`
  font-size: 1rem;
  color: ${greyText};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

// Estimate List Container
export const EstimateListContainer = styled.div`
  width: 100%;
  max-width: 800px;
  
`;

// Single Estimate Box
export const EstimateBox = styled.div`
  border: 1px solid ${lightGrey};
  padding: 20px;
  margin-bottom: 20px;
  background-color: ${secondaryColor};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
display:grid;
  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

