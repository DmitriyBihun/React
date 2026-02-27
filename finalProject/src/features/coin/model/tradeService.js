import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../shared/config/firebase';

const getUserData = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        throw new Error('User not found');
    }

    return {
        userRef,
        data: userDoc.data(),
    };
};

export const buyCoin = async ({
    uid,
    coinId,
    amountUSD,
    currentPrice,
}) => {
    if (!amountUSD || amountUSD <= 0) {
        throw new Error('Amount must be greater than 0');
    }

    const { userRef, data } = await getUserData(uid);

    const balance = data.balance || 0;
    const portfolio = { ...(data.portfolio || {}) };

    if (amountUSD > balance) {
        throw new Error('Insufficient balance');
    }

    const coinAmount = amountUSD / currentPrice;
    const newBalance = balance - amountUSD;

    if (portfolio[coinId]) {
        portfolio[coinId] = {
            amount: (portfolio[coinId].amount || 0) + coinAmount,
            avgPrice: currentPrice, 
            totalCost: (portfolio[coinId].totalCost || 0) + amountUSD,
        };
    } else {
        portfolio[coinId] = {
            amount: coinAmount,
            avgPrice: currentPrice,
            totalCost: amountUSD,
        };
    }

    await updateDoc(userRef, {
        balance: newBalance,
        portfolio,
    });

    return {
        newBalance,
        portfolio,
        coinAmount,
    };
};

export const sellCoin = async ({
    uid,
    coinId,
    amountCoin,
    currentPrice,
}) => {
    if (!amountCoin || amountCoin <= 0) {
        throw new Error('Amount must be greater than 0');
    }

    const { userRef, data } = await getUserData(uid);

    const balance = data.balance || 0;
    const portfolio = { ...(data.portfolio || {}) };

    if (!portfolio[coinId] || portfolio[coinId].amount < amountCoin) {
        throw new Error('Not enough coins');
    }

    const amountUSD = amountCoin * currentPrice;
    const newBalance = balance + amountUSD;

    const currentAmount = portfolio[coinId].amount;

    if (currentAmount <= amountCoin) {
        delete portfolio[coinId];
    } else {
        portfolio[coinId] = {
            ...portfolio[coinId],
            amount: currentAmount - amountCoin,
            totalCost: (portfolio[coinId].totalCost || 0) - amountUSD,
        };
    }

    await updateDoc(userRef, {
        balance: newBalance,
        portfolio,
    });

    return {
        newBalance,
        portfolio,
        amountUSD,
    };
};