import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Board } from "./pages/board";
import { Create } from "./pages/create";
import { Token } from "./pages/token";
import { Profile } from "./pages/profile";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/create" element={<Create />} />
        <Route path="/token" element={<Token />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);