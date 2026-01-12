import { useTheme } from "../hooks/useTheme";

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button onClick={toggleTheme}>
            Тема: {theme}
        </button>
    )
}

export default ThemeToggle;