<a name="DPI"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/r4reetik/zk-rizz">
    <img src="client/public/logo.png" alt="Logo" height="80" style="border-radius: 16px;">
  </a>

  <p align="center">
    zkRizz - love at first proof 😉
    <br />
    <br />
    <a href="#">Live 🟢</a>
    |
    <a href="https://youtu.be/kym4XXhxJOQ">View Demo 🎬</a>
    |
    <a href="#screenshots">Screenshots 📸</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

# Table of Contents

  <ol>
    <li><a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#road-map">Road Map</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a>
    </li>
  </ol>

<!-- ABOUT THE PROJECT -->

</br>

# About The Project

The promise of zk-Rizz, the web3 dating platform that uses zero knowledge proofs to verify identity and match users. Unlike other dating apps that rely on superficial swipes and filters, zk-Rizz curates profiles based on shared interests and compatibility, so you can connect with someone who truly understands you. And you don’t have to worry about your privacy, because zk-Rizz never reveals your personal information or preferences to anyone. zk-Rizz is more than just a dating app, it’s a movement to change the way we date online. Join us today and discover the power of zero knowledge, infinite love.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

# Screenshots

<p float="left">
  <img src="images/ss-1.jpg" width="32%" />
  <img src="images/ss-2.jpg" width="32%" /> 
  <img src="images/ss-3.jpg" width="32%" />
  </br>
  <img src="images/ss-4.jpg" width="32%" />
  <img src="images/ss-5.jpg" width="32%" />
  <img src="images/ss-6.jpg" width="32%" />
</p>

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

<!-- Build Technologies -->

# Built With

-   [![React][react.js]][react-url]
-   [![Push Protocol][push]][push-protocol-url]
-   [![Covalent][covalent]][covalent-url]

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

# Installation

For both app and backend environment :

1. yarn

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

# Usage

![Architecture Diagram][architecture]

DPI UX is implemented as a web app which can be used to send and receive payments across chains.As a payments interface it is non-custodial and the user is in full control of their assets.Transfers are the key feature of the app and it is powered by Connext to enable cross chain transfers.Push protocol is used to enable reliable transaction notification.Contracts are deployed on every EVM based chains and the user can deploy smart wallets on any of the supported chains.
The user can :

1. Create a smart wallet at deterministic address.
2. Fund the smart wallet with any supported token.
3. Send and receive payments across chains via ENS or public addresses.
4. Use QR code to send and receive payments.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

<!-- ROADMAP -->

# Road Map

-   [x] Designed and implemented smart wallet and factory contracts
-   [x] Added ECDSA verification for smart wallet
-   [x] Designed and implemented DPI UX
-   [x] Adder support for ERC20 tokens transfer and cross chain transfers
-   [x] Added support for qr scanning

Features proposed for future :

-   [ ] Add support for generating populated data for all kinds of transactions on UI
-   [ ] Add EDDSA signature verification in smart wallets
-   [ ] Add compatibility support for EIP4337

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

# Acknowledgments

This repo is a part of the project DPI (Decentralized Payment Interface) which is a part of the hackathon hosted by ETHIndia and Devfolio.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[connext]: https://img.shields.io/badge/-Connext-green
[connext-url]: https://www.connext.network
[push-protocol-url]: https://push.org
[push]: https://img.shields.io/badge/-Push-yellow
[covalent-url]: https://www.covalenthq.com
[covalent]: https://img.shields.io/badge/-Covalent-blue
[architecture]: images/Architecture.png
