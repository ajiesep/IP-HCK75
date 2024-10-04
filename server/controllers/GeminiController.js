const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminiAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-pro-001" });

module.exports = class GeminiController {
  static async geminiAi(req, res, next) {
    try {
      const prompt = prompt;

      const result = await model.generateContent(prompt);
      res.send(result.response.text());
    } catch (error) {
      next(error);
    }
  }
};
