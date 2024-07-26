const swaggerJSDoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Valet Club API Documentation",
			version: "1.0.0",
			description: "API Documentation for the application",
		},
		servers: [
			{
				url: "http://localhost:3000/api/v1/", // Local development server URL
			},
			{
				url: "https://valetclub-api.onrender.com/api/v1/", // Production server URL
			},
		],
	},
	apis: ["./src/routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
