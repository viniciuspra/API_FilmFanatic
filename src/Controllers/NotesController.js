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

  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("movie_notes").where({ id }).first();
    const tags = await knex("movie_tags").where({ note_id: id }).orderBy("name");

    return response.json({
      ...note,
      tags
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("movie_notes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    let notes;

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex("movie_tags").whereIn("name", filterTags)

    }else {
      notes = await knex("movie_notes")
        .where({ user_id })
          .whereLike("title", `%${title}%`)
            .orderBy("title");
    }


    return response.json(notes)
  }
};

module.exports = NotesController;