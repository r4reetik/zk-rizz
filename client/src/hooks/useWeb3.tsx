import { providers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";

export const Web3Context = createContext<{
    account: string | null;
    provider: providers.Web3Provider | null;
    connect: () => void;
}>({
    account: null,
    provider: null,
    connect: () => {},
});

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<providers.Web3Provider | null>(
        null
    );

    const connect = async () => {
        if (window) {
            const provider = new providers.Web3Provider(
                (window as any).ethereum
            );
            const addr = provider.send("eth_requestAccounts", []);
            setProvider(provider);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            localStorage.setItem("connected", address);
        }
    };

    useEffect(() => {
        (async () => {
            if (window) {
                const provider = new providers.Web3Provider(
                    (window as any).ethereum
                );
                setProvider(provider);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
            }
        })();
    }, []);

    return (
        <Web3Context.Provider
            value={{
                account,
                connect,
                provider,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => {
    return useContext(Web3Context);
};
