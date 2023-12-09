import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useVerified } from "../hooks/useVerified";

export const Home = () => {
    const navigate = useNavigate();
    const { isVerified, fetched } = useVerified();
    useEffect(() => {
        if (fetched && !isVerified) {
            navigate("/auth");
        }
    }, [isVerified, fetched]);

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};
