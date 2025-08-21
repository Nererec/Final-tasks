import { Router, Request, Response } from 'express';
import { throwServerError } from './helper';
import {
  createProduct,
  getNotSimilarProducts,
  getProduct,
  getProducts,
  getSimilarProducts,
  removeProduct,
  searchProducts,
  updateProduct,
} from '../models/products.model';
import { IProduct, IProductFilterPayload } from '@Shared/types';
import { IProductEditData } from '../types';

export const productsRouter = Router();

productsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.render('products', { items: products, queryParams: {} });
  } catch (e) {
    throwServerError(res, e);
  }
});

productsRouter.get(
  '/search',
  async (req: Request<{}, {}, {}, IProductFilterPayload>, res: Response) => {
    try {
      const products = await searchProducts(req.query);
      res.render('products', {
        items: products,
        queryParams: req.query,
      });
    } catch (e) {
      throwServerError(res, e);
    }
  }
);

productsRouter.get('/new-product', async (req: Request, res: Response) => {
  try {
    const product: IProduct = {
      id: '',
      title: '',
      description: '',
      price: 0,
    };

    res.render('product/product', {
      item: product,
      similarProducts: [],
      notSimilarProducts: [],
    });
  } catch (e) {
    throwServerError(res, e);
  }
});

productsRouter.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await getProduct(req.params.id);

    if (product) {
      const similarProducts = await getSimilarProducts(req.params.id);
      const notSimilarProducts = await getNotSimilarProducts(req.params.id, similarProducts);

      res.render('product/product', {
        item: product,
        similarProducts,
        notSimilarProducts,
      });
    } else {
      res.render('product/empty-product', {
        id: req.params.id,
      });
    }
  } catch (e) {
    throwServerError(res, e);
  }
});

productsRouter.get('/remove-product/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    if (req.session.username !== 'admin') {
      res.status(403);
      res.send('Forbidden');
      return;
    }

    await removeProduct(req.params.id);
    res.redirect(`/${process.env.ADMIN_PATH}`);
  } catch (e) {
    throwServerError(res, e);
  }
});

productsRouter.post(
  '/save/:id',
  async (req: Request<{ id: string }, {}, IProductEditData>, res: Response) => {
    try {
      await updateProduct(req.params.id, req.body);
      res.redirect(`/${process.env.ADMIN_PATH}/${req.params.id}`);
    } catch (e) {
      throwServerError(res, e);
    }
  }
);

productsRouter.post('/save', async (req: Request<{}, {}, IProductEditData>, res: Response) => {
  try {
    const newProduct = await createProduct(req.body);
    res.redirect(`/${process.env.ADMIN_PATH}/${newProduct.id}`);
  } catch (e) {
    throwServerError(res, e);
  }
});
