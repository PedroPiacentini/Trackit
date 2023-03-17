import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Today from "./pages/today/Today";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/hoje" element={<Today />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


