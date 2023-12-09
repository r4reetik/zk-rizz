import { BrowserProvider } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";

export const Web3Context = createContext<{
    account: string | null;
    provider: BrowserProvider | null;
    connect: () => void;
}>({
    account: null,
    provider: null,
    connect: () => {},
});

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<BrowserProvider | null>(null);

    const connect = async () => {
        if (window) {
            const provider = new BrowserProvider((window as any).ethereum);
            setProvider(provider);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
        }
    };

    useEffect(() => {
        (async () => {
            if (window) {
                const provider = new BrowserProvider((window as any).ethereum);
                setProvider(provider);
                const signer = await provider.getSigner();
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
