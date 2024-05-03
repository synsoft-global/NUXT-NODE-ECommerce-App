import productModel from "~/server/services/productServices";
import { createEntity } from "~/server/services/commonServices";

/**
 * Creates a new product entity.
 * A common utility function to create a new product entity with the provided data.
 * @param event The incoming request event object
 * @returns {Object} The created product entity
 */
export default defineEventHandler(async (event: any) => {
  const reqbody = await readBody(event);
  const product = createEntity(productModel, reqbody, "Product");
  return product
});
