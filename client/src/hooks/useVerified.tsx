import { createContext, useContext, useEffect, useState } from "react";
import { VerifiedNFT } from "../lib/verifiedNFT";

import {
    splitToWords,
    exportCallDataGroth16,
    extractWitness,
} from "anon-aadhaar-pcd";
import { Contract } from "ethers";
import { nftABI } from "../lib/abi";
import { useWeb3 } from "./useWeb3";

export const VerifiedProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const { provider } = useWeb3();

    useEffect(() => {
        if (!provider) return;
        (async () => {
            try {
                const verifiedNFT = new VerifiedNFT(provider.getSigner());
                setIsVerified(await verifiedNFT.isVerified());
            } catch (error) {
                console.log(error);
            } finally {
                setFetched(true);
            }
        })();
    }, [provider]);

    const verify = async (file: File, pass: string) => {
        if (!pass) {
            alert("Please enter password");
            return false;
        }
        try {
            setLoading(true);
            //get the file into a buffer
            if (!file) throw new Error("No file selected");

            const buffer = await file.arrayBuffer();
            //convert to Buffer
            const buf = Buffer.from(buffer);

            const inputs = await extractWitness(buf, pass);
            if (inputs instanceof Error) throw new Error(inputs.message);

            const appId = BigInt("123456787654323456789").toString();
            const input = {
                signature: splitToWords(
                    inputs.sigBigInt,
                    BigInt(64),
                    BigInt(32)
                ),
                modulus: splitToWords(
                    inputs.modulusBigInt,
                    BigInt(64),
                    BigInt(32)
                ),
                base_message: splitToWords(
                    inputs.msgBigInt,
                    BigInt(64),
                    BigInt(32)
                ),
                app_id: appId,
            };

            const { a, b, c, Input } = await exportCallDataGroth16(
                input,
                "http://localhost:5173/main.wasm",
                "http://localhost:5173/circuit_final.zkey"
            );

            const signer = provider!.getSigner();
            const contract = new Contract(
                "0x06ea4274E7AbA9e2702883B51fc39B301F76de0E",
                // "0x5477b7d16ff0658645ea7fEF75FD79Bc525fA3C5",
                // "0x15a8eFC8EE20bC2dD1401F29cF778FE2cbBa0F50", //main verifier
                nftABI,
                signer
            );
            const nfts = [
                "https://gateway.lighthouse.storage/ipfs/Qma3Jjha2FP2f4V8gHSR3yBvAwSD7ZGuqsSrZeAMptoheK",
                "https://gateway.lighthouse.storage/ipfs/QmdE8tcnyES6SUbWSRyfbSeGXVxPWtxYcyH5hrPZoXnhg9",
                "https://gateway.lighthouse.storage/ipfs/QmQqZQZEQwTweLe9D8fc33dTJ6SutciUy2PEzNmKEZ91oi",
                "https://gateway.lighthouse.storage/ipfs/QmSDisK5BEVD2f7QpY1YuFYDu1zjYLH4njUy7iJ6Yepn1Z",
                "https://gateway.lighthouse.storage/ipfs/QmYqZpjPkmEs4nUf6muQvEjRRAoznKFJr8rZmh2iUfaz5H",
                "https://gateway.lighthouse.storage/ipfs/QmY34VL5yKrGVmbLDPmh91vHGYdG6bK7wQVZNZkPBFybNH",
                "https://gateway.lighthouse.storage/ipfs/QmazrQ37BNKU4EjWP4YAB46nHPJsjAcViAbwfJjktFWDTh",
                "https://gateway.lighthouse.storage/ipfs/QmW5zVkgq8PXKhiWaBuSmnX5q3yyR1gf6jLrdRSoBwkepw",
                "https://gateway.lighthouse.storage/ipfs/QmdnU876YhpCAhCFrjWcgv1UVZmDErWxyA8QZyKBh7co8p",
                "https://gateway.lighthouse.storage/ipfs/QmXbKLfokR8DUvfB7CqsHMh96BQZ4KgCqRjBPyEDnicdMt",
            ];

            const randomNFt = nfts[Math.floor(Math.random() * nfts.length)];

            const address = await signer.getAddress();
            const tx = await contract.safeMint(
                address,
                randomNFt,
                a,
                b,
                c,
                Input
            );
            await tx.wait();
            setLoading(false);
            return true;
        } catch (error) {
            setLoading(false);
            console.log(error);
            return false;
        }
    };

    return (
        <VerifiedContext.Provider
            value={{ isVerified, loading, fetched, verify }}
        >
            {children}
        </VerifiedContext.Provider>
    );
};

export const useVerified = () => {
    return useContext(VerifiedContext);
};

// create a context to wrap the above useVerified

export const VerifiedContext = createContext<{
    isVerified: boolean;
    loading: boolean;
    fetched: boolean;
    verify: (file: File, pass: string) => Promise<boolean>;
}>({
    isVerified: false,
    loading: false,
    fetched: false,
    verify: async () => false,
});
