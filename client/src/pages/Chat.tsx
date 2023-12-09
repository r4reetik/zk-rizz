import { useQuery, init } from "@airstack/airstack-react";
import { useWeb3 } from "../hooks/useWeb3";
import { Client } from "@xmtp/xmtp-js";

init(import.meta.env.VITE_AIR_STACK);

export const Chat = () => {
    const { account, provider } = useWeb3();
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

    const sendMsg = async () => {
        if (!provider) return;
        const xmtp = await Client.create(await provider.getSigner(), {
            env: "dev",
        });
        const conversation = await xmtp.conversations.newConversation(
            "0x3F11b27F323b62B159D2642964fa27C46C841897"
        );
        const messages = await conversation.messages();
        await conversation.send("gm");
    };

    return <h1></h1>;
};
