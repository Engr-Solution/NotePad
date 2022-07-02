import { Container, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import useStyles from "../assets/styles";
import Form from "../components/Form";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import NoteContext from "../context/NoteContext";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
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
  const classes = useStyles();
  return (
    <Layout showSidebar={false}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Container>
          <Grid container className={classes.container}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" component="p">
                Login to your Account
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Form register={false} />
            </Grid>
          </Grid>
        </Container>
      </motion.div>
    </Layout>
  );
}

export default Login;
