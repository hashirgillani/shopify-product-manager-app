// @ts-check
import connectDB from "./db/index.js";
import { app } from "./app.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

connectDB()
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });