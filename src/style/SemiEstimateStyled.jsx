// import styled from "styled-components";
// import { Link } from "react-router-dom";

// // Colors
// const primaryColor = "#182d40";
// const secondaryColor = "#ffffff";
// const blueColor = "#009bdf";
// const darkGrey = "#2e2e2e";
// const lightGrey = "#e8e8e8";
// const darkText = "#171717";

// // Container
// export const SemiEstimateContainer = styled.div`
//   /* Overall page container */
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   min-height: 100vh;
//   box-sizing: border-box;
//   background-color: ${secondaryColor};
//   color: ${darkText};

//   /* Layout & spacing */
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   padding: 2rem;

//   /* Tablet adjustments */
//   @media (max-width: 1024px) {
//     padding: 1.5rem;
//     gap: 1.25rem;
//   }

//   /* Mobile adjustments */
//   @media (max-width: 768px) {
//     padding: 1rem;
//     gap: 1rem;
//   }
// `;

// export const Title = styled.h1`
//   text-align: center;
//   font-size: 2.5rem;
//   color: ${primaryColor};
//   margin-bottom: 1rem;
//   font-weight: 700;

//   @media (max-width: 1024px) {
//     font-size: 2.2rem;
//   }

//   @media (max-width: 768px) {
//     font-size: 2rem;
//   }
// `;

// export const TextInput = styled.input`
//   width: 100%;
//   max-width: 500px;
//   padding: 0.75rem 1rem;
//   margin-bottom: 1rem;
//   border: 1px solid ${lightGrey};
//   border-radius: 6px;
//   font-size: 1rem;
//   transition: border-color 0.3s ease;
//   box-sizing: border-box;

//   &:focus {
//     border-color: ${primaryColor};
//     outline: none;
//   }

//   @media (max-width: 1024px) {
//     max-width: 90%;
//     padding: 0.7rem 0.9rem;
//   }

//   @media (max-width: 768px) {
//     max-width: 100%;
//     padding: 0.65rem 0.8rem;
//   }
// `;

// export const NumberInput = styled.input`
//   width: 136px;
//   padding: 0.6rem 0.9rem;
//   margin-bottom: -2rem;
//   border: 1px solid ${lightGrey};
//   border-radius: 25px;
//   font-size: 1rem;
//   transition: border-color 0.3s ease;
//   box-sizing: border-box;
//   position: relative;
//   left: 31rem;

//   &:focus {
//     border-color: ${blueColor};
//     outline: none;
//   }

//   @media (max-width: 1024px) {
//     left: 15rem;
//   }

//   @media (max-width: 768px) {
//     width: 100px;
//     padding: 0.5rem 0.7rem;
//     left: 0;
//   }
// `;

// /* This is used for displaying floors/rooms. We'll style it like a card. */
// export const DisplaySquare = styled.div`
//   width: 100%;
//   padding: 1.5rem;
//   background-color: #f8f9fa;
//   border: 1px solid ${lightGrey};
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   margin-bottom: 1rem;

//   @media (max-width: 1024px) {
//     padding: 1.25rem;
//   }

//   @media (max-width: 768px) {
//     padding: 1rem;
//   }
// `;

// export const SelectionButton = styled.button`
//   background-color: ${({ $active }) => ($active ? primaryColor : secondaryColor)};
//   color: ${({ $active }) => ($active ? secondaryColor : primaryColor)};
//   border: 1px solid ${primaryColor};
//   padding: 0.6rem 1rem;
//   margin-right: 0.5rem;
//   cursor: pointer;
//   border-radius: 6px;
//   transition: background-color 0.3s ease, color 0.3s ease;

//   &:hover {
//     background-color: ${primaryColor};
//     color: ${secondaryColor};
//   }

//   @media (max-width: 1024px) {
//     padding: 0.55rem 0.9rem;
//   }

//   @media (max-width: 768px) {
//     margin-bottom: 0.5rem;
//     padding: 0.5rem 0.8rem;
//   }
// `;

// export const ItemListContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.75rem;
//   margin: 1rem 0;
//   justify-content: center;

//   @media (max-width: 1024px) {
//     gap: 0.65rem;
//   }

//   @media (max-width: 768px) {
//     gap: 0.5rem;
//   }
// `;

