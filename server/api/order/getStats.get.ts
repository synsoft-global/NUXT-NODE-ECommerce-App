import parseError from "~/server/utils/errorParser";
import Order from "../../services/orderServices";
import Product from "~/server/services/productServices";

/*
 * This function retrieves the total count of paid and unpaid orders, 
 * total orders, and total products from the database.
 * @param event The incoming request event object
 * @returns {Object} An object containing the statistics data
 */
export default defineEventHandler(async (event: any) => {
  try {
    const [totalPaid, totalUnPaid, totalOrder, totalProducts] = await Promise.all([
      Order.getCount({ paymentStatus: { $eq: 'paid' } }),
      Order.getCount({ paymentStatus: { $eq: 'unpaid' } }),
      Order.getCount({}),
      Product.getCount({})
    ]);

    const res = { totalPaid, totalUnPaid, totalOrder, totalProducts };
    return { statusCode: 200, data: res };
  } catch (error) {
    return parseError(error);
  }
});
