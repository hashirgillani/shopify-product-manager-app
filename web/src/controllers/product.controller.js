import productCreator from "../utils/product-creator.js";
import { Product } from "../models/Product.models.js";

export const getProductsCount = async (_req, res) => {
  try {
    const shopId = res.locals.shopify.session.shop;

    const count = await Product.countDocuments({ shopId });

    res.status(200).send({ count });
  } catch (error) {
    res.status(500).send({ count: 0, error: error.message });
  }
};

export const createProducts = async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    const { shop: shopId } = res.locals.shopify.session;

    const createdProducts = await productCreator(res.locals.shopify.session);

    const productDocs = createdProducts.map((product) => ({
      title: product.title,
      shopId,
      shopifyProductId: product.id,
    }));

    await Product.create(productDocs);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
};