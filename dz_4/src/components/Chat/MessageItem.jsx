import clases from './MessageItem.module.css'

function MessageItem({ id, text, likes, onLike, onDislike }) {
    return (
        <div className={clases.item}>
                <div>{text}</div>
            <div className={clases.actions}>
                <div className={clases.itemLike}>Likes: {likes}</div>
                <button className={clases.buttonLike} onClick={() => onLike(id)}>Like</button>
                <button className={clases.buttonDislike} onClick={() => onDislike(id)}>Dislike</button>
            </div>
        </div>
    );
}

export default MessageItem;