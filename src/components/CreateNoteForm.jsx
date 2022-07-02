import { Cancel, Create, Edit, NotesRounded, Send } from "@mui/icons-material";
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
import { app, db } from "../firebaseConfig";
import NoteContext from "../context/NoteContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function CreateNoteForm({ note = null }) {
  const [title, setTitle] = useState(note != null ? note.title : "");
  const [notes, setNotes] = useState(note != null ? note.notes : "");
  const [category, setCategory] = useState(
    note != null ? note.category : "tutorial",
  );

  const { state, dispatch } = useContext(NoteContext);
  const { user } = state;

  const navigate = useNavigate();

  // const getId = () => {
  //   if (note) {
  //     const { _id } = note;
  //     return _id;
  //   }
  // };

  // let _id = getId();

  const handleUpdateDoc = async (_id) => {
    dispatch({ type: "CLOSE_MODAL" });

    await updateDoc(doc(db, "notes", _id), {
      title,
      notes,
      category,
      _id,
    })
      .then((res) => {
        console.log(res);
        window.location.reload(); 
      })
      .catch((err) => console.log(err));
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    dispatch({ type: "CLOSE_MODAL" });

    // Add a new document with a generated id.
    const data = await addDoc(collection(db, "notes"), {
      title,
      notes,
      category,
      userId: user.uid,
      dateCreated: serverTimestamp(),
    })
      .then((res) => {
        handleUpdateDoc(res.id);
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
    <form onSubmit={handleCreateNote}>
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
          onClick={note != null ? { handleUpdateDoc } : { handleCreateNote }}
        >
          {note != null ? "Update" : "Create"}
        </Button>
      </Box>
    </form>
  );
}
