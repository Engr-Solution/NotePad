import { Delete } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import NoteContext from "../context/NoteContext";

function Note({note}) {
  const { state } = useContext(NoteContext);
  const { user } = state;
  const navigate = useNavigate();



  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: "100vw",
      transition: {
        staggerChildren: 0.5,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        mass: 0.5,
        damping: 8,
        staggerChildren: 0.4,
        when: "beforeChildren",
      },
    },
    exit: {
      x: "-100vh",
      transition: { ease: "easeInOut" },
    },
  };

  return (
    <Layout>
      variants={containerVariants}
      initial="hidden" animate="visible" exit="exit"
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
           <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: 'red' }}
              aria-label="recipe"
              onClick={() => navigate("/note")}
            >
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <Delete />
            </IconButton>
          }
          title={note.title}
          subheader={`${note.time}`}
        />

        <CardContent onClick={() => navigate("/note")}>
          <Typography variant="body2" color="text.secondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
      </motion.div>
    </Layout>
  );
}

export default Note;
