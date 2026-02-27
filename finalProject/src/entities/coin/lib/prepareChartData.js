export function prepareChartData(data) {
    const chartData = data.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit'
        }),
        price,
        fullDate: new Date(timestamp).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        })
    }));

    const prices = chartData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    const yAxisMin = Math.max(0, minPrice - priceRange * 0.1);
    const yAxisMax = maxPrice + priceRange * 0.1;

    const percentChange =
        ((chartData.at(-1).price - chartData[0].price) / chartData[0].price) * 100;

    return {
        chartData,
        minPrice,
        maxPrice,
        yAxisMin,
        yAxisMax,
        percentChange,
    };
};