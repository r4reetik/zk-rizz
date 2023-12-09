import { createContext, useContext, useEffect, useState } from "react";
import { useWeb3 } from "./useWeb3";

const api = "http://localhost:17080";

export const TraitsProvider = ({ children }: { children: React.ReactNode }) => {
    const [areTraitsSelected, setAreTraitsSelected] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(false);

    const { account } = useWeb3();
    useEffect(() => {
        (async () => {
            try {
                if (!account) return;
                setLoading(true);
                const res = await fetch(`${api}/traits/${account}`);
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
    }, [account]);

    const selectTraits = async (
        myTraits: string[],
        myAge: number,
        myGender: number,
        wantedTraits: string[],
        wantedAge: number,
        wantedGender: number,
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
                    mine: {
                        traits: myTraits,
                        age: myAge,
                        gender: myGender,
                    },
                    want: {
                        traits: wantedTraits,
                        age: wantedAge,
                        gender: wantedGender,
                    },
                    address,
                }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
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
        myTraits: string[],
        myAge: number,
        myGender: number,
        wantedTraits: string[],
        wantedAge: number,
        wantedGender: number,
        address: string
    ) => Promise<void>;
}>({
    areTraitsSelected: false,
    fetched: false,
    loading: false,
    selectTraits: async (
        myTraits: string[],
        myAge: number,
        myGender: number,
        wantedTraits: string[],
        wantedAge: number,
        wantedGender: number,
        address: string
    ) => {},
});
