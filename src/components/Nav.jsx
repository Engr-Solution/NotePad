import { AddCircleOutline, Logout, Notes, Settings } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import CreateNoteForm from "./CreateNoteForm";

function Nav() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(NoteContext);
  const { user } = state;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateForm = () => {
    return dispatch({ type: "OPEN_MODAL", payload: <CreateNoteForm /> });
  };

  const handleLogout = () => {
    dispatch({ type: "OPEN_DIALOG", payload: "Logout" });
  };

  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Notes />
            <Typography
              variant="h5"
              component="div"
              color="inherit"
              sx={{ display: "flex", ml: 2 }}
            >
              <Typography variant="h4" component="div" color="error">
                i
              </Typography>
              NotePad
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>

          {user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={handleCreateForm}
                variant="outlined"
                color="secondary"
              >
                Create Note <AddCircleOutline />
              </Button>
              <Tooltip title="Account Menu">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar src={user?.photoURL}>
                    {user?.displayName?.charAt(0)?.toUpperCase() ||
                      user?.email?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <Avatar /> Profile
                </MenuItem>

                <Divider />

                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Account Settings
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                  <ListItemIcon>
                    <Logout fontSize="small" sx={{ color: "red" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                onClick={() => navigate("/login")}
                variant="outlined"
                color="secondary"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                variant="contained"
                color="secondary"
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
