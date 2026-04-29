import React from "react";
import { Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";
// import UploadModal from "./UploadModal";

const Header = (props) => {

  return (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src={logo} alt="xflix"></img>

        </Link>
      </Box>
      <Box className="search-bar-desktop">
        <input
          className="input-search"
          placeholder="Search"
          onChange={(e) => props.onChange(e.target.value)}
        />
        <button type="button" className="search-icon">
          <SearchIcon sx={{ marginTop: "2px", color: "#3e6ca8" }} />
        </button>
      </Box>
      <Box>
        {/* <UploadModal /> */}
      </Box>
    </Box>
  );
};

export default Header;