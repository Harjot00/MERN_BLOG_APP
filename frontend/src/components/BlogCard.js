import {
  Grid,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogCard = ({
  refresh,
  setRefresh,
  id,
  title,
  description,
  image,
  author,
}) => {
  const [isAuthor, setisAuthor] = useState(false);
  const authorId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fullBlog = async () => {
    navigate(`/allblogs/${id}`);
  };

  const editPost = () => {
    navigate(`/myblogs/edit/${id}`);
  };

  const deletePost = async () => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .catch((err) => console.error(err));
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (authorId === author) {
      setisAuthor(true);
    }
  }, []);
  return (
    <Grid
      sx={{
        mb: 4,
        pl: 4,
        pr: 4,
      }}
      container
      direction="row"
      columnSpacing={{ lg: 4, md: 4 }}
    >
      <Grid item lg={4} md={4} xs={12}>
        <img
          style={{
            objectFit: "cover",
            width: "100%",
            height: "300px",
            borderRadius: "10px",
          }}
          src={image}
          alt="no img provided"
        />
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <Stack sx={{ textAlign: "left" }} direction="column">
          {isAuthor && (
            <Box sx={{ ml: "auto" }}>
              <IconButton>
                <ModeEditOutlineIcon onClick={editPost} />
              </IconButton>
              <IconButton>
                <DeleteForeverIcon onClick={deletePost} sx={{}} />
              </IconButton>
            </Box>
          )}
          <Typography variant="h6" sx={{ textDecoration: "underline" }}>
            {author.username}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography
            sx={{
              maxHeight: "150px",
              overflow: "hidden",
              whiteSpace: "pre-line",
            }}
            variant="body"
          >
            {description}
          </Typography>
          <Button
            color="primary"
            variant="contained"
            sx={{ width: 150, padding: 1, margin: 2 }}
            onClick={fullBlog}
          >
            Read More
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BlogCard;
