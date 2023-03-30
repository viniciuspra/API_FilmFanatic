const knex = require("../database/knex");
const AppError = require('../utils/AppError')

class NotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const user_id = request.params.user_id;

    if (Number(rating) < 1 || Number(rating) > 5) {
      throw new AppError("The rating for the movie must be between 1 and 5.")
    }

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    });

     const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    });

    await knex("movie_tags").insert(tagsInsert);

    return response.json();

}};

module.exports = NotesController;