import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, 
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; 
            state.error = null;
        },
        updateBalance: (state, action) => {
            if (state.user) {
                state.user.balance = action.payload;
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
    },
});

export const { setUser, updateBalance, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;