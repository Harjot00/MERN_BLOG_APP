import {
  Box,
  Typography,
  InputLabel,
  TextField,
  TextareaAutosize,
  Button,
  Link,
} from "@mui/material";
import { useFormControl } from "@mui/material/FormControl";
import { AddCircle } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlog = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [inputData, setinputData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const changeHandler = (event) => {
    setinputData({ ...inputData, [event.target.name]: event.target.value });
  };

  const photoHandler = (event) => {
    setinputData({ ...inputData, image: event.target.files[0] });
    setImage(URL.createObjectURL(event.target.files[0]));
    alert("Image uploaded successfully");
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("userId");
    const formData = new FormData();

    if (inputData.title) {
      formData.append("title", inputData.title);
    }

    if (inputData.description) {
      formData.append("description", inputData.description);
    }

    if (inputData.image) {
      formData.append("image", inputData.image, inputData.image.name);
    } else if (inputData.image.name === undefined) {
      alert("Image is required");
      return;
    }

    await axios
      .post(`api/newBlog/${userId}`, formData)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Box
          padding={3}
          margin={"auto"}
          display="flex"
          flexDirection="column"
          width={"80%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h5"
            textAlign={"center"}
          >
            Post your Blog
          </Typography>
          <InputLabel required sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            onChange={changeHandler}
            required
            name="title"
            margin="auto"
            variant="outlined"
          />
          <InputLabel required sx={labelStyles}>
            Description
          </InputLabel>
          <TextField
            onChange={changeHandler}
            required
            name="description"
            margin="auto"
            variant="outlined"
            minRows={5}
            multiline
          />
          <InputLabel sx={labelStyles}>Image file</InputLabel>

          {image ? (
            <img
              style={{
                width: "100%",
                height: "400px",
                objectFit: "contain",
                marginBottom: "15px",
              }}
              src={image}
              alt="sorry file not available"
            />
          ) : (
            <label htmlFor="fileInput">
              <AddCircle sx={{ margin: "0px auto", fontSize: 40 }} />
            </label>
          )}

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

export default AddBlog;
