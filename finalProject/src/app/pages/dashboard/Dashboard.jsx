import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useGetTopCoinsQuery } from "../../../entities/coin/api/coinGeckoApi";
import { useTranslation } from 'react-i18next';
import style from './Dashboard.module.css'

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: coins, isLoading, error } = useGetTopCoinsQuery()
    const navigate = useNavigate()
    const { t } = useTranslation();

    const filteredCoins = useMemo(() => {
        if (!coins) return [];

        return coins.filter(coin => {
            const searchLower = searchTerm.toLowerCase().trim();
            return coin.name.toLowerCase().includes(searchLower) ||
                coin.symbol.toLowerCase().includes(searchLower);
        });
    }, [coins, searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    if (isLoading) return <div>{t('dashboard.loading')}</div>
    if (error) return <div>{t('dashboard.error')}</div>

    return (
        <div className={style.dashboardContainer}>
            <h1>{t('dashboard.title')}</h1>

            <div className={style.searchContainer}>
                <input
                    type="text"
                    placeholder={t('dashboard.searchPlaceholder')}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={style.searchInput}
                />
                {searchTerm && (
                    <button
                        onClick={handleClearSearch}
                        className={style.clearButton}
                        aria-label="Очистити пошук"
                    >
                        ✕
                    </button>
                )}
            </div>

            {searchTerm && (
                <div className={style.searchResultInfo}>
                    {t('dashboard.found')}: {filteredCoins.length}
                </div>
            )}

            <div className={style.coins}>
                {filteredCoins.length > 0 ? (
                    filteredCoins.map(coin => (
                        <div key={coin.id} className={style.coin}>
                            <div className={style.coinInfo}>
                                <div className={style.coinImageBox}>
                                    <img src={coin.image} alt={coin.name} />
                                </div>
                                <div className={style.coinTitleInfo}>
                                    <h3>{coin.name}</h3>
                                    <p>({coin.symbol.toUpperCase()})</p>
                                </div>
                            </div>
                            <div className={style.coinPriceInfo}>
                                <p>${coin.current_price.toLocaleString()}</p>
                                <p style={{
                                    color: coin.price_change_percentage_24h > 0 ? '#10b981' : '#ef4444'
                                }}>
                                    {coin.price_change_percentage_24h > 0 ? '↑' : '↓'}
                                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                </p>
                            </div>
                            <button onClick={() => navigate(`/coin/${coin.id}`)}>{t('common.details')}</button>
                        </div>
                    ))
                ) : (
                    <div className={style.noResults}>
                            <p>{t('dashboard.noResults')} "{searchTerm}"</p>
                        <button onClick={handleClearSearch} className={style.resetButton}>
                            {t('dashboard.resetSearch')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;