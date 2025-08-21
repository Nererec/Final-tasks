import { Request, Response, Router } from 'express';
import { OkPacket } from 'mysql2';
import { connection } from '../../index';
import {
  AddSimilarProductsPayload,
  ICommentEntity,
  ImagesRemovePayload,
  IProductEntity,
  IProductImageEntity,
  IProductSearchFilter,
  ISimilarProductEntity,
  ProductAddImagesPayload,
  ProductCreatePayload,
} from '../../types';
import { mapCommentsEntity, mapImagesEntity, mapProductsEntity } from '../services/mapping';
import {
  enhanceProductsComments,
  enhanceProductsImages,
  getProductsFilterQuery,
  validateAddSimilarProductsBody,
  validateRemoveSimilarProductsBody,
} from '../helpers';
import {
  PRODUCT_INSERT_IMAGES_QUERY,
  IMAGES_DELETE_QUERY,
  PRODUCT_INSERT_QUERY,
  REPLACE_PRODUCT_THUMBNAIL,
  UPDATE_PRODUCT_FIELDS,
  DELETE_SIMILAR_PRODUCTS,
} from '../services/queries';
import { v4 as uuidv4 } from 'uuid';
import { body, param, validationResult } from 'express-validator';
import { IProduct } from '@Shared/types';

export const productsRouter = Router();

const throwServerError = (res: Response, e: Error) => {
  console.debug(e.message);
  res.status(500);
  res.send('Something went wrong');
};

productsRouter.get('/overview', async (req: Request, res: Response) => {
  try {
    const [productsCount] = await connection.query('SELECT COUNT(*) as count FROM products');
    const [productsSum] = await connection.query('SELECT SUM(price) as sum FROM products');

    const result = { count: productsCount[0].count, sum: productsSum[0].sum };
    res.send(result);
  } catch (e) {
    throwServerError(res, e);
  }
});

productsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const [productRows] = await connection.query<IProductEntity[]>('SELECT * FROM products');
    const [commentRows] = await connection.query<ICommentEntity[]>('SELECT * FROM comments');
    const [imageRows] = await connection.query<IProductImageEntity[]>('SELECT * FROM images');

    const products = mapProductsEntity(productRows);
    const withComments = enhanceProductsComments(products, commentRows);
    const withImages = enhanceProductsImages(withComments, imageRows);

    res.send(withImages);
  } catch (e) {
    throwServerError(res, e);
  }
});

productsRouter.get(
  '/search',
  async (req: Request<{}, {}, {}, IProductSearchFilter>, res: Response) => {
    try {
      if (!Object.keys(req.query).length) {
        res.status(400);
        res.send('Filter is empty');
        return;
      }

      const [query, values] = getProductsFilterQuery(req.query);
      const [rows] = await connection.query<IProductEntity[]>(query, values);

      if (!rows?.length) {
        res.send([]);
        return;
      }

      const [commentRows] = await connection.query<ICommentEntity[]>('SELECT * FROM comments');
      const [imageRows] = await connection.query<IProductImageEntity[]>('SELECT * FROM images');

      const products = mapProductsEntity(rows);
      const withComments = enhanceProductsComments(products, commentRows);
      const withImages = enhanceProductsImages(withComments, imageRows);

      res.send(withImages);
    } catch (e) {
      throwServerError(res, e);
    }
  }
);

