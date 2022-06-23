import { AddCircleOutline, Notes } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import avatar from "../assets/logo.png";

function Nav() {
  const handleCreateForm = () => {
    alert("Open form");
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
          <Box sx={{ display: "flex", align: "center" }}>
            <Button
              onClick={handleCreateForm}
              sx={{ display: "flex", align: "center" }}
              variant="outlined"
              color='secondary'
              disableElevation
            >
              Create <AddCircleOutline />
            </Button>
            <IconButton>
              <Avatar src={avatar} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
