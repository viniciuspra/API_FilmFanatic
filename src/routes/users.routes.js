const { Router } = require('express');
const UsersController = require('../Controllers/UsersController');
const usersController = new UsersController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRouter = Router();

usersRouter.post("/", usersController.create);
usersRouter.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRouter;
