import { useQuery, init } from "@airstack/airstack-react";
import { useWeb3 } from "../hooks/useWeb3";

init("191d3435a21af47acacf2b2e6e7c867c8");

export const Chat = () => {
    const { account } = useWeb3();
    const { data, loading, error } = useQuery(`query MyQuery {
        XMTPs(
          input: {
            blockchain: ALL
            filter: { owner: { _eq: "${account}" } }
          }
        ) {
          XMTP {
            isXMTPEnabled
          }
        }
      }`);
    console.log(data, loading, error);
    return <h1></h1>;
};
