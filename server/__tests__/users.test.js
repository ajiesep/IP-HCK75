const UserController = require("../controllers/UserController");
const User = require("../models/User");
const { hashPassword, comparePassword, signToken } = require("../helpers/auth");
const { OAuth2Client } = require("google-auth-library");

jest.mock("../models/User");
jest.mock("../helpers/auth");
jest.mock("google-auth-library");

describe("UserController", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      headers: {},
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

  describe("register", () => {
    it("should register a new user successfully", async () => {
      req.body = {
        userName: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      const mockedUser = {
        userName: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      };

      User.create.mockResolvedValue(mockedUser);
      hashPassword.mockReturnValue("hashedpassword");

      await UserController.register(req, res, next);

      expect(User.create).toHaveBeenCalledWith({
        userName: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockedUser);
    });

    it("should call next with error if registration fails", async () => {
      req.body = {
        userName: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      const error = new Error("Registration failed");
      User.create.mockRejectedValue(error);

      await UserController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("login", () => {
    it("should login user successfully", async () => {
      req.body = {
        email: "ajiesep@gmail.com",
        password: "password123",
      };

      const mockedUser = {
        id: 1,
        email: "test@example.com",
        password: "hashedpassword",
      };

      User.findOne.mockResolvedValue(mockedUser);
      comparePassword.mockReturnValue(true);
      signToken.mockReturnValue("mocked_token");

      await UserController.login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(comparePassword).toHaveBeenCalledWith(
        "password123",
        "hashedpassword"
      );
      expect(signToken).toHaveBeenCalledWith({ id: 1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ access_token: "mocked_token" });
    });

    it("should throw error if email or password is empty", async () => {
      req.body = {};

      await UserController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ name: "emailorpasswordempty" })
      );
    });

    it("should throw error if user is not found or password is incorrect", async () => {
      req.body = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      User.findOne.mockResolvedValue(null);

      await UserController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ name: "InvalidUser" })
      );
    });
  });

  describe("googleLogin", () => {
    it("should login or register user with Google successfully", async () => {
      req.headers = {
        google_token: "mocked_google_token",
      };

      const mockedPayload = {
        email: "test@example.com",
        name: "Test User",
      };

      const mockedUser = {
        id: 1,
        email: "test@example.com",
        userName: "Test User",
      };

      const mockedTicket = {
        getPayload: jest.fn().mockReturnValue(mockedPayload),
      };

      OAuth2Client.prototype.verifyIdToken = jest
        .fn()
        .mockResolvedValue(mockedTicket);
      User.findOrCreate.mockResolvedValue([mockedUser, false]);
      signToken.mockReturnValue("mocked_token");

      await UserController.googleLogin(req, res, next);

      expect(OAuth2Client.prototype.verifyIdToken).toHaveBeenCalledWith({
        idToken: "mocked_google_token",
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      expect(User.findOrCreate).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
        defaults: expect.any(Object),
      });
      expect(signToken).toHaveBeenCalledWith({ id: 1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ access_token: "mocked_token" });
    });

    it("should call next with error if Google login fails", async () => {
      req.headers = {
        google_token: "invalid_token",
      };

      const error = new Error("Google login failed");
      OAuth2Client.prototype.verifyIdToken = jest.fn().mockRejectedValue(error);

      await UserController.googleLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
