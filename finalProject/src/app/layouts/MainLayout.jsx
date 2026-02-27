import { Outlet } from "react-router-dom";
import Header from "../../widgets/Header/Header";
import Footer from "../../widgets/Footer/Footer";
import style from './MainLayout.module.css'

function MainLayout() {
    return (
        <div className={style.layout} >
        <>
            <header className={style.header}>
                <Header />
            </header>
            <main className={style.main}>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
        </div>
    );
}

export default MainLayout;