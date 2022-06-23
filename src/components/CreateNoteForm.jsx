import { Create, NotesRounded } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// import { makeStyles } from '@mui/material/styles'

// const useStyles = makeStyles({
//   textField: {
//     marginBottom: 4,
//   },
// })

export default function CreateNoteForm() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("tutorial");
  const [visibility, setVisibility] = useState("public");

  // const classes = useStyles();

  return (
    <form noValidate>
      <Typography variant="h6" component="p">
        Create New Note <NotesRounded />{" "}
      </Typography>
      <TextField
        // className={classes.textField}
        variant="outlined"
        label="Note Title"
        required
        fullWidth
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        // className={classes.textField}
        variant="outlined"
        label="Notes"
        required
        fullWidth
        onChange={(e) => setNotes(e.target.value)}
      />

      <FormControl>
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

      <FormControl>
        <FormLabel>Visibility</FormLabel>
        <RadioGroup
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <FormControlLabel value="public" label="Public" control={<Radio />} />
          <FormControlLabel
            value="private"
            label="Private"
            control={<Radio />}
          />
        </RadioGroup>
      </FormControl>

      <Button type="submit" variant="contained" endIcon={<Create />}>
        Create
      </Button>
    </form>
  );
}


