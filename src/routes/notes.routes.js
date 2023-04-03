const { Router } = require("express")
const NotesController = require("../Controllers/NotesController")
const notesRoutes = Router()
const notesController = new NotesController()

notesRoutes.post("/:user_id", notesController.create)
notesRoutes.get("/:id", notesController.show)

module.exports = notesRoutes