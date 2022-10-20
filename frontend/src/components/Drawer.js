import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/store";

const DrawerComp = () => {
  const dispatch = useDispatch();
  const [pages, setPages] = useState([
    { Name: "All Blogs", Link: "/" },
    { Name: "My Blogs", Link: "/myblogs" },
    { Name: "Add Blog", Link: "/addblog" },
    { Name: "Logout", Link: "/auth", logout: true },
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {pages.map((page, index) => (
            <ListItemButton
              onClick={
                page.logout &&
                (() => {
                  localStorage.removeItem("userId");
                  dispatch(authActions.logout());
                })
              }
              LinkComponent={Link}
              to={page.Link}
              key={index}
            >
              <ListItemIcon>
                <ListItemText>{page.Name}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </>
  );
};

export default DrawerComp;
