import { FunctionComponent, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchProducts, fetchFilteredProducts } from '@/redux/productsSlice';
import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader';
import ListItem from './ListItem/ListItem';

import styles from './ProductsList.module.scss';

const ProductsList: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const loading = useAppSelector((state) => state.products.loading);
  const [filter, setFilter] = useState({
    title: '',
    description: '',
    priceFrom: 0,
    priceTo: 100000000000,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchFilteredProducts(filter));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log('Filter changed:', filter);
  }, [filter]);

  console.log('Products in app:', products);

  return (
    <Layout>
      <div className="container">
        <section className={styles.productsList}>
          <h1 className={styles.title}>Список товаров ({products.length})</h1>
          <form className={styles.form} action="" onSubmit={handleFilterSubmit}>
            <input
              className={styles.input}
              type="text"
              placeholder="Название товара"
              name="title"
              onChange={handleFilterChange}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Описание товара"
              name="description"
              onChange={handleFilterChange}
            />
            <input
              className={styles.input}
              type="number"
              placeholder="Цена от"
              name="priceFrom"
              onChange={handleFilterChange}
            />
            <input
              className={styles.input}
              type="number"
              placeholder="Цена до"
              name="priceTo"
              onChange={handleFilterChange}
            />
            <button className={styles.button}>Поиск</button>
          </form>
          {loading && <Loader />}
          <ul className={styles.list}>
            {Array.isArray(products)
              ? products.map((product) => <ListItem key={product.id} product={product} />)
              : 'No products found'}
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default ProductsList;
