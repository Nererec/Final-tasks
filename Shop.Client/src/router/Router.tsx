import { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

import { routes } from './routes.data';

const Router: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default Router;
