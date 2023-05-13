const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('../configs/upload');
const upload = multer(uploadConfig.MULTER)

const UsersController = require('../Controllers/UsersController');
const usersController = new UsersController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = Router();

usersRouter.post("/", usersController.create);
usersRouter.put("/", ensureAuthenticated, usersController.update);
usersRouter.patch("/avatar", ensureAuthenticated, upload.single('avatar'), (request, response) => {
  console.log(request.file.filename);
  response.json()
})

module.exports = usersRouter;
