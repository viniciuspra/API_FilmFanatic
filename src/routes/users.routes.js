const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('../configs/upload');
const upload = multer(uploadConfig.MULTER)

const UsersController = require('../Controllers/UsersController');
const UserAvatarController = require("../Controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersController = new UsersController();
const userAvatarController = new UserAvatarController()

const usersRouter = Router();

usersRouter.post("/", usersController.create);
usersRouter.put("/", ensureAuthenticated, usersController.update);
usersRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRouter;
