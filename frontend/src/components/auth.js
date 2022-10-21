import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.isLoggedIn);
  const [isSignup, setisSignup] = useState(false);
  const [inputData, setinputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setinputData({ ...inputData, [event.target.name]: event.target.value });
  };

  const apiRequest = (type) => {
    axios
      .post(`api/${type}`, {
        username: inputData.name,
        email: inputData.email,
        password: inputData.password,
      })
      .then((res) => {
        if (res.data.loggedIn) {
          dispatch(authActions.login());

          localStorage.setItem("userId", res.data.id);

          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Login failed! check your email and password");
      });
  };

  const sumbitHandler = (event) => {
    event.preventDefault();
    if (!isSignup) {
      apiRequest("login");
    } else {
      apiRequest("signup");
    }
  };
  return (
    <div>
      <form onSubmit={sumbitHandler}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h4">{isSignup ? "Signup" : "Login"}</Typography>
          {isSignup && (
            <TextField
              required
              onChange={changeHandler}
              name="name"
              placeholder="Name"
              margin="normal"
            />
          )}
          <TextField
            required
            onChange={changeHandler}
            type="email"
            name="email"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            required
            onChange={changeHandler}
            name="password"
            type="password"
            placeholder="Password"
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => setisSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            {isSignup ? "Change to Login" : "Change to Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
