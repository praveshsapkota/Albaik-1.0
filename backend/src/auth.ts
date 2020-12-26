import { sign } from "jsonwebtoken";
import { User } from "./entity/User";

export const createAccessToken = (user: User) => {
	return sign({ userID: user.id }, process.env.ACCESS_TOKEN!, {
		expiresIn: "15m",
	});
};

export const createRefreshToken = (user: User) => {
	return sign(
		{ userID: user.id, tokenversion: user.tokenVersion },
		process.env.REFRESH_TOKEN!,
		{
			expiresIn: "1000m",
		}
	);
};
