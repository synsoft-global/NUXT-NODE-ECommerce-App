import productModel from "~/server/services/productServices";
import { deleteEntity } from "~/server/services/commonServices";

/*
 * Deletes a product entity based on the provided ID.
 * A common utility function to delete the product entity based on the provided ID.
 * @param event The incoming request event object
 * @returns {Object} The result of the deletion operation
 */
export default defineEventHandler(async (event: any) => {
  const reqbody = await readBody(event);
  const res = deleteEntity(productModel, reqbody.id);
  return res;
});
