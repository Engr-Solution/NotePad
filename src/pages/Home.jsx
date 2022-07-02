import React, { useContext, useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import "../assets/masory.css";
import { notes } from "../assets/data";
import NoteCard from "../components/Card";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import NoteContext from "../context/NoteContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

function Home() {
  const [notes, setNotes] = useState();
  const { state } = useContext(NoteContext);
  const { user } = state;
  const navigate = useNavigate();

  useEffect(() => {
    // GET ALL NOTES FROM DB.
    const getNotes = async () => {
      const data = await getDocs(collection(db, "notes"))
        .then((res) => {
          setNotes(res.docs);
          console.log(res.docs);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getNotes();
  }, []);

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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes != null
            ? notes.map((note, key) => (
                <NoteCard note={note.data()} key={key} />
              ))
            : "No Notes at the moment"}
        </Masonry>
      </motion.div>
    </Layout>
  );
}

export default Home;
