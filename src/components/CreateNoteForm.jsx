import { Cancel, Create, NotesRounded, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { app, db } from "../firebaseConfig";
import NoteContext from "../context/NoteContext";

export default function CreateNoteForm() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("tutorial");

  const [userNotes, setUserNotes] = useState();

  const { state, dispatch } = useContext(NoteContext);
  const { user } = state;

  const handleCreateNote = async (e) => {
    e.preventDefault();
    // Add a new document with a generated id.
    const data = await addDoc(collection(db, "notes"), {
      title,
      notes,
      category,
      user: user,
      time: new Date()
    })
      .then((res) => {
        alert('Note posted Successfully')
        console.log(res)
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
        Create a new Note <NotesRounded />{" "}
      </Typography>
      <TextField
        sx={{ mt: 2 }}
        variant="outlined"
        label="Note Title"
        required
        fullWidth
        onChange={(e) => setTitle(e.target.value)}
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
          onClick={handleCreateNote}
        >
          Create
        </Button>
      </Box>
    </form>
  );
}
