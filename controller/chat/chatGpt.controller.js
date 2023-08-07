const apiResponse = require("../../helpers/apiResponse");
const { Configuration, OpenAIApi } = require("openai");
const { ObjectId } = require("mongoose").Types;
const fs = require('fs');

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

exports.getGPT3Completion = async (req, res) => {
    try {
        const { prompt, session } = req.body;

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: prompt}],
            max_tokens:100
        });

        // Extract the completion text from the API response
        const reply = completion.data.choices[0].message;

        const formattedText = reply.content;

        return apiResponse.successResponseWithData(res, "Response fetched successfully", { formattedText });
    } catch (error) {
        return apiResponse.ErrorResponse(res, error.message);
    }
};

exports.fetchModels = async (req, res) => {
    try {

        const response = await openai.listModels();

        const models = response.data.data;

        return apiResponse.successResponseWithData(res, "Models fetched successfully", { models });

    } catch (error) {
        return apiResponse.ErrorResponse(res, error.message);
    }
};

exports.createImage = async (req, res) => {
    try {

        const { prompt } = req.body;

        const response = await openai.createImage({
            prompt: prompt,
            n: 3,
            size: "1024x1024",
        });

        const images = response.data.data;

        return apiResponse.successResponseWithData(res, "Images fetched successfully", { images });

    } catch (error) {
        return apiResponse.ErrorResponse(res, error.message);
    }
};

