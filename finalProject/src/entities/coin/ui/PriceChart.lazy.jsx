import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { prepareChartData } from '../lib/prepareChartData';
import { useTranslation } from 'react-i18next';
import style from './PriceChart.module.css'

function PriceChart({ data, coinName, coinSymbol }) {

    const { chartData, minPrice, maxPrice, yAxisMin, yAxisMax, percentChange } = prepareChartData(data);
    const { t } = useTranslation();

    if (!data || data.length === 0) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>{t('chart.noDataForTheGraph')}</div>
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={style.localPriceInfoDiv}>
                    <p>{payload[0].payload.fullDate}</p>
                    <p>{t('chart.price')}: ${payload[0].value.toLocaleString()}</p>
                </div>
            )
        }
        return null
    }

    return (
        <div className={style.chartContainer}>
            <h3>{t('chart.priceChart')} <strong>{coinName} ({coinSymbol?.toUpperCase()})</strong> {t('chart.period')}</h3>

            <div className={style.chartBox}>
                <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="date" stroke="#666" tick={{ fill: '#666', fontSize: 12 }} />
                        <YAxis
                            domain={[yAxisMin, yAxisMax]}
                            stroke="#666"
                            tick={{ fill: '#666', fontSize: 12 }}
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6, fill: '#3b82f6' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className={style.chartPriceInfo}>
                <div className={style.chartPriceContent}>
                    <p>{t('chart.minPriceFor7Days')}</p>
                    <p style={{color: '#ef4444' }}>
                        ${minPrice.toLocaleString()}
                    </p>
                </div>
                <div className={style.chartPriceContent}>
                    <p>{t('chart.maxPriceFor7Days')}</p>
                    <p style={{color: '#10b981' }}>
                        ${maxPrice.toLocaleString()}
                    </p>
                </div>
                <div className={style.chartPriceContent}>
                    <p>{t('chart.changeIn7Days')}</p>
                    <p style={{
                        color: chartData[0]?.price < chartData[chartData.length - 1]?.price ? '#10b981' : '#ef4444'
                    }}>
                        {percentChange.toFixed(2)}%
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PriceChart;