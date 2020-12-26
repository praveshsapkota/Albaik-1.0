import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity("Auths")
export class User extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	// @Column()
	// firstName: string;

	@Field()
	@Column("text")
	email: string;

	@Field()
	@Column("text", { default: null })
	firstname: string;

	@Field()
	@Column("text", { default: null })
	lastname: string;

	@Column("text")
	password: string;

	@Column("int", { default: 0 })
	tokenVersion: number;

	@Field()
	@Column("boolean", { default: false })
	confirmed: boolean;
}

@ObjectType()
@Entity("Mojito")
export class Mojitodata extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column("text")
	name: string;

	@Field(() => Int)
	@Column("text")
	price: number;

	@Field(() => Int)
	@Column("int", { default: 4 })
	star: number;
}

@ObjectType()
@Entity("Crushers")
export class Crushersdata extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column("text")
	name: string;

	@Field(() => Int)
	@Column("text")
	price: number;

	@Field(() => Int)
	@Column("int", { default: 4 })
	star: number;
}

@ObjectType()
@Entity("Desert")
export class Desertdata extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column("text")
	name: string;

	@Field(() => Int)
	@Column("text")
	price: number;

	@Field(() => Int)
	@Column("int", { default: 0 })
	star: number;
}

@ObjectType()
@Entity("Burgar")
export class Burgerdata extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column("text")
	name: string;

	@Field(() => Int)
	@Column("text")
	price: number;

	@Field(() => Int)
	@Column("int", { default: 0 })
	star: number;

	@Field(() => Boolean)
	@Column("boolean", { default: false })
	vegan: boolean;
}

@ObjectType()
@Entity("Twister")
export class Twisterdata extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column("text")
	name: string;

	@Field(() => Int)
	@Column("text")
	price: number;

	@Field(() => Int)
	@Column("int", { default: 0 })
	star: number;

	@Field()
	@Column("boolean", { default: false })
	vegan: boolean;
}

@ObjectType()
@Entity("Fried")
export class Frieddata extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column("text")
	name: string;

	@Field(() => Int)
	@Column("text")
	price: number;

	@Field(() => Int)
	@Column("int", { default: 0 })
	star: number;

	@Field()
	@Column("boolean", { default: false })
	vegan: boolean;
}

@ObjectType()
@Entity("BoxMeal")
export class Boxmealdata extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column("text")
	name: string;

	@Field(() => Int)
	@Column("text")
	price: number;

	@Field(() => Int)
	@Column("int", { default: 0 })
	star: number;

	@Field(() => Boolean)
	@Column("boolean", { default: false })
	vegan: boolean;
}

@ObjectType()
@Entity("Bucket")
export class Bucketdata extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column("text")
	name: string;

	@Field(() => Int)
	@Column("text")
	price: number;

	@Field(() => Int)
	@Column("int", { default: 0 })
	star: number;

	@Field()
	@Column("boolean", { default: false })
	vegan: boolean;
}
