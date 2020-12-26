import {
	Resolver,
	Query,
	Mutation,
	Arg,
	ObjectType,
	Field,
	Ctx,
	UseMiddleware,
	Int,
} from "type-graphql";
import { User } from "./entity/User";
import { compare, hash } from "bcryptjs";
import { context } from "./context";
import "express";
import { createAccessToken, createRefreshToken } from "./auth";
import Auth from "./authMiddleware";
import sendRefreshToken from "./refreshTokken";
import { getConnection } from "typeorm";

@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string;

	@Field(() => User)
	user: User;
	@Field(() => User)
	fulluser: User;
}

@Resolver()
export class UserResolver {
	// @Query(() => String)
	// hellow() {
	// 	return "hellow bitch";s
	// }

	// @Query(() => String)
	// @UseMiddleware(Auth)
	// login(@Ctx() { payload }: context) {
	// 	return `your id is ${payload!.email}`;
	// }

	@Query(() => String)
	@UseMiddleware(Auth)
	bye(@Ctx() { payload }: context) {
		console.log("resolver");
		console.log("resolver" + payload);
		return `your user id : ${payload!.userID}`;
	}

	@Query(() => User)
	@UseMiddleware(Auth)
	async user(@Ctx() { payload }: context) {
		const user: any = await User.findOne(payload.userID);
		console.log(user);
		return user;
	}

	@Mutation(() => Boolean)
	logout(@Ctx() { res }: context) {
		sendRefreshToken(res, "");
		return true;
	}

	@Mutation(() => Boolean)
	async revokeToken(@Arg("userID", () => Int) userID: number) {
		await getConnection()
			.getRepository(User)
			.increment({ id: userID }, "tokenVersion", 1);
		return true;
	}

	@Mutation(() => LoginResponse)
	async authenticate(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx() { res }: context
	): Promise<LoginResponse> {
		const user = await User.findOne({ where: { email } });
		console.log(user?.id);
		const fulluser: any = await User.findOne({ where: { email } });
		// console.log(user);

		if (!user) {
			throw new Error("could not find user");
		}

		const valid = await compare(password, user.password);
		if (!valid) {
			throw new Error("bad password");
		}

		//login Succesful
		sendRefreshToken(res, createRefreshToken(user));
		// res.cookie("mero11", createRefreshToken(user), { httpOnly: true });

		return {
			accessToken: createAccessToken(user),
			user,
			fulluser,
		};
	}

	@Mutation(() => Boolean)
	async register(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Arg("firstname") firstname: string,
		@Arg("lastname") lastname: string
	) {
		const hashedPassword = await hash(password, 15);
		try {
			await User.insert({
				email,
				password: hashedPassword,
				firstname: firstname,
				lastname: lastname,
			});
		} catch (err) {
			console.log(err);
			return false;
		}
		return true;
	}
}
