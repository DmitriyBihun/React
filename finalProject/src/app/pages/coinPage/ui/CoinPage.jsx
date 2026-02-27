import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../shared/config/firebase';
import { useGetCoinsByIdQuery, useGetCoinHistoryQuery } from '../../../../entities/coin/api/coinGeckoApi';
import { updateBalance } from '../../../../features/auth/model/authSlice';
import BuyForm from './BuyForm';
import SellForm from './SellForm';
import { buyCoin, sellCoin } from '../../../../features/coin/model/tradeService';
import { useTranslation } from 'react-i18next';
import LazyPriceChart from '../../../../entities/coin/ui/LazyPriceChart'
import style from './CoinPage.module.css'

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
    const { t } = useTranslation();

    const { data: historyData, isLoading: historyLoading } = useGetCoinHistoryQuery(id);

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
    if (error) return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Помилка завантаження даних</div>;

    const currentPrice = coin?.market_data?.current_price?.usd;
    const userCoinData = userPortfolio[id] || { amount: 0 };

    // Покупка монети
    const handleBuy = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        try {
            const result = await buyCoin({
                uid: user.uid,
                coinId: id,
                amountUSD: parseFloat(buyAmount),
                currentPrice,
            });

            setUserBalance(result.newBalance);
            setUserPortfolio(result.portfolio);
            dispatch(updateBalance(result.newBalance));

            setMessage({
                type: 'success',
                text: `Successfully bought ${result.coinAmount.toFixed(8)} ${coin.symbol.toUpperCase()}`,
            });

            setBuyAmount('');
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    // Продажа монети
    const handleSell = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        try {
            const result = await sellCoin({
                uid: user.uid,
                coinId: id,
                amountCoin: parseFloat(sellAmount),
                currentPrice,
            });

            setUserBalance(result.newBalance);
            setUserPortfolio(result.portfolio);
            dispatch(updateBalance(result.newBalance));

            setMessage({
                type: 'success',
                text: `Successfully sold ${sellAmount} ${coin.symbol.toUpperCase()}`,
            });

            setSellAmount('');
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    const priceChangeColor = coin?.market_data?.price_change_percentage_24h > 0 ? '#10b981' : '#ef4444';
    const priceChangeIcon = coin?.market_data?.price_change_percentage_24h > 0 ? '↑' : '↓';

    return (
        <div className={style.coinPageContainer}>
            <button onClick={() => navigate(-1)} className={style.backButton}>
                ← {t('common.back')}
            </button>

            {message.text && (
                <div className={style.messageBox} style={{
                    backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                    color: message.type === 'success' ? '#065f46' : '#991b1b',
                }}>
                    {message.text}
                </div>
            )}

            {coin && (
                <div className={style.coinInformation}>
                    <div className={style.myBalanceBox}>
                        <div>
                            <p>{t('common.balance')}</p>
                            <p>${userBalance.toLocaleString()}</p>
                        </div>
                        {userCoinData.amount > 0 && (
                            <div>
                                <p>{t('coin.youHave')} {coin.symbol?.toUpperCase()}</p>
                                <p>{userCoinData.amount.toFixed(8)}</p>
                            </div>
                        )}
                    </div>

                    <div className={style.coinMainInformation}>
                        <img src={coin.image?.large} alt={coin.name} />
                        <div>
                            <h1>{coin.name} ({coin.symbol?.toUpperCase()})</h1>
                            <div className={style.coinMainInformationContent}>
                                <div>
                                    <p>{t('coin.currentPrice')}</p>
                                    <p>${currentPrice?.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p>{t('coin.priceChange24h')}</p>
                                    <p style={{ color: priceChangeColor }}>
                                        {priceChangeIcon} {Math.abs(coin.market_data?.price_change_percentage_24h).toFixed(2)}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.coinBuySellBox}>
                        <BuyForm
                            buyAmount={buyAmount}
                            setBuyAmount={setBuyAmount}
                            currentPrice={currentPrice}
                            symbol={coin.symbol}
                            onSubmit={handleBuy}
                        />

                        <SellForm
                            sellAmount={sellAmount}
                            setSellAmount={setSellAmount}
                            currentPrice={currentPrice}
                            symbol={coin.symbol}
                            userCoinAmount={userCoinData.amount}
                            onSubmit={handleSell}
                        />
                    </div>

                    {coin.description?.en && (
                        <div className={style.coinDescrBox}>
                            <h2>{t('coin.description')}</h2>
                            <p>{coin.description.en.replace(/<[^>]*>/g, '')}</p>
                        </div>
                    )}
                </div>
            )}

            <LazyPriceChart
                data={historyData?.prices}
                coinName={coin?.name}
                coinSymbol={coin?.symbol}
            />
        </div>
    );
};

export default CoinPage;

