import jsCookie from "js-cookie";
import { createContext, useReducer } from "react";
// import CreateNoteForm from "../components/CreateNoteForm";

const initialState = {
  modal: { isModalOpen: false, modalComponent: null },
  dialog: {
    isDialogOpen: false,
    dialogComponent: null,
  },
  alert: { isAlertOpen: false, details: { severity: 'success', message: 'Successfully' } },
  mode: jsCookie.get("mode") || "light",
  user: jsCookie.get("user") ? JSON.parse(jsCookie.get("user")) : null,
};

const NoteContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        modal: { isModalOpen: true, modalComponent: { ...action.payload } },
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: { isModalOpen: false },
      };
    case "OPEN_DIALOG":
      return {
        ...state,
        dialog: { isDialogOpen: true, dialogComponent: action.payload },
      };
    case "CLOSE_DIALOG":
      return {
        ...state,
        dialog: { isDialogOpen: false },
      };
    case "OPEN_ALERT":
      return {
        ...state,
        alert: { isAlertOpen: true, details: action.payload },
      };
    case "CLOSE_ALERT":
      return {
        ...state,
        alert: {
          isAlertOpen: false,
          details: { severity: 'success', message: 'Successfully' },
        },
      };
    case "DARKMODE_ON":
      jsCookie.set("mode", "dark");
      return {
        ...state,
        mode: "dark",
      };
    case "DARKMODE_OFF":
      jsCookie.set("mode", "light");
      return {
        ...state,
        mode: "light",
      };
    case "ADD_USER":
      jsCookie.set("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case "REMOVE_USER":
      jsCookie.remove("user");
      return { ...state, user: null };
    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
