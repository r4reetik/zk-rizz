import { initialize } from "zokrates-js-node";
import path from "path";
import fs from "fs";

type PData = {
    g1: number;
    g2: number;
    a1: number;
    a2: number;
    arr1: boolean[];
    arr2: boolean[];
};
async function match() {
    const zokratesProvider = await initialize();
    try {
        const program: Buffer = fs.readFileSync(
            path.join(__dirname, "..", "circuit", "out")
        );
        const abi = JSON.parse(
            fs
                .readFileSync(path.join(__dirname, "..", "circuit", "abi.json"))
                .toString()
        );
        const provingkey = fs.readFileSync(
            path.join(__dirname, "..", "circuit", "proving.key")
        );
        console.log(program, abi, provingkey);

        const data = {
            g1: 2,
            g2: 2,
            a1: 24,
            a2: 24,
            arr1: [
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
        };
        console.log([data.g1, data.g2, data.a1, data.a2, data.arr1, data.arr2]);
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

        console.log(proof);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

match().then(() => {
    console.log("lool");
});
