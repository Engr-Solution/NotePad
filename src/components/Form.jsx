import { GitHub, Google } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { app } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import NoteContext from "../context/NoteContext";

function Form({ register }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const { dispatch } = useContext(NoteContext);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // CREATE NEW USER
  const handleCreateNewUser = ({ email, password, username }, e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        // Signed up
        dispatch({ type: "ADD_USER", payload: data.user });
        console.log(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // LOGIN USER
  const handleUserLogin = ({ email, password }, e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        // Signed in
        dispatch({ type: "ADD_USER", payload: data.user });
        console.log(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // GOOGLE AUTH FUNCTION
  const handleGoogleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((data) => {
        dispatch({ type: "ADD_USER", payload: data.user });
        console.log(data.user);
      })
      .catch((err) => console.log(err));
  };

  // GITHUB AUTH FUNCTION
  const handleGithubAuth = () => {
    signInWithPopup(auth, githubProvider)
      .then((data) => {
        dispatch({ type: "ADD_USER", payload: data.user });
        console.log(data.user);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5} lg={6}>
            <Button
              sx={{ width: "100%" }}
              variant="outlined"
              startIcon={<Google />}
              onClick={handleGoogleAuth}
            >
              {register ? "Register with Google" : "Login with Google"}
            </Button>
          </Grid>
          <Grid item xs={12} md={7} lg={6}>
            <Button
              sx={{ width: "100%" }}
              variant="outlined"
              startIcon={<GitHub />}
              onClick={handleGithubAuth}
            >
              {register ? "Register with Github" : "Login with Github"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box>OR</Box>
      <Box>
        <form
          onSubmit={
            register
              ? handleSubmit(handleCreateNewUser)
              : handleSubmit(handleUserLogin)
          }
          noValidate
        >
          {register && (
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ minLength: 3 }}
              render={({ field }) => (
                <TextField
                  sx={{ mt: 2 }}
                  variant="outlined"
                  label="Username"
                  fullWidth
                  id="username"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.username)}
                  helperText={
                    errors.username
                      ? "Username must be atleast 3 charaters long"
                      : null
                  }
                  {...field}
                />
              )}
            ></Controller>
          )}

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
                // onChange={(e) => setEmail(e.target.value)}
              />
            )}
          ></Controller>

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true, minLength: 6 }}
            render={({ field }) => (
              <TextField
                sx={{ mt: 2 }}
                variant="outlined"
                label="Password"
                required
                fullWidth
                id="password"
                inputProps={{ type: "password" }}
                error={Boolean(errors.password)}
                helperText={
                  errors.password?.type === "required"
                    ? "Password required"
                    : "Password must be atleast 6 charaters long"
                }
                {...field}
                // onChange={(e) => setPassword(e.target.value)}
              />
            )}
          ></Controller>

          {register && (
            <Controller
              name="confirmpassword"
              control={control}
              defaultValue=""
              rules={{ required: true, minLength: 6 }}
              render={({ field }) => (
                <TextField
                  sx={{ mt: 2 }}
                  variant="outlined"
                  label="Confirm Password"
                  required
                  fullWidth
                  id="confirmPassword"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.confirmpassword)}
                  helperText={
                    errors.confirmpassword?.type === "required"
                      ? "Password required"
                      : "Password must be atleast 6 charaters long"
                  }
                  {...field}
                />
              )}
            ></Controller>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button sx={{ mt: 2 }} variant="contained" type="submit">
              {register ? "Register" : "Login"}
            </Button>
            {!register && (
              <Typography variant="body2">
                Forget your password?{" "}
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => navigate("/reset-password")}
                >
                  Reset
                </Button>
              </Typography>
            )}
          </Box>
        </form>
      </Box>
    </>
  );
}

export default Form;
