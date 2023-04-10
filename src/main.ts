import "dotenv/config";
import { connect } from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import { join as path } from "path";

import api from "./routes/api";

const ignoreLoggedIn = ["login", "api", ".css", ".js", ".ico", ".json"];

connect(String(process.env.DB_URI))
	.then(() => {
		console.log("Connected to database");
	})
	.catch((err) => {
		console.log("Error while connecting to the database");
		console.log(err);
		process.exit();
	});

const app = express();

app.use(cookieParser());

app.all("*", (req, res) => {
	console.log(req.url);
	if (!req.cookies.loggedIn && !ignore(req.url)) {
		res.redirect("/login");
		return;
	}
	if (req.next) req.next();
});

app.use(express.static(path(__dirname, "public")));

app.use("/api", api);

app.all("*", (req, res) => {
	res.sendFile(path(__dirname, "public", "404/404.html"));
});

app.listen(process.env.PORT, () => {
	console.log("Listening to port", process.env.PORT);
});

function ignore(url: string): boolean {
	let ignore = false;
	ignoreLoggedIn.forEach((s) => {
		if (url.includes(s)) {
			ignore = true;
		}
	});
	return ignore;
}
