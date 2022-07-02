import React, { useContext, forwardRef } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Slide } from "@mui/material";
import NoteContext from "../context/NoteContext";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

export default function AlertBox() {
  const { state, dispatch } = useContext(NoteContext);

  const {
    alert: {
      isAlertOpen,
      details: { severity, message },
    },
  } = state;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "CLOSE_ALERT" });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionLeft}
        open={isAlertOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={`${severity}`} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      
    </Stack>
  );
}
