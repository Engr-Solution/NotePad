import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { AnimatePresence } from "framer-motion";
import Note from "./pages/Note";
import { ContextProvider } from "./context/NoteContext";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <AnimatePresence exitBeforeEnter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes/:id" element={<Note />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Routes>
        </AnimatePresence>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
