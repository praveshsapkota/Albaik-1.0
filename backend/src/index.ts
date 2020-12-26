import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./UserResolver";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./auth";
import sendRefreshToken from "./refreshTokken";
import cors from "cors";
import { StoreResolver } from "./storeResolver";
(async () => {
	const app = express();
	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);
	app.use(cookieParser());
	app.get("/", (_req, res) => res.send("hellow"));
	app.post("/refresh_token", async (req, res) => {
		const token = req.cookies.mero11;
		// console.log(token);
		if (!token) {
			return res.send({ ok: false, accessToken: "" });
		}
		let payload: any = null;
		try {
			payload = verify(token, process.env.REFRESH_TOKEN!);
			// console.log(payload);
		} catch (err) {
			console.log(err);
			return res.send({ ok: false, accessToken: "" });
		}

		const user = await User.findOne({ id: payload.userID });
		if (!user) {
			return res.send({ ok: false, accessToken: "" });
		}

		if (user.tokenVersion != payload.tokenversion) {
			// console.log(user.tokenVersion, payload.tokenversion);
			return res.send({ ok: false, accessToken: "", hellow: "fuckoff" });
		}

		sendRefreshToken(res, createRefreshToken(user));
		return res.send({ ok: true, accessToken: createAccessToken(user) });
	});

	await createConnection();

	//one way of writing graphql schema in apollow
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, StoreResolver],
		}),
		context: ({ req, res }) => ({ req, res }),
	});

	apolloServer.applyMiddleware({ app, cors: false });

	app.listen(4001, () => {
		console.log("express server started in port 4001");
	});
})();

//one way or defining schema in apollow
// typeDefs: `
//     type Query{
//         hellow: String!
//     }
//     `,
// 	resolvers: {
// 		Query: {
// 			hellow: () => "hellow world",
// 		},
// 	},

// ORM default tamplet
// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
