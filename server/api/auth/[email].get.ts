import userModal from "~/server/services/userServices.js";

export default defineEventHandler(async (event: any) => {
  try {
    // Read the body of the request
    const body = await readBody(event);
    // Query the Users model (assuming this is a MongoDB model)
    const user = await userModal.get({});
    return user;
  } catch (error) {
    return { statusCode: 500, body: "Internal Server Error" };
  }
});
