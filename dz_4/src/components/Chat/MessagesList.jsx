import MessageItem from "./MessageItem";

function MessageList({ messages, onLike, onDislike }) {
    return (
        <div>

            {messages.length > 0 ? (
                messages.map(message => (
                    <MessageItem
                        key={message.id}
                        {...message}
                        onLike={onLike}
                        onDislike={onDislike}
                    />
                ))
            ) : (
                <div>Повідомлень немає</div>
            )}
        </div>
    );
}


export default MessageList;