// export const ItemButton = styled.button`
//   background-color: ${lightGrey};
//   border: 1px solid ${darkGrey};
//   border-radius: 6px;
//   padding: 0.75rem 1rem;
//   min-width: 130px;
//   cursor: pointer;
//   font-size: 0.95rem;
//   text-align: center;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: ${blueColor};
//     color: ${secondaryColor};
//   }

//   @media (max-width: 1024px) {
//     min-width: 110px;
//     padding: 0.65rem 0.9rem;
//   }

//   @media (max-width: 768px) {
//     min-width: 90px;
//     padding: 0.6rem 0.8rem;
//     font-size: 0.9rem;
//   }
// `;

// export const SelectedItemContainer = styled.div`
//   width: 100%;
//   max-width: 500px;
//   margin-top: 1rem;
//   padding: 1rem;
//   background-color: ${lightGrey};
//   border: 1px solid ${darkGrey};
//   border-radius: 6px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   text-align: center;

//   @media (max-width: 1024px) {
//     padding: 0.9rem;
//   }

//   @media (max-width: 768px) {
//     padding: 0.8rem;
//   }
// `;

// export const AddItemButton = styled.button`
//   background-color: ${primaryColor};
//   color: ${secondaryColor};
//   border: none;
//   padding: 0.65rem 1.25rem;
//   font-size: 1rem;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   margin-top: 0.75rem;

//   &:hover {
//     background-color: ${darkGrey};
//   }

//   @media (max-width: 1024px) {
//     padding: 0.6rem 1.1rem;
//   }

//   @media (max-width: 768px) {
//     padding: 0.55rem 1rem;
//     font-size: 0.95rem;
//   }
// `;

// export const StyledButton = styled.button`
//   background-color: ${primaryColor};
//   color: ${secondaryColor};
//   border: none;
//   padding: 0.7rem 1.3rem;
//   font-size: 1rem;
//   border-radius: 6px;
//   cursor: pointer;
//   margin: 0.75rem 0.5rem 0 0;
//   transition: background-color 0.3s ease, transform 0.2s ease;

//   &:hover {
//     background-color: ${darkGrey};
//     transform: translateY(-2px);
//   }

//   @media (max-width: 1024px) {
//     padding: 0.65rem 1.2rem;
//   }

//   @media (max-width: 768px) {
//     padding: 0.6rem 1rem;
//     font-size: 0.95rem;
//   }
// `;

// export const SummarySection = styled.div`
//   width: 100%;
//   max-width: 600px;
//   margin-top: 1rem;
//   padding: 1.5rem;
//   background-color: ${secondaryColor};
//   border: 1px solid ${lightGrey};
//   border-radius: 6px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

//   @media (max-width: 1024px) {
//     padding: 1.25rem;
//   }

//   @media (max-width: 768px) {
//     padding: 1rem;
//   }
// `;

// export const SummaryItem = styled.div`
//   margin-bottom: 0.75rem;
//   font-size: 1rem;
//   line-height: 1.4;
//   color: ${darkText};

//   @media (max-width: 1024px) {
//     font-size: 0.95rem;
//   }

//   @media (max-width: 768px) {
//     font-size: 0.9rem;
//   }
// `;

// export const StyledLink = styled(Link)`
//   color: ${primaryColor};
//   text-decoration: none;
//   font-size: 1rem;
//   font-weight: 500;
//   transition: color 0.3s ease-in-out;

//   &:hover {
//     color: ${blueColor};
//     text-decoration: underline;
//   }

//   @media (max-width: 1024px) {
//     font-size: 0.95rem;
//   }

//   @media (max-width: 768px) {
//     font-size: 0.9rem;
//   }
// `;

// export const OverlayContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.75);
//   z-index: 1000;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

import styled ,{ keyframes }from "styled-components";
import { Link } from "react-router-dom";

// Colors
const primaryColor = "#182d40";
const secondaryColor = "#ffffff";
const blueColor = "#009bdf";
const darkGrey = "#2e2e2e";
const lightGrey = "#e8e8e8";
const darkText = "#171717";

// Container
export const SemiEstimateContainer = styled.div`
  /* Overall page container */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: ${secondaryColor};
  color: ${darkText};

  /* Layout & spacing */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;

  @media (max-width: 1024px) {
    padding: 1.5rem;
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: ${primaryColor};
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const TextInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${lightGrey};
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border-color: ${primaryColor};
    outline: none;
  }

  @media (max-width: 1024px) {
    max-width: 90%;
    padding: 0.7rem 0.9rem;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.65rem 0.8rem;
  }
`;

