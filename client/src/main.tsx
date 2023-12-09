import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { VerifiedProvider } from "./hooks/useVerified.tsx";
import { TraitsProvider } from "./hooks/useTraits.tsx";
import { Web3Provider } from "./hooks/useWeb3.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Web3Provider>
            <TraitsProvider>
                <VerifiedProvider>
                    <App />
                    <ToastContainer />
                </VerifiedProvider>
            </TraitsProvider>
        </Web3Provider>
    </React.StrictMode>
);
