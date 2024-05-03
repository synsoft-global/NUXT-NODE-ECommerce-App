import userModal from "~/server/services/userServices.js";
import { userLoginSchema } from "~/server/validations";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*
 * Handles user login requests, validating fields, querying the user model, 
 * comparing passwords, generating JWT token, and returning response.
 * @param event The incoming request event object
 * @returns {Object} Status code, message, token, and user information
 */
export default defineEventHandler(async (event: any) => {
  try {
    // Read the body of the request
    const reqBody = await readBody(event);

    //validate the fields
    await userLoginSchema.validate(reqBody, { abortEarly: false });

    const result: any = await userModal.findOne({ email: reqBody.email });
    if (result && result.password) {
      const bcryptRes = await bcrypt.compare(reqBody.password, result.password);
      if (bcryptRes) {
        const expiresIn = reqBody.rememberUser ? "1y" : "2d";
        const token = jwt.sign(
          {
            userId: result._id,
            name: result.name,
            email: result.email
          },
          "config.jwtKey_default",
          { expiresIn: expiresIn }
        );
        return { statusCode: 200, message: "Successfully logged in.", token, ...result.toJSON() };
      } else {
        throw createError({
          statusCode: 400,
          statusMessage: "Email or Password is not correct. Please try again",
          fatal: false,
          stack: "",
        });
      }
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "Email or Password is not correct. Please try again",
        fatal: false,
        stack: "",
      });
    }
  } catch (error: any) {
    if (error?.cause) {
      return error;
    } else if (error.errors) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
        data: error.errors,
        stack: "",
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal server error",
        stack: "",
      });
    }
  }
});
