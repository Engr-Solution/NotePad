import React, { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import NoteContext from "../context/NoteContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 500,
  height: "auto",
  maxHeight: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalDiag() {
  const { state, dispatch } = useContext(NoteContext);
  const {
    modal: { isModalOpen, modalComponent },
  } = state;

  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <Box sx={style}>{modalComponent}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
