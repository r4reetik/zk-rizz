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
                0x1d4193eb04fb7216997f4b4e427955183235f0f5a79a7cfe96dc2f1ab71394c9
            ),
            uint256(
                0x02fefd6a305244e78386f50a08399988a05f5383d166e352667b88832e808b0d
            )
        );
        vk.beta = Pairing.G2Point(
            [
                uint256(
                    0x1af7e79a6a50714eb32da9dfe0cbf17249cab186abe43a615d48c72ae9228cdf
                ),
                uint256(
                    0x099da210eb31c9426a356c1b35d5d47d1a4799b5568310d92b7313f5af6a7bd0
                )
            ],
            [
                uint256(
                    0x161a7377cbfe72d5517c8737db2df852b23bcc1d1bd343ba6379e2ca6c3afa52
                ),
                uint256(
                    0x2b4eddd123fa81335d60e81fb309970145db744b51b9e5106de0a8d2c117fcd6
                )
            ]
        );
        vk.gamma = Pairing.G2Point(
            [
                uint256(
                    0x0620044f9221a0583da5457d234bd5918f158e690ea3ceccd30c9b5afbd37134
                ),
                uint256(
                    0x22be978acbd0fa9cc36a8bd6bbcfdf6cc36caa4543bec6a64639c32746514680
                )
            ],
            [
                uint256(
                    0x2cdb01a5643cf912e9e31512833cd265c0b84dcc04b0cae9a76acb8c9eea1995
                ),
                uint256(
                    0x09b55576302ccc98c61dca9db7424c0db00cabb6fa422ac190b554c106294c9f
                )
            ]
        );
        vk.delta = Pairing.G2Point(
            [
                uint256(
                    0x20e14543e17f7ae497fbe7c80192b7c55c8bebdb13bc4ad11149cb518c057fff
                ),
                uint256(
                    0x12e577d1f0187bbf525f7e58bc8a3a99d622a79be96a67450249d77c8462683b
                )
            ],
            [
                uint256(
                    0x1482e8c9f374426cf22b6e8a65f53d3758fd60785043358d974d2e96f38f1dfa
                ),
                uint256(
                    0x0ed4c1791c65a5cab1c3ab84f76e8abdc546b644ca28dee437c79f85fc17ad63
                )
            ]
        );
        vk.gamma_abc = new Pairing.G1Point[](46);
        vk.gamma_abc[0] = Pairing.G1Point(
            uint256(
                0x246e2beaf6ffd346aa93ae3127edb4b10c4ff255b315721cc39b4b34f825c824
            ),
            uint256(
                0x1bc509dbd63be0c814a8b351d5b1908ee51d0bb5db9e3f1a91b16b7a826ad044
            )
        );
        vk.gamma_abc[1] = Pairing.G1Point(
            uint256(
                0x19e23b7ecfd66c3be7333daf944f4a5bdd5ed81abbd318e5bd8faef27f9ce3a3
            ),
            uint256(
                0x0412fd665d7d7352944c2bb06938ef74c37e78086ede95c6779d8b6ae0090353
            )
        );
        vk.gamma_abc[2] = Pairing.G1Point(
            uint256(
                0x0c1281f202d8604a04f5e5ce8a8db3d78ceadfb175504abbe7522db6a5e09866
            ),
            uint256(
                0x0f712f5ba961959ac8d6ef83b1aec3cd1b9ce4ece69158ef2724bacf69c55d93
            )
        );
        vk.gamma_abc[3] = Pairing.G1Point(
            uint256(
                0x19218636661c7b4e59b8730a1a1effcc3cee53b72307643bc7f8eb743b3b2a39
            ),
            uint256(
                0x01045c30f975ecff1e2f568ed84167dbda120d21b2e9d8c7175630ea7eafb6da
            )
        );
        vk.gamma_abc[4] = Pairing.G1Point(
            uint256(
                0x023479e6149af4e57e64ab64fbeb64f5b3b1da6fcc551ff2581059d26c33d316
            ),
            uint256(
                0x1f46367a5086010851ed50e92e376959133bfc873b840f50054f5d64467bf762
            )
        );
        vk.gamma_abc[5] = Pairing.G1Point(
            uint256(
                0x0e58d38b87c8826363942e2c41a2f9cec2419539b178f315fe21bce20e11d975
            ),
            uint256(
                0x2ab3fdcbda7718e2e67a8a1536419121271a7d43f17a922dede7650f2cd3449b
            )
        );
        vk.gamma_abc[6] = Pairing.G1Point(
            uint256(
                0x23408f666c13234689a2ce789ec09bae65f7fd61b5dd4cf588ac387dd58f4a8f
            ),
            uint256(
                0x0e18fa3f067111a96af8afad3dc18fd998bcf4ce854d2007bcd9f711cc227cb8
            )
        );
        vk.gamma_abc[7] = Pairing.G1Point(
            uint256(
                0x0bcb93dbf4bfe3ce6a7a70f8bca5315c01b174d4bd7fa63d90a95ecef42e0f92
            ),
            uint256(
                0x1b19323f405a732116abba8fd2a437c9b7ef6f0cb645fd8ec3042f1d07f1366b
            )
        );
        vk.gamma_abc[8] = Pairing.G1Point(
            uint256(
                0x0849567e710e68d96775185c67a85f3e3718caa31c0ac0671f0d8a374ee79948
            ),
            uint256(
                0x26d3f9895c0e101b2dafcdc15ffac6c1c3209f4a44b78ee9aaf481f267f5deca
            )
        );
        vk.gamma_abc[9] = Pairing.G1Point(
            uint256(
                0x2faf32bf8f27f63c93f0064f26c2d2ff933a9d37f2b9b1d567bd8dc0b564349e
            ),
            uint256(
                0x20c7130e40fc4455008171d6eff701bcd622928d63995c63c682092e63359587
            )
        );
        vk.gamma_abc[10] = Pairing.G1Point(
            uint256(
                0x2c999e057d2768b2f5e4d049e7ae9a1aa886f40cf4f2c0c121a5eb1879cc10a5
            ),
            uint256(
                0x05e33759c919e10aaa237834a43c845aa44bf568e2601b31ac4f26e586e494c6
            )
        );
        vk.gamma_abc[11] = Pairing.G1Point(
            uint256(
                0x2eacbd875199e7e116219c791cca76a2f740d6e8087ec5ceb69a240c10885a79
            ),
            uint256(
                0x00dca7ae87665b49f466b5c7b3237cd0702c745b9590b9a0d06eb37accc06c50
            )
        );
        vk.gamma_abc[12] = Pairing.G1Point(
            uint256(
                0x19f3cc72f6f7c2f783ddb9b2681df91ffca78ceadcc5a30a82679ec2142e4961
            ),
            uint256(
                0x04f767274589fe46026fd14b060dacecdbd46854deabcb6741c997854d340955
            )
        );
        vk.gamma_abc[13] = Pairing.G1Point(
            uint256(
                0x21e99728c499ba434a7aaf16f20b6a8a8b6576ce6eb0e7a12ed9ea63a7ede69c
            ),
            uint256(
                0x26829d3e23253bc05d5438bc35d4b6e77861e90ec653fd525b8a6c8afd8a2d6e
            )
        );
        vk.gamma_abc[14] = Pairing.G1Point(
            uint256(
                0x000a77bf3b131397dea4808235eec137bc0f14ff9572c5baa6d578695ada892d
            ),
            uint256(
                0x092883e8530ce432786fe290cced05f6df762c239bf62b55e297de9ebb798985
            )
        );
        vk.gamma_abc[15] = Pairing.G1Point(
            uint256(
                0x25caed24ce5ba8a1244c138cd168c7c04d46c9b808f28eebbeffcb4dca5a882a
            ),
            uint256(
                0x04755fb53b228f7c0a6a21840a57cc6019487aab92cbb3655ad2772f1c758be1
            )
        );
        vk.gamma_abc[16] = Pairing.G1Point(
            uint256(
                0x08dc62078773b2a0a92540ab7877f0d49fd6d75a67d13891cd05d9fdcbee772d
            ),
            uint256(
                0x1161b888bdc722b2461c3c9f0ec724bf668e8be2ba7292e8366c93de8933404a
            )
        );
        vk.gamma_abc[17] = Pairing.G1Point(
            uint256(
                0x2f8e31444e032e2907386dd25a128d4dd9bc40c29bce64de09ec93a5f860740f
            ),
            uint256(
                0x263fadee8761bfd5b7beaa205882c2e01da480949bd71db3def2e69424a20849
            )
        );
        vk.gamma_abc[18] = Pairing.G1Point(
            uint256(
                0x2e6b78998be3ea41b3b4ca05c2cb802a228b6093b22f3327ca71b6c5f8c445e9
            ),
            uint256(
                0x19139e9558b6117b4e5cd160b47f7a99ad2272091efc3d51acb2ccc807bd2bf0
            )
        );
        vk.gamma_abc[19] = Pairing.G1Point(
            uint256(
                0x03fb6bfb48ea07de711eab3f2a749acebeb0af79777f5c7fbd7cfb2db88e85b6
            ),
            uint256(
                0x020605dc4ec14e25d6905fc09d7d55862a66725979bdf6afdb374ea5d58fc65e
            )
        );
        vk.gamma_abc[20] = Pairing.G1Point(
            uint256(
                0x275f5c7327f9554d608da9f12de29a8d8f3ab3d4c09fd05bfb0638b0196e0423
            ),
            uint256(
                0x27a64fdc11cf7c6d73a5802f864df5ecf9b4acdde3a77828e35d43b2a0f821b1
            )
        );
        vk.gamma_abc[21] = Pairing.G1Point(
            uint256(
                0x2fffe5b2b5924838e496ab7a6d74115401ff93c067e9920f2c2497ccd219179d
            ),
            uint256(
                0x088187a01691230896c85b02141a67a69467f68f2972ccfa42434e6c0f8c51ed
            )
        );
        vk.gamma_abc[22] = Pairing.G1Point(
            uint256(
                0x0fb0a57e1e066eb4f70af06341354c2d6fc2cd4f9f60e3fa2e149ab208f9e94c
            ),
            uint256(
                0x2606fd1fe6e869fd02990329f65245e062dc22bb8b0ce021d2d4d7cad0abaaaf
            )
        );
        vk.gamma_abc[23] = Pairing.G1Point(
            uint256(
                0x1b7ba0d17678b98442c78fa328baee2b4cd13b204a0cc2242d3b35db3c51d2bb
            ),
            uint256(
                0x2aac0968908121c32a3b7a11f1a0a227d9339b8cd640a6938f2beb5315a2c985
            )
        );
        vk.gamma_abc[24] = Pairing.G1Point(
            uint256(
                0x1fbb0d3d987400c4fdecaa7fbcc09bee360fb9771ba18c090cc86ababbf734a3
            ),
            uint256(
                0x16f9757dc3440fc57decd219d337a01e53b4cbe19e81afad6c525dea0852b9ff
            )
        );
        vk.gamma_abc[25] = Pairing.G1Point(
            uint256(
                0x04493a6c41de6cafe6a0f49f5fd076fb76366fbf76adfaa1e1fbac3293a6e6c0
            ),
            uint256(
                0x0f86680650d1ec40886710a122cf4b0f88af9f9a0bc4e1da7d3ce1ff17e0921f
            )
        );
        vk.gamma_abc[26] = Pairing.G1Point(
            uint256(
                0x00e02afdfbefe8c725add53285fbfb533b07c0e5a0fefc01de03208abbfc0e86
            ),
            uint256(
                0x28c099c79c295ae9066c8e922d56c12dc3d86195896381ae0c2bc6d3b4afec79
            )
        );
        vk.gamma_abc[27] = Pairing.G1Point(
            uint256(
                0x0926add97c3207af82290a8282c7fe8a02f972d52da203fd33999c988ea78f1a
            ),
            uint256(
                0x0983f36d668cd180231b76d0bd9fe8ab1358cba7f41efc3597864ed41410261c
            )
        );
        vk.gamma_abc[28] = Pairing.G1Point(
            uint256(
                0x2abf23e6c744af569285d79e7b4837989f31f2b95714d14ed66ea5555e847081
            ),
            uint256(
                0x20b2f6f8bf4dd00b15603eb06122053b755e0602684920ae46cc0181e19d5642
            )
        );
        vk.gamma_abc[29] = Pairing.G1Point(
            uint256(
                0x05d4367996bb9535aff69c0965b5962056cf2631f1668b6c580b2edaa8972b97
            ),
            uint256(
                0x2ca6829e42dec6206a0f11e4c1845fb2cd4602760c1120582ede7483b56a75b7
            )
        );
        vk.gamma_abc[30] = Pairing.G1Point(
            uint256(
                0x1e79ad1497d62f5558d4aa1b8a45d462592728cfb148da5a74cb83ba65ba51f8
            ),
            uint256(
                0x2d85b76e568f42b221c25adf5dfa4faaeb37ca84ab5fa43fc2c3e130a8005866
            )
        );
        vk.gamma_abc[31] = Pairing.G1Point(
            uint256(
                0x2674f51cb6bf1c1ec33e7ef4108ab57198eca684f2ccfe166d190fb0566f856a
            ),
            uint256(
                0x0d77f05640dea07d7a49e5d59b983313e5635bbc4335b9e323f9d83d7c88e6ac
            )
        );
        vk.gamma_abc[32] = Pairing.G1Point(
            uint256(
                0x10ed1e983b33feea752122fb6e305c57e913bf147d48e1604360b20d016dfaf2
            ),
            uint256(
                0x1ef0840a95c3eb2cf18020cc17c50c6e23924c95377a4da116e5e17b0bfdd231
            )
        );
        vk.gamma_abc[33] = Pairing.G1Point(
            uint256(
                0x0d8c26065f89e41a1916d085fee13568fe19fc164177ff4e5bf11b189c12c2af
            ),
            uint256(
                0x1869cab75f27a4278b74255783dd13ea4616febb7291988c23a5420edf381727
            )
        );
        vk.gamma_abc[34] = Pairing.G1Point(
            uint256(
                0x1ee8286a622b81f5654883cac6fc623de589b638735d94e67a54331c60199a8b
            ),
            uint256(
                0x08af19dc934c7d2ba54f59a983ba33ae18c2eb880c1d3c28b084dfd7bab26c90
            )
        );
        vk.gamma_abc[35] = Pairing.G1Point(
            uint256(
                0x1cd9fc37df97ac20d7bb68661dade7535aab98db8ce88870165c0f9ad486811e
            ),
            uint256(
                0x0cbea96ea4702067dd059483c1c440ff0f69f29982468154859e39ea257bc8d0
            )
        );
        vk.gamma_abc[36] = Pairing.G1Point(
            uint256(
                0x2c87aa5a9e60ba1db0ad763a1656627d3df121c1a967d2208f2d15c813cf19be
            ),
            uint256(
                0x2e7fcd8df85ce4a6ba444a19e041e51c2bf80bac87c61547124883344510142c
            )
        );
        vk.gamma_abc[37] = Pairing.G1Point(
            uint256(
                0x0730463cb20e7e8c6925977b52af54f4ebb52abb32efed0c755d818d7c457197
            ),
            uint256(
                0x0b745d839c4a5ac81a48c3ffbace0c72aff776d1f33ccc5bfef72c74c0af4234
            )
        );
        vk.gamma_abc[38] = Pairing.G1Point(
            uint256(
                0x27fb9d887f61c99929e6987f800fe181fd0588e831feea8d42eba3160eee9af3
            ),
            uint256(
                0x2b512ff06c91036c7ac8b14f55da85d4b9ce5d95dcb0ac9d9d6d2c99a5e4a97c
            )
        );
        vk.gamma_abc[39] = Pairing.G1Point(
            uint256(
                0x18d62f9a0999fd719343ad7a0d41ba89940bb2d0851c505691ae9b1a5bfa392a
            ),
            uint256(
                0x033c2bbfec97607f4c9264ad82d443f1d50eae76cfcca853e9756da9a3b9a8b6
            )
        );
        vk.gamma_abc[40] = Pairing.G1Point(
            uint256(
                0x0d167e3fb1e219c06fa780bc6988b1b0942ef1cc442709d9ee62b0cefdd3aab2
            ),
            uint256(
                0x0dae7488d5567675d694d8b7d1be31ed554407d4ab94613b197d46b99846a67d
            )
        );
        vk.gamma_abc[41] = Pairing.G1Point(
            uint256(
                0x28324e83780132a315e2c67ce90ba7395e46bb629f3038170644fad88b90a1b7
            ),
            uint256(
                0x00d1f3ff7e2f00e1bb769720d1d1ec5ed1aa0d03ee5130975b588070b5248644
            )
        );
        vk.gamma_abc[42] = Pairing.G1Point(
            uint256(
                0x2e999c370be5b916e58811710b8c61b991055e115f4da5615a1f984c00730e41
            ),
            uint256(
                0x2cdaa578e1be8a29495e7d4294fc94696de328f3a8e5c6ba4eedf1a047406c35
            )
        );
        vk.gamma_abc[43] = Pairing.G1Point(
            uint256(
                0x17863e893f8b63b45fdf5c717d0d941064caca04a88cf1f358792e66a6e9f1d5
            ),
            uint256(
                0x09b094b157a45e0eca5d7f66835ccf9cd88d32cc7216f44e4d3c00c192324119
            )
        );
        vk.gamma_abc[44] = Pairing.G1Point(
            uint256(
                0x1d6d52954800654010658fc9dca8419b097416967f84c5f35667809a480237e2
            ),
            uint256(
                0x17702c2844950daef057ccd138dd686693ef956d09710f100adbc7ebafbeb786
            )
        );
        vk.gamma_abc[45] = Pairing.G1Point(
            uint256(
                0x0faf477ee8754ea9fa172558332397bd92df94e51a1818fbc2f60c28ad654faf
            ),
            uint256(
                0x277494d79f9f2eecf2aaf4fc2ba992ab0f481cab5707148e359ea692e153b007
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
