import React, { useContext } from "react";
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
  Colorize,
  DarkMode,
  LightMode,
  Logout,
  NotesOutlined,
} from "@mui/icons-material";
import { Switch } from "@mui/material";
import CreateNoteForm from "./CreateNoteForm";
import CustomTheme from "./CustomTheme";
import { useNavigate, useLocation } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import { getAuth, signOut } from "firebase/auth";

const drawerWidth = 240;

export default function Sidebar({ children, showSidebar = true }) {
  const auth = getAuth();
  const { state, dispatch } = useContext(NoteContext);
  const { mode } = state;

  const location = useLocation();
  const navigate = useNavigate();

  const openModalNewNote = () => {
    return dispatch({ type: "OPEN_MODAL", payload: <CreateNoteForm /> });
  };
  const openModalCustomTheme = () => {
    return dispatch({ type: "OPEN_MODAL", payload: <CustomTheme /> });
  };
  const toggleDarkMode = () => {
    if (mode === "dark") {
      return dispatch({ type: "DARKMODE_OFF" });
    }
    return dispatch({ type: "DARKMODE_ON" });
  };
  const handleLogout = () => {
    dispatch({ type: "OPEN_DIALOG", payload: "Logout" });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {showSidebar && (
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
              <ListItem
                disablePadding
                onClick={() => navigate("/")}
                sx={{
                  backgroundColor:
                    location.pathname === "/" ? "text.active" : null,
                }}
              >
                <ListItemButton sx={{ flex: "flex", alignItems: "center" }}>
                  <ListItemIcon>
                    <NotesOutlined />
                  </ListItemIcon>
                  <ListItemText primary="My Notes" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding onClick={openModalNewNote}>
                <ListItemButton sx={{ flex: "flex", alignItems: "center" }}>
                  <ListItemIcon>
                    <AddCircleOutline />
                  </ListItemIcon>
                  <ListItemText primary="Create Notes" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding onClick={openModalCustomTheme}>
                <ListItemButton sx={{ flex: "flex", alignItems: "center" }}>
                  <ListItemIcon>
                    <Colorize />
                  </ListItemIcon>
                  <ListItemText primary="Custom Theme" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding onClick={toggleDarkMode}>
                <ListItemButton sx={{ flex: "flex", alignItems: "center" }}>
                  <ListItemIcon>
                    {mode === "dark" ? <DarkMode /> : <LightMode />}
                  </ListItemIcon>
                  <ListItemText primary="Dark Mode" />
                  <Switch checked={mode === "dark" ? true : false} />
                </ListItemButton>
              </ListItem>
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
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
          py: 2,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
