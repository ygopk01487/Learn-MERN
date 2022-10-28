import React, { useContext } from "react";
import learnItlogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/Authcontext";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser
  } = useContext(AuthContext);

  const logout = () => logoutUser() 
  return (
    <div>
      <Navbar className="navbar navbar-dark bg-dark">
        <Navbar.Brand className="font-weight-bolder text-white">
          <img
            src={learnItlogo}
            alt="learnItlogo"
            width="32"
            height="32"
            className="mr-2"
          />
          LearIt
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              className="font-weigth-bolder text-white"
              to="dashboard"
              as={Link}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className="font-weigth-bolder text-white"
              to="about"
              as={Link}
            >
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="font-weight-bolder text-white" disabled>
              Wellcome {username}
            </Nav.Link>
            <Button
              variant="secondary"
              className="font-weigth-bolder text-white"
              onClick={logout}
            >
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width="32"
                height="32"
                className="mr-2"
              />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarMenu;
