import Order from "~/server/services/orderServices";
import { updateEntity } from "~/server/services/commonServices";

/*
 * Handles the updation of an order entity.
 * calls a common module to update the entity.
 * @param event The incoming request event object
 * @returns {Object} The updated order entity
 */
export default defineEventHandler(async (event: any) => {
  const reqbody = await readBody(event);
  const updatedData = updateEntity(Order, reqbody);
  return updatedData;
});
