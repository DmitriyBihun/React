import { createSlice } from '@reduxjs/toolkit';

const savedLanguage = localStorage.getItem('language') || 'ua';

const initialState = {
    currentLanguage: savedLanguage,
    translations: null, 
    isLoading: false
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.currentLanguage = action.payload;
            localStorage.setItem('language', action.payload);
        },
        setTranslations: (state, action) => {
            state.translations = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setLanguage, setTranslations, setLoading } = languageSlice.actions;
export default languageSlice.reducer;