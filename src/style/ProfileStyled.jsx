import styled from "styled-components";
const primaryColor = '#182d40';
const secondaryColor = '#ffffff';
const lightGrey = '#e8e8e8';
const blue = '#009bdf';
const darkGrey = '#2e2e2e';
const black = '#0d0d0d';
const blueColor = '#009bdf';
const whiteText = '#ffffff';
const greyText = '#d1d1d1';
const accentText = '#4dbfbf';
const darkText = '#171717';


export const ProfileWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const WelcomeMessage = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ActionsSection = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ActionButton = styled.button`
  background-color: #3a8ecb;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  font-size: 1rem;

  &:hover {
    background-color: #3074a5;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureItem = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

export const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;
