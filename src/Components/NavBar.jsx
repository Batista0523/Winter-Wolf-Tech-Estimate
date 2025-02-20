import React, { useState , } from "react";
import { useNavigate } from "react-router-dom";
import {
  NavbarWrapper,
  Logo,
  NavLinksContainer,
  NavLink,
  LogOffButton,
  HamburgerIcon,
  MobileMenuOverlay,
} from "../style/NavBarStyled";

const Navbar = ({ user, onLogOff }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const navigate = useNavigate();
 const handleLogOff = () => {
  onLogOff(); // Log out the user
  navigate("/"); // Navigate to the home page after logout
};
  return (
    <>
      <NavbarWrapper>
        <NavLink to="/">
          <Logo>Winter Wolf QuoteMaster</Logo>
        </NavLink>
        <HamburgerIcon onClick={toggleMenu}>&#9776;</HamburgerIcon>
        <NavLinksContainer className={menuOpen ? "open" : ""}>
          {user ? (
            <>
              <NavLink to="/estimates" onClick={closeMenu}>
                Estimates
              </NavLink>
              <NavLink to="/accesoriesAndEquiments" onClick={closeMenu}>
                Accessories and Equipments
              </NavLink>
              <NavLink to={`/profile/${user.id}`} onClick={closeMenu}>
                Profile
              </NavLink>
              <LogOffButton
                onClick={() => {
                  
                  handleLogOff();
                  closeMenu();
                }}
                
              >
                Log Off
              </LogOffButton>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMenu}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={closeMenu}>
                Register
              </NavLink>
              <NavLink to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </>
          )}
        </NavLinksContainer>
      </NavbarWrapper>

      {/* Overlay to close the menu when clicked outside */}
      {menuOpen && <MobileMenuOverlay onClick={closeMenu} />}
    </>
  );
};

export default Navbar;
