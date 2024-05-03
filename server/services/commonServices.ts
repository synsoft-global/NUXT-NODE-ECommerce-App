import parseError from "../utils/errorParser";

//common function for creating data
export const createEntity = async (Modal: any, body: any, condition: any) => {
  try {
    //check if entry exists or not
    if (condition == "Product") {
      const exists = await Modal.findOne({
        name: body.name,
      });

      if (exists) {
        throw createError({
          statusCode: 400,
          statusMessage: "Name already exist",
        });
      }
    }
    const data = await Modal.add(body);
    return {
      statusCode: 200,
      message: "Created successfully.",
      ...data.toJSON(),
    };
  } catch (error: any) {
    return parseError(error);
  }
};

//common function for creating data
export const updateEntity = async (Modal: any, body: any) => {
  try {
    // Read the body of the request
    const data = JSON.parse(JSON.stringify(body));
    const id = data._id;

    // Find the existing product by ID
    const existing = await Modal.findById(id);
    if (!existing) {
      throw createError({
        statusCode: 404,
        statusMessage: "Data not found",
      });
    }
    // Update the existing product with the new data
    Object.assign(existing, body);
    const updatedData = await existing.save();
    return {
      statusCode: 200,
      message: "Data updated successfully.",
      data: { ...updatedData.toJSON() },
    };
  } catch (error: any) {
    return parseError(error);
  }
};

//common function for creating data
export const deleteEntity = async (Modal: any, id: any) => {
  try {
    if (!id) {
      throw new Error("ID is required.");
    }

    // Find the existing data by ID
    const existing = await Modal.findById(id);
    if (!existing) {
      throw createError({
        statusCode: 404,
        statusMessage: "Data not found",
      });
    }

    // Delete the existing data
    await Modal.delete({ _id: id });

    return {
      statusCode: 200,
      message: "Data deleted successfully.",
      id: id,
    };
  } catch (error: any) {
    return parseError(error);
  }
};

//common function for creating data
export const findAllEntity = async (Modal: any, query: any) => {
  try {
    const { q, page, limit, sort, order } = query;

    // Constructing the search query
    let searchQuery: any = {};
    if (q && q.trim() !== "") {
      const dataRegex = { $regex: new RegExp(q.replace(/\s+/g, "\\s+"), "gi") };
      searchQuery = { name: dataRegex };
    }

    // Constructing the options for pagination and sorting
    const options: any = {
      page: page || 1,
      limit: limit || 10,
      sort: {}, //[sort?.column]: sort?.direction === 'asc' ? 1 : -1
    };
    if (sort && order) {
      options.sort[sort] = order === "asc" ? 1 : -1;
    } else {
      // Default sorting if not provided
      options.sort["_id"] = 1; // Assuming 'id' as the default field to sort by
    }

    // Fetch products based on the constructed query
    const result = await Modal.get(searchQuery, options);

    const res = JSON.parse(JSON.stringify(result));
    return { statusCode: 200, data: res, message: "Fetch data successfully!" };
  } catch (error) {
    return parseError(error);
  }
};
