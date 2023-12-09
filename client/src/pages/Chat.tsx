import { useEffect, useState } from "react";
import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";
import { useWeb3 } from "../hooks/useWeb3";

export const Chat = () => {
    const [msgToSend, setMsgToSend] = useState<string>("");
    const [userAlice, setUserAlice] = useState<PushAPI>();
    const [history, setHistory] = useState<
        {
            from: string;
            msg: string;
        }[]
    >([]);
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
        const fetchChat = async () => {
            const history = await userAlice.chat.history(
                "0xe1F111bb8EA8A246b15089E963667A5CC88deEa3"
            );
            const msg: { from: string; msg: string }[] = [];
            for (const m of history) {
                msg.push({
                    from: m.fromDID.slice(7),
                    msg: (m?.messageObj as any)?.content,
                });
            }
            setHistory(msg.reverse());
        };
        const id = setInterval(() => {
            fetchChat();
        }, 2000);
        return () => {
            clearInterval(id);
        };
    }, [userAlice, account]);

    return (
        <div className="flex flex-col p-6 bg-white/30 w-full items-center rounded-2xl">
            <div className="w-full h-[500px] overflow-scroll">
                {history.length > 0 &&
                    history.map((chat) => {
                        if (chat.from === account) {
                            return (
                                <div className="flex flex-col items-end mb-2">
                                    <span className="text-sm font-bold mr-2 mb-1">
                                        You
                                    </span>
                                    <span className="text-right text-lg bg-primary/50 px-4 py-3 rounded-2xl">
                                        {chat.msg}
                                    </span>
                                </div>
                            );
                        } else {
                            return (
                                <div className="flex flex-col items-start mb-4">
                                    <span className="text-sm font-bold ml-1 mb-1">
                                        {chat.from.slice(0, 10)}...{" "}
                                    </span>
                                    <span className="text-left text-lg bg-primary/50 px-4 py-3 rounded-2xl">
                                        {chat.msg}
                                    </span>
                                </div>
                            );
                        }
                    })}
            </div>
            <div className="flex w-[80%] items-center relative">
                <input
                    className="w-full text-black px-2 py-3 bg-white/60 rounded-2xl "
                    type="text"
                    value={msgToSend}
                    onChange={(e) => setMsgToSend(e.target.value)}
                />

                <div
                    onClick={async () => {
                        if (!userAlice) return;
                        await userAlice.chat.send(
                            "0xe1F111bb8EA8A246b15089E963667A5CC88deEa3",
                            {
                                content: msgToSend,
                                type: "Text",
                            }
                        );
                    }}
                    className=" absolute right-0 rounded-r-2xl px-2 py-3 bg-primary "
                >
                    Send
                </div>
            </div>
        </div>
    );
};
