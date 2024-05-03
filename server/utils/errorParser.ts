export default function parseError (error:any) {
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