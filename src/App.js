import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Today from "./pages/today/Today";
import Habits from "./pages/habits/Habits"
import { useState } from "react";
import Context from "./components/Context";
import Context2 from "./components/Context2";
import Historic from "./pages/historic/Historic";

export default function App() {
  const [user, setUser] = useState(null);
  const [habitPercent, setHabitPercent] = useState(0)
  return (
    <>
      <Context.Provider value={[user, setUser]}>
        <Context2.Provider value={[habitPercent, setHabitPercent]}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/hoje" element={<Today />} />
              <Route path="/habitos" element={<Habits />} />
              <Route path="/historico" element={<Historic />} />
            </Routes>
          </BrowserRouter>
        </Context2.Provider>
      </Context.Provider>
    </>
  );
}


