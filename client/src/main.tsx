import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { VerifiedProvider } from "./hooks/useVerified.tsx";
import { TraitsProvider } from "./hooks/useTraits.tsx";
import { Web3Provider } from "./hooks/useWeb3.tsx";
import { ChatProvider } from "./hooks/useChat.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Web3Provider>
        <TraitsProvider>
            <VerifiedProvider>
                <ChatProvider>
                    <App />
                    <ToastContainer />
                </ChatProvider>
            </VerifiedProvider>
        </TraitsProvider>
    </Web3Provider>
);
