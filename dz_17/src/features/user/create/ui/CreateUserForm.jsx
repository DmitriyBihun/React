import { useSelector } from 'react-redux'
import { useState } from 'react'
import { selectAuthUser } from '@/features/auth'
import { roles } from '@/shared/config/roles'

export function CreateUserForm() {
    const user = useSelector(selectAuthUser)

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'client',
    })

    if (!user || user.role !== roles.admin) return null

    const onSubmit = (e) => {
        e.preventDefault()

        console.log('Create user:', form)

        alert(
            'Функціонал створення користувачів підготовлено.\n' +
            'Backend не підтримує POST /api/users.'
        )

        setForm({
            name: '',
            email: '',
            password: '',
            role: 'client',
        })
    }

    return (
        <form onSubmit={onSubmit} style={{ marginBottom: 20 }}>
            <h3>Додати користувача</h3>

            <input
                placeholder="Імʼя"
                value={form.name}
                onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                }
                required
            />

            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
                required
            />

            <input
                placeholder="Password"
                type='password'
                value={form.password}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
                required
            />

            <select
                value={form.role}
                onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                }
            >
                <option value="client">client</option>
                <option value="manager">manager</option>
                <option value="admin">admin</option>
            </select>

            <button type="submit">Створити</button>
        </form>
    )
}
