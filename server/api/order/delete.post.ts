import Order from "~/server/services/orderServices";
import { deleteEntity } from "~/server/services/commonServices";

/*
 * Handles the delete of an order entity.
 * calls a common module to delete the entity
 * @param event The incoming request event object
 */
export default defineEventHandler(async (event: any) => {
  const reqbody = await readBody(event);
  const res = deleteEntity(Order, reqbody.id);
  return res;
});
