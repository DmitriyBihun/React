import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useGetTopCoinsQuery } from '../../../entities/coin/api/coinGeckoApi';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../shared/config/firebase';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import style from './Profile.module.css'

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    // Отримую актуал. дані ціни
    const { data: coins, isLoading: coinsLoading, error: coinsError } = useGetTopCoinsQuery();

    // Загружаю дані юзера з Firestore
    useEffect(() => {
        const loadUserData = async () => {
            if (user?.uid) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    }
                } catch (error) {
                    console.error('Error loading user data:', error);
                }
            }
            setLoading(false);
        };

        loadUserData();
    }, [user]);

    if (loading || coinsLoading) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px',
                fontSize: '1.2rem',
                color: '#666'
            }}>
                {t('common.loading')}
            </div>
        );
    }

    if (!userData) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#dc2626'
            }}>
                {t('messages.error.errorLoadingUserData')}
            </div>
        );
    }

    // Створюю мапу цін ТІЛЬКИ якщо coins є
    const pricesMap = {};
    if (coins && Array.isArray(coins)) {
        coins.forEach(coin => {
            if (coin && coin.id) {
                pricesMap[coin.id] = coin.current_price || 0;
            }
        });
    }

    // Загальна варт. портфеля
    const calculateTotalPortfolioValue = () => {
        let total = 0;
        if (userData?.portfolio && typeof userData.portfolio === 'object') {
            Object.entries(userData.portfolio).forEach(([coinId, coinData]) => {
                const currentPrice = pricesMap[coinId] || 0;
                const amount = coinData?.amount || 0;
                total += amount * currentPrice;
            });
        }
        return total;
    };

    const totalPortfolioValue = calculateTotalPortfolioValue();
    const totalCapital = (userData?.balance || 0) + totalPortfolioValue;

    // Перевірію чи є монета в портфелі
    const hasPortfolio = userData?.portfolio &&
        typeof userData.portfolio === 'object' &&
        Object.keys(userData.portfolio).length > 0;

    return (
        <div className={style.profileContainer}>
            <h1>{t('profile.title')}</h1>
            <div className={style.profileContent}>
                <div className={style.userInfo}>
                    <h2>{t('profile.accountInfo')}:</h2>
                    <p><strong>{t('profile.email')}:</strong> {user?.email || 'Не указан'}</p>
                    <p><strong>{t('profile.balance')}:</strong> ${(userData?.balance || 0).toLocaleString()}</p>
                    <p><strong>{t('profile.portfolioValue')}:</strong> ${totalPortfolioValue.toLocaleString()}</p>
                    <p><strong>{t('profile.totalCapital')}:</strong> ${totalCapital.toLocaleString()}</p>
                </div>

                <div className={style.portfolioInfo}>
                    <h2>{t('profile.myPortfolio')}:</h2>

                    {hasPortfolio ? (
                        <div className={style.portfolioCoins}>
                            {Object.entries(userData.portfolio).map(([coinId, coinData]) => {
                                const currentPrice = pricesMap[coinId] || 0;
                                const amount = coinData?.amount || 0;
                                const totalValue = amount * currentPrice;
                                const avgPrice = coinData?.avgPrice || 0;
                                const totalCost = coinData?.totalCost || (amount * avgPrice);
                                const profitLoss = totalValue - totalCost;
                                const profitLossPercent = totalCost > 0
                                    ? ((profitLoss / totalCost) * 100).toFixed(2)
                                    : 0;

                                return (
                                    <div key={coinId} className={style.portfolioCoin}>
                                        <div>
                                            <h3>{coinId.toUpperCase()}</h3>
                                            <p className={style.countCoin}>
                                                {t('profile.amount')}: {amount.toFixed(8)}
                                            </p>
                                            {avgPrice > 0 && (
                                                <p className={style.avgPriceCoin}>
                                                    {t('profile.avgPrice')}: ${avgPrice.toFixed(2)}
                                                </p>
                                            )}
                                        </div>

                                        <div className={style.coinInf}>
                                            <p>
                                                ${totalValue.toLocaleString()}
                                            </p>
                                            <p style={{
                                                color: profitLoss >= 0 ? '#10b981' : '#ef4444',
                                                fontWeight: '500'
                                            }}>
                                                {profitLoss >= 0 ? '+' : ''}{profitLoss.toFixed(2)} USD
                                                ({profitLoss >= 0 ? '+' : ''}{profitLossPercent}%)
                                            </p>
                                            <p>
                                                {t('profile.currentPrice')}: ${currentPrice.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={style.noCoinBox}>
                            <p>{t('profile.noCoins')}</p>
                            <Link to="/dashboard" className={style.goBuyLink}>
                                {t('profile.goToDashboard')}
                            </Link>
                        </div>
                    )}

                    {/* Якщо помилка загрузки монет */}
                    {coinsError && (
                        <div className={style.errorLoadingBox}>
                            {t('messages.error.errorLoadingCoinPrices')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;