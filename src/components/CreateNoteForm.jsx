import { Cancel, Edit, NotesRounded, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import NoteContext from "../context/NoteContext";

export default function CreateNoteForm({ note = null }) {
  const [title, setTitle] = useState(note != null ? note.title : "");
  const [notes, setNotes] = useState(note != null ? note.notes : "");
  const [category, setCategory] = useState(
    note != null ? note.category : "tutorial",
  );

  const { state, dispatch } = useContext(NoteContext);
  const { user } = state;

  const handleUpdateDoc = (_id = note._id) => {
    dispatch({ type: "CLOSE_MODAL" });

    let updateRef = doc(db, "notes", _id);

    updateDoc(updateRef, {
      title,
      notes,
      category,
    })
      .then((res) => {
        dispatch({
          type: "OPEN_ALERT",
          payload: {
            severity: "success",
            message: "Note Successfully Update",
          },
        });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleCreateNote = (e) => {
    e.preventDefault();
    dispatch({ type: "CLOSE_MODAL" });

    // Add a new document with a generated id.
    addDoc(collection(db, "notes"), {
      title,
      notes,
      category,
      userId: user.uid,
      dateCreated: serverTimestamp(),
    })
      .then((res) => {
        updateDoc(doc(db, "notes", res.id), {
          _id: res.id,
        });

        console.log(res.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <form onSubmit={note === null ? handleCreateNote : handleUpdateDoc}>
      <Typography variant="h6" component="p">
        {note != null ? (
          <>
            Edit Note <Edit />{" "}
          </>
        ) : (
          <>
            Create a new Note <NotesRounded />{" "}
          </>
        )}
      </Typography>
      <TextField
        sx={{ mt: 2 }}
        variant="outlined"
        label="Note Title"
        required
        fullWidth
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <TextField
        sx={{ mt: 2 }}
        variant="outlined"
        label="Notes"
        multiline
        rows={4}
        required
        fullWidth
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
      />

      <FormControl sx={{ display: "block", mt: 2 }}>
        <FormLabel>Note Category</FormLabel>
        <RadioGroup
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <FormControlLabel
            value="tutorial"
            label="Tutorial"
            control={<Radio />}
          />
          <FormControlLabel
            value="project"
            label="Project"
            control={<Radio />}
          />
          <FormControlLabel value="work" label="Work" control={<Radio />} />
          <FormControlLabel value="other" label="Other" control={<Radio />} />
        </RadioGroup>
      </FormControl>

      <Box sx={{ display: "flex", gap: 4 }}>
        <Button
          sx={{
            display: "flex",
            mt: 2,
            px: 2,
            backgroundColor: "red",
          }}
          type="submit"
          variant="contained"
          endIcon={<Cancel />}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          sx={{ display: "flex", mt: 2, px: 2 }}
          type="submit"
          variant="contained"
          endIcon={<Send />}
        >
          {note != null ? "Update" : "Create"}
        </Button>
      </Box>
    </form>
  );
}
