import { Edit, Delete, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import NoteContext from "../context/NoteContext";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CategoryColor from "../components/CategoryColor";
import CardSkeleton from "../components/CardSkeleton";
import { formatDistanceToNow } from "date-fns";
import CreateNoteForm from "../components/CreateNoteForm";

function Note() {
  const [note, setNote] = useState(null);
  const { state, dispatch } = useContext(NoteContext);
  const { user } = state;

  const navigate = useNavigate();
  const { noteId } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // HANDLE EDIT NOTE
  const handleEdit = () => {
    console.log("edited");
    return dispatch({
      type: "OPEN_MODAL",
      payload: <CreateNoteForm note={note} />,
    });
  };

  // HANDLE DELETE NOTE
  const handleDelete = () => {
    dispatch({
      type: "OPEN_DIALOG",
      payload: "Delete",
    });
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  useEffect(() => {
    const getNote = async () => {
      await getDoc(doc(db, "notes", noteId))
        .then((res) => {
          setNote(res.data());
          console.log(res, res.data());
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getNote();
  }, []);

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
      <Box sx={{ px: { sm: "20px", md: "5vw", lg: "10vw" } }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {note != null ? (
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: CategoryColor(note.category) }}
                    aria-label="recipe"
                  >
                    {note?.category?.charAt[0]?.toUpperCase()}
                  </Avatar>
                }
                action={
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    aria-label="menu"
                  >
                    <MoreVert />
                  </IconButton>
                }
                title={note.title}
                subheader={formatDistanceToNow(note.dateCreated.seconds)}
              />
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleEdit}>
                  <ListItemIcon>
                    <Edit fontSize="small" />
                  </ListItemIcon>
                  Edit
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
                  <ListItemIcon>
                    <Delete fontSize="small" sx={{ color: "red" }} />
                  </ListItemIcon>
                  Delete
                </MenuItem>
              </Menu>

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {note.notes}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <CardSkeleton width={"100%"} height={380} textWidth={200} />
          )}
        </motion.div>
      </Box>
    </Layout>
  );
}

export default Note;
