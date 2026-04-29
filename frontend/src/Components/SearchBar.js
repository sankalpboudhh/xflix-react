import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import "./SearchBar.css";

const SearchBar = () => {

  return (
    <Box className="search-bar">
      <input className="search-mobile" placeholder="Search"  name="search" />

      <button type="button" className="search-icon-mobile">
        <SearchIcon style={{ marginTop: "2px", color: "#3e6ca8"  }} />
      </button>
      
    </Box>
  );
};

export default SearchBar;