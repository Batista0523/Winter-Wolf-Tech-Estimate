import styled from "styled-components";


const lightGrey = '#e8e8e8';

const darkGrey = '#2e2e2e';


// Accessory Title
export const AccesoryTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

// Accessory Description
export const AccesoryDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
`;
export const DisplaySquare = styled.div`
  background-color: ${lightGrey};
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  border: 1px solid ${darkGrey};
  width: 100%;
  max-width: 800px;
`;

// Accessory Price
export const AccesoryPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #222;
`;
export const StyledButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
`;
// Add to Estimate Button
export const AddToEstimateButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
`;


export const EquipmentTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const EquipmentBrand = styled.h5`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 5px;
`;

export const EquipmentModel = styled.h5`
  font-size: 1.1rem;
  color: #777;
  margin-bottom: 5px;
`;

export const EquipmentDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
`;

export const EquipmentPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #222;
`;

// Accessory Wrapper
export const AccesoryWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }

  h3 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .accessory-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
`;

// Accessory Item container
export const AccesoryItem = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Accessory Title, Description, and Price (Keep as before)

// Equipment Wrapper
export const EquipmentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }

  h3 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .equipment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
`;

// Equipment Item container (similar to AccessoryItem)
export const EquipmentItem = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;
