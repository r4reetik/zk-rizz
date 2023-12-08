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
                0x1ca6f5c4bb399577303825cdfc73ef1915ccdbbdc85e4cd085263c97d10e4cbe
            ),
            uint256(
                0x18d3930ebb9651bdfce8bb69dedb1c841c2ad252c3832687258c366f8de2a18e
            )
        );
        vk.beta = Pairing.G2Point(
            [
                uint256(
                    0x2d0467dfb4f4ea6eb27989600b71647d3d4bd22a1f663293bbac7b52f59a2998
                ),
                uint256(
                    0x0c1b1e6a1da5285593f26a298c3553f283a009106867643402b9398220f1009b
                )
            ],
            [
                uint256(
                    0x03051dfff46772f604a595512d32c0fcd013b3774cb2f21d9be5783bfdfbf0d2
                ),
                uint256(
                    0x1049a1df0f6129fc6ad3a2078011e3c8eaa4120f5a327a2876df65fb3715f516
                )
            ]
        );
        vk.gamma = Pairing.G2Point(
            [
                uint256(
                    0x27556c7f809016060fb18be9c1b72ad01aa1c023f7a60cd7d762ccd988ef2414
                ),
                uint256(
                    0x195ff8f16a1dbb513b7ad135501af9b1ef210b57bcfc38f3bad8c44ac7122759
                )
            ],
            [
                uint256(
                    0x1027e0486f2ccb812285f37b1a063745461b0238715406a9ed84ca2f72cd0458
                ),
                uint256(
                    0x265fc5315392c33d2f0951f674211d2664f6b3d8e5728ee6c87f3ed5a477c431
                )
            ]
        );
        vk.delta = Pairing.G2Point(
            [
                uint256(
                    0x0451208f3f6bdaf8e75ec2118a20485d599c4a112a09a01fd3b683a6c4f3c77b
                ),
                uint256(
                    0x2129c1dcd599d94772cfe480998f9180975619c0b218f0a5b0e94b2bc1ed9320
                )
            ],
            [
                uint256(
                    0x1e151ed8342046818dc297779e8befaac19d3a287e20d7afb97cfaa804bf2e41
                ),
                uint256(
                    0x1e55abddb8623ae041da173314eb9fdc221a6b63916223d6ae52b06c7f9ba241
                )
            ]
        );
        vk.gamma_abc = new Pairing.G1Point[](46);
        vk.gamma_abc[0] = Pairing.G1Point(
            uint256(
                0x1ae738700eb2c80112ea2bc537051aa90e36cb93f278a3d0f51c3dc2aa71fef4
            ),
            uint256(
                0x2bbe6f8322bf233980d667438329effe3522fee59504820d3d40430cfdfd60ec
            )
        );
        vk.gamma_abc[1] = Pairing.G1Point(
            uint256(
                0x165c312f186f19649a8cdc00767622468a4aebe10420d88dd9a3bea8ed1c7c6f
            ),
            uint256(
                0x2e7ebbef13945c364d1b2f87a62784f1a044b29e9e8ffda903060af201d7e6d5
            )
        );
        vk.gamma_abc[2] = Pairing.G1Point(
            uint256(
                0x12eb399a00b2d92bf8eb3e29f8b869fdbfd9cdece378617c15975c46fb1468a7
            ),
            uint256(
                0x1a8cd3b969f58062175b0e71115f6c831d99ea41f16890623dca70f9b3043004
            )
        );
        vk.gamma_abc[3] = Pairing.G1Point(
            uint256(
                0x09c8f613be59774ea142386011fec692f11c2e7c0f31552af2367298f9ecff9b
            ),
            uint256(
                0x004a0cc8b17373036b5be04389b7c5265348e336b4c49155b90de78c467f435f
            )
        );
        vk.gamma_abc[4] = Pairing.G1Point(
            uint256(
                0x048ff62b1e1c7f748f27f52abf1e7fd2f1ea811139948e51f2c340d05c55401e
            ),
            uint256(
                0x265e89326af65f17b32689f6b4a911a0bef114bc9e82c4e27e2d4366074256c5
            )
        );
        vk.gamma_abc[5] = Pairing.G1Point(
            uint256(
                0x260c0575d2f885027c20357eb24c629f02e8c6f6e7ac2946cdb9adf049b44da6
            ),
            uint256(
                0x28459ba6101e9b5831ac484991fa14c4614028b92d183a90e8e89bb9c0bd844d
            )
        );
        vk.gamma_abc[6] = Pairing.G1Point(
            uint256(
                0x13757118f6d74a124d0d6914d0ce2dfd23884ba557a11aef3660ce1236643cf6
            ),
            uint256(
                0x0a25260b0628fbfe7040bb026aca30978ebbbeff4ca86881a19d106799ddfbb4
            )
        );
        vk.gamma_abc[7] = Pairing.G1Point(
            uint256(
                0x1d3b22c917fe8aaa803c45fe30e6860581c16f6f8602beea1b4c6cb2c9e509d0
            ),
            uint256(
                0x28ab658a70302d01b12bc292e8de5a2d9d20d770ed7b4bef2ae1e4f59b2419db
            )
        );
        vk.gamma_abc[8] = Pairing.G1Point(
            uint256(
                0x0d7baec60d9a00414f55025988e3a8e04b460ea501133c4c1893a75010543625
            ),
            uint256(
                0x11f19fba2938363ef9a57d7b224ca2699cca3b8e4feff41a12473eda1f42730b
            )
        );
        vk.gamma_abc[9] = Pairing.G1Point(
            uint256(
                0x0c2a8781678bc9ed0fa5e1d2fae68b47d38c242ab6cef9c24b0b93a5eb4c813b
            ),
            uint256(
                0x12d93b8bf9789eedc563009baeeb44f1403b0bc9d26970d6e794492e92ef24bb
            )
        );
        vk.gamma_abc[10] = Pairing.G1Point(
            uint256(
                0x0495e87ccb264abf8ae121a229a1ba38accd67307025f194ce1f6097466c4f48
            ),
            uint256(
                0x1b3a49052445ab37e4a118f9c765dbc69d5ccde4c4fc1be8c63af5b229f6675d
            )
        );
        vk.gamma_abc[11] = Pairing.G1Point(
            uint256(
                0x136ddf7fa90b353b0048fabc19076ab80a06f2672c6459313f292d2e7b741282
            ),
            uint256(
                0x0054b1bc5dc598d7a835da78060ebda0a7f834f6e5ae5e07c80ff6d90bf58cda
            )
        );
        vk.gamma_abc[12] = Pairing.G1Point(
            uint256(
                0x2eb78911401a71bc4b81d120f4e9d4febf05e6188af27f36efb5a6fbad273c2a
            ),
            uint256(
                0x2b4fd0e2eae90516ef4de6db6c4b704e6a71d2f0201418e964e87b84d3754516
            )
        );
        vk.gamma_abc[13] = Pairing.G1Point(
            uint256(
                0x252e1ff4c3e7d64c9c5f4b20fd2e48eec8b437826b1c906768920c7555eb00b8
            ),
            uint256(
                0x28bc109fc608ee1c3f9ac7a885e528a71eb40fbd5d4dd4d002c77c606cd12408
            )
        );
        vk.gamma_abc[14] = Pairing.G1Point(
            uint256(
                0x2593d3c8502478d157617aad649b7a948179398bff4edd9fdcacf9ca90854eea
            ),
            uint256(
                0x032f52ab03caca5ccb28de448c387c067a70eebbcb25e91ee3244957a21e21ff
            )
        );
        vk.gamma_abc[15] = Pairing.G1Point(
            uint256(
                0x0dd3f868e73f716c860c51a7721e8c9d49da9647ae84b79af37b99925549aa72
            ),
            uint256(
                0x15bbdc5add9ae2fa822859de171c8f33598366437e18788b66951c1418c55012
            )
        );
        vk.gamma_abc[16] = Pairing.G1Point(
            uint256(
                0x1a6898d0e21d7053d62448d9131df8b540e625896e191aa76ded6c36880b18d5
            ),
            uint256(
                0x17fc3fe348a23a6f64dc788762592c84c89fb08ce084b24998bcf1ec1fbf1cec
            )
        );
        vk.gamma_abc[17] = Pairing.G1Point(
            uint256(
                0x0ae497b916c469d85cb245d1f6f14be60c2b2cacebf879628446935d949b557d
            ),
            uint256(
                0x0267ddaf970df7d81aff07fd0a7963d8441838f9a203fc623d47c83fffb33e53
            )
        );
        vk.gamma_abc[18] = Pairing.G1Point(
            uint256(
                0x0d740421de1e4078b7b7d07caaa09a85042ba3e89742c7c030559b1b4cddd857
            ),
            uint256(
                0x29dc0696f1ec6f287014ebe283d4421b8dacdd35be3cfb6e7979090c1b988035
            )
        );
        vk.gamma_abc[19] = Pairing.G1Point(
            uint256(
                0x1eace41aa44e8744d74e72379fd166660f9a4bb51551346d4baa83893ecfad39
            ),
            uint256(
                0x1a42a8b3d69eee3d11ea302585a6a0aea88a705ceb1d9f173ce77ba707952bbe
            )
        );
        vk.gamma_abc[20] = Pairing.G1Point(
            uint256(
                0x2c3dead840038dfee3079897fa78c6cb4de31741c89f68d52c3147bc4f132dee
            ),
            uint256(
                0x05c304c0b6e1f420f27c0a8ffcaf1f1d0611eabebb27810a1a8e73a22e708882
            )
        );
        vk.gamma_abc[21] = Pairing.G1Point(
            uint256(
                0x187caedf8fe73e018a774bc198e19f91e6bd38edf8a03935396bebfa76d8dace
            ),
            uint256(
                0x2d478941e97cf776df29067b212e8d9a647c785fd8ce39749996f12e6737afb8
            )
        );
        vk.gamma_abc[22] = Pairing.G1Point(
            uint256(
                0x21b78e08e7b8415c3d87cf3c69a12cfa4fcacd7dabec27b7f6bea36201671389
            ),
            uint256(
                0x27fd94c4e0d89a1c3a9cf47ab6e81cff0b130e12c8b3e0c85890b2eaf8aaf4e2
            )
        );
        vk.gamma_abc[23] = Pairing.G1Point(
            uint256(
                0x22bbbad2e632ba8be242009e30a1e4d478723e09c34af5fd22a627fc6612b882
            ),
            uint256(
                0x07230421471b79ccc840391d88b9ae7fe3322b1fc7c185b6e93fa33a5ecddc93
            )
        );
        vk.gamma_abc[24] = Pairing.G1Point(
            uint256(
                0x06e57dbb3326aa9421813170bdfc59dc39d411b2ed62762dacb012608f4781bc
            ),
            uint256(
                0x259924bcc82de41afd47d92c769f9e5aa8467e3e189cdc8f541e690cd3054974
            )
        );
        vk.gamma_abc[25] = Pairing.G1Point(
            uint256(
                0x0061f6d9fc849d35e3ecabb8976a93430ead3d79a122590b6ca7c4b991bb4195
            ),
            uint256(
                0x25ecb72c5f5cf5c01c6de10c4e98130706e9bd6a651b04a182295b29e4633a7b
            )
        );
        vk.gamma_abc[26] = Pairing.G1Point(
            uint256(
                0x2d93c61a03629220513aabe975313d96186f062b127fafe9c0c33537b153677e
            ),
            uint256(
                0x162ffa774478aada1d1dc67ce8a19f837da97d24c7babfaaf9d9447bcacfe696
            )
        );
        vk.gamma_abc[27] = Pairing.G1Point(
            uint256(
                0x244c7675317a2f1d5458795c11f7b2b795226eba3ee03dbbcbd8b9fffa55a743
            ),
            uint256(
                0x14f9587ef3aef3ee199e3fb17c92b455f019588719283049c293a2d2c1e8ac23
            )
        );
        vk.gamma_abc[28] = Pairing.G1Point(
            uint256(
                0x23061395ad4dcdde466e05dc39bbcbd3852ce18588eb771af26c176326298483
            ),
            uint256(
                0x04c3a8d7230a5bb697d76d2f7a394f95463497e9b1c98a7e461be76f85f4282c
            )
        );
        vk.gamma_abc[29] = Pairing.G1Point(
            uint256(
                0x2b53a6412859d1a076a2e9f0d7b7082954750b8a00e67b66436d145f53c52922
            ),
            uint256(
                0x23e81bc7093f02f6c80eb39960667fefc34b302c49cc7cc89de36c13b8bcab6f
            )
        );
        vk.gamma_abc[30] = Pairing.G1Point(
            uint256(
                0x06a52e00bae9d15d9cc09b725738e4e5f53fe1031ea759935136e74061d84df4
            ),
            uint256(
                0x0417d627f6eca6ed9c54a9aed0b0bf5713504b9cf193733f54bcc42d8be83995
            )
        );
        vk.gamma_abc[31] = Pairing.G1Point(
            uint256(
                0x064e77558e62e159f4089cb88748af4c5b2209dd8c42cc4de8cf5a03641718e3
            ),
            uint256(
                0x09345afd0ca0a90d09025f1af34e86d327c3540d7a3e7b1d3086d06d16423826
            )
        );
        vk.gamma_abc[32] = Pairing.G1Point(
            uint256(
                0x29885ded348435f1deeccea76aa41081bffb7b3880f9f90d85da045b5e9f29fb
            ),
            uint256(
                0x28b33beb16e255d1448879f91fad9807515a2ed77bbdd812649255f6b73f349f
            )
        );
        vk.gamma_abc[33] = Pairing.G1Point(
            uint256(
                0x17e806f98b26c6a48aed7b10066f0f4e6e3f1d811ecbd5a5003af0ccd4e6b0c1
            ),
            uint256(
                0x2cc0ec1391debf4dcde08c4317de47688a807716e85d45edb6c431121604be7e
            )
        );
        vk.gamma_abc[34] = Pairing.G1Point(
            uint256(
                0x0ab51f5da0e4da3aa24d1bf4840d99d80ca24b842fb5d52abe6134389c8c8e30
            ),
            uint256(
                0x2f7ccc568c45e5182434e0c93f6521d8688449d9ee5d9061fd27ba1ca1800d34
            )
        );
        vk.gamma_abc[35] = Pairing.G1Point(
            uint256(
                0x0d580041b49c1a24631088464b7784717b650e8489194e2403523a7c5007b2a3
            ),
            uint256(
                0x2dd99bdecae82566565acc32f4b2fd911bbddb77eaf5f5d6d19a446f0d01c607
            )
        );
        vk.gamma_abc[36] = Pairing.G1Point(
            uint256(
                0x0d5873b17cbca6ffac7d0b5eeaf3094452f4b25fc6285e56f948ab26e41b1616
            ),
            uint256(
                0x21cc801dc193d35f246c56adcc9ae26e9b071eb51a7102abdac90ead48028da7
            )
        );
        vk.gamma_abc[37] = Pairing.G1Point(
            uint256(
                0x2055649c5d0fda3a026082330ffacc869825f5d5cfb2f925f2495f0e78b22631
            ),
            uint256(
                0x11d21adc029d9ce0b83d60cbbb257c64253ecdf39e2affbd19d42537459e3495
            )
        );
        vk.gamma_abc[38] = Pairing.G1Point(
            uint256(
                0x23dbe99599fb8ea988363d22a76d689e2383972a84d582402a041648866c31fd
            ),
            uint256(
                0x2bbe6dcc4cf80db001aaa4f40676ec05ce8d29af13669fcce46228a7abf7e293
            )
        );
        vk.gamma_abc[39] = Pairing.G1Point(
            uint256(
                0x1211649646f6c654d24fb2f2cdafceee7ae6b42061993d457c5647c610aac5b8
            ),
            uint256(
                0x075290cb0372f4bc03a39fb32f1a41c7568758caca78c0857e2128a8266604ed
            )
        );
        vk.gamma_abc[40] = Pairing.G1Point(
            uint256(
                0x18ee3ca8ce882bdf1ce00c09a5f14b9a1007eecfa7cef8d1bc44f802eac1637b
            ),
            uint256(
                0x2796ef5d57950349c38f5ad751f2ae3d92a377b26c77d6c24b44eac28e95784c
            )
        );
        vk.gamma_abc[41] = Pairing.G1Point(
            uint256(
                0x03aa0efe12562530141bd65acc94811ce47dc1f7fda632f7fa5883c5b9bfb295
            ),
            uint256(
                0x288d7b0def2a182bbe3a85d2d7c4656d44bd33f17783ee38b5972aa83c1b2325
            )
        );
        vk.gamma_abc[42] = Pairing.G1Point(
            uint256(
                0x0fa086589d691ef45274c86cb538abe1cb9273ea6216b466f2191cb9902537ad
            ),
            uint256(
                0x1cafc32be207cfa3538483656aa13698791152fc4514dd58b2bc61c75a29cdfe
            )
        );
        vk.gamma_abc[43] = Pairing.G1Point(
            uint256(
                0x152e12c789256d4c4cd7b9fa5302f3693698e4af3700b2d1d8ad340f5a45d59c
            ),
            uint256(
                0x2ef63065fdd704d1f02e1e63ccdcf4b5adb7cdc92cce69b55d06cba6658e6f24
            )
        );
        vk.gamma_abc[44] = Pairing.G1Point(
            uint256(
                0x289cb6f89ce1a113fda13a3d904cc83b183d744ad1b43e0aa784c77438be69d3
            ),
            uint256(
                0x2f9e8bd14dd949b74a247472c32e4f8e37da27750775f07a1673c229b1b7dc10
            )
        );
        vk.gamma_abc[45] = Pairing.G1Point(
            uint256(
                0x02eec0f1b648f10acec591cc4afafee93fde9f3abbd68bcfd9068ee4930e3a8a
            ),
            uint256(
                0x2983d0855b907dada45349c5b17f555a3aacf84010ae4f932a914264436b5b37
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
