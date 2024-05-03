import Order from "../schema/orderSchema";

export default {
  findById: async (id: string, fields: any = null) => {
    try {
      return await Order.findById(id, fields);
    } catch (error) {
      throw error;
    }
  },
  findOne: async (params: any, fields: any = null) => {
    try {
      return await Order.findOne(params, fields);
    } catch (error) {
      throw error;
    }
  },

  get: async (searchQuery: any, options: any = {}) => {
    try {
      const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;

      const orders = await Order.find(searchQuery)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

      return orders;
    } catch (error) {
      throw error;
    }
  },



  getCount: async (params: any) => {
    try {
      return await Order.countDocuments(params.query ? params.query : params);
    } catch (error) {
      throw error;
    }
  },

  add: async (params: any) => {
    try {
      const newOrder = new Order(params);
      return await newOrder.save();
    } catch (error) {
      throw error;
    }
  },

  update: async (params: any) => {
    try {
      return await Order.updateOne(params.selector, { $set: params.data });
    } catch (error) {
      throw error;
    }
  },

  updateMany: async (params: any) => {
    try {
      return await Order.updateMany(params.selector, { $set: params.data });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: any) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(id);
      return deletedOrder;
    } catch (error) {
      throw error;
    }
  },
};
