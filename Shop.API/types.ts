import { RowDataPacket } from 'mysql2/index';
import {
  IProduct,
  IProductImage,
  IComment,
  IProductFilterPayload,
  IAuthRequisites,
} from '@Shared/types';

export interface IProductEntity extends IProduct, RowDataPacket {
  product_id: string;
}

export interface IProductSearchFilter extends IProductFilterPayload {}

export type ProductCreatePayload = Omit<IProduct, 'id' | 'comments' | 'thumbnail' | 'images'> & {
  images: ImageCreatePayload[];
};

export type ImageCreatePayload = Omit<IProductImage, 'id' | 'productId'>;

export interface IProductImageEntity extends RowDataPacket {
  image_id: string;
  url: string;
  product_id: string;
  main: number;
}

export interface ProductAddImagesPayload {
  productId: string;
  images: ImageCreatePayload[];
}

export type ImagesRemovePayload = string[];

export type CommentCreatePayload = Omit<IComment, 'id'>;

export interface ICommentEntity extends RowDataPacket {
  comment_id: string;
  name: string;
  email: string;
  body: string;
  product_id: string;
}

export interface IUserRequisitesEntity extends IAuthRequisites, RowDataPacket {
  id: number;
}

export type AddSimilarProductsPayload = [string, string][];

export interface ISimilarProductEntity extends RowDataPacket {
  id: number;
  first_product: string;
  second_product: string;
}
