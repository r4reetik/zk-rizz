import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVerified } from "../hooks/useVerified";
import { useTraits } from "../hooks/useTraits";
import { useWeb3 } from "../hooks/useWeb3";
import { Chat } from "./Chat";

export const Home = () => {
    const navigate = useNavigate();
    const { isVerified, fetched, loading: vLoading } = useVerified();
    const { areTraitsSelected, fetched: tsFetched, loading } = useTraits();
    const { account, connect } = useWeb3();

    useEffect(() => {
        if (!account || loading || !vLoading) return;
        if (fetched && !isVerified) {
            return navigate("/auth");
        } else if (!areTraitsSelected && tsFetched) {
            return navigate("/selectTraits");
        }
    }, [isVerified, fetched, areTraitsSelected, tsFetched, account]);

    return (
        <div className="flex flex-col w-screen max-w-full overflow-hidden py-6 px-20">
            {loading || vLoading ? (
                <div>Loading...</div>
            ) : !account ? (
                <div className="flex w-full justify-end">
                    <button onClick={connect}>
                        {account
                            ? account.slice(0, 12) + "..." + account.slice(-6)
                            : "Connect"}
                    </button>
                </div>
            ) : (
                <Chat />
            )}
        </div>
    );
};
