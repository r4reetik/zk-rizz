import { init } from "@airstack/airstack-react";
import { useChat } from "../hooks/useChat";

init(import.meta.env.VITE_AIR_STACK);

export const Chat = () => {
    const { send, chats } = useChat();

    return (
        <div>
            <h1>Chat</h1>
            <div>Send</div>
            {chats &&
                chats.map((chat) => {
                    return (
                        <div>
                            <p> from: {chat.from}</p>
                            <p> msg: {chat.messages}</p>
                        </div>
                    );
                })}
        </div>
    );
};
