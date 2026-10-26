import express from "express";
import connectDB from "./db.js"
import todoRouter from "./routes/todoRoutes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/v1/todos", todoRouter)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`)
    })
  })
  .catch((error) => {
    console.errro("failed to connect to db",error)
  })
