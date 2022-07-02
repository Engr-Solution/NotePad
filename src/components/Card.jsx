import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { formatDistanceToNow } from "date-fns";
import CategoryColor from "./CategoryColor";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import NoteContext from "../context/NoteContext";

export default function NoteCard({ note }) {
  const { dispatch } = useContext(NoteContext);
  const navigate = useNavigate();

  // INIT AOS()
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const cardVariants = {
    hidden: {
      y: 50,
    },
    visible: {
      y: 0,
    },
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "notes", note._id))
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

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      data-aos="flip-up"
      data-aos-duration="500"
    >
      <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: CategoryColor(note.category) }}
              aria-label="recipe"
              onClick={() => navigate(`/note/${note._id}`)}
            >
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={handleDelete} aria-label="settings">
              <Delete />
            </IconButton>
          }
          title={note.title}
          subheader={formatDistanceToNow(new Date(), {
            includeSeconds: true,
          })}
        />

        <CardContent onClick={() => navigate(`/note/${note._id}`)}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ overflow: "hidden" }}
          >
            {note.notes.length >= 600
              ? note.notes.substr(0, 600) + "..."
              : note.notes}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
