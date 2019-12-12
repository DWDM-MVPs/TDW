const express = require("express");
const app = express();
const port = 4000;

require("./controllers/notas")(app);

app.use(express.json());

app.listen(port, () => {
	console.log("App ExpressJS");
});