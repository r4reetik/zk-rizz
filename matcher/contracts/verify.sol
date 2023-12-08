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
                0x02bbe617dbaa4ecef835704fa53d17618940979d3a774e8ac0195934cd96c687
            ),
            uint256(
                0x0b6bdeef13cda562c4ba794d6898bafaa7ea9646a9a4715a9be2432b54ed246d
            )
        );
        vk.beta = Pairing.G2Point(
            [
                uint256(
                    0x147ac10528f01d6de9a018e17c33eae4811575234216374c2d94fe0226436558
                ),
                uint256(
                    0x2c0bc334db3651acb7a619d98ac790ad9604042a89a36096b6b57963d5be67f8
                )
            ],
            [
                uint256(
                    0x0f7dc1571fcf92e6a56c6da8e4305d08451acc77bd64074c89ee966bb839b981
                ),
                uint256(
                    0x1570dcb6be99eab5df6155f72917761f3a3d05f93dc67f71d7e73cf0200be5a9
                )
            ]
        );
        vk.gamma = Pairing.G2Point(
            [
                uint256(
                    0x102f4d5c02b39a27ed06ec8be513979b101ef3cce613000e584c4a42ff5d2aaa
                ),
                uint256(
                    0x14a0aa695ef4cf8b8883e1c841d010714cc7b7fa2f1eb71f7c99df0e29e7191c
                )
            ],
            [
                uint256(
                    0x1a291210fc80e26e32b823670a5a2f3786ba062dcfbd65a9f3636686f9752c7e
                ),
                uint256(
                    0x01590ea614228053169302aa8a3e55b1c770ea13ed967c042330b9b5d8f9fa5c
                )
            ]
        );
        vk.delta = Pairing.G2Point(
            [
                uint256(
                    0x12e8cb6e9b552fc18d045736e17594d0a875b093973250ee7f82ef35159cdf5f
                ),
                uint256(
                    0x01a6fb4e4fb0d6564e9affd30a9fe2de4b874a38de66020af62fe1e75a798670
                )
            ],
            [
                uint256(
                    0x0b183c2e0c005357982b12d522b90bdea034669c84a1f3352c8f4e81f2eee814
                ),
                uint256(
                    0x16fe4252e6d52c1e92e97f0fac2f27d972660861eae8c72803d9fff0e0e127d6
                )
            ]
        );
        vk.gamma_abc = new Pairing.G1Point[](46);
        vk.gamma_abc[0] = Pairing.G1Point(
            uint256(
                0x18e2d37e15f40a5174dab1d175f13e4c90616704edd9c5e1080b3ec15e30b8d1
            ),
            uint256(
                0x17e276f1cd7e4df640ae9517072f0690a39818ec6cadd6948fc43202b6f4a1d2
            )
        );
        vk.gamma_abc[1] = Pairing.G1Point(
            uint256(
                0x0d65c90adf1572ab3ddceb186692fbb6ae873adb79809df3a5c90538df2117f5
            ),
            uint256(
                0x10d73e1761ccc652a4deae4e3584ba777647eed4f1549f9188f95ccae275da48
            )
        );
        vk.gamma_abc[2] = Pairing.G1Point(
            uint256(
                0x0ef84a461b68dc4a72d7fc02f57d463e7a556a18d04e9289796666a07f044786
            ),
            uint256(
                0x0381489bec5774f8fe6432fbb994f304e8e401677c19d560c42f5425bea3e347
            )
        );
        vk.gamma_abc[3] = Pairing.G1Point(
            uint256(
                0x0ffc5e48945940e8e8a13bf46b70f7274b544b886e16b0a9beb534b6f53086c6
            ),
            uint256(
                0x26d1ba60cd9ccd75f038701efe9072678e244ee23e5a64810feda4c5850de0a8
            )
        );
        vk.gamma_abc[4] = Pairing.G1Point(
            uint256(
                0x165b1061670855655348df31aad9d22b3582635eccdf6abab955715adf4b6148
            ),
            uint256(
                0x092fc719e4db519ad1ec1ce6dcaaf34a357ee30ec8ed0c7b823d22420055c5c0
            )
        );
        vk.gamma_abc[5] = Pairing.G1Point(
            uint256(
                0x26f7700afdca0bb633f04e7ecca5422053714bb8e90784788004ec736bf17cea
            ),
            uint256(
                0x15b74711c3c902adb37b486846caaa7808606f166e1e1337780a469efed1dad4
            )
        );
        vk.gamma_abc[6] = Pairing.G1Point(
            uint256(
                0x0c038d4fcae1bade225c529e9173fa9fcfcd79d1b07d214728d83b5e05a0461f
            ),
            uint256(
                0x054dff865e5de5c00907358949745dc1dc7b21fb04807026ea3141aa2bb36d32
            )
        );
        vk.gamma_abc[7] = Pairing.G1Point(
            uint256(
                0x079e4e29cefa8b324253ddee10ff728369e0199b00425d808a83665cd7f2561e
            ),
            uint256(
                0x2002afdb7c69ea6d701dc06459cf7a49442dcbb7368f91775c185ec185bb67e1
            )
        );
        vk.gamma_abc[8] = Pairing.G1Point(
            uint256(
                0x10c75f3f6467ae36c8d4d988359f7c50837d271b4a130213f0d1e6a36d962dc6
            ),
            uint256(
                0x08493edf8001ac5dfed735d7600e5dc5c7f7a38dc0966f91da8ec4bfff90957a
            )
        );
        vk.gamma_abc[9] = Pairing.G1Point(
            uint256(
                0x1040433dd31df46aa40d818c8040d9d096f86c7e9351d73b34ca29ceebe4832e
            ),
            uint256(
                0x2a2c816ccf567dd92c3f0471f6592c31125144a871948ce0079a3fa58bf63f68
            )
        );
        vk.gamma_abc[10] = Pairing.G1Point(
            uint256(
                0x078715e5d433be93bed97ed090e0c3e710692074e57ebc5af339f57dd4b6a303
            ),
            uint256(
                0x009532071d734f61ac594014ceb1225c26c52674a5ec1ba14db6d9a4efaa5126
            )
        );
        vk.gamma_abc[11] = Pairing.G1Point(
            uint256(
                0x1773be4184a4986fd97fb9255e2a8e69ae316a4dc62585f7fd2c50af21d05b8f
            ),
            uint256(
                0x290168589062a3fedf47f26388d9aa8cb1b939c62846b9fa3a843b0a4531bcdb
            )
        );
        vk.gamma_abc[12] = Pairing.G1Point(
            uint256(
                0x03a19a34f8e22792c2c562285b172a237be83178021218276ec308670d4a76ad
            ),
            uint256(
                0x2f60a2e30e6ccbcca093c1395858b3682469fc98567e7af86433f1907ded626c
            )
        );
        vk.gamma_abc[13] = Pairing.G1Point(
            uint256(
                0x21b54107a7cd43bcfe43f6d147416eba24162b600acf4bef0c0b2a66423d9cde
            ),
            uint256(
                0x2da0b4b67629f43e1a71400aa28f662aed339f0a99119948c9387e41a26e5e64
            )
        );
        vk.gamma_abc[14] = Pairing.G1Point(
            uint256(
                0x0528b7cdc6303280a7a7306677dedf047f37b131aafc0452b1f7b887b2acd09a
            ),
            uint256(
                0x22237bf5e6443586773ae346244c66c811e72da4fc81a06cb2e18b3e9d711adf
            )
        );
        vk.gamma_abc[15] = Pairing.G1Point(
            uint256(
                0x00e7e936672df362e2fcb245dc9152208118379369c97ddefb56f386a0037608
            ),
            uint256(
                0x05b0f5a7c53f8d3a0519a7b823e4e995a56e37567c338a44bc4611b0d25fb6cf
            )
        );
        vk.gamma_abc[16] = Pairing.G1Point(
            uint256(
                0x25486d3487822a2a3067c96469f4a94c4972b403092610aa389f4742ea13110e
            ),
            uint256(
                0x1255ebf8051cacbde7d00a952c77a548241deb51753c9c195e9af7f3294a6462
            )
        );
        vk.gamma_abc[17] = Pairing.G1Point(
            uint256(
                0x23d2c035c9446956375d576e9db17d33cd4297a588d5ffd44b4e1b62994b1dd6
            ),
            uint256(
                0x1c65b73631a21777e927c1dbec06ef7a99ca4b2efb8d542a6e7eb591fb8e9e54
            )
        );
        vk.gamma_abc[18] = Pairing.G1Point(
            uint256(
                0x13edfdec732d0bca27a96bc4dedcf348e84f7529bc1f220471294b991538fbbd
            ),
            uint256(
                0x0852062b053fc1c8e9ac2b4f7834990aa8dcbacaa2878b9b7f7cb1000250505d
            )
        );
        vk.gamma_abc[19] = Pairing.G1Point(
            uint256(
                0x14f28b91d1b2f839b0b6732ef361af932e0bfb56237708408cba32d61c650334
            ),
            uint256(
                0x2dcf9a09f37ed759b4a6bae5e7b072f698344907277d63a88336ef8d2c4e523e
            )
        );
        vk.gamma_abc[20] = Pairing.G1Point(
            uint256(
                0x0f11fcba900400230fa546f4e6d3221ffa07b0d6b82d6f12351dad0ec0df6b7a
            ),
            uint256(
                0x02985db565bc14fcc6c4a47572f47be2bb77b51d339924c9d24871ca2cc7da45
            )
        );
        vk.gamma_abc[21] = Pairing.G1Point(
            uint256(
                0x0bb94506321adde5190a42fc5052eb11f4300b43cf0c01a7e8a568ae5c220392
            ),
            uint256(
                0x0d4f763a71e94acabee4391c01883fa03ab938df44666fe49b991d8457ff52e2
            )
        );
        vk.gamma_abc[22] = Pairing.G1Point(
            uint256(
                0x272c2376bc2ece9613bcb2ca97a5376a99d094ed180b45b0f50e00b628e5940e
            ),
            uint256(
                0x00b4855eb843abfd39aaca8b39f6d8d9968c580a9870f0a4a2f607c40c16fd2f
            )
        );
        vk.gamma_abc[23] = Pairing.G1Point(
            uint256(
                0x2e601eb2b6144b2d90ba8cf5ecd77454d82d5b324a7378de31efd737e31c7004
            ),
            uint256(
                0x09756c897d544839da0bc75814f395ef9a485779e0d8f7a4260be4979ae0a02f
            )
        );
        vk.gamma_abc[24] = Pairing.G1Point(
            uint256(
                0x183a512777fd74c9a7b48a7361962d802cc2b6b1ef49a5b435464ed3a5a0c363
            ),
            uint256(
                0x25e29ac6eaa845c17606a5fb1b74c3a23dd5e9867d6bba7c38159a9e2f1e5072
            )
        );
        vk.gamma_abc[25] = Pairing.G1Point(
            uint256(
                0x12beb3d24063707895066fe5287be0ec55dec4f6a18af5ddc058b739797deabc
            ),
            uint256(
                0x11b3207e98d7551a3cc44337f6d550ac622e3ab57a1a7402ab79903012a66de6
            )
        );
        vk.gamma_abc[26] = Pairing.G1Point(
            uint256(
                0x2b462e758cb6d6414b1ebb07de8695d394eda4fc0ede5858663bba80dc4b1af5
            ),
            uint256(
                0x217d568590a6b70b4e4da5070a53f05f58c7cc2e913ba108de7fb96ce5247e71
            )
        );
        vk.gamma_abc[27] = Pairing.G1Point(
            uint256(
                0x2600e2e1172834d3b09690b13f836de5244f3293e510dfa50718bb520011c64f
            ),
            uint256(
                0x2b8cf825cddb8349733703056f71bc716ecfa11b934c1cf28bca7e215769deac
            )
        );
        vk.gamma_abc[28] = Pairing.G1Point(
            uint256(
                0x1112c6811cf897a88eb3eb8cf3a3b7462826d79e02eb0a94972b346bd6cd436d
            ),
            uint256(
                0x213cc63224eac3bf86ea893d3f80170ef8b08cd7534bdc826d5ab022ca93c868
            )
        );
        vk.gamma_abc[29] = Pairing.G1Point(
            uint256(
                0x298bbabbb7d3956677e5af157093458161efb684ebc0e22e516f4afa21782a7b
            ),
            uint256(
                0x2025a396bfc24f072d4f6241a1744fc1ec5cc63b2fbe6ad32857e926fea8394f
            )
        );
        vk.gamma_abc[30] = Pairing.G1Point(
            uint256(
                0x1197bb2af46321560f32cc21acdb25ccfc02ad1cec686e733c5e7944fde163fe
            ),
            uint256(
                0x1a430829ad423f563dcbbff10cd0af89f1f06480a1089d8ef4d57f6a0a8d670c
            )
        );
        vk.gamma_abc[31] = Pairing.G1Point(
            uint256(
                0x27ea98ad283d144a06f2c92e805f631540f73eae5701d0dd71e9145638c0bf0c
            ),
            uint256(
                0x25e5186f58c4606d7e887ace69edf3b8d6049c76c66f9c2a85d6ff93a07d84ea
            )
        );
        vk.gamma_abc[32] = Pairing.G1Point(
            uint256(
                0x212176cd993f24d4c4aa70dac9ed81b1e80fb769ef53e58a70b360aa29142613
            ),
            uint256(
                0x002708ab246b1c245c2c68e472127107216e46cf49384d009f155b06d0399cc7
            )
        );
        vk.gamma_abc[33] = Pairing.G1Point(
            uint256(
                0x11b9c3a7433313ca9e22ef2af2ffc107558a430948c2e85dc4084b9740b97911
            ),
            uint256(
                0x05196926b8518ee2a68e8ecc65413e5f7f0d6581d71e81b8024491c7e9c14384
            )
        );
        vk.gamma_abc[34] = Pairing.G1Point(
            uint256(
                0x2be0e61f08ae7c5bd59adcbea3db1cc99ec82ded09ab51d76bc8af558c5e2b5e
            ),
            uint256(
                0x2c57c5cc0069dc3715e71cdd1a8a442228b358fe0aa818c72360274d4af080b6
            )
        );
        vk.gamma_abc[35] = Pairing.G1Point(
            uint256(
                0x1ac01ca3d8c26c93d6c190656efd14712254df2e259f6d1a612e5ec5aef0af6a
            ),
            uint256(
                0x05880e3b97172d36d56ba88d5f30cd2ed74abdb679b3c9d1b946a991bcd89548
            )
        );
        vk.gamma_abc[36] = Pairing.G1Point(
            uint256(
                0x0c76e2238f544414a9919a404e105577772783046ead180e16a49a9225fa104a
            ),
            uint256(
                0x03bd05327a098669e36d96076631c87068f7fe5bb32065f1fbe1af97ab1eb9e0
            )
        );
        vk.gamma_abc[37] = Pairing.G1Point(
            uint256(
                0x2c6d3fb48219f4e0070dbe1b5d772663331a9110bde6ea442bb735c0985a6444
            ),
            uint256(
                0x0988049881e7edf13ac7573019f7ff36f829add2d414c0248feb452d02385819
            )
        );
        vk.gamma_abc[38] = Pairing.G1Point(
            uint256(
                0x04ed02f49c5a214ffb7319d38986708106df462650838d3ca020da30f4c2a26f
            ),
            uint256(
                0x0206d8dc9a3f682d1c49e2e737b732c573cd63073d55269ab8165388b274cc4f
            )
        );
        vk.gamma_abc[39] = Pairing.G1Point(
            uint256(
                0x1f5f94e22a67ae1b45a7126b1f96dcfa17c68f9e1fc9fd74346fe5f391e6e195
            ),
            uint256(
                0x01486583d9b008bd89dbfb563b02a0dc65cf436ca61273354e5d695dbfc5a76b
            )
        );
        vk.gamma_abc[40] = Pairing.G1Point(
            uint256(
                0x134d29301f6970f50c0a6f8fed3ea66dc7d2598c5d6fbb109ca9e2302b3a42f4
            ),
            uint256(
                0x14bdc90bbdbe174b7ccd26970e3a865c56748851fba8271d0eb822238c2013ff
            )
        );
        vk.gamma_abc[41] = Pairing.G1Point(
            uint256(
                0x0c55bfaa964b7739e4ab4ba8e1ea0ff8bd0c4649d1c4c7f6d885eff8c215d5be
            ),
            uint256(
                0x0002eada6bcb7b0413352fa3d6916951210498b154922c949a54f67404ff0dcb
            )
        );
        vk.gamma_abc[42] = Pairing.G1Point(
            uint256(
                0x2637cd707436b3974062aa160da79a074620832cf2d392725e184e475dbe9f45
            ),
            uint256(
                0x04dc329e7d1cb5fbf2dc8f262ec0a9d9116e6023d9182675659f38e678490374
            )
        );
        vk.gamma_abc[43] = Pairing.G1Point(
            uint256(
                0x00134020bdb916157375db05c8fe040c40af3c1f09b4b6f08ba908305ab6d149
            ),
            uint256(
                0x1cc11f4369ffc30c544c22495a8b0ed54c28caca89d8cf895a7254a770926b39
            )
        );
        vk.gamma_abc[44] = Pairing.G1Point(
            uint256(
                0x288fff133c6e296589e0c15597b2829541d3a12fa1d5c91e483696c77cc19aa7
            ),
            uint256(
                0x1a1a959cc91b55ccbad5a6e02926339894ff927a31ee3989f842b17171c26a36
            )
        );
        vk.gamma_abc[45] = Pairing.G1Point(
            uint256(
                0x0ec071be89d755603a214356732cf1baf3c47ede0eec63d262aed2f961dc8663
            ),
            uint256(
                0x00ba32c844d98308ab8f6aeca5371e540484d585c4a6c1cb24e942218c003713
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
        uint[45] memory input,
        address p1,
        address p2
    ) public returns (bool r) {
        uint[] memory inputValues = new uint[](45);

        for (uint i = 0; i < input.length; i++) {
            inputValues[i] = input[i];
        }
        if (verify(inputValues, proof) == 0) {
            bytes32 uid = keccak256(abi.encode(proof));
            emit Matched(p1, p2, uid);
            return true;
        } else {
            return false;
        }
    }
}
