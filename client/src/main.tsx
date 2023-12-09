import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { VerifiedProvider } from "./hooks/useVerified.tsx";
import { TraitsProvider } from "./hooks/useTraits.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <TraitsProvider>
            <VerifiedProvider>
                <App />
                <ToastContainer />
            </VerifiedProvider>
        </TraitsProvider>
    </React.StrictMode>
);
