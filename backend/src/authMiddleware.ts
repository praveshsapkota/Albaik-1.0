import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { context } from "./context";

const Auth: MiddlewareFn<context> = ({ context }, next) => {
	const authorization = context.req.headers["authorization"];
	// console.log("authorization");

	if (!authorization) {
		throw new Error("not authenticated");
	}
	console.log(authorization);

	try {
		const token = authorization.split(" ")[1];
		const payload = verify(token, process.env.ACCESS_TOKEN!);
		context.payload = payload as any;
	} catch (err) {
		console.log(err);
		throw new Error("invalid token for authentication");
	}

	return next();
};

export default Auth;
