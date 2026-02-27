import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coinGeckoApi = createApi({
    reducerPath: 'coinGeckoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3/' }),
    endpoints: builder => ({
        getTopCoins: builder.query({
            query: () => 'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false',
        }),
        getCoinsById: builder.query({
            query: (coinId) => `coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
        }),
        getCoinHistory: builder.query({
            query: (coinId) => `coins/${coinId}/market_chart?vs_currency=usd&days=7`,
        })
    })
})

export const { useGetTopCoinsQuery, useGetCoinsByIdQuery, useGetCoinHistoryQuery } = coinGeckoApi