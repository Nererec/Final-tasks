import { FunctionComponent } from 'react';
import HomePage from '../components/Home/HomePage';
import ProductsList from '../components/ProductsList/ProductsList';
import ProductDetail from '../components/ProductDetail/ProductDetail';

interface IRoutes {
  path: string;
  component: FunctionComponent;
}

export const routes: IRoutes[] = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/products-list',
    component: ProductsList,
  },
  {
    path: '/:id',
    component: ProductDetail,
  },
];
