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
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog() {
  const auth = getAuth();
  const { state, dispatch } = useContext(NoteContext);
  const {
    dialog: { isDialogOpen, dialogComponent },
  } = state;

  // GET NOTE ID
  const param = useParams();
  const { noteId } = param;

  const navigate = useNavigate();

  // LOG USER OUT
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

  // DELETE POST
  const handleDelete = async () => {
    dispatch({ type: "CLOSE_DIALOG" });
    await deleteDoc(doc(db, "notes", noteId))
      .then(() => {
        dispatch({
          type: "OPEN_ALERT",
          payload: {
            severity: "success",
            message: "Note Successfully Deleted",
          },
        });
      })
      .catch((err) => console.log(err));
    navigate("/");
  };

  // CLOSE DIALOG
  const handleClose = () => {
    dispatch({ type: "CLOSE_DIALOG" });
    console.log("close dialog");
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
        <DialogTitle>{dialogComponent}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogComponent === "Logout"
              ? "Are you sure you want to logout?"
              : "Are you sure you want to Delete this note?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {dialogComponent === "Logout"
              ? "No, Stall Logged In"
              : "No, Don't Delete"}
          </Button>
          <Button
            onClick={dialogComponent === "Logout" ? handleLogout : handleDelete}
          >
            {dialogComponent === "Logout" ? "Yes, Logout" : "Yes, Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
