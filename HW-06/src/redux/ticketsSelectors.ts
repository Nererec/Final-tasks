import { RootState } from './store';
import { ticketsAdapter } from './ticketsSlice';

export const ticketsSelectors = ticketsAdapter.getSelectors<RootState>(
  (state) => state.tickets
);

export const selectorSortBy = (state: RootState) => state.tickets.sortBy;
export const selectorFilterCompany = (state: RootState) => state.tickets.filterCompany;
export const selectorFilterConnection = (state: RootState) => state.tickets.filterConnection;
export const selectorLoading = (state: RootState) => state.tickets.loading
