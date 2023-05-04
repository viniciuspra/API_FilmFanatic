const { Router } = require("express");

const SessionsRouter = require("../Controllers/SessionsController");
const sessionsRouter = new SessionsRouter();

sessionsRouter.post("/", sessionsRouter.create);

module.exports = sessionsRouter;