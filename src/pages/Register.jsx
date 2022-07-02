import { Container, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Form from "../components/Form";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/NoteContext";

function Register() {
  const { state } = useContext(NoteContext);
  const { user } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
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
    <Layout showSidebar={false}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Container sx={{ md: { mx: "10vw" } }}>
          <Grid container sx={{ mx: "auto" }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" component="p">
                Create an Account
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Form register={true} />
            </Grid>
          </Grid>
        </Container>
      </motion.div>
    </Layout>
  );
}

export default Register;