/* Updated NumberInput - supports an "inline" prop */
export const NumberInput = styled.input`
  width: 136px;
  padding: 0.6rem 0.9rem;
  margin-bottom: ${(props) => (props.inline ? "0" : "-2rem")};
  border: 1px solid ${lightGrey};
  border-radius: 25px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  position: ${(props) => (props.inline ? "static" : "relative")};
  left: ${(props) => (props.inline ? "0" : "31rem")};

  &:focus {
    border-color: ${blueColor};
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100px;
    padding: 0.5rem 0.7rem;
  }
`;
export const NumberInput2 = styled.input`
  width: 136px;
  padding: 0.6rem 0.9rem;
  margin-bottom: ${(props) => (props.inline ? "0" : "-2rem")};
  border: 1px solid ${lightGrey};
  border-radius: 25px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  position: relative;
  right:3rem ;

  &:focus {
    border-color: ${blueColor};
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100px;
    padding: 0.5rem 0.7rem;
  }
`;

/* New container to group inline inputs */
export const InputRow = styled.div`
  display: flex;
  gap: 20px;
  position:relative;
 right:31rem;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

/* --- Other components remain unchanged --- */
export const DisplaySquare = styled.div`
  width: 85%;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border: 1px solid ${lightGrey};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0rem;

  @media (max-width: 1024px) {
    padding: 1.25rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SelectionButton = styled.button`
  background-color: ${({ $active }) => ($active ? primaryColor : secondaryColor)};
  color: ${({ $active }) => ($active ? secondaryColor : primaryColor)};
  border: 1px solid ${primaryColor};
  padding: 0.6rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${primaryColor};
    color: ${secondaryColor};
  }

  @media (max-width: 1024px) {
    padding: 0.55rem 0.9rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.8rem;
  }
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 12px 20px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 1rem;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #2980b9;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px; /* Limits height for scrollability */
  overflow-y: auto; /* Enables vertical scrolling */
  padding: 1rem;
  border-radius: 10px;
  background-color: #f8f9fa;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Inter", sans-serif; /* Professional, clean font */
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2980b9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #e1e5ea;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    max-height: 400px;
    padding: 0.75rem;
  }
`;

export const ListItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #d1d5db;
  font-size: 1rem;
  color: #333;
  transition: background 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #e3f2fd;
  }

  &:last-child {
    border-bottom: none;
  }
`;


export const ItemButton = styled.button`
  background-color: ${lightGrey};
  border: 1px solid ${darkGrey};
  border-radius: 6px;
  padding: 0.75rem 1rem;
  min-width: 130px;
  cursor: pointer;
  font-size: 0.95rem;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${blueColor};
    color: ${secondaryColor};
  }

  @media (max-width: 1024px) {
    min-width: 110px;
    padding: 0.65rem 0.9rem;
  }

  @media (max-width: 768px) {
    min-width: 90px;
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
`;

export const SelectedItemContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${lightGrey};
  border: 1px solid ${darkGrey};
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 1024px) {
    padding: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

export const AddItemButton = styled.button`
  background-color: ${primaryColor};
  color: ${secondaryColor};
  border: none;
  padding: 0.65rem 1.25rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0.75rem;

  &:hover {
    background-color: ${darkGrey};
  }

  @media (max-width: 1024px) {
    padding: 0.6rem 1.1rem;
  }

  @media (max-width: 768px) {
    padding: 0.55rem 1rem;
    font-size: 0.95rem;
  }
`;

export const StyledButton = styled.button`
  background-color: ${primaryColor};
  color: ${secondaryColor};
  border: none;
  padding: 0.7rem 1.3rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin: 0.75rem 0.5rem 0 0;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${darkGrey};
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    padding: 0.65rem 1.2rem;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.95rem;
  }
`;

export const SummarySection = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: ${secondaryColor};
  border: 1px solid ${lightGrey};
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    padding: 1.25rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SummaryItem = styled.div`
  margin-bottom: 0.75rem;
  font-size: 1rem;
  line-height: 1.4;
  color: ${darkText};

  @media (max-width: 1024px) {
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const StyledLink = styled(Link)`
  color: ${primaryColor};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${blueColor};
    text-decoration: underline;
  }

  @media (max-width: 1024px) {
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #2980b9;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;
