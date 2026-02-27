import { useTranslation } from 'react-i18next';
import style from './BuyForm.module.css'

const BuyForm = ({ buyAmount, setBuyAmount, currentPrice, symbol, onSubmit }) => {

    const { t } = useTranslation();

    return (
        <div className={style.buyFormContainer}>
            <h2>{t('common.buy')}</h2>

            <form onSubmit={onSubmit}>
                <input
                    type="number"
                    min="1"
                    step="1"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    placeholder={t('coin.enterAmountUSD')}
                    required
                />

                {buyAmount && (
                    <p>
                        {t('coin.youWillReceive')}: {(buyAmount / currentPrice).toFixed(8)}{' '}
                        {symbol?.toUpperCase()}
                    </p>
                )}

                <button type="submit">
                    {t('common.buy')}
                </button>
            </form>
        </div>
    );
};

export default BuyForm;