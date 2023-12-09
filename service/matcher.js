import { initialize } from "zokrates-js";
import { ethers } from "ethers";
import path from "path";
import fs from "fs";

async function match(privateKey, rpc, contractAddr, user1, user2, data) {
    const zokratesProvider = await initialize();
    try {
        const program = fs.readFileSync(path.join("out"));
        const abi = JSON.parse(
            fs.readFileSync(path.join("abi.json")).toString()
        );
        const provingkey = fs.readFileSync(path.join("proving.key"));

        const { witness, output } = zokratesProvider.computeWitness(
            {
                program: Buffer.from(program),
                abi: abi,
            },
            [data.g1, data.g2, data.a1, data.a2, data.arr1, data.arr2]
        );
        const proof = zokratesProvider.generateProof(
            program,
            witness,
            provingkey
        );
        const provider = new ethers.JsonRpcProvider(rpc);
        const wallet = new ethers.Wallet(privateKey, provider);

        const contract = new ethers.Contract(
            contractAddr,
            [
                {
                    anonymous: true,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "address",
                            name: "p1",
                            type: "address",
                        },
                        {
                            indexed: true,
                            internalType: "address",
                            name: "p2",
                            type: "address",
                        },
                        {
                            indexed: true,
                            internalType: "bytes32",
                            name: "uid",
                            type: "bytes32",
                        },
                    ],
                    name: "Matched",
                    type: "event",
                },
                {
                    inputs: [
                        {
                            components: [
                                {
                                    components: [
                                        {
                                            internalType: "uint256",
                                            name: "X",
                                            type: "uint256",
                                        },
                                        {
                                            internalType: "uint256",
                                            name: "Y",
                                            type: "uint256",
                                        },
                                    ],
                                    internalType: "struct Pairing.G1Point",
                                    name: "a",
                                    type: "tuple",
                                },
                                {
                                    components: [
                                        {
                                            internalType: "uint256[2]",
                                            name: "X",
                                            type: "uint256[2]",
                                        },
                                        {
                                            internalType: "uint256[2]",
                                            name: "Y",
                                            type: "uint256[2]",
                                        },
                                    ],
                                    internalType: "struct Pairing.G2Point",
                                    name: "b",
                                    type: "tuple",
                                },
                                {
                                    components: [
                                        {
                                            internalType: "uint256",
                                            name: "X",
                                            type: "uint256",
                                        },
                                        {
                                            internalType: "uint256",
                                            name: "Y",
                                            type: "uint256",
                                        },
                                    ],
                                    internalType: "struct Pairing.G1Point",
                                    name: "c",
                                    type: "tuple",
                                },
                            ],
                            internalType: "struct Verifier.Proof",
                            name: "proof",
                            type: "tuple",
                        },
                        {
                            internalType: "uint256[1]",
                            name: "input",
                            type: "uint256[1]",
                        },
                        {
                            internalType: "address",
                            name: "p1",
                            type: "address",
                        },
                        {
                            internalType: "address",
                            name: "p2",
                            type: "address",
                        },
                    ],
                    name: "verifyTx",
                    outputs: [
                        {
                            internalType: "bool",
                            name: "r",
                            type: "bool",
                        },
                    ],
                    stateMutability: "nonpayable",
                    type: "function",
                },
            ],
            wallet
        );

        const tx = await contract.verifyTx(
            proof.proof,
            proof.inputs,
            user1,
            user2
        );

        console.log(tx);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

// test run node matcher.js

match(
    "ea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0",
    "http://localhost:8545",
    "0xF8f7754dACc9F8f4293C21476d920DE9Ba11F22e",
    "0xF8f7754dACc9F8f4293C21476d920DE9Ba11F22e",
    "0xF8f7754dACc9F8f4293C21476d920DE9Ba11F22e",
    {
        g1: "2",
        g2: "2",
        a1: "24",
        a2: "24",
        arr1: [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            false,
            false,
            false,
            true,
            true,
            true,
            true,
        ],
        arr2: [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
        ],
    }
).then(() => {
    console.log("lool");
});