productsRouter.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const [rows] = await connection.query<IProductEntity[]>(
      'SELECT * FROM products WHERE product_id = ?',
      [req.params.id]
    );

    if (!rows?.[0]) {
      res.status(404);
      res.send(`Product with id ${req.params.id} is not found`);
      return;
    }

    const [comments] = await connection.query<ICommentEntity[]>(
      'SELECT * FROM comments WHERE product_id = ?',
      [req.params.id]
    );

    const [images] = await connection.query<IProductImageEntity[]>(
      'SELECT * FROM images WHERE product_id = ?',
      [req.params.id]
    );

    const [similarProducts] = await connection.query<IProductEntity[]>(
      `SELECT p.*
     FROM products p
     JOIN similar_products sp ON p.product_id = sp.second_product
     WHERE sp.first_product = ?`,
      [req.params.id]
    );

    const [notSimilarProducts] = await connection.query<IProductEntity[]>(
      `SELECT *
     FROM products
     WHERE product_id NOT IN (
       SELECT second_product
       FROM similar_products
       WHERE first_product = ?
     )`,
      [req.params.id]
    );

    const product = mapProductsEntity(rows)[0];

    if (comments.length) {
      product.comments = mapCommentsEntity(comments);
    }

    if (images.length) {
      product.images = mapImagesEntity(images);
      product.thumbnail = product.images.find((image) => image.main) || product.images[0];
    }

    if (similarProducts.length) {
      product.similarProducts = mapProductsEntity(similarProducts);
    }

    if (notSimilarProducts.length) {
      product.notSimilarProducts = mapProductsEntity(notSimilarProducts);
    }

    res.send(product);
  } catch (e) {
    throwServerError(res, e);
  }
});

productsRouter.post('/', async (req: Request<{}, {}, ProductCreatePayload>, res: Response) => {
  try {
    const { title, description, price, images } = req.body;
    const productId = uuidv4();
    await connection.query<OkPacket>(PRODUCT_INSERT_QUERY, [
      productId,
      title || null,
      description || null,
      price || null,
    ]);

    if (images) {
      const values = images.map((image) => [uuidv4(), image.url, productId, image.main]);
      await connection.query<OkPacket>(PRODUCT_INSERT_IMAGES_QUERY, [values]);
    }

    const [rows] = await connection.query<IProductEntity[]>(
      'SELECT * FROM products WHERE product_id = ?',
      [productId]
    );

    const product = mapProductsEntity(rows)[0];

    res.status(201);
    res.send(product);
  } catch (e) {
    throwServerError(res, e);
  }
});

productsRouter.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const [rows] = await connection.query<IProductEntity[]>(
      'SELECT * FROM products WHERE product_id = ?',
      [req.params.id]
    );

    if (!rows?.[0]) {
      res.status(404);
      res.send(`Product with id ${req.params.id} is not found`);
      return;
    }

    await connection.query<OkPacket>('DELETE FROM images WHERE product_id = ?', [req.params.id]);

    await connection.query<OkPacket>('DELETE FROM comments WHERE product_id = ?', [req.params.id]);

    await connection.query<OkPacket>('DELETE FROM products WHERE product_id = ?', [req.params.id]);

    res.status(200);
    res.end();
  } catch (e) {
    throwServerError(res, e);
  }
});

productsRouter.post(
  '/add-images',
  async (req: Request<{}, {}, ProductAddImagesPayload>, res: Response) => {
    try {
      const { productId, images } = req.body;

      if (!images?.length) {
        res.status(400);
        res.send('Images array is empty');
        return;
      }

      const values = images.map((image) => [uuidv4(), image.url, productId, image.main]);
      await connection.query<OkPacket>(PRODUCT_INSERT_IMAGES_QUERY, [values]);

      res.status(201);
      res.send(`Images for a product id:${productId} have been added!`);
    } catch (e) {
      throwServerError(res, e);
    }
  }
);

productsRouter.post(
  '/remove-images',
  async (req: Request<{}, {}, ImagesRemovePayload>, res: Response) => {
    try {
      const imagesToRemove = req.body;

      if (!imagesToRemove?.length) {
        res.status(400);
        res.send('Images array is empty');
        return;
      }

      const [info] = await connection.query<OkPacket>(IMAGES_DELETE_QUERY, [[imagesToRemove]]);

      if (info.affectedRows === 0) {
        res.status(404);
        res.send('No one image has been removed');
        return;
      }

      res.status(200);
      res.send(`Images have been removed!`);
    } catch (e) {
      throwServerError(res, e);
    }
  }
);

