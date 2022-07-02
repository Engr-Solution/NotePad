import { createTheme, ThemeProvider } from "@mui/material";
import React, { useContext, useMemo } from "react";
import NoteContext from "../context/NoteContext";
import AlertBox from "./AlertBox";
import ConfirmationDialog from "./ConfirmationDialog";
import ModalDiag from "./ModalDiag";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

function Layout({ children, showSidebar }) {
  const { state } = useContext(NoteContext);
  const { mode } = state;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // primary: { main: "#fefefe" },
                background: {
                  default: "#f6f6f6",
                  paper: "#fefefe",
                },
                text: {
                  active: "#f6f6f6",
                },
              }
            : {
                // primary: { main: "#2b2b2b" },
                background: {
                  default: "#1b1c1e",
                  paper: "#2b2b2b",
                },
                text: {
                  active: "#1b1c1e",
                },
              }),
        },
      }),
    [mode],
  );
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Sidebar children={children} showSidebar={showSidebar} />
      <ModalDiag />
      <ConfirmationDialog />
      <AlertBox />
    </ThemeProvider>
  );
}

export default Layout;
