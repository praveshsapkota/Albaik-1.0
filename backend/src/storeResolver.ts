import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import {
	Mojitodata,
	Boxmealdata,
	Bucketdata,
	Burgerdata,
	Crushersdata,
	Desertdata,
	Frieddata,
	Twisterdata,
} from "./entity/User";

@Resolver()
export class StoreResolver {
	@Query(() => [Mojitodata])
	Mojito() {
		return Mojitodata.find();
	}

	@Mutation(() => Boolean)
	async addMojito(
		// @Arg("options" , ()=>MojitoInput) options : MojitoInput
		@Arg("name") name: string,
		@Arg("price", () => Int) price: number,
		@Arg("star") star: number
	) {
		await Mojitodata.insert({ name, price, star });
		return true;
	}

	@Query(() => [Crushersdata])
	Crushers() {
		return Crushersdata.find();
	}

	@Mutation(() => Boolean)
	async addCrushers(
		@Arg("name") name: string,
		@Arg("price", () => Int) price: number,
		@Arg("star") star: number
	) {
		await Crushersdata.insert({ name, price, star });
		return true;
	}

	@Query(() => [Desertdata])
	Desert() {
		return Desertdata.find();
	}

	@Mutation(() => Boolean)
	async addDesert(
		@Arg("name") name: string,
		@Arg("price", () => Int) price: number,
		@Arg("star") star: number
	) {
		await Desertdata.insert({ name, price, star });
		return true;
	}

	@Query(() => [Burgerdata])
	Burger() {
		return Burgerdata.find();
	}

	@Mutation(() => Boolean)
	async addBurgar(
		@Arg("name") name: string,
		@Arg("price", () => Int) price: number,
		@Arg("star") star: number
	) {
		await Burgerdata.insert({ name, price, star });
		return true;
	}

	@Query(() => [Twisterdata])
	Twister() {
		return Twisterdata.find();
	}

	@Mutation(() => Boolean)
	async addTwister(
		// @Arg("options" , ()=>MojitoInput) options : MojitoInput
		@Arg("name") name: string,
		@Arg("price", () => Int) price: number,
		@Arg("star") star: number
	) {
		await Twisterdata.insert({ name, price, star });
		return true;
	}

	@Query(() => [Frieddata])
	Fried() {
		return Frieddata.find();
	}

	@Mutation(() => Boolean)
	async addFried(
		// @Arg("options" , ()=>MojitoInput) options : MojitoInput
		@Arg("name") name: string,
		@Arg("price", () => Int) price: number,
		@Arg("star") star: number
	) {
		await Frieddata.insert({ name, price, star });
		return true;
	}

	@Query(() => [Boxmealdata])
	BoxMeal() {
		return Boxmealdata.find();
	}

	@Mutation(() => Boolean)
	async addBoxMeal(
		// @Arg("options" , ()=>MojitoInput) options : MojitoInput
		@Arg("name") name: string,
		@Arg("price", () => Int) price: number,
		@Arg("star") star: number
	) {
		await Boxmealdata.insert({ name, price, star });
		return true;
	}

	@Query(() => [Bucketdata])
	Bucket() {
		return Bucketdata.find();
	}

	@Mutation(() => Boolean)
	async addBucket(
		// @Arg("options" , ()=>MojitoInput) options : MojitoInput
		@Arg("name") name: string,
		@Arg("price", () => Int) price: number,
		@Arg("star") star: number
	) {
		await Bucketdata.insert({ name, price, star });
		return true;
	}

	@Query(() => [Mojitodata])
	DrinksBevrages() {
		return Mojitodata.find();
	}

	@Mutation(() => Boolean)
	async addDrinkBevrages(
		// @Arg("options" , ()=>MojitoInput) options : MojitoInput
		@Arg("name") name: string,
		@Arg("price", () => Int) price: number,
		@Arg("star") star: number
	) {
		await Mojitodata.insert({ name, price, star });
		return true;
	}
}
