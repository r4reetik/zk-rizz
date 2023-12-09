import React, { createContext, useEffect, useState } from "react";
import { useWeb3 } from "./useWeb3";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

export type ChatMsg = {
    from: string;
    messages: string[];
};

export const ChatContext = createContext<{
    chats: ChatMsg[];
    send: (to: string, message: string) => Promise<void>;
}>({
    chats: [],
    send: async (to: string, message: string) => {},
});

export const useChat = () => {
    return React.useContext(ChatContext);
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [chats, setChats] = useState<ChatMsg[]>([]);

    const [userAlice, setUserAlice] = useState<PushAPI>();
    const { provider, account } = useWeb3();

    useEffect(() => {
        if (!provider) return;
        PushAPI.initialize(provider.getSigner() as any, {
            env: CONSTANTS.ENV.STAGING,
        }).then((api) => {
            setUserAlice(api);
        });
    }, [provider]);

    useEffect(() => {
        if (!userAlice || !account) return;
        const fetchAllChats = async () => {
            const requests = await userAlice.chat.list(
                CONSTANTS.CHAT.LIST_TYPE.REQUESTS
            );
            for (const request of requests) {
                await userAlice.chat.accept(request.msg.fromDID);
            }
            const chats = await userAlice.chat.list("CHATS");

            // if it is the same user, combine the messages
            let chatsFromPush: Record<
                string,
                {
                    from: string;
                    messages: string[];
                }
            > = {};

            for (const chat of chats) {
                const requesterAddress = chat.msg.fromDID.slice(7);
                const history = await userAlice.chat.history(requesterAddress);
                for (const msg of history) {
                    const requesterMessage = msg.messageObj;
                    const msgs = (requesterMessage as any).content as any;

                    if (chatsFromPush[requesterAddress]) {
                        chatsFromPush[requesterAddress] = {
                            from: requesterAddress,
                            messages: [
                                ...(chatsFromPush[requesterAddress]
                                    .messages as string[]),
                                msgs,
                            ],
                        };
                    } else {
                        chatsFromPush[requesterAddress] = {
                            from: requesterAddress,
                            messages: [msgs],
                        };
                    }
                }
                // if (
                //     account.toLowerCase() ===
                //     requesterAddress.toLocaleLowerCase()
                // ) {
                //     continue;
                // }
                // const requesterMessage = chat.msg.messageObj;
                // const msg = (requesterMessage as any).content as any;

                // if (chatsFromPush[requesterAddress]) {
                //     chatsFromPush[requesterAddress] = {
                //         from: requesterAddress,
                //         messages: [
                //             ...(chatsFromPush[requesterAddress]
                //                 .messages as string[]),
                //             msg,
                //         ],
                //     };
                // } else {
                //     chatsFromPush[requesterAddress] = {
                //         from: requesterAddress,
                //         messages: [msg],
                //     };
                // }
            }
            setChats(Object.values(chatsFromPush));
        };
        const id = setInterval(fetchAllChats, 2000);
        return () => clearInterval(id);
    }, [userAlice, account]);

    const send = async (to: string, message: string) => {
        if (!provider || !userAlice) return;

        await userAlice.chat.send(to, {
            content: message,
            type: "Text",
        });
    };

    return (
        <ChatContext.Provider
            value={{
                chats,
                send,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
