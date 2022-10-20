import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import Drawer from "./Drawer";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/store";

const Header = () => {
  const [active, setActive] = useState();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#6F38C5", mb: 3 }}>
      <Toolbar>
        <Typography variant="h4" sx={{ color: "white" }}>
          BlogsApp
        </Typography>
        {isLoggedIn &&
          (!isMatch ? (
            <Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs textColor="white">
                <Tab LinkComponent={Link} to="/" label="All Blogs" />
                <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
                <Tab LinkComponent={Link} to="/addblog" label="Add Blog" />
              </Tabs>
            </Box>
          ) : (
            <></>
          ))}
        <Box display="flex" marginLeft="auto">
          {isMatch ? (
            !isLoggedIn ? (
              <Drawer />
            ) : (
              <Drawer />
            )
          ) : !isLoggedIn ? (
            <>
              <Button
                sx={{
                  margin: 1,
                  borderRadius: 10,
                  backgroundColor: "#87A2FB",
                }}
                variant="contained"
                LinkComponent={Link}
                to="/auth"
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{
                  margin: 1,
                  borderRadius: 10,
                  backgroundColor: "#87A2FB",
                }}
                LinkComponent={Link}
                to="/auth"
              >
                Signup
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                localStorage.removeItem("userId");
                dispatch(authActions.logout());
              }}
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{
                margin: 1,
                borderRadius: 10,
                backgroundColor: "#87A2FB",
                "&:hover": { backgroundColor: "#F32424" },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
