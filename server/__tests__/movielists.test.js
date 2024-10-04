const MovieListController = require("../controllers/MovieListController");
const { MovieList } = require("../models");

jest.mock("../models");

describe("MovieListController", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addListMovie", () => {
    it("should add a new movie list successfully", async () => {
      const mockMovie = {
        id: 1,
        listName: "My Favorites",
        tags: ["action", "comedy"],
      };
      req.body = mockMovie;
      MovieList.create.mockResolvedValue(mockMovie);

      await MovieListController.addListMovie(req, res, next);

      expect(MovieList.create).toHaveBeenCalledWith(mockMovie);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockMovie);
    });

    it("should call next with error if adding movie list fails", async () => {
      const error = new Error("Database error");
      MovieList.create.mockRejectedValue(error);

      await MovieListController.addListMovie(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("updateListMovie", () => {
    it("should update a movie list successfully", async () => {
      const mockMovie = { id: 1, listName: "Updated List", tags: ["drama"] };
      req.params = { id: "1" };
      req.body = { listName: "Updated List", tags: ["drama"] };

      MovieList.findByPk.mockResolvedValue(mockMovie);
      MovieList.update.mockResolvedValue([1, [mockMovie]]);

      await MovieListController.updateListMovie(req, res, next);

      expect(MovieList.findByPk).toHaveBeenCalledWith("1");
      expect(MovieList.update).toHaveBeenCalledWith(
        { listName: "Updated List", tags: ["drama"] },
        { where: { id: "1" }, returning: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([1, [mockMovie]]);
    });

    it("should throw notFound error if movie list does not exist", async () => {
      req.params = { id: "999" };
      MovieList.findByPk.mockResolvedValue(null);

      await MovieListController.updateListMovie(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ name: "notFound" })
      );
    });

    it("should call next with error if updating movie list fails", async () => {
      req.params = { id: "1" };
      const error = new Error("Database error");
      MovieList.findByPk.mockResolvedValue({ id: 1 });
      MovieList.update.mockRejectedValue(error);

      await MovieListController.updateListMovie(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("deleteListMovie", () => {
    it("should delete a movie list successfully", async () => {
      const mockMovie = { id: 1, listName: "To Delete", tags: ["horror"] };
      req.params = { id: "1" };

      MovieList.findByPk.mockResolvedValue(mockMovie);
      MovieList.destroy.mockResolvedValue(1);

      await MovieListController.deleteListMovie(req, res, next);

      expect(MovieList.findByPk).toHaveBeenCalledWith("1");
      expect(MovieList.destroy).toHaveBeenCalledWith({ where: { id: "1" } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMovie);
    });

    it("should throw notFound error if movie list does not exist", async () => {
      req.params = { id: "999" };
      MovieList.findByPk.mockResolvedValue(null);

      await MovieListController.deleteListMovie(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ name: "notFound" })
      );
    });

    it("should call next with error if deleting movie list fails", async () => {
      req.params = { id: "1" };
      const error = new Error("Database error");
      MovieList.findByPk.mockResolvedValue({ id: 1 });
      MovieList.destroy.mockRejectedValue(error);

      await MovieListController.deleteListMovie(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
