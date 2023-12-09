import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { VerifiedProvider } from "./hooks/useVerified.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <VerifiedProvider>
            <App />
            <ToastContainer />
        </VerifiedProvider>
    </React.StrictMode>
);