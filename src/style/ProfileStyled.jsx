// import styled from "styled-components";

// export const ProfileWrapper = styled.div`
//   max-width: 1200px;
//   margin: 40px auto;
//   padding: 30px;
//   background-color: #ffffff;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

//   @media (max-width: 768px) {
//     padding: 20px;
//     margin: 20px auto;
//   }
// `;

// export const WelcomeMessage = styled.h2`
//   font-size: 2.5rem;
//   color: #2c3e50;
//   text-align: center;
//   margin-bottom: 20px;
//   font-weight: 600;

//   @media (max-width: 768px) {
//     font-size: 2rem;
//   }
// `;

// export const ActionsSection = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   flex-wrap: wrap;
//   margin: 30px 0;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

// export const ActionButton = styled.button`
//   background-color: #2980b9;
//   color: #ffffff;
//   padding: 12px 24px;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   margin: 10px;
//   font-size: 1rem;
//   transition: background-color 0.3s ease, transform 0.2s ease;

//   &:hover {
//     background-color: #1c5980;
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     width: 80%;
//     font-size: 0.95rem;
//   }
// `;

// export const FeaturesList = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 30px;
//   margin-top: 40px;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// export const FeatureItem = styled.div`
//   background-color: #ecf0f1;
//   padding: 20px;
//   border-radius: 8px;
//   text-align: center;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
// `;

// export const FeatureTitle = styled.h3`
//   font-size: 1.4rem;
//   margin-bottom: 10px;
//   color: #2c3e50;
// `;

// export const FeatureDescription = styled.p`
//   font-size: 1rem;
//   color: #7f8c8d;
// `;
import styled from "styled-components";

export const ProfileWrapper = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 768px) {
    padding: 20px;
    margin: 20px auto;
  }
`;

export const WelcomeMessage = styled.h2`
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ActionsSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 30px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ActionButton = styled.button`
  background-color: #2980b9;
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 10px;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #1c5980;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 80%;
    font-size: 0.95rem;
  }
`;

export const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureItem = styled.div`
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: #2c3e50;
`;

export const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
`;

/* New Styled Components for Dashboard Stats */
export const StatsSection = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  margin: 40px 0;
`;

export const StatCard = styled.div`
  background-color: #3498db;
  padding: 20px;
  border-radius: 8px;
  width: 250px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const StatTitle = styled.h4`
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 10px;
`;

export const StatValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
`;

/* New Styled Components for Recent Activities */
export const RecentActivitySection = styled.div`
  margin: 40px 0;
`;

export const ActivityTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
`;

export const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ActivityItem = styled.li`
  background-color: #ecf0f1;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  font-size: 1rem;
  color: #7f8c8d;
`;
