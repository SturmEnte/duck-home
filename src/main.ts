import "dotenv/config";
import express from "express";
import { join as path } from "path";

const app = express();

app.use(express.static(path(__dirname, "public")));

app.all("*", (req, res) => {
	res.sendFile(path(__dirname, "public", "404/404.html"));
});

app.listen(process.env.PORT, () => {
	console.log("Listening to port", process.env.PORT);
});
