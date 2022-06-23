import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> 
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
