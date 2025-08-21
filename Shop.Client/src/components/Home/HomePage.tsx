import { FunctionComponent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchInfo } from '@/redux/productsSlice';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader';

import styles from './HomePage.module.scss';

const HomePage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const overview = useAppSelector((state) => state.products.overview);
  const loading = useAppSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchInfo());
  }, [dispatch]);

  return (
    <Layout>
      <div className="container">
        {loading && <Loader />}
        <section className={styles.homePage}>
          <h1 className={styles.title}>Shop.Client</h1>
          <p className={styles.text}>
            В базе данных находится <b className={styles.textBold}>{overview?.count} товаров</b>{' '}
            общей стоимостью <b className={styles.textBold}>{overview?.sum} &#8381;</b>
          </p>
          <Link to="/products-list" className={styles.link}>
            Перейти к списку товаров
          </Link>
          <Link to="/admin/auth/login" className={styles.link} target="_blank">
            Перейти в систему администрирования
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
