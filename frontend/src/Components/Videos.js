import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Chip,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { config } from "../App";
import VideoGrid from "./VideoGrid";
import "./Videos.css";
import Header from "./Header";
import SearchBar from "./SearchBar";

export const LoadingVideo = () => {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ alignSelf: "center" }} />
      <Box>
        <Typography sx={{ color: "whitesmoke", alignSelf: "center" }}>
          Loading Videos
        </Typography>
      </Box>
    </Grid>
  );
};


const Videos = ({ videoPage }) => {
  const items = [
    {
      votes: {
        upVotes: 0,
        downVotes: 0,
      },
      previewImage: "https://i.ytimg.com/vi/nx2-4l4s4Nw/mqdefault.jpg",
      viewCount: 83,
      _id: "60331f421f1d093ab5424489",
      videoLink: "youtube.com/embed/nx2-4l4s4Nw",
      title: "Consumed by the Apocalypse",
      genre: "Movies",
      contentRating: "12+",
      releaseDate: "18 Jan 2021",
    },
  ];

  const [videos, setVideos] = useState([]);
  const [loader, setLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [allGenre, setAllGenre] = useState(true);
  const [education, setEducation] = useState(false);
  const [sports, setSports] = useState(false);
  const [comedy, setComedy] = useState(false);
  const [lifestyle, setLifestyle] = useState(false);
  const [contentRating, setContentRating] = useState({
    anyAge: true,
    sevenPlus: false,
    twelvePlus: false,
    sixteenPlus: false,
    eighteenPlus: false,
  });


  const [debounceTimer, setDebounceTimer] = useState(0);
  const [age, setAge] = useState("");
  const [sortBy, setSortBy] = useState("releaseDate");

  const filterPannelStyle = {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.25px",
    color: "#FFFFFF",
    marginRight: "8px",
  };

  const sortStyle = {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.25px",
    textTransform: "capitalize",
    backgroundColor: "#FFFFFF",
    height: 30,
  };

  const getVideos = async (title) => {
    setLoader(true);
    let url = config.endpoint;
    if (allGenre && !age && title) {
      url = `${url}?${title ? "title=" + encodeURIComponent(title) + "&" : ""}`;
    }
    if (allGenre && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }contentRating=${encodeURIComponent(age)}`;
    } else if (education && sports && comedy && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Sports,Comedy&contentRating=${encodeURIComponent(age)}`;
    } else if (education && sports && lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Sports,Lifestyle&contentRating=${encodeURIComponent(
        age
      )}`;
    } else if (sports && comedy && lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports,Comedy,Lifestyle&contentRating=${encodeURIComponent(age)}`;
    } else if (education && comedy && lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Comedy,Lifestyle&contentRating=${encodeURIComponent(
        age
      )}`;
    } else if (education && sports && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Sports&contentRating=${encodeURIComponent(age)}`;
    } else if (education && comedy && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Comedy&contentRating=${encodeURIComponent(age)}`;
    } else if (education && lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Lifestyle&contentRating=${encodeURIComponent(age)}`;
    } else if (sports && comedy && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports,Comedy&contentRating=${encodeURIComponent(age)}`;
    } else if (sports && lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports,Lifestyle&contentRating=${encodeURIComponent(age)}`;
    } else if (comedy && lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Comedy,Lifestyle&contentRating=${encodeURIComponent(age)}`;
    } else if (education && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education&contentRating=${encodeURIComponent(age)}`;
    } else if (sports && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports&contentRating=${encodeURIComponent(age)}`;
    } else if (comedy && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Comedy&contentRating=${encodeURIComponent(age)}`;
    } else if (lifestyle && age) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Lifestle&contentRating=${encodeURIComponent(age)}`;
    } else if (education && sports && comedy) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Sports,Comedy`;
    } else if (education && sports && lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Sports,Lifestyle`;
    } else if (sports && comedy && lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports,Comedy,Lifestyle`;
    } else if (education && comedy && lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Comedy,Lifestyle`;
    } else if (education && sports) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Sports`;
    } else if (education && comedy) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Comedy`;
    } else if (education && lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education,Lifestyle`;
    } else if (sports && comedy) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports,Comedy`;
    } else if (sports && lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports,Lifestyle`;
    } else if (comedy && lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Comedy,Lifestyle`;
    } else if (education) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Education`;
    } else if (sports) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Sports`;
    } else if (comedy) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Comedy`;
    } else if (lifestyle) {
      url = `${url}?${
        title ? "title=" + encodeURIComponent(title) + "&" : ""
      }genres=Lifestle`;
    }
    try {
      let response = await axios.get(url);
      setVideos(response.data.videos);
      setLoader(false);
    } catch (error) {
      enqueueSnackbar(`Error:${error.response.data.message}`, {
        variant: "error",
      });
      setLoader(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  // Genre Pannel 

  const handleContentRating = (sortAge) => {
    if (sortAge === "anyAge") {
      setAge("");
      setContentRating({
        anyAge: true,
        sevenPlus: false,
        twelvePlus: false,
        sixteenPlus: false,
        eighteenPlus: false,
      });
    } else if (sortAge === "7+") {
      setAge(sortAge);
      setContentRating({
        anyAge: false,
        sevenPlus: true,
        twelvePlus: false,
        sixteenPlus: false,
        eighteenPlus: false,
      });
    } else if (sortAge === "12+") {
      setAge(sortAge);
      setContentRating({
        anyAge: false,
        sevenPlus: false,
        twelvePlus: true,
        sixteenPlus: false,
        eighteenPlus: false,
      });
    } else if (sortAge === "16+") {
      setAge(sortAge);
      setContentRating({
        anyAge: false,
        sevenPlus: false,
        twelvePlus: false,
        sixteenPlus: true,
        eighteenPlus: false,
      });
    } else if (sortAge === "18+") {
      setAge(sortAge);
      setContentRating({
        anyAge: false,
        sevenPlus: false,
        twelvePlus: false,
        sixteenPlus: false,
        eighteenPlus: true,
      });
    }
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    if (education || sports || comedy || lifestyle) {
      setAllGenre(false);
    }

    if (education && sports && comedy && lifestyle) {
      setAllGenre(true);
      setEducation(false);
      setSports(false);
      setComedy(false);
      setLifestyle(false);
    }

    if (!education && !sports && !comedy && !lifestyle) {
      setAllGenre(true);
    }
    getVideos();
  }, [education, sports, comedy, lifestyle, age]);

  useEffect(() => {
    const sortByGetVideos = async (value) => {
      setLoader(true);
      try {
        let response = await axios.get(`${config.endpoint}?sortBy=${value}`);
        setVideos(response.data.videos);
        setLoader(false);
      } catch (error) {
        enqueueSnackbar(`Error:${error.response.data.message}`, {
          variant: "error",
        });
        setLoader(false);
      }
    };

    sortByGetVideos(sortBy);
  }, [sortBy]);


  const videosList = videos.map((video) => {
    return <VideoGrid video={video} sortBy={sortBy} key={video["_id"]} />;
  });

  const debounceSearch = (event, debounceTimeout) => {
    if (debounceTimer !== 0) {
      clearTimeout(debounceTimer);
    }
    const timerId = setTimeout(() => getVideos(event), debounceTimeout);
    setDebounceTimer(timerId);
  };

  const handleSearch = (title) => {
    debounceSearch(title, 1000);
  };
  return (
    <div>
      {!videoPage && (
        <>
          {/* Header Component */}
          <Header onChange={handleSearch} />
          {/* Mobile Search Bar */}
          <SearchBar />
          {/* genre pannel */}
          <Box className="genre-pannel">
            {/* Genre Pannel setting for selection */}
            <Box sx={{ marginBottom: 1 }}>
              <Chip
                label="All Genre"
                onClick={() => {
                  setAllGenre(true);
                  setEducation(false);
                  setSports(false);
                  setComedy(false);
                  setLifestyle(false);
                }}
                color={allGenre ? "primary" : undefined}
                sx={filterPannelStyle}
              />
              <Chip
                label="Education"
                onClick={() => setEducation(!education)}
                color={education ? "primary" : undefined}
                sx={filterPannelStyle}
              />
              <Chip
                label="Sports"
                onClick={() => setSports(!sports)}
                color={sports ? "primary" : undefined}
                sx={filterPannelStyle}
              />
              <Chip
                label="Comedy"
                onClick={() => setComedy(!comedy)}
                color={comedy ? "primary" : undefined}
                sx={filterPannelStyle}
              />
              <Chip
                label="Lifestyle"
                onClick={() => setLifestyle(!lifestyle)}
                color={lifestyle ? "primary" : undefined}
                sx={filterPannelStyle}
              />

              <FormControl>
                <Select value={sortBy} onChange={handleSortBy} sx={sortStyle}>
                  <MenuItem value={"releaseDate"} sx={sortStyle}>
                    Release Date
                  </MenuItem>
                  <MenuItem value={"viewCount"} sx={sortStyle}>
                    View Count
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Rating for age selection  */}

            <Box sx={{ marginBottom: 1 }}>
              <Chip
                label="Anyone"
                onClick={() => {
                  handleContentRating("anyAge");
                }}
                color={contentRating.anyAge ? "primary" : undefined}
                sx={filterPannelStyle}
              />
              <Chip
                label="7+"
                onClick={() => {
                  handleContentRating("7+");
                }}
                color={contentRating.sevenPlus ? "primary" : undefined}
                sx={filterPannelStyle}
              />
              <Chip
                label="12+"
                onClick={() => {
                  handleContentRating("12+");
                }}
                color={contentRating.twelvePlus ? "primary" : undefined}
                sx={filterPannelStyle}
              />
              <Chip
                label="16+"
                onClick={() => {
                  handleContentRating("16+");
                }}
                color={contentRating.sixteenPlus ? "primary" : undefined}
                sx={filterPannelStyle}
              />
              <Chip
                label="18+"
                onClick={() => {
                  handleContentRating("18+");
                }}
                color={contentRating.eighteenPlus ? "primary" : undefined}
                sx={filterPannelStyle}
              />
            </Box>
          </Box>
        </>
      )}
      {loader ? (
        <LoadingVideo />
      ) : (
        <Grid
          container
          spacing={2}
          sx={{ margin: "auto", marginTop: "1", width: "90%" }}
          my={1}
          
        >
          {videosList}
        </Grid>
      )}
    </div>
  );
};

export default Videos;