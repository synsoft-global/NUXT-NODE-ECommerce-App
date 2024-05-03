import Order from "../../services/orderServices";
import { findAllEntity } from "~/server/services/commonServices";

/*
 * This function uses a common utility function to find all entities of the Order model 
 * based on the provided query parameters and returns the list of orders.
 * @param event The incoming request event object
 * @returns {Array} An array containing the list of orders
 */
export default defineEventHandler(async (event: any) => {
    const query: any = getQuery(event);
    const list = findAllEntity(Order, query);
    return list
});
