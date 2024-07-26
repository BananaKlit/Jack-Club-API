require("dotenv").config();
const path = require('path')
const express = require("express");
const supabase = require("./config/supabase");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");
const app = express();
const port = process.env.PORT || 3000;


// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Import routes
const clientRoutes = require('./routes/clientRoutes');
const valetRoutes = require('./routes/valetRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require("./routes/authRoutes");
const operationRoutes = require("./routes/operationRoutes");

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "docs")));


// Use routes
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/valets", valetRoutes);
app.use("/api/v1/admins", adminRoutes);
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/operations/", operationRoutes);


// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Valet Club API!');
});
// docs endpoint
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname , "/docs/index.html"))
});


app.listen(port, () => {
	console.log(`You app runing on http://localhost:${port}`);
});
