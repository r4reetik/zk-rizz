import "./App.css";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { AadhaarValidation } from "./pages/AadhaarValidation";
import { TraitSelector } from "./pages/TraitSelector";
import { Profile } from "./pages/Profile";
import { Chat } from "./pages/Chat";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/selectTraits" element={<TraitSelector />} />
            {/* <Route path="/" element={<Chat />} /> */}
            <Route path="/auth" element={<AadhaarValidation />} />
        </>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
