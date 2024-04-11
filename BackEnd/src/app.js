import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234"); // Allow requests from this origin
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Specify allowed headers
  next();
});

// routers
import userRouter from "./routes/user.routes.js";
import ArticleRouter from "./routes/article.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/article", ArticleRouter);
app.use("/api/v1/subscription", subscriptionRouter);

export { app };
