export const COMMENT_DUPLICATE_QUERY = `
    SELECT * FROM comments c
    WHERE LOWER(c.email) = ?
    AND LOWER(c.name) = ?
    AND LOWER(c.body) = ?
    AND c.product_id = ?
`;

export const COMMENT_INSERT_QUERY = `
    INSERT INTO comments
    (comment_id, email, name, body, product_id)
    VALUES
    (?, ?, ?, ?, ?)
`;

export const PRODUCT_INSERT_QUERY = `
    INSERT INTO products
    (product_id, title, description, price)
    VALUES
    (?, ?, ?, ?)
`;

export const PRODUCT_INSERT_IMAGES_QUERY = `
  INSERT INTO images
  (image_id, url, product_id, main)
  VALUES ?
`;

export const IMAGES_DELETE_QUERY = `
  DELETE FROM images 
  WHERE image_id IN ?;
`;

export const REPLACE_PRODUCT_THUMBNAIL = `
  UPDATE images
  SET main = CASE
    WHEN image_id = ? THEN 0
    WHEN image_id = ? THEN 1
    ELSE main
END
WHERE image_id IN (?, ?);
`;

export const UPDATE_PRODUCT_FIELDS = `
    UPDATE products 
    SET title = ?, description = ?, price = ? 
    WHERE product_id = ?
`;

export const DELETE_SIMILAR_PRODUCTS = `
  DELETE FROM similar_products 
  WHERE first_product IN (?)
  OR second_product IN (?);
`;
