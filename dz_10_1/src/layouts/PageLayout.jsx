import { useTheme } from '../hooks/useTheme';
import './PageLayout.css'

function PageLayout({ children }) {

    const {theme} = useTheme()

    return (
        <div className={`page-layout ${theme}`}>
            {children}
        </div>
    );
}

export default PageLayout;