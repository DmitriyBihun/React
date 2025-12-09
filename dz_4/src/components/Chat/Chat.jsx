import { useState } from "react";
import MessageForm from "./MessageForm";
import MessagesList from "./MessagesList";
import clases from './Chat.module.css'

function Chat() {
    const [messages, setMessages] = useState([])

    function addMessage(text) {
        setMessages(prev => [
            ...prev, {
                id: Date.now(),
                text,
                likes: 0
            }
        ])
    }

    function likeMessage(id) {
        setMessages(prev => prev.map(m =>
            m.id === id ? { ...m, likes: m.likes + 1 } : m
        ))
    }

    function dislikeMessage(id) {
        setMessages(prev => prev.map(m =>
            m.id === id ? { ...m, likes: Math.max(0, m.likes - 1) } : m
        ))
    }

    return ( 
        <section className={clases.container}>
            <h2>Чат</h2>
            <MessageForm onAdd={addMessage} />
            <hr />
            <MessagesList messages={messages} onLike={likeMessage} onDislike={dislikeMessage} />
        </section>
     );
}

export default Chat;

