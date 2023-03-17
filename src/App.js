import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Today from "./pages/today/Today";
import { useState } from "react";
import Context from "./components/Context";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Context.Provider value={[user, setUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/hoje" element={<Today />} />
            <Route path="/habitos" element={<Today />} />
            <Route path="/historico" element={<Today />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}


