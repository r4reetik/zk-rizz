import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useVerified } from "../hooks/useVerified";
import { useTraits } from "../hooks/useTraits";

export const Home = () => {
    const navigate = useNavigate();
    const { isVerified, fetched } = useVerified();
    const { areTraitsSelected, fetched: tsFetched } = useTraits();

    useEffect(() => {
        if (fetched && !isVerified) {
            navigate("/auth");
        } else if (!areTraitsSelected && tsFetched) {
            navigate("/selectTraits");
        }
    }, [isVerified, fetched, areTraitsSelected, tsFetched]);

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};
