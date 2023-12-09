import { useEffect, useState } from "react";
import { useWeb3 } from "../hooks/useWeb3";
import { VerifiedNFT } from "../lib/verifiedNFT";

export const Profile = () => {
    const { account, provider } = useWeb3();
    const [logo, setLogo] = useState<string>();

    useEffect(() => {
        if (!account || !provider) return;
        const signer = provider.getSigner();
        const verifiedNFT = new VerifiedNFT(signer);
        verifiedNFT.tokenURI().then((uri) => {
            setLogo(uri);
        });
    }, [account, provider]);

    return (
        <div className="flex flex-col bg-white/30 p-4 rounded-2xl">
            <div className="flex flex-col items-center">
                <img src={logo} alt="" className="w-20 h-20 rounded-full" />
                <span className="font-bold">
                    {account?.slice(0, 12)}...{account?.slice(-6)}
                </span>
            </div>
        </div>
    );
};
