import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProviders } from "./providers/walletProviders";
import { Board } from "./pages/board/Board";
import { Create } from "./pages/create/Create";
import { Token } from "./pages/token";
import { Profile } from "./pages/profile";

createRoot(document.getElementById("app") as HTMLElement).render(
    <WalletProviders>
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
    </WalletProviders>
);