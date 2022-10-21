import {
  Box,
  Typography,
  InputLabel,
  TextField,
  TextareaAutosize,
  Button,
  Link,
} from "@mui/material";
import { AddCircle as Add, Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const EditBlog = ({}) => {
  const navigate = useNavigate();
  const [blogPost, setblogPost] = useState({});
  const [image, setImage] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  const changeHandler = (event) => {
    setblogPost({ ...blogPost, [event.target.name]: event.target.value });
  };

  const photoHandler = (event) => {
    setblogPost({ ...blogPost, image: event.target.files[0] });
    setImage(URL.createObjectURL(event.target.files[0]));
    alert("Image uploaded successfully");
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    if (blogPost.title) {
      formData.append("title", blogPost.title);
    }

    if (blogPost.description) {
      formData.append("description", blogPost.description);
    }
    if (blogPost.image) {
      formData.append("image", blogPost.image);
    }

    console.log(blogPost);

    await axios
      .put(`api/edit/${id}`, formData)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/myblogs");
  };

  const getData = async () => {
    try {
      setisLoading(true);
      const res = await axios.get(`http://localhost:3001/blogs/${id}`);
      const data = await res.data;
      setblogPost({
        ...data,
      });
      console.log(data);
      setisLoading(false);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <form onSubmit={submitHandler}>
        <Box
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection="column"
          width={"60%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h4"
            textAlign={"center"}
          >
            Post your Blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField
            onChange={changeHandler}
            name="title"
            value={blogPost.title}
            margin="auto"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            onChange={changeHandler}
            name="description"
            margin="auto"
            value={blogPost.description}
            variant="outlined"
            minRows={5}
            multiline
          />
          <InputLabel sx={labelStyles}>Image file</InputLabel>
          <img
            style={{
              width: "100%",
              height: "400px",
              objectFit: "contain",
              marginBottom: "15px",
            }}
            src={image ? image : blogPost.image}
            alt="sorry file not available"
          />
          <label htmlFor="fileInput">
            <Add fontSize="large" color="action" />
          </label>

          <input
            name="image"
            type="file"
            id="fileInput"
            onChange={photoHandler}
            style={{ display: "none" }}
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditBlog;
