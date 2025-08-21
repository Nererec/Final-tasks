import { FunctionComponent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchProductById, saveComment } from '@/redux/productsSlice';
import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader';
import styles from './ProductDetail.module.scss';

const ProductDetail: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.products.productById);
  const loading = useAppSelector((state) => state.products.loading);
  const { title, description, price, thumbnail, comments, images, similarProducts } = product;
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id !== undefined) {
      const commentSet = { ...comment, productId: id };
      dispatch(saveComment(commentSet));
      setComment({
        name: '',
        email: '',
        body: '',
      });
      dispatch(fetchProductById(id));
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (id !== undefined) dispatch(fetchProductById(id));
  }, [id, dispatch]);

  return (
    <Layout>
      <div className="container">
        {loading && <Loader />}
        <section className={styles.productDetail}>
          <h2 className={styles.title}>{title ? title : 'Untitled'}</h2>
          <img
            className={styles.mainImg}
            src={thumbnail ? thumbnail.url : '/product-placeholder.png'}
            alt="product image"
          />
          <ul className={styles.listImg}>
            {images &&
              images.map((image) => (
                <li key={image.url}>
                  <img className={styles.smallImg} src={image.url} alt="product image" />
                </li>
              ))}
          </ul>
          <p>{description ? description : 'No description'}</p>
          <p className={styles.price}>{price ? price : 'No price'} &#8381;</p>
          {similarProducts && similarProducts.length > 0 && (
            <div>
              <h3 className={styles.titleSimilar}>Similar Products</h3>
              <ul className={styles.listSimilar}>
                {similarProducts.map((product) => (
                  <li key={product.id}>
                    <Link className={styles.similarProduct} to={`/${product.id}`}>
                      <p>{product.title}</p>
                      <p className={styles.price}>{product.price} &#8381;</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {comments && comments.length > 0 && (
            <div>
              <h3 className={styles.titleComments}>Comments</h3>
              <ul className={styles.listComments}>
                {comments.map((comment) => (
                  <li key={comment.id} className={styles.commentContainer}>
                    <p>
                      <span>Name:</span> {comment.name}
                    </p>
                    <p>
                      <span>Email:</span> {comment.email}
                    </p>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form className={styles.form} onSubmit={handleCommentSubmit}>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Имя"
              onChange={handleCommentChange}
              value={comment.name}
            />
            <input
              className={styles.input}
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleCommentChange}
              value={comment.email}
            />
            <textarea
              className={styles.textarea}
              name="body"
              placeholder="Ваш комментарий"
              onChange={handleCommentChange}
              value={comment.body}
            />
            <button className={styles.button}>Сохранить</button>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetail;
