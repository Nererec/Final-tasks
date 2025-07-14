import { createAsyncThunk } from '@reduxjs/toolkit';
import { Iticket, TfetchTicketsError, IparamsFetch } from '../Types/Types';

//Iticket[] тип возвращаемых данных функции createAsyncThunk и тип переменной const data
//тип number говорит какой тип аргумента внутри самой функции createAsyncThunk
//третий параметр это объект thunkApi с полями {dispatch?, state?, extra?, ignoreValue?, rejectValue?}
//rejectValue полезен когда нужно вывести ошибки
export const fetchTickets = createAsyncThunk<Iticket[], IparamsFetch, { rejectValue: TfetchTicketsError }>(
    "tickets/fetchTickets",
    async ({ limit, companyP, companyR, companyS, transfers0, transfers1, transfers2, transfers3, sortPrice, sortDuratuon }: IparamsFetch, thunkApi) => { // объект thunkApi содержит функцию rejectWithValue

        const response = await fetch(`http://localhost:4000/tickets?_limit=${limit}&company=${companyP}&company=${companyR}&company=${companyS}&transfers=${transfers0}&transfers=${transfers1}&transfers=${transfers2}&transfers=${transfers3}&_sort=${sortPrice},${sortDuratuon}&_order=asc`);

        const data: Iticket[] = await response.json();

        if (response.status !== 200) {

            return thunkApi.rejectWithValue({  //rejectWithValue проверяет и возвращает ошибку при не удачном запросе
                message: "Failed to fetch tickets."
            });
        }

        return data; // возврвщвет данные при успешном запросе
    }
);


