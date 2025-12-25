import style from './Home.module.css'
function Home() {
    return ( 
        <div className={style.container}>
            <h3>Цей магазин належить програмісту на фрілансі.</h3>

            <ul>
                <h4>Тому:</h4>
                <li>1. магазин працює коли хоче</li>
                <li>2. товари надсилає швидко</li>
                <li>3. на запитання відповідає коли висипається</li>
            </ul>
        </div>
     );
}

export default Home;