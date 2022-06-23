import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  AddCircleOutline,
  CheckBox,
  Colorize,
  Create,
  Logout,
  Note,
  NotesOutlined,
} from "@mui/icons-material";
import { Link } from "@mui/material";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;
const menuItems = [
  {
    Text: "Theme",
    Icon: <Colorize />,
    Checkbox: false,
    Action: "handleTheme",
  },
  {
    Text: "Dark Mode",
    Icon: <Note />,
    Checkbox: true,
    Action: "handleMode",
  },
];

export default function ClippedDrawer({ children }) {

  
  const handleCreateNoteModal = () => {

  };
  const handleCreateForm = () => {
    alert("Open form");
  };
  const handleLogout = () => {
    alert("Logout");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 99,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Link underline="none">
              <NavLink to="/">
                <ListItem disablePadding>
                  <ListItemButton sx={{ flex: "flex", alignItems: "center" }}>
                    <ListItemIcon>
                      <NotesOutlined />
                    </ListItemIcon>
                    <ListItemText primary="My Notes" />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            </Link>

            <ListItem disablePadding onClick={handleCreateNoteModal}>
              <ListItemButton sx={{ flex: "flex", alignItems: "center" }}>
                <ListItemIcon>
                  <AddCircleOutline />
                </ListItemIcon>
                <ListItemText primary="Create Notes" />
              </ListItemButton>
            </ListItem>

            {menuItems.map(({ Text, Icon, Checkbox, Action }, key) => (
              <ListItem disablePadding onClick={() => Action()}>
                <ListItemButton sx={{ flex: "flex", alignItems: "center" }}>
                  <ListItemIcon>{Icon}</ListItemIcon>
                  <ListItemText primary={Text} />
                  {Checkbox && <CheckBox />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <List sx={{ width: "100%", position: "absolute", bottom: 0 }}>
            <ListItem
              sx={{ color: "red" }}
              onClick={handleLogout}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <Logout sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, px: 3, py: 2 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
