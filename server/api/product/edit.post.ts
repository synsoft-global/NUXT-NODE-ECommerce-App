import productModel from "~/server/services/productServices";
import { updateEntity } from "~/server/services/commonServices";

/*
 * Updates a product entity with the provided data.
 * A common utility function to update the product entity with the provided data. 
 * @param event The incoming request event object
 * @returns {Object} The updated product entity
 */

export default defineEventHandler(async (event: any) => {
  const reqbody = await readBody(event);
  //use common update function
  const updatedData = updateEntity(productModel, reqbody);
  return updatedData;
});
