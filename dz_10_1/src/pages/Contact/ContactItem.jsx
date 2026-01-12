import style from './ContactItem.module.css'

function ContactItem({ user }) {

    return (
        <div className={style.user}>
            <img src={user.picture.large} alt="User" />
            <h3>{user.name.first} {user.name.last}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Country:</strong> {user.location.country}</p>
        </div>
    );
}

export default ContactItem;


