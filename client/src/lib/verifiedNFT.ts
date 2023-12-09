import { JsonRpcSigner, Contract, BigNumberish } from "ethers";
import { nftABI } from "./abi";

export class VerifiedNFT {
    private address = "0x45C89c5b5ba9805F1D3376C3e5B435A2CFafD42D";
    private signer: JsonRpcSigner;
    private contract: Contract;
    constructor(signer: JsonRpcSigner, test = true) {
        if (!test) {
            throw "set address";
        }
        this.signer = signer;
        this.contract = new Contract(this.address, nftABI, this.signer);
    }

    async isVerified() {
        return (
            (await this.contract.balanceOf(await this.signer.getAddress())) > 0
        );
    }

    safeMint(
        to: string,
        a: [BigNumberish, BigNumberish],
        b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
        c: [BigNumberish, BigNumberish],
        input: BigNumberish[]
    ) {
        return this.contract.safeMint(to, a, b, c, input);
    }
}
