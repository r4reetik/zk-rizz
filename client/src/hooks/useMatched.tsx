import { create } from "zustand";
import { ServerAPI } from "../API";
import { Contract, providers } from "ethers";
import { PairingABI } from "../lib/abi";
export interface MatchedState {
    matched: string;
    loading: boolean;
    fetched: boolean;
    setMatched: (matched: string) => void;
    fetchMatchedDetails: (provider: providers.Web3Provider) => Promise<void>;
}

export const useMatched = create<MatchedState>((set) => ({
    matched: "",
    loading: false,
    fetched: false,
    setMatched: (matched: string) => {
        set({ matched });
    },
    fetchMatchedDetails: async (provider: providers.Web3Provider) => {
        try {
            set({ loading: true });
            const contract = new Contract(
                "0x60906Dcaa3A3D3f015C7F6C57b77719F693D1b75",
                PairingABI,
                provider.getSigner()
            );
            const address = await provider.getSigner().getAddress();
            //fetch the logs using topic 0xfc7c24d61288c871fca49757bf077797284e3d40e549a861457977d229b1f49c
            const logs = await provider.getLogs({
                fromBlock: 0,
                toBlock: "latest",
                topics: [
                    "0xfc7c24d61288c871fca49757bf077797284e3d40e549a861457977d229b1f49c",
                ],
            });
            console.log(logs, "logs");
            //filter the logs to get the one with the address
            const log = logs.filter((log) => {
                const parsedLog = contract.interface.parseLog(log);
                return (
                    parsedLog.args[0] === address ||
                    parsedLog.args[1] === address
                );
            });

            if (log.length > 0) {
                const parsedLog = contract.interface.parseLog(log[0]);
                const matched =
                    parsedLog.args[0] === address
                        ? parsedLog.args[1]
                        : parsedLog.args[0];
                set({ matched, fetched: true });
            }
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
}));
