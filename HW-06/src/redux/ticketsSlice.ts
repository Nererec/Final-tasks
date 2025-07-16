import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { CompanyName, ConnectionAmount, FilterType, SortType, TicketType } from '../types/types';
import { tickets } from '../ticketsDetails';

export const ticketsAdapter = createEntityAdapter<TicketType>();

const ticketsData = (index: number): Promise<TicketType[]> => new Promise(resolve => {
  setTimeout(() => resolve(tickets.slice(index, index + 3)), 1500);
});

export const getTickets = createAsyncThunk(
  'tickets/getTickets',
  async (index: number) => await ticketsData(index)
);

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: ticketsAdapter.getInitialState({
    loading: true,
    sortBy: SortType.Price as string,
    filterConnection: [ConnectionAmount.One, ConnectionAmount.Two, ConnectionAmount.Three, ConnectionAmount.Zero] as string[],
    filterCompany: [CompanyName.S7, CompanyName.RedWings, CompanyName.Victory] as string[]
  }),
  reducers: {
    sortTickets(state, action: PayloadAction<string>) {
      state.sortBy = action.payload
    },
    toggleFilter(state, action: PayloadAction<{ value: string, filter: string }>) {
      const value = action.payload.value
      const filter = action.payload.filter
      if (filter === FilterType.Connection) {
        if (state.filterConnection.includes(value)) {
          state.filterConnection = state.filterConnection.filter(a => a !== value)
        } else {
          state.filterConnection.push(value)
        }
        state.filterConnection.sort((a, b) => a.localeCompare(b))

      } else if (filter === FilterType.Company) {
        if (state.filterCompany.includes(value)) {
          state.filterCompany = state.filterCompany.filter(a => a !== value)
        } else {
          state.filterCompany.push(value)
        }
          state.filterCompany.sort((a, b) => a.localeCompare(b))
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTickets.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getTickets.fulfilled, (state, action) => {
      ticketsAdapter.addMany(state, action.payload)
      state.loading = false
    })
  }
});

export const { sortTickets, toggleFilter } = ticketsSlice.actions