const { MovieList } = require("../models");

class MovieListController {
  static async addListMovie(req, res, next) {
    try {
      let addMovieList = { ...req.body };
      let movies = await MovieList.create(addMovieList);
      res.status(201).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async updateListMovie(req, res, next) {
    try {
      const { id } = req.params;
      let findMovie = await MovieList.findByPk(id);
      if (!findMovie) throw { name: "notFound" };
      let { listName, tags } = req.body;
      let updateMovie = await MovieList.update(
        {
          listName,
          tags,
        },
        {
          where: { id: id },
          returning: true,
        }
      );
      res.status(200).json(updateMovie);
    } catch (error) {
      next(error);
    }
  }

  static async deleteListMovie(req, res, next) {
    try {
      const { id } = req.params;
      let findMovie = await ListMovie.findByPk(id);
      if (!findMovie) throw { name: "notFound" };
      await ListMovie.destroy({
        where: { id: id },
      });
      res.status(200).json(findMovie);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieListController;
