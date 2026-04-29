import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Grid,
  } from "@mui/material";
  import React from "react";
  import "./VideoGrid.css";
  import { Link } from "react-router-dom";
  
  export const TimeFormat = ({ releaseDate }) => {
    if (typeof releaseDate !== "object") {
      releaseDate = new Date(releaseDate);
    }
  
    let seconds = Math.floor((new Date() - releaseDate) / 1000);
  
    let intervalType;
  
    let interval = Math.floor(seconds / 31536000);
  
    if (interval >= 1) {
      intervalType = "year";
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = "month";
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = "day";
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hour";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }
    if (interval > 1 || interval === 0) {
      intervalType += "s";
    }
    return `${interval} ${intervalType} ago`;
  };
  
  const VideoGrid = ({ video, sortBy }) => {
    return (
      <Grid item xs={12} sm={6} md={3}>
        <Link to={`/video/${video["_id"]}`} className="link">
          <Card className="card">
            <CardActionArea>
              <CardMedia
                component="img"
                image={video.previewImage}
                alt={video.title}
              />
              <CardContent className="card-content">
                <Typography gutterBottom component="div" className="card-title">
                  {video.title}
                </Typography>
  
                <Typography className="card-time">
                  {sortBy === "releaseDate" ? (
                    <TimeFormat releaseDate={video.releaseDate} />
                  ) : (
                    `${video.viewCount} views`
                  ) }
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>
    );
  };
  
  export default VideoGrid;
  