import { Router } from "express";
import {
  getAllArticle,
  getArticleById,
  publishArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";
import { VerifyUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(VerifyUser); // Apply VerifyUser middleware to all routes in this file

router.route("/").get(getAllArticle).post(publishArticle); 

router
  .route("/:articleId")
  .get(getArticleById)
  .delete(deleteArticle)
  .patch(updateArticle);

// router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router;
