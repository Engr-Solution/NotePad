import React, { forwardRef, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { getAuth, signOut } from "firebase/auth";
import NoteContext from "../context/NoteContext";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog() {
  const auth = getAuth();
  const { state, dispatch } = useContext(NoteContext);
  const {
    dialog: { isDialogOpen, dialogComponent },
  } = state;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "REMOVE_USER" });
        console.log("User logout successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch({ type: "CLOSE_DIALOG" });
  };

  // CLOSE DIALOG
  const handleClose = () => {
    dispatch({ type: "CLOSE_DIALOG" });
  };

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogComponent === "Logout"
              ? "Are you sure you want to logout?"
              : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {dialogComponent === "Logout" ? "No, Stall Logged In" : null}
          </Button>
          <Button onClick={dialogComponent === "Logout" ? handleLogout : null}>
            {dialogComponent === "Logout" ? "Yes, Logout" : null}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
