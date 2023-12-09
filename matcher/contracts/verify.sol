// This file is MIT Licensed.
//
// Copyright 2017 Christian Reitwiessner
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
pragma solidity ^0.8.0;
import {Pairing} from "./pairing.sol";

contract Verifier {
    using Pairing for *;
    struct VerifyingKey {
        Pairing.G1Point alpha;
        Pairing.G2Point beta;
        Pairing.G2Point gamma;
        Pairing.G2Point delta;
        Pairing.G1Point[] gamma_abc;
    }
    struct Proof {
        Pairing.G1Point a;
        Pairing.G2Point b;
        Pairing.G1Point c;
    }
    event Matched(address p1, address p2, bytes32 uid);

    function verifyingKey() internal pure returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(
            uint256(
                0x0d5561a88460b7a7a3ae59d245af5a09bf93d51d8405803349c37f33da759e7d
            ),
            uint256(
                0x06350fb3b5e893562a44fa5225dba63c13ffa66b67d0dc1cd5ece7a6c6f40a1d
            )
        );
        vk.beta = Pairing.G2Point(
            [
                uint256(
                    0x0233dbd36eed6326510c64a0044292e649301eb9f1d67e14c17d8e76d9a6c22a
                ),
                uint256(
                    0x170e4226e197a0d20e3b746d61a477226402007bdc7b0bb823f13dccea3ba9ad
                )
            ],
            [
                uint256(
                    0x1e2bd7299bb8126426898def8c60358cd7d2cd62eaa07f21646e249590fcc3e4
                ),
                uint256(
                    0x01e17fd50845cde3ebc1adaef77fc4b0bea35ca5a587cb396eb8362cc23fd3ac
                )
            ]
        );
        vk.gamma = Pairing.G2Point(
            [
                uint256(
                    0x15e3588246ff4778aa44810dde68e12093cb2c06ea3836be144e731a8317f988
                ),
                uint256(
                    0x0b5b2afcb2906e178ccdf58bdc9e5df638aef86c7536baa232e6016fa5321bb0
                )
            ],
            [
                uint256(
                    0x2fec4361a67d23e71d9d36a27e52e92950e0681115d80f0c85e60c8745852a42
                ),
                uint256(
                    0x2203f7218f210273fcac849bba388bb6536dcef05f2e44b41682ebb4c61717b9
                )
            ]
        );
        vk.delta = Pairing.G2Point(
            [
                uint256(
                    0x25ecfed263e10b2e65b54f9a674131c3155b7c77d450aec5ba98b026d15fddcd
                ),
                uint256(
                    0x2d4f24b84115782af7b35e12dded73beb95e470ec33a3b084762d9805f3f79cf
                )
            ],
            [
                uint256(
                    0x2933bff4d45dc97678470693e515feb350332e9c062b9b525ad366b7123867ba
                ),
                uint256(
                    0x29de2ca9bbc8cbec479e27503cd5aaa8ca255a563c80a0ef2082c1c353bda415
                )
            ]
        );
        vk.gamma_abc = new Pairing.G1Point[](2);
        vk.gamma_abc[0] = Pairing.G1Point(
            uint256(
                0x15fcef5a18d6ce63ca6835586ecedc8dd019df9259ebbeb54223b14ac140c3d3
            ),
            uint256(
                0x11c0a9166c5729f2644679345e99bf84fefd6876056a76bb2d939d646b8ca53c
            )
        );
        vk.gamma_abc[1] = Pairing.G1Point(
            uint256(
                0x19355eb2e93f674a2a7f347ccd8be8e6aaacd2fceac5a507124a9fcc74b7d05c
            ),
            uint256(
                0x14f524e11124fda512cdb673d8b66ae47b8cf835943dcc1717dc0513a6c2cfff
            )
        );
    }

    function verify(
        uint[] memory input,
        Proof memory proof
    ) internal view returns (uint) {
        uint256 snark_scalar_field = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
        VerifyingKey memory vk = verifyingKey();
        require(input.length + 1 == vk.gamma_abc.length);
        // Compute the linear combination vk_x
        Pairing.G1Point memory vk_x = Pairing.G1Point(0, 0);
        for (uint i = 0; i < input.length; i++) {
            require(input[i] < snark_scalar_field);
            vk_x = Pairing.addition(
                vk_x,
                Pairing.scalar_mul(vk.gamma_abc[i + 1], input[i])
            );
        }
        vk_x = Pairing.addition(vk_x, vk.gamma_abc[0]);
        if (
            !Pairing.pairingProd4(
                proof.a,
                proof.b,
                Pairing.negate(vk_x),
                vk.gamma,
                Pairing.negate(proof.c),
                vk.delta,
                Pairing.negate(vk.alpha),
                vk.beta
            )
        ) return 1;
        return 0;
    }

    function verifyTx(
        Proof memory proof,
        uint[1] memory input,
        address p1,
        address p2
    ) public returns (bool r) {
        uint[] memory inputValues = new uint[](45);

        for (uint i = 0; i < input.length; i++) {
            inputValues[i] = input[i];
        }
        if (verify(inputValues, proof) == 0) {
            if (input[0] == 1) {
                bytes32 uid = keccak256(abi.encode(proof));
                emit Matched(p1, p2, uid);
            }
            return true;
        } else {
            return false;
        }
    }
}
