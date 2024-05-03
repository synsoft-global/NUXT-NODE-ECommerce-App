import mongoose from "mongoose";
// nitro has to be imported as a type, otherwise it will throw an error
import type { Nitro } from "nitropack";

// export default async (_nitroApp: Nitro) => {
export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  // connect to mongodb
  mongoose
    .connect(config.mongoUrl)
    .then(() => console.log(`Connected to DB`))
    .catch((e) => console.log(e));
});