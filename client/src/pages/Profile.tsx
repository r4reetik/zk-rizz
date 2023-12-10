import { useEffect, useState } from "react";
import { useWeb3 } from "../hooks/useWeb3";
import { VerifiedNFT } from "../lib/verifiedNFT";
import { useMatched } from "../hooks/useMatched";
import { ServerAPI } from "../API";

export const Profile = () => {
    const { account, provider } = useWeb3();
    const [logo, setLogo] = useState<string>();
    const [matchedLogo, setMatchedLogo] = useState<string>();
    const { matched, setMatched } = useMatched();

    const handleBreakup = async () => {
        if (!matched || !account) return;
        try {
            const res = await fetch(ServerAPI + "/do-breakup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    addresses: [account, matched],
                }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setMatched("");
        } catch (error) {
            console.error(error);
        } finally {
            localStorage.setItem("brokeup", matched);
        }
    };

    useEffect(() => {
        if (!account || !provider) return;
        const signer = provider.getSigner();
        const verifiedNFT = new VerifiedNFT(signer);
        verifiedNFT.tokenURI().then((uri) => {
            setLogo(uri);
        });
        if (!matched) return;
        verifiedNFT.tokenURI(matched).then((uri) => {
            setMatchedLogo(uri);
        });
    }, [account, provider, matched]);

    return (
        <div className="flex flex-col   gap-6 ">
            <div className="flex flex-col gap-3 items-center rounded-2xl bg-white/30 p-4">
                <img src={logo} alt="" className="w-24 h-24 rounded-full" />
                <span className="font-bold">
                    {account?.slice(0, 12)}...{account?.slice(-6)}
                </span>
                <span className="text-sm font-bold">You</span>
            </div>
            {matched && (
                <div className="flex flex-col items-center rounded-2xl gap-3 bg-white/30 p-4">
                    <img
                        src={matchedLogo}
                        alt=""
                        className="w-24 h-24 rounded-full"
                    />
                    <span className="font-bold">
                        {matched?.slice(0, 12)}...{matched?.slice(-6)}
                    </span>
                    <span className="text-sm font-bold">Your match</span>
                </div>
            )}
            {matched && (
                <div
                    onClick={handleBreakup}
                    className="flex flex-col cursor-pointer flex-1 items-center rounded-2xl gap-3 bg-white/30 p-4"
                >
                    <img
                        src={"break-up.png"}
                        alt=""
                        className="w-20 h-20 rounded-full"
                    />
                    <span className="text-sm font-bold">Break up</span>
                </div>
            )}
        </div>
    );
};
