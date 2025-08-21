import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct, IProductFilterPayload, IComment } from '@Shared/types';
import axios from 'axios';

interface ProductOverview {
  count?: number;
  sum?: number;
}

type CommentCreatePayload = Omit<IComment, 'id'>;

interface ProductsState {
  overview: ProductOverview | null;
  products: IProduct[];
  productById: IProduct;
  loading: boolean;
}

export const fetchInfo = createAsyncThunk<
  ProductOverview,
  undefined,
  {
    rejectValue: { message: string; status: string | undefined };
  }
>('products/fetchInfo', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/products/overview');
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue({
        message: err.message,
        status: err.response?.status?.toString(),
      });
    } else {
      return rejectWithValue({
        message: (err as Error).message,
        status: undefined,
      });
    }
  }
});

export const fetchProducts = createAsyncThunk<
  IProduct[],
  undefined,
  {
    rejectValue: { message: string; status: string | undefined };
  }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/products');
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue({
        message: err.message,
        status: err.response?.status?.toString(),
      });
    } else {
      return rejectWithValue({
        message: (err as Error).message,
        status: undefined,
      });
    }
  }
});

export const fetchFilteredProducts = createAsyncThunk<
  IProduct[],
  IProductFilterPayload,
  {
    rejectValue: { message: string; status: string | undefined };
  }
>('products/fetchFilteredProducts', async (filter, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<IProduct[]>('api/products/search', {
      params: filter,
    });
    return data || [];
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue({
        message: err.message,
        status: err.response?.status?.toString(),
      });
    } else {
      return rejectWithValue({
        message: (err as Error).message,
        status: undefined,
      });
    }
  }
});

export const fetchProductById = createAsyncThunk<
  IProduct,
  string,
  {
    rejectValue: { message: string; status: string | undefined };
  }
>('products/fetchProductById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<IProduct>(`api/products/${id}`);
    return data || [];
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue({
        message: err.message,
        status: err.response?.status?.toString(),
      });
    } else {
      return rejectWithValue({
        message: (err as Error).message,
        status: undefined,
      });
    }
  }
});

export const saveComment = createAsyncThunk<
  IComment,
  CommentCreatePayload,
  {
    rejectValue: { message: string; status: string | undefined };
  }
>('products/saveComment', async (comment, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<IComment>(`api/comments`, comment);
    return data || [];
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue({
        message: err.message,
        status: err.response?.status?.toString(),
      });
    } else {
      return rejectWithValue({
        message: (err as Error).message,
        status: undefined,
      });
    }
  }
});

const initialState: ProductsState = {
  overview: {},
  products: [],
  productById: {} as IProduct,
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // add your reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })
      .addCase(fetchInfo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productById = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      });
  },
});

export default productsSlice.reducer;
