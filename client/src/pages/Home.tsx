import { useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useVerified } from "../hooks/useVerified";
import { useTraits } from "../hooks/useTraits";
import { useWeb3 } from "../hooks/useWeb3";
import { Chat } from "./Chat";
import { useMatched } from "../hooks/useMatched";

export const Home = () => {
    const navigate = useNavigate();
    const { isVerified, fetched, loading: vLoading } = useVerified();
    const { areTraitsSelected, fetched: tsFetched, loading } = useTraits();
    const { account, connect, provider } = useWeb3();
    const { fetchMatchedDetails } = useMatched();

    useEffect(() => {
        const connected = localStorage.getItem("connected");
        if (connected) {
            connect();
        }
    }, []);

    useEffect(() => {
        if (!provider) return;
        fetchMatchedDetails(provider);
        const id = setInterval(() => {
            fetchMatchedDetails(provider);
        }, 10000);
        return () => clearInterval(id);
    }, [provider]);

    useEffect(() => {
        if (!account || loading || vLoading || !fetched || !tsFetched) return;
        if (fetched && !isVerified) {
            return navigate("/auth");
        } else if (!areTraitsSelected && tsFetched) {
            return navigate("/selectTraits");
        }
    }, [
        isVerified,
        fetched,
        loading,
        vLoading,
        areTraitsSelected,
        tsFetched,
        account,
    ]);

    return (
        <div className="flex flex-col w-screen max-w-full overflow-hidden py-6 px-20">
            {loading || vLoading ? (
                <div>Loading...</div>
            ) : !account ? (
                <>
                    <div className="flex w-full justify-end">
                        <button
                            onClick={() => {
                                connect();
                            }}
                        >
                            Connect
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="text-4xl font-bold">Welcome to</h1>
                        <img
                            src="logo.png"
                            alt=""
                            className="w-96 rounded-2xl"
                        />
                        <h1 className="text-4xl font-bold">
                            Your love at first proof
                        </h1>
                    </div>
                </>
            ) : (
                <Chat />
            )}
        </div>
    );
};
