import { Link } from 'react-router-dom';
import { IProduct } from '@Shared/types';

import styles from './ListItem.module.scss';
import { FunctionComponent } from 'react';

interface ListItemProps {
  product: IProduct;
}

const ListItem: FunctionComponent<{ product: ListItemProps }> = ({ product }) => {
  const { id, title, price, thumbnail, images, comments } = product;

  return (
    <li className={styles.listItem}>
      <div className={styles.linkWrapper}>
        <Link className={styles.link} to={`/${id}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <Link className={styles.link} to={`/${id}`}>
          <img
            className={styles.img}
            src={thumbnail ? thumbnail.url : '/product-placeholder.png'}
            alt="product image"
          />
        </Link>
      </div>
      <p className={styles.price}>{price} &#8381;</p>
      <p className={styles.images}>Изображений: {images?.length || 0}</p>
      <p className={styles.comments}>Комментарии к товару: {comments?.length || 0}</p>
    </li>
  );
};

export default ListItem;
