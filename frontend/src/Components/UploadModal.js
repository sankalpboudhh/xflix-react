import React, { useState, useEffect } from "react";
import "./UploadModal.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloseIcon from "@mui/icons-material/Close";
import {
  Typography,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Button,
  Box,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { config } from "../App";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function UploadModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(new Date());
  const { enqueueSnackbar } = useSnackbar();
  const [postData, setPostData] = useState({
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: "",
    previewImage: "",
  });
  let dateString = "";
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDateChange = (newValue) => {
    setValue(newValue);
    const years = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = newValue.getDate();

    const month = newValue.getMonth() + 1;

    const fullYear = newValue.getFullYear();

    dateString = date + " " + month + " " + fullYear;

    setPostData({ ...postData, releaseDate: dateString });
  };

  const handlePostData = async (dataPost) => {
    const data = dataPost;
    try {
      let response = await axios.post(`${config.endpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleClose();
      enqueueSnackbar("Uploaded Successfully", { variant: "success" });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Button
        className="upload-button"
        sx={{ textTransform: "capitalize", letterSpacing: "1.5px" }}
        variant="contained"
        startIcon={<FileUploadIcon />}
        onClick={handleOpen}
      >
        Upload
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="upload-modal">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "16px" }}
            >
              Upload Video
            </Typography>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Box>
          <TextField
            sx={{ width: "367px", marginBottom: "8px" }}
            id="videoLink"
            label="Video Link"
            variant="outlined"
            helperText="This link will be used to derive the video"
            onChange={(e) =>
              setPostData({ ...postData, videoLink: e.target.value })
            }
          />
          <TextField
            sx={{ width: "367px", marginBottom: "8px" }}
            id="thumbnailImageLink"
            label="Thumbnail Image Link"
            variant="outlined"
            helperText="This link will be used to preview the thumbnail image"
            onChange={(e) =>
              setPostData({ ...postData, previewImage: e.target.value })
            }
          />
          <TextField
            sx={{ width: "367px", marginBottom: "8px" }}
            id="title"
            label="Title"
            variant="outlined"
            helperText="This title will be representative text for video"
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <FormControl>
            <InputLabel id="genre">Genre</InputLabel>
            <Select
              sx={{ width: "367px" }}
              labelId="genre"
              id="genreFilter"
              value={postData.genre}
              label="Genre"
              onChange={(e) =>
                setPostData({ ...postData, genre: e.target.value })
              }
            >
              <MenuItem value={"Education"}>Education</MenuItem>
              <MenuItem value={"Sports"}>Sports</MenuItem>
              <MenuItem value={"Comedy"}>Comedy</MenuItem>
              <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
            </Select>
            <FormHelperText sx={{ marginBottom: "8px" }}>
              Genre will help in categorizing your videos
            </FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel id="age">Suitable age group for the clip</InputLabel>
            <Select
              sx={{ width: "367px" }}
              labelId="age"
              id="ageFilter"
              value={postData.contentRating}
              label="Suitable age group for the clip"
              onChange={(e) =>
                setPostData({ ...postData, contentRating: e.target.value })
              }
            >
              <MenuItem value={"7+"}>7+</MenuItem>
              <MenuItem value={"12+"}>12+</MenuItem>
              <MenuItem value={"16+"}>16+</MenuItem>
              <MenuItem value={"18+"}>18+</MenuItem>
            </Select>
            <FormHelperText sx={{ marginBottom: "8px" }}>
              This will be used to filter videos on age group suitability
            </FormHelperText>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Upload and Publish Date"
              inputFormat="dd/MM/yyyy"
              value={value}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "367px", marginBottom: "8px" }}
                  helperText="This will be used to sort videos"
                />
              )}
            />
          </LocalizationProvider>
          <Box>
            <Button
              sx={{
                backgroundColor: "#bdbdbd",
                color: "#424242",
                marginRight: "8px",
              }}
              onClick={() => handlePostData(postData)}
            >
              Upload Video
            </Button>
            <Button
              sx={{ color: "#424242", padding: "2px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}