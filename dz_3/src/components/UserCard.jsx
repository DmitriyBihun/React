function UserCard({ user }) {
    return ( 
        <div>
            <h3>{user.name}</h3>
            <p>{user.age}</p>
        </div>
     );
}

export default UserCard;