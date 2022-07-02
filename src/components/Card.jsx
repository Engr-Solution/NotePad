import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { format, formatDistance, formatDistanceToNow, subDays } from "date-fns";

export default function NoteCard({ note }) {
 
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

  const navigate = useNavigate();
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
              sx={{ bgcolor: red[500] }}
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
          subheader={format(note.time.seconds, 'MM/dd/yyyy')}
        />

        <CardContent onClick={() => navigate("/note")}>
          <Typography variant="body2" color="text.secondary">
            {note.notes}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
