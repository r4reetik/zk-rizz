import { providers, Contract, BigNumberish } from "ethers";
import { nftABI } from "./abi";

export class VerifiedNFT {
    private address = "0x06ea4274E7AbA9e2702883B51fc39B301F76de0E";
    private signer: providers.JsonRpcSigner;
    private contract: Contract;
    constructor(signer: providers.JsonRpcSigner, test = true) {
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

    async tokenURI() {
        return this.contract.uris(await this.signer.getAddress());
    }

    safeMint(
        to: string,
        uri: string,
        a: [BigNumberish, BigNumberish],
        b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
        c: [BigNumberish, BigNumberish],
        input: BigNumberish[]
    ) {
        return this.contract.safeMint(to, uri, a, b, c, input);
    }
}
