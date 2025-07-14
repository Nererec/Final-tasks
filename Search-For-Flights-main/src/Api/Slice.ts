import {TtikcetsState } from '../Types/Types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTickets } from './FetchTickets';
import{ RootState } from '../Api/Store';


const initialState: TtikcetsState = { //дэфолтовое значение полей
    listTickets: [],
    error: null,
    status: "idle",
    btnCheap: false,
    btnFast: true,
    btnOptimal: true,
    paramsFetch: {
        limit: 3,
        companyP: 'Pobeda',
        companyR: 'Redwings',
        companyS: 'Ssevenair',
        transfers0: 'Без пересадок',
        transfers1: '',
        transfers2: '',
        transfers3: '',
        sortPrice: '',
        sortDuratuon: '',
    },
    displayFilterMenu: false,
    
};


export const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {

    displyFilterMenu: (state) => {
        state.displayFilterMenu = !state.displayFilterMenu;
        
    },

    uncheckedTransZero: (state) => {
        state.listTickets = [];  
        state.paramsFetch = {...state.paramsFetch, transfers0: ''};
    },

    uncheckedTransOne: (state) => {
        state.listTickets = [];
        state.paramsFetch = {...state.paramsFetch, transfers1: ''};
    },

    uncheckedTransTwo: (state) => {
        state.listTickets = [];
        state.paramsFetch = {...state.paramsFetch, transfers2: ''};
    },

    uncheckedTransThree: (state) => {
        state.listTickets = [];
        state.paramsFetch = {...state.paramsFetch, transfers3: ''};
    },

    checkedTransZero: (state) => {
        state.listTickets = [];
        state.paramsFetch.transfers0 = 'Без пересадок'; 
    },
    checkedTransOne: (state) => {
        state.listTickets = [];
        state.paramsFetch.transfers1 = '1 пересадка';
    },
    checkedTransTwo: (state) => {
        state.listTickets = [];
        state.paramsFetch.transfers2 = '2 пересадки';
    },
    checkedTransThree: (state) => {
        state.listTickets = [];
        state.paramsFetch.transfers3 = '3 пересадки';
    },

    choisePobeda: (state) => {
        state.listTickets = [];
        state.paramsFetch.companyR = '';
        state.paramsFetch.companyS = '';
        state.paramsFetch.companyP = 'Pobeda';
    },

    choiseRedWings: (state) => {
        state.listTickets = [];
        state.paramsFetch.companyP = '';
        state.paramsFetch.companyS = '';
        state.paramsFetch.companyR = 'Redwings';
    },

    choiseSseven: (state) => {
        state.listTickets = [];
        state.paramsFetch.companyR = '';
        state.paramsFetch.companyP = '';
        state.paramsFetch.companyS = 'Ssevenair';
    },

    countReducer: (state) => {
        state.listTickets = [];
        state.paramsFetch.limit += 1;
      },

    btnViewCheapReducer: (state) => {
        state.btnCheap = false;
        state.btnFast = true;
        state.btnOptimal = true;
        state.listTickets = [];
        state.paramsFetch.sortDuratuon = '';
        state.paramsFetch.sortPrice = 'price';
    },
    btnViewFastReducer: (state) => {
        state.btnCheap = true;
        state.btnFast = false;
        state.btnOptimal = true;
        state.listTickets = [];
        state.paramsFetch.sortPrice = '';
        state.paramsFetch.sortDuratuon = 'duration';
    },
    btnViewOptimalReducer: (state) => {
        state.btnCheap = true;
        state.btnFast = true;
        state.btnOptimal = false;
        state.listTickets = [];
        state.paramsFetch.sortPrice = 'price';
        state.paramsFetch.sortDuratuon = 'duration';
    }
    },

    extraReducers: (builder) => {

        builder
        .addCase(fetchTickets.pending, (state) => {
        
            state.status = "loading";
            state.error = null;
    });

        builder
        .addCase(fetchTickets.fulfilled, 
            (state, { payload }) => { 

            state.listTickets.push(...payload);
            state.status = "idle";
    });

        builder
        .addCase(fetchTickets.rejected, 
            (state, { payload }) => {

            if (payload) state.error = payload.message; //В payload.message приходит из fetchTickets => return thunkApi.rejectWithValue({ message: "Failed to fetch tickets." })
            state.status = "idle";
    });
    },
    });


    export const selectStatus = (state: RootState) => state.ticketsExtraReducer.status; //статус в ticketsExtraReducer
    export const selectListTickets = (state: RootState) => state.ticketsExtraReducer.listTickets;

    export const { btnViewCheapReducer, btnViewFastReducer, btnViewOptimalReducer, countReducer, choisePobeda, choiseRedWings, choiseSseven, checkedTransZero, checkedTransOne, checkedTransTwo, checkedTransThree, uncheckedTransZero, uncheckedTransOne, uncheckedTransTwo, uncheckedTransThree, displyFilterMenu } = ticketsSlice.actions;

    export const selectStateBtnCheap= (state: RootState) => state.btnViewCheapReducer.btnCheap;
    export const selectStateBtnFast= (state: RootState) => state.btnViewFastReducer.btnFast;
    export const selectStateOptimal= (state: RootState) => state.btnViewOptimalReducer.btnOptimal;

    export const selectStatePrams= (state: RootState) => state.countReducer.paramsFetch;

    export const selectStateDisplayFilter= (state: RootState) => state.displyFilterMenu.displayFilterMenu;


    
    
