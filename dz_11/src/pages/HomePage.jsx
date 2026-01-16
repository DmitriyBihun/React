import style from './HomePage.module.css'

function HomePage() {

    return (
        <div className={style.homeContainer}>
            <h1 className={style.title}>
                HomePage
            </h1>
            <p>It's just text that doesn't carry anything valuable, but acts as a stub.</p>
        </div>
        
    );
}

export default HomePage;