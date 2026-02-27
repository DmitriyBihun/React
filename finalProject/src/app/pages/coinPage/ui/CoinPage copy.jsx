import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../shared/config/firebase';

import { useGetCoinsByIdQuery } from '../../../../entities/coin/api/coinGeckoApi';
import { updateBalance } from '../../../../features/auth/model/authSlice';

const CoinPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { data: coin, error, isLoading } = useGetCoinsByIdQuery(id);

    const [buyAmount, setBuyAmount] = useState('');
    const [sellAmount, setSellAmount] = useState('');
    const [userBalance, setUserBalance] = useState(0);
    const [userPortfolio, setUserPortfolio] = useState({});
    const [message, setMessage] = useState({ type: '', text: '' });

    // Загружаю дані юзера
    useEffect(() => {
        const loadUserData = async () => {
            if (user?.uid) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setUserBalance(data.balance || 0);
                        setUserPortfolio(data.portfolio || {});
                    }
                } catch (error) {
                    console.error('Error loading user data:', error);
                }
            }
        };
        loadUserData();
    }, [user]);

    if (isLoading) return <div style={{ textAlign: 'center', padding: '40px' }}>Завантаження...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Ошибка загрузки данных</div>;

    const currentPrice = coin?.market_data?.current_price?.usd;
    const userCoinData = userPortfolio[id] || { amount: 0 };

    // Покупка монеты
    const handleBuy = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        const amountUSD = parseFloat(buyAmount);

        // Валидация
        if (!amountUSD || amountUSD <= 0) {
            setMessage({ type: 'error', text: 'Введите сумму больше 0' });
            return;
        }

        if (amountUSD > userBalance) {
            setMessage({ type: 'error', text: 'Недостаточно средств на балансе' });
            return;
        }

        const coinAmount = amountUSD / currentPrice;
        const newBalance = userBalance - amountUSD;

        try {
            // Получаем текущие данные пользователя
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            const currentUserData = userDoc.data();

            // Обновляем портфель
            const portfolio = { ...(currentUserData.portfolio || {}) };

            if (portfolio[id]) {
                // Если монета уже есть
                portfolio[id] = {
                    amount: (portfolio[id].amount || 0) + coinAmount,
                    avgPrice: (portfolio[id].avgPrice + currentPrice) / 2,
                    totalCost: (portfolio[id].totalCost || 0) + amountUSD
                };
            } else {
                // Если монеты нет
                portfolio[id] = {
                    amount: coinAmount,
                    avgPrice: currentPrice,
                    totalCost: amountUSD
                };
            }

            // Обновляем в Firestore
            await updateDoc(userRef, {
                balance: newBalance,
                portfolio: portfolio
            });

            // Обновляем локальное состояние
            setUserBalance(newBalance);
            setUserPortfolio(portfolio);

            // Обновляем глобальное состояние Redux
            dispatch(updateBalance(newBalance));

            setMessage({
                type: 'success',
                text: `Успешно куплено ${coinAmount.toFixed(8)} ${coin.symbol?.toUpperCase()}`
            });
            setBuyAmount('');

        } catch (error) {
            console.error('Purchase error:', error);
            setMessage({
                type: 'error',
                text: 'Ошибка при покупке: ' + (error.message || 'Неизвестная ошибка')
            });
        }
    };

    // Продажа монеты
    const handleSell = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        const amountCoin = parseFloat(sellAmount);

        if (!amountCoin || amountCoin <= 0) {
            setMessage({ type: 'error', text: 'Введите количество больше 0' });
            return;
        }

        if (amountCoin > userCoinData.amount) {
            setMessage({ type: 'error', text: `У вас только ${userCoinData.amount.toFixed(8)} ${coin.symbol?.toUpperCase()}` });
            return;
        }

        const amountUSD = amountCoin * currentPrice;
        const newBalance = userBalance + amountUSD;

        try {
            // Получаем текущие данные пользователя
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            const currentUserData = userDoc.data();

            // Обновляем портфель
            const portfolio = { ...(currentUserData.portfolio || {}) };

            if (portfolio[id]) {
                const currentAmount = portfolio[id].amount || 0;

                if (currentAmount <= amountCoin) {
                    // Продаем все
                    delete portfolio[id];
                } else {
                    // Продаем часть
                    portfolio[id] = {
                        ...portfolio[id],
                        amount: currentAmount - amountCoin,
                        totalCost: (portfolio[id].totalCost || 0) - amountUSD
                    };
                }
            }

            // Обновляем в Firestore
            await updateDoc(userRef, {
                balance: newBalance,
                portfolio: portfolio
            });

            // Обновляем локальное состояние
            setUserBalance(newBalance);
            setUserPortfolio(portfolio);

            // Обновляем глобальное состояние Redux
            dispatch(updateBalance(newBalance));

            setMessage({
                type: 'success',
                text: `Успешно продано ${amountCoin.toFixed(8)} ${coin.symbol?.toUpperCase()}`
            });
            setSellAmount('');

        } catch (error) {
            console.error('Sale error:', error);
            setMessage({
                type: 'error',
                text: 'Ошибка при продаже: ' + (error.message || 'Неизвестная ошибка')
            });
        }
    };

    const priceChangeColor = coin?.market_data?.price_change_percentage_24h > 0 ? '#10b981' : '#ef4444';
    const priceChangeIcon = coin?.market_data?.price_change_percentage_24h > 0 ? '↑' : '↓';

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                ← Назад
            </button>

            {message.text && (
                <div style={{
                    padding: '10px',
                    backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                    color: message.type === 'success' ? '#065f46' : '#991b1b',
                    borderRadius: '5px',
                    marginBottom: '20px'
                }}>
                    {message.text}
                </div>
            )}

            {coin && (
                <div style={{ display: 'grid', gap: '30px' }}>
                    {/* Информация о балансе */}
                    <div style={{
                        backgroundColor: '#f9fafb',
                        padding: '15px',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <p style={{ margin: '0', color: '#666' }}>Ваш баланс</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '5px 0 0', color: '#000' }}>
                                ${userBalance.toLocaleString()}
                            </p>
                        </div>
                        {userCoinData.amount > 0 && (
                            <div>
                                <p style={{ margin: '0', color: '#666' }}>У вас {coin.symbol?.toUpperCase()}</p>
                                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '5px 0 0' }}>
                                    {userCoinData.amount.toFixed(8)}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Заголовок с основной информацией */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <img src={coin.image?.large} alt={coin.name} style={{ width: '80px', height: '80px' }} />
                        <div>
                            <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0' }}>
                                {coin.name} ({coin.symbol?.toUpperCase()})
                            </h1>
                            <div style={{ display: 'flex', gap: '30px' }}>
                                <div>
                                    <p style={{ color: '#666', margin: '0' }}>Текущая цена</p>
                                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '5px 0 0' }}>
                                        ${currentPrice?.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p style={{ color: '#666', margin: '0' }}>Изменение за 24ч</p>
                                    <p style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        margin: '5px 0 0',
                                        color: priceChangeColor
                                    }}>
                                        {priceChangeIcon} {Math.abs(coin.market_data?.price_change_percentage_24h).toFixed(2)}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Формы покупки/продажи */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '20px'
                    }}>
                        {/* Форма покупки */}
                        <div style={{
                            padding: '20px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            backgroundColor: 'white'
                        }}>
                            <h2 style={{ margin: '0 0 20px 0', color: '#10b981' }}>Buy</h2>
                            <form onSubmit={handleBuy}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>
                                        Amount in USD:
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        step="1"
                                        value={buyAmount}
                                        onChange={(e) => setBuyAmount(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            fontSize: '1rem',
                                            border: '1px solid #ddd',
                                            borderRadius: '5px'
                                        }}
                                        placeholder="Enter amount in dollars"
                                        required
                                    />
                                </div>
                                {buyAmount && (
                                    <p style={{ margin: '10px 0', color: '#666' }}>
                                        You will receive: {(buyAmount / currentPrice).toFixed(8)} {coin.symbol?.toUpperCase()}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Buy
                                </button>
                            </form>
                        </div>

                        {/* Форма продажи */}
                        <div style={{
                            padding: '20px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            backgroundColor: 'white'
                        }}>
                            <h2 style={{ margin: '0 0 20px 0', color: '#ef4444' }}>Sell</h2>
                            <form onSubmit={handleSell}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>
                                        Amount {coin.symbol?.toUpperCase()}:
                                    </label>
                                    <input
                                        type="number"
                                        min="0.00000001"
                                        step="0.00000001"
                                        value={sellAmount}
                                        onChange={(e) => setSellAmount(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            fontSize: '1rem',
                                            border: '1px solid #ddd',
                                            borderRadius: '5px'
                                        }}
                                        placeholder={`Maximum: ${userCoinData.amount.toFixed(8)}`}
                                        required
                                    />
                                </div>
                                {sellAmount && (
                                    <p style={{ margin: '10px 0', color: '#666' }}>
                                        You will receive: ${(sellAmount * currentPrice).toLocaleString()}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Sell
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Описание монеты */}
                    {coin.description?.en && (
                        <div style={{
                            padding: '20px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            backgroundColor: 'white'
                        }}>
                            <h2 style={{ margin: '0 0 15px 0' }}>Description</h2>
                            <p style={{ lineHeight: '1.6', color: '#333' }}>
                                {coin.description.en.replace(/<[^>]*>/g, '')}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CoinPage;