import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import { ticketsSlice } from './Slice';


export const store = configureStore({
    reducer: {
        ticketsExtraReducer: ticketsSlice.reducer, //в одном store описываем определённые slices определённого редуктора 
        btnViewCheapReducer: ticketsSlice.reducer,
        btnViewFastReducer: ticketsSlice.reducer,
        btnViewOptimalReducer: ticketsSlice.reducer,
        countReducer: ticketsSlice.reducer,
        choisePobeda: ticketsSlice.reducer,
        choiseRedWings: ticketsSlice.reducer,
        choiseSseven: ticketsSlice.reducer,
        checkedTransZero: ticketsSlice.reducer,
        checkedTransOne: ticketsSlice.reducer,
        checkedTransTwo: ticketsSlice.reducer,
        checkedTransThree: ticketsSlice.reducer,
        uncheckedTransZero: ticketsSlice.reducer,
        uncheckedTransOne: ticketsSlice.reducer, 
        uncheckedTransTwo: ticketsSlice.reducer, 
        uncheckedTransThree: ticketsSlice.reducer,
        displyFilterMenu: ticketsSlice.reducer,
    }
})

//выведение типов из хранилища RootState и RootDispatch 
export type RootState = ReturnType<typeof store.getState>; //дает возможность не описывать типы редукторов
export type AppDispatch = typeof store.dispatch; //включает типы из thunk middleware

//useAppSelector и useAppDispatch используются во всём проекте TS в место useSelector и useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

