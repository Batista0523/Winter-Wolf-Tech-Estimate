import styled from "styled-components";
import { Link } from "react-router-dom";
// Colors
const primaryColor = "#182d40";
const secondaryColor = "#ffffff";
const lightGrey = "#e8e8e8";
const blue = "#009bdf";
const darkGrey = "#2e2e2e";
const black = "#0d0d0d";
const blueColor = "#009bdf";
const whiteText = "#ffffff";
const greyText = "#d1d1d1";
const accentText = "#4dbfbf";
const darkText = "#171717";

// Log Off Button
export const LogOffButton = styled.button`
  background-color: ${blueColor};
  color: ${secondaryColor};
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${darkGrey};
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

// Home Wrapper
export const HomeWrapper = styled.div`
  background-color: ${primaryColor};
  color: ${whiteText};
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin-top: 4rem; // To account for the fixed navbar

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Hero Section
export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  text-align: center;
  background-color: ${primaryColor};
  color: ${whiteText};
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const Heading = styled.h1`
  font-size: 3.5rem;
  color: ${accentText};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Subheading = styled.h2`
  font-size: 1.5rem;
  color: ${greyText};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: ${greyText};
  max-width: 800px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
`;

export const GetStartedButton = styled(Link)`
  background-color: ${blue};
  color: ${secondaryColor};
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  &:hover {
    background-color: ${darkGrey};
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

// Features Section
export const FeaturesSection = styled.section`
  background-color: ${lightGrey};
  color: ${darkText};
  padding: 4rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const FeaturesHeading = styled.h2`
  font-size: 2.5rem;
  color: ${black};
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const FeatureList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const FeatureItem = styled.div`
  max-width: 300px;
  background-color: ${secondaryColor};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${blue};
  margin-bottom: 1rem;
`;

export const FeatureDescription = styled.p`
  font-size: 1rem;
  color: ${darkText};
`;

// Get Started Section
export const GetStartedSection = styled.section`
  padding: 3rem 2rem;
  background-color: ${black};
  color: ${whiteText};
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const FinalCallToAction = styled.h2`
  font-size: 2rem;
  color: ${blue};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const CallToActionButton = styled(GetStartedButton)`
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;
export const ContentWrapper = styled.div`
  padding-top: 4rem;
`;

// Logo/Brand
export const Logo = styled.h1`
  font-size: 1.8rem;
  color: ${secondaryColor};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
