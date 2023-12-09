import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: {
        settings: {
            //   viaIR: true,
            optimizer: {
                enabled: true,
                // runs: 1,
            },
        },
        version: "0.8.19",
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
    },
    networks: {
        local: {
            url: "http://localhost:8545",
            accounts: [
                "0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0",
            ],
        },
    },
    defaultNetwork: "hardhat",
};

export default config;
