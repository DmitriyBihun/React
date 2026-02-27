import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import {db} from '../config/firebase'

export const updateUserBalance = async (userId, newBalance) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            balance: newBalance
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const addToPortfolio = async (userId, coinId, amount, price) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();

        const portfolio = userData.portfolio || {};

        if (portfolio[coinId]) {
            // Якщо монета є --- оновлюю к-сть.
            portfolio[coinId] = {
                amount: portfolio[coinId].amount + amount,
                avgPrice: (portfolio[coinId].avgPrice + price) / 2, 
                totalCost: (portfolio[coinId].totalCost || 0) + (amount * price)
            };
        } else {
            // Якщо монет немає --- додаю нову.
            portfolio[coinId] = {
                amount: amount,
                avgPrice: price,
                totalCost: amount * price
            };
        }

        await updateDoc(userRef, { portfolio });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const removeFromPortfolio = async (userId, coinId, amount, price) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();

        const portfolio = { ...userData.portfolio };

        if (portfolio[coinId]) {
            const currentAmount = portfolio[coinId].amount;

            if (currentAmount <= amount) {
                // Продажа всього
                delete portfolio[coinId];
            } else {
                // Продажа частини
                portfolio[coinId] = {
                    ...portfolio[coinId],
                    amount: currentAmount - amount,
                    totalCost: portfolio[coinId].totalCost - (amount * price)
                };
            }
        }

        await updateDoc(userRef, { portfolio });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const createTransaction = async (userId, type, coinId, amount, price, total) => {
    try {
        const transactionRef = doc(collection(db, 'transactions'));
        await setDoc(transactionRef, {
            userId,
            type,
            coinId,
            amount,
            price,
            total,
            createdAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};