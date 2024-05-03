import User from "../schema/usersSchema";

export default {
  findOne: async (params: any, fields: any = null) => {
    return await User.findOne(params, fields);
  },
  get: async (params: any, fields: any = null) => {
    return await User.find(params, fields).sort({ createdAt: -1 });
  },

  add: async (params: any) => {
    const newUser = new User(params);
      return await newUser.save();
  },

  update: async (params: any) => {
    return await User.updateOne(params.selector, { $set: params.data });
  },

  delete: async (id: any) => {
    return await User.findByIdAndDelete(id);
  },
};
