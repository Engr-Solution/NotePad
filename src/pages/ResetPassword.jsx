import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import useStyles from "../assets/styles";
import Layout from "../components/Layout";
import { motion } from 'framer-motion'
function ResetPassword() {

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
          transition: { ease: 'easeInOut' }
        }
      };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
              Reset Password
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <form>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ mt: 2 }}
                    variant="outlined"
                    label="Email"
                    required
                    fullWidth
                    id="email"
                    inputProps={{ type: "email" }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email?.type === "pattern"
                        ? "Email not valid"
                        : "Email is required"
                    }
                    {...field}
                  />
                )}
              ></Controller>
            </form>
            <Button sx={{ mt: 2 }} variant="contained" type="submit">
              Send me reset link
            </Button>
          </Grid>
        </Grid>

      </Container>
      </motion.div>
    </Layout>
  );
}

export default ResetPassword;
