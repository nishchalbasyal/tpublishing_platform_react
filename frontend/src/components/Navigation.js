import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Navbar, Container,InputGroup, FormControl, Button } from 'react-bootstrap';

import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MobileNavigation from "./MobileNavigation";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../components/Auth/AuthContext";
import Settingsrolling from "./Settingsrolling";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Logout } from "./Auth/Logout";

const Navigation = () => {
  const navigate = useNavigate();
  const { currentUser, isLoading, setCurrentUser } = useContext(AuthContext);
  const [openMobMenu, setMobilemenu] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSearch = () => {
    navigate(`search/${searchText}`);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <header className="Navigation">
      <div className="container">
        <div className="brand">
          <Link to="/" className="logo">
            T<span style={{ color: "black" }}>ravelo</span>
          </Link>
        </div>
        <div className="inputGroup">
          <input
            type="text"
            className="searchInput"
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            value={searchText}
          />
          <SearchIcon
            style={{
              color: "black",
              cursor: "pointer",
              fontSize: "32",
              fontWeight: "bold",
              width: "fit-content",
            }}
            onClick={() => handleSearch()}
          />
        </div>
        <nav className="primary-item">
          <GridViewIcon
            style={{
              color: "black",
              backgroundColor: "white",
              cursor: "pointer",
              fontSize: "32",
              fontWeight: "bold",
              width: "fit-content",
              marginRight: "10",
            }}
            onClick={() => navigate("category")}
          />

          {isLoading ? (
            <span
              className="button-wr"
              style={{ backgroundColor: "white", border: "none" }}
            >
              <Settingsrolling />
              <button className="btn"> Loading.. </button>
            </span>
          ) : currentUser ? (
            <span className="button-wr" style={{ backgroundColor: "white" }}>
              <DesignServicesIcon
                style={{
                  color: "black",
                  backgroundColor: "white",
                  cursor: "pointer",
                  border: "2px solid black",
                  borderRadius: "50%",
                  fontSize: "25",
                  fontWeight: "bold",
                  width: "fit-content",
                }}
                onClick={() => navigate("post")}
              />
              <button className="btn" onClick={() => navigate("post")}>
                {" "}
                Write{" "}
              </button>
            </span>
          ) : (
            <span className="button-wr" style={{ backgroundColor: "white" }}>
              <LoginIcon
                style={{
                  color: "black",
                  backgroundColor: "white",
                  cursor: "pointer",
                  fontSize: "25",
                  fontWeight: "bold",
                  width: "fit-content",
                }}
                onClick={() => navigate("Login")}
              />
              <button className="btn" onClick={() => navigate("Login")}>
                {" "}
                Login{" "}
              </button>
            </span>
          )}

          <AccountCircleIcon
            onClick={() => navigate("/myaccount")}
            style={{
              color: "black",
              backgroundColor: "white",
              cursor: "pointer",
              fontSize: "32",
              fontWeight: "bold",
              width: "fit-content",
              marginRight: "10",
            }}
          />
          {currentUser && (
            <LogoutIcon
              style={{
                color: "black",
                backgroundColor: "white",
                cursor: "pointer",
                fontSize: "25",
                fontWeight: "bold",
                width: "fit-content",
                border: "none",
              }}
              onClick={() => Logout(setCurrentUser)}
            />
          )}
        </nav>
        <div className="mob-cont">
          <MenuIcon
            onClick={() => setMobilemenu((pre) => !pre)}
            style={{ cursor: "pointer" }}
          />
          {openMobMenu && (
            <div className="mobile-menu">
              {openMobMenu && (
                <MobileNavigation
                  checkMob={openMobMenu}
                  setMobilemenu={setMobilemenu}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
