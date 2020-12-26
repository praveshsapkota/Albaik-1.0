import { Response } from "express";

const sendRefreshToken = (res: Response, token: string) => {
	res.cookie("mero11", token, {
		httpOnly: true,
		path: "/refresh_token",
	});
};

export default sendRefreshToken;
