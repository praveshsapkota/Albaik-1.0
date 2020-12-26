import React, { useEffect } from "react";
import { useBurgarQuery } from "../../../generated/graphql";
import "./burger.css";
import { IteamGrid } from "../../fixedComponent/IteamsGrid/iteamGrid";
interface props {}

export const Burgar: React.FC<props> = () => {
	const { loading, error, data } = useBurgarQuery();
	let BurgarData: any;
	if (loading) {
		BurgarData = <div>loading..</div>;
	}
	if (error) {
		BurgarData = <div>{error}</div>;
	}
	if (data) {
		// cruchersData = data.Crushers;
		// console.log("hellow" + cruchersData);
		BurgarData = <IteamGrid content={data.Burger} />;
	}
	return (
		<>
			<div className="crushers">{BurgarData}</div>
		</>
	);
};
