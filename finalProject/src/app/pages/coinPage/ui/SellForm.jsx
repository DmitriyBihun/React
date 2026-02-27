import { useTranslation } from 'react-i18next';
import style from './SellForm.module.css'

const SellForm = ({ sellAmount, setSellAmount, currentPrice, symbol, userCoinAmount, onSubmit }) => {

    const { t } = useTranslation();

    return (
        <div className={style.sellFormContainer}>
            <h2>{t('common.sell')}</h2>

            <form onSubmit={onSubmit}>
                <input
                    type="number"
                    min="0.00000001"
                    step="0.00000001"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    placeholder={`${t('coin.max')}: ${userCoinAmount.toFixed(8)}`}
                    required
                />

                {sellAmount && (
                    <p>
                        {t('coin.youWillReceive')}: ${(sellAmount * currentPrice).toLocaleString()}
                    </p>
                )}

                <button type="submit" >
                    {t('common.sell')}
                </button>
            </form>
        </div>
    );
};

export default SellForm;