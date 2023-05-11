const { Router } = require("express")
const NotesController = require("../Controllers/NotesController")
const notesController = new NotesController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const notesRouter = Router()

notesRouter.use(ensureAuthenticated)

notesRouter.get("/", notesController.index)
notesRouter.post("/", notesController.create)
notesRouter.get("/:id", notesController.show)
notesRouter.delete("/:id", notesController.delete)

module.exports = notesRouter