const express = require('express');
const apiRoutes = require("./routes/index.routes");

const app = express();
const PORT = 8080;
const API_PREFIX = "api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/${API_PREFIX}`, apiRoutes);

app.listen(PORT, () => {
    console.log(`Aplicación corriendo en el puerto: ${PORT}`);
});