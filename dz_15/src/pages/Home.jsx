import style from './Home.module.css'

function Home() {
    return ( 
        <div className={style.container}>
            <span className={style.firstSpan}>Home</span>
            <span className={style.secondSpan}>Page</span>
        </div>
     );
}

export default Home;