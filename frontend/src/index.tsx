import React from "react";
import { render } from "react-dom";
import {
	ApolloProvider,
	ApolloLink,
	HttpLink,
	Observable,
	ApolloClient,
	InMemoryCache,
} from "@apollo/client";
import { NormalizedCacheObject } from "@apollo/client";
import {
	getaccessToken,
	setaccessTokeen,
} from "./component/authentication:/accessToken";
import { App } from "./app";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { onError } from "apollo-link-error";
import jwtdecode from "jwt-decode";
import "./index.css";
// import { ApolloClient ,InMemoryCache} from "@apollo/client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import {onError} from "@apollo/client/link/error"
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "@apollo/client";
// import { ApolloProvider } from "@apollo/react-hooks";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
// import { ApolloLink, Observable } from "apollo-link";
// import { onError } from "@apollo/client/link/error";
// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// import axios from "axios";

const request_link = new ApolloLink(
	(operation, forward) =>
		new Observable((observer) => {
			let handel: any;
			Promise.resolve(operation)
				.then(async (operation: any) => {
					const token = await getaccessToken();
					// console.log(token);
					operation.setContext({
						headers: {
							authorization: `Bearer ${token}`,
						},
					});
				})
				.then(() => {
					handel = forward(operation).subscribe({
						next: observer.next.bind(observer),
						error: observer.error.bind(observer),
						complete: observer.complete.bind(observer),
					});
				})
				.catch(observer.error.bind(observer));

			return () => {
				if (handel) handel.unsubscribe();
			};
		})
);
const Error_link: any = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		// graphQLErrors.map(({ message, locations, path }) =>
		// 	console.log(
		// 		`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
		// 	)
		// );
		console.log(graphQLErrors);
	if (networkError) {
		// console.log(`[Network error]: ${networkError}`);
		console.log(networkError);
	}
});

const http_link = new HttpLink({
	uri: "http://localhost:4001/graphql",
	credentials: "include",
});

let cache = new InMemoryCache({});

const link = ApolloLink.from([
	new TokenRefreshLink({
		accessTokenField: "accessToken",
		isTokenValidOrUndefined: () => {
			const token = getaccessToken();
			if (!token) {
				return true;
			}

			try {
				const { exp }: any = jwtdecode(token);
				if (Date.now() >= exp * 1000) {
					return false;
				} else {
					return true;
				}
			} catch (error) {
				return false;
			}
		},
		fetchAccessToken: () => {
			return fetch("http://localhost:4001/refresh_token", {
				method: "POST",
				credentials: "include",
			});
		},
		handleFetch: (accessToken) => {
			// const accessTokenDecrypted = jwtdecode(accessToken);
			setaccessTokeen(accessToken);
			// setExpiresIn(parseExp(accessTokenDecrypted.exp).toString());
		},
		// handleResponse: (operation, accessTokenField) => (response) => {
		// 	// here you can parse response, handle errors, prepare returned token to
		// 	// further operations
		// 	// returned object should be like this:
		// 	// {
		// 	//    access_token: 'token string here'
		// 	// }
		// },
		handleError: (err) => {
			// full control over handling token fetch Error
			console.warn("Your refresh token is invalid. Try to relogin");
			console.error(err);

			// // your custom action here
			// user.logout();
		},
	}),
	Error_link,
	request_link,
	http_link,
]);

const client = new ApolloClient<NormalizedCacheObject>({
	cache,
	link,
});

// const client: any = new ApolloClient({
// 	uri: "http://localhost:4001/graphql",
// 	credentials: "include",
// 	request: async (operation: any) => {
// 		const token = await getaccessToken();
// 		console.log(token);
// 		operation.setContext({
// 			headers: {
// 				authorization: token ? `Bearer ${token}` : "",
// 			},
// 		});
// 	},
// });

render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);

// headers: {
// 	authorization: `Bearer ${localStorage.getItem("token")}`,
// },

// };

// const ApolloApp: ReactElement<()=>void> = () => {
// 	<ApolloProvider client={client}>
// 		<App />
// 	</ApolloProvider>;

// render(ApolloApp(), document.getElementById("root"));
// axios.interceptors.request.use(
// 	(config) => {
// 		config.headers.authorization = `Bearer ${token}`;
// 		return config;
// 	},
// 	(error) => {
// 		console.log(error);
// 		return Promise.reject(error);
// 	}
// );

// const httpLink = createHttpLink({
// 	uri: "http://localhost:4001/graphql",
// });

// const authMiddleware = new ApolloLink((operation, forward) => {
// 	// add the authorization to the headers
// 	const token = setaccessToken();
// 	operation.setContext({
// 		headers: {
// 			authorization: token ? `Bearer ${token}` : "",
// 		},
// 	});
// 	console.log(concat(authMiddleware, httpLink));
// 	return forward(operation);
// });

// const client = new ApolloClient({
// 	cache: new InMemoryCache(),
// 	link: concat(authMiddleware, httpLink),
// });
