import { initialize } from "zokrates-js";
import { promises as fs } from "fs";
import { ethers } from "ethers";

// const filePath = "./matcher.zok";

// async function readZokFile(filePath) {
//     try {
//         const data = await fs.readFile(filePath, { encoding: "utf-8" });
//         return data;
//     } catch (error) {
//         console.error("Error reading the file:", error);
//         throw error;
//     }
// }

initialize().then(async (zokratesProvider) => {
    const source = `def main(private u8 g1,private u8 g2,private u8 a1, private u8 a2, private bool[20] arr1,private bool[20] arr2) -> bool {
        field mut count = 0;
        for u32 i in 0..20 {
            field temp = arr1[i] == arr2[i] ? 1 : 0;
            count = count + temp;
        }
        assert(a1-a2 < 5||a2-a1 < 5);
        assert(g1==g2);
        return count >= 16;
        }`;
    // compilation
    const artifacts = zokratesProvider.compile(source);

    // read from the db
    let data = {
        g1: "23",
        g2: "23",
        a1: "23",
        a2: "23",
    };

    // computation
    const { witness, output } = zokratesProvider.computeWitness(artifacts, [
        data.g1,
        data.g2,
        data.a1,
        data.a2,
        [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ],
        [
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
    ]);

    // run setup
    const keypair = zokratesProvider.setup(artifacts.program);

    // generate proof
    const proof = zokratesProvider.generateProof(
        artifacts.program,
        witness,
        keypair.pk
    );

    // export solidity verifier
    // const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk);

    // or verify off-chain
    const provider = new ethers.JsonRpcProvider("http://localhost:8545");
    const wallet = new ethers.Wallet(
        "ea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0",
        provider
    );

    const contract = new ethers.Contract(
        "0xF8f7754dACc9F8f4293C21476d920DE9Ba11F22e",
        [
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "address",
                        name: "p1",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "address",
                        name: "p2",
                        type: "address",
                    },
                    {
                        indexed: false,
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

    console.log(proof, proof.inputs, proof.proof);
    const txHash = await contract.verifyTx(
        proof.proof,
        proof.inputs,
        "0xca619B3ad1a53c3dceDd7B5AFa61d3b4d76F67A4",
        "0xca619B3ad1a53c3dceDd7B5AFa61d3b4d76F67A4"
    );
    console.log(txHash);
});
