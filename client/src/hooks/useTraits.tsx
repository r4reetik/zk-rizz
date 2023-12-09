import { BrowserProvider } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";

const api = "http://localhost:17080";

export const TraitsProvider = ({ children }: { children: React.ReactNode }) => {
    const [areTraitsSelected, setAreTraitsSelected] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                if (!window) return;
                setLoading(true);
                const provider = new BrowserProvider((window as any).ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                const res = await fetch(`${api}/traits/${address}`);
                const data = await res.json();
                if (!data.error) {
                    setAreTraitsSelected(true);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setFetched(true);
                setLoading(false);
            }
        })();
    }, []);

    const selectTraits = async (
        traits: string[],
        age: number,
        gender: number,
        address: string
    ) => {
        try {
            setLoading(true);
            const res = await fetch(`${api}/set-traits`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    traits,
                    age,
                    gender,
                    address,
                }),
            });
            const data = await res.json();
            console.log(data, "vh bjn");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TraitsContext.Provider
            value={{ areTraitsSelected, fetched, loading, selectTraits }}
        >
            {children}
        </TraitsContext.Provider>
    );
};

export const useTraits = () => {
    return useContext(TraitsContext);
};

// create a context to wrap the above useTraits

export const TraitsContext = createContext<{
    areTraitsSelected: boolean;
    fetched: boolean;
    loading: boolean;
    selectTraits: (
        traits: string[],
        age: number,
        gender: number,
        address: string
    ) => Promise<void>;
}>({
    areTraitsSelected: false,
    fetched: false,
    loading: false,
    selectTraits: async (
        traits: string[],
        age: number,
        gender: number,
        address: string
    ) => {},
});
