import React, { useState, useEffect } from "react";
import Videos from "./Videos";
import { useParams } from "react-router-dom";
import axios from "axios";
import { config } from "../App";
import { useSnackbar } from "notistack";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { Box, Typography, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { LoadingVideo } from "./Videos";
import { TimeFormat } from "./VideoGrid";

const VideoPage = () => {
  const [selectedVideo, setSelectedVideo] = useState({});
  const [loader, setLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);
  let { id } = useParams();

  const iframeStyle = {
    width: "100%",
    height: "70vh",
    border: "1px solid gray",
    borderRadius: "8px",
  };

  const fetchApiVideoID = async () => {
    setLoader(true);
    try {
      let response = await axios.get(`${config.endpoint}/:${id}`);
      setSelectedVideo(response.data);
      setLoader(false);
    } catch (error) {
      enqueueSnackbar(`Error:${error.response.data.message}`, {
        variant: "error",
      });
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchApiVideoID();
    // eslint-disable-next-line
  }, []);

  const patchVoteData = async (vote) => {
    const voteData = { vote: vote, change: "increase" };
    try {
      let response = await axios.patch(
        `${config.endpoint}/:${id}/votes`,
        voteData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      enqueueSnackbar(`Error:${error.response.data.message}`, {
        variant: "error",
      });
    }
  };

  const handleUpvote = () => {
    setUpvote(upvote + 1);
    patchVoteData("upVote");
  };

  const handleDownvote = () => {
    setDownvote(downvote + 1);
    patchVoteData("downVote");
  };

  return (
    <>
      <Header />
      <SearchBar />
      {loader ? (
        <LoadingVideo />
      ) : (
        <Box
          sx={{ margin: "auto", marginTop: 4, width: "85%", color: "#FFFFFF" }}
        >
          <Box>
            <iframe
              style={iframeStyle}
              src={`https://www.${selectedVideo.videoLink}`}
              title={selectedVideo.title}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography>{selectedVideo.title}</Typography>
              <Typography>
                {selectedVideo.contentRating} |{" "}
                {<TimeFormat releaseDate={selectedVideo.releaseDate} />}
              </Typography>
            </Box>
            <Box>
              <Button
                onClick={handleUpvote}
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "#424242",
                  borderRadius: "16px",
                  padding: "2px",
                  margin: "2px",
                }}
                startIcon={
                  <ThumbUpIcon sx={{ color: "#797979" }} fontSize="small" />
                }
              >
                {upvote}
              </Button>
              <Button
                onClick={handleDownvote}
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "#424242",
                  borderRadius: "16px",
                  padding: "2px",
                  margin: "2px",
                }}
                startIcon={
                  <ThumbDownIcon sx={{ color: "#797979" }} fontSize="small" />
                }
              >
                {downvote}
              </Button>
            </Box>
          </Box>
          <hr color="gray" />
        </Box>
      )}
      <Videos videoPage={true} />;
    </>
  );
};

export default VideoPage;