import { create } from "zustand";
import { ServerAPI } from "../API";

export interface MatchedState {
    matched: string;
    loading: boolean;
    fetched: boolean;
    fetchMatchedDetails: (address: string) => Promise<void>;
}

export const useMatched = create<MatchedState>((set) => ({
    matched: "",
    loading: false,
    fetched: false,
    fetchMatchedDetails: async (address: string) => {
        try {
            set({ loading: true });
            const res = await fetch(`${ServerAPI}/matched`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    address,
                }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            set({ matched: data.matched, fetched: true });
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
}));