productsRouter.post(
  '/update-thumbnail/:id',
  [
    param('id').isUUID().withMessage('Product id is not UUID'),
    body('newThumbnailId').notEmpty().withMessage('New thumbnail id is empty or not UUID'),
  ],
  async (req: Request<{ id: string }, {}, { newThumbnailId: string }>, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
        return;
      }

      const [currentThumbnailRows] = await connection.query<IProductImageEntity[]>(
        'SELECT * FROM images WHERE product_id=? AND main=?',
        [req.params.id, 1]
      );

      if (!currentThumbnailRows?.length || currentThumbnailRows.length > 1) {
        res.status(400);
        res.send('Incorrect product id');
        return;
      }

      const [newThumbnailRows] = await connection.query<IProductImageEntity[]>(
        'SELECT * FROM images WHERE product_id=? AND image_id=?',
        [req.params.id, req.body.newThumbnailId]
      );

      if (newThumbnailRows?.length !== 1) {
        res.status(400);
        res.send('Incorrect new thumbnail id');
        return;
      }

      const currentThumbnailId = currentThumbnailRows[0].image_id;
      const [info] = await connection.query<OkPacket>(REPLACE_PRODUCT_THUMBNAIL, [
        currentThumbnailId,
        req.body.newThumbnailId,
        currentThumbnailId,
        req.body.newThumbnailId,
      ]);

      if (info.affectedRows === 0) {
        res.status(404);
        res.send('No one image has been updated');
        return;
      }

      res.status(200);
      res.send('New product thumbnail has been set!');
    } catch (e) {
      throwServerError(res, e);
    }
  }
);

productsRouter.patch(
  '/:id',
  async (req: Request<{ id: string }, {}, ProductCreatePayload>, res: Response) => {
    try {
      const { id } = req.params;

      const [rows] = await connection.query<IProductEntity[]>(
        'SELECT * FROM products WHERE product_id = ?',
        [id]
      );

      if (!rows?.[0]) {
        res.status(404);
        res.send(`Product with id ${id} is not found`);
        return;
      }

      const currentProduct = rows[0];

      await connection.query<OkPacket>(UPDATE_PRODUCT_FIELDS, [
        req.body.hasOwnProperty('title') ? req.body.title : currentProduct.title,
        req.body.hasOwnProperty('description') ? req.body.description : currentProduct.description,
        req.body.hasOwnProperty('price') ? req.body.price : currentProduct.price,
        id,
      ]);

      res.status(200);
      res.send(`Product id:${id} has been added!`);
    } catch (e) {
      throwServerError(res, e);
    }
  }
);

productsRouter.get(
  '/similar/:id',
  [param('id').isUUID().withMessage('Product id is not UUID')],
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const originProduct = req.params.id;

      const [rows] = await connection.query<ISimilarProductEntity[]>(
        'SELECT * FROM similar_products where first_product = ? or second_product = ?',
        [originProduct, originProduct]
      );

      if (!rows?.length) {
        return res.send([]);
      }

      const similarProductsIds = rows.map(({ first_product, second_product }) => {
        return first_product === originProduct ? second_product : first_product;
      });

      const [similarProducts] = await connection.query<IProductEntity[]>(
        'SELECT * FROM products WHERE product_id IN (?)',
        [similarProductsIds]
      );

      const productsList: IProduct[] = similarProducts.map(({ product_id, ...rest }) => {
        return {
          id: product_id,
          ...rest,
        };
      });

      res.send(productsList);
    } catch (e) {
      throwServerError(res, e);
    }
  }
);

productsRouter.post(
  '/add-similar',
  [body().custom(validateAddSimilarProductsBody)],
  async (req: Request<{}, {}, AddSimilarProductsPayload>, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      await connection.query<OkPacket>(
        'INSERT INTO similar_products (first_product, second_product) VALUES ?',
        [req.body]
      );

      res.status(201).send();
    } catch (e) {
      throwServerError(res, e);
    }
  }
);

productsRouter.post(
  '/remove-similar',
  [body().custom(validateRemoveSimilarProductsBody)],
  async (req: Request<{}, {}, string[]>, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const [info] = await connection.query<OkPacket>(DELETE_SIMILAR_PRODUCTS, [
        req.body,
        req.body,
      ]);

      res.send(`${info.affectedRows} rows have been removed`);
    } catch (e) {
      throwServerError(res, e);
    }
  }
);
