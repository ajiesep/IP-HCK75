const express = require("express");
const MovieListController = require("../controllers/MovieListController");
const movielist = express.Router();

movielist.post("/", MovieListController.addListMovie);
movielist.put("/:id", MovieListController.updateListMovie);
movielist.delete("/:id", MovieListController.deleteListMovie);

module.exports = movielist;
