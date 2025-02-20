import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; 
import {
  ProfileWrapper,
  WelcomeMessage,
  ActionsSection,
  ActionButton,
  FeaturesList,
  FeatureItem,
  FeatureTitle,
  FeatureDescription,
} from "../style/ProfileStyled";

const UserProfile = () => {
  const { user } = useAuth(); 
  const [userData, setUserData] = useState(user || null); 
  const endPoint = import.meta.env.VITE_USER_ENDPOINT;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userData && user) { 
        try {
          const response = await fecthOneItem(endPoint, user.id); 
          if (response.success) {
            setUserData(response.payload); 
          } else {
            console.error("Error fetching user", response);
          }
        } catch (err) {
          console.error("Error fetching user", err);
        }
      }
    };

    fetchUserData();
  }, [user, userData]); // Dependency on user and userData

  // Show loading state if data is not yet available
  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <ProfileWrapper>
      <WelcomeMessage>{`Welcome back, ${userData.name}!`}</WelcomeMessage>
      <p>Here’s what you can do:</p>

      <ActionsSection>
        <Link to="/semi_estimate">
          <ActionButton>Create Estimate</ActionButton>
        </Link>
        <Link to="/update_profile">
          <ActionButton>Update Profile Information</ActionButton>
        </Link>
        {/* <Link to="/final_estimate">
          <ActionButton>View Estimate History</ActionButton>
        </Link> */}
        <Link to="/accEquip">
          <ActionButton>Add materials and/or Equipment</ActionButton>
        </Link>
        
      </ActionsSection>

      <FeaturesList>
        <FeatureItem>
          <FeatureTitle>Manage Your Estimates</FeatureTitle>
          <FeatureDescription>
            Effortlessly create and view your estimate history to keep track of all projects.
          </FeatureDescription>
        </FeatureItem>
        <FeatureItem>
          <FeatureTitle>Update Personal Information</FeatureTitle>
          <FeatureDescription>
            Keep your contact details and preferences up to date with a few clicks.
          </FeatureDescription>
        </FeatureItem>
        <FeatureItem>
          <FeatureTitle>Access And Control Your Estimates</FeatureTitle>
          <FeatureDescription>
            Take full control of your estimates by easily managing, editing, and tracking every detail.
          </FeatureDescription>
        </FeatureItem>
        
      </FeaturesList>
     
    </ProfileWrapper>
  );
};

export default UserProfile;
