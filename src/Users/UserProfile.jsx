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
  StatsSection,
  StatCard,
  StatTitle,
  StatValue,
  RecentActivitySection,
  ActivityTitle,
  ActivityList,
  ActivityItem,
} from "../style/ProfileStyled";
import { fetchOneItem } from "../helpers/ApiCalls"; // Ensure this function is properly imported

const UserProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(user || null);
  const endPoint = import.meta.env.VITE_USER_ENDPOINT;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userData && user) {
        try {
          const response = await fetchOneItem(endPoint, user.id);
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
  }, [user, userData, endPoint]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <ProfileWrapper>
      <WelcomeMessage>{`Welcome back, ${userData.name}!`}</WelcomeMessage>
      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Explore your dashboard and manage your account efficiently.
      </p>

      <ActionsSection>
        <Link to="/semi_estimate">
          <ActionButton>Create Estimate</ActionButton>
        </Link>
        <Link to="/update_profile">
          <ActionButton>Update Profile</ActionButton>
        </Link>
        <Link to="/accEquip">
          <ActionButton>Add Materials & Equipment</ActionButton>
        </Link>
      </ActionsSection>

      <FeaturesList>
        <FeatureItem>
          <FeatureTitle>Effortless Estimate Management</FeatureTitle>
          <FeatureDescription>
            Create, view, and manage your estimates with an intuitive dashboard.
          </FeatureDescription>
        </FeatureItem>
        <FeatureItem>
          <FeatureTitle>Seamless Profile Updates</FeatureTitle>
          <FeatureDescription>
            Keep your personal and contact information updated with ease.
          </FeatureDescription>
        </FeatureItem>
        <FeatureItem>
          <FeatureTitle>Comprehensive Control</FeatureTitle>
          <FeatureDescription>
            Access and manage all your projects from a single, user-friendly platform.
          </FeatureDescription>
        </FeatureItem>
      </FeaturesList>

      {/* Dashboard Stats Section */}
      <StatsSection>
        <StatCard>
          <StatTitle>Total Estimates</StatTitle>
          <StatValue>{userData.totalEstimates || 0}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Pending Approvals</StatTitle>
          <StatValue>{userData.pendingApprovals || 0}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Completed Projects</StatTitle>
          <StatValue>{userData.completedProjects || 0}</StatValue>
        </StatCard>
      </StatsSection>

      {/* Recent Activities Section */}
      <RecentActivitySection>
        <ActivityTitle>Recent Activities</ActivityTitle>
        <ActivityList>
          <ActivityItem>
            You created a new estimate for "Project Alpha" on March 15, 2025.
          </ActivityItem>
          <ActivityItem>
            Your profile was updated on March 10, 2025.
          </ActivityItem>
          <ActivityItem>
            You added new materials to your inventory on March 5, 2025.
          </ActivityItem>
        </ActivityList>
      </RecentActivitySection>
    </ProfileWrapper>
  );
};

export default UserProfile;
