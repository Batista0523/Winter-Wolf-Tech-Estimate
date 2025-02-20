import React from "react";
import {
  HomeWrapper,
  HeroSection,
  Heading,
  Subheading,
  Description,
  GetStartedButton,
  FeaturesSection,
  FeaturesHeading,
  FeatureList,
  FeatureItem,
  FeatureTitle,
  FeatureDescription,
  GetStartedSection,
  FinalCallToAction,
  CallToActionButton,
} from "../style/HomeStyled";
import RoomItems from "./RoomItems";


const Home = ({ equipments, accessories, onAddItem }) => {
  return (
    <HomeWrapper>
      <HeroSection>
      
        <Heading>Welcome to Winter Wolf QuoteMaster</Heading>
      
        <Subheading>Winter Wolf's Estimator Tool</Subheading>
        <Description>
          At Winter Wolf Tech, we are dedicated to delivering unparalleled
          precision and speed with QuoteMaster. Our platform integrates advanced
          technology to provide you with the most accurate estimates tailored to
          your needs. Experience seamless navigation and exceptional support,
          all designed to simplify your life and enhance your business
          efficiency.
        </Description>
        <GetStartedButton to="/register">Get Started</GetStartedButton>
      </HeroSection>

      <FeaturesSection>
        <FeaturesHeading>Why Winter Wolf QuoteMaster?</FeaturesHeading>
        <FeatureList>
          <FeatureItem>
            <FeatureTitle>Leverage Our Cutting-Edge Algorithms</FeatureTitle>
            <FeatureDescription>
              As part of the Winter Wolf team, you can use our advanced
              algorithms to generate highly accurate estimates. These tools
              analyze data with precision, ensuring that every estimate is
              reliable and tailored to your needs. Simplify your workflow and
              enhance decision-making with our innovative technology.
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>
              Seamless Navigation and User-Friendliness
            </FeatureTitle>
            <FeatureDescription>
              Our platform is designed with you in mind, offering an intuitive
              and easy-to-use interface. Effortlessly manage and navigate
              through estimates, saving time and minimizing errors. Experience
              streamlined efficiency and focus on what matters most.
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>Empower Your Workflow with Efficiency</FeatureTitle>
            <FeatureDescription>
              With Winter Wolf’s estimator tool, you can quickly create and
              manage estimates with ease. This platform simplifies
              administrative tasks, boosting productivity and accuracy.
              Effortlessly integrate it into your workflow and enhance your
              team’s efficiency.
            </FeatureDescription>
          </FeatureItem>
        </FeatureList>
      </FeaturesSection>

      <GetStartedSection>
        <FinalCallToAction>
          Ready to Revolutionize Your Estimation Process?
        </FinalCallToAction>
        <GetStartedButton to="/register">Sign up Today</GetStartedButton>
      </GetStartedSection>
    </HomeWrapper>
  );
};

export default Home;
