import "dotenv/config";
import { connect } from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import { join as path } from "path";

import api from "./routes/api";

const ignoreLoggedIn = ["login", "api", ".css", ".js", ".ico", ".json"];

const app = express();

app.use(cookieParser());

app.all("*", (req, res) => {
	if (!req.cookies.loggedIn && !ignore(req.url)) {
		res.redirect("/login");
		return;
	}
	if (req.next) req.next();
});

app.use(express.static(path(__dirname, "public")));
app.use(express.static(path(__dirname, "public", "modules"))); // The modules are in their own folder so the public folder is better organized but I still want to be able to access them in the root directory

app.use("/api", api);

app.all("*", (req, res) => {
	if (!req.url.includes("404")) res.status(404);
	res.sendFile(path(__dirname, "public", "404/404.html"));
});

connect(String(process.env.DB_URI))
	.then(() => {
		console.log("Connected to database");

		app.listen(process.env.PORT, () => {
			console.log("Listening to port", process.env.PORT);
		});
	})
	.catch((err) => {
		console.log("Error while connecting to the database:", err);
		process.exit();
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
