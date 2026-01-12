import { useEffect, useState } from "react";
import ContactItem from "./ContactItem";

function ContactList() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("https://randomuser.me/api/")
                if (!res.ok) {
                    throw new Error("Помилка отримати дані юзера.");
                }
                const data = await res.json()
                setUser(data.results[0])
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    if (loading) return <p>Loading contact...</p>
    if (error) return <p>Error: {error}</p>

    return <ContactItem user={user} />;
}

export default ContactList;