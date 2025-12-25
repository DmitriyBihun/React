import style from './PaymentRules.module.css'

function PaymentRules() {
    return ( 
        <div className={style.container}>
            <ul>
                <li>1. При отриманні</li>
                <li>2. Переказ на картку</li>
                <li>3. Записати у зошит</li>
            </ul>
        </div>
     );
}

export default PaymentRules;