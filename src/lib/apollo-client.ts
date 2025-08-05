import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getStorage } from "@/utils/localstorage";

const GRAPHQL_URI = `${
  process.env.NEXT_PUBLIC_API_HOST || "http://localhost:8000"
}/graphql`;

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  let token: string | undefined = undefined;

  if (typeof window !== "undefined") {
    token = getStorage("token");
  }

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions, path }) => {
      console.error(`[GraphQL error]: ${message}`);

      if (extensions?.code === "UNAUTHENTICATED") {
        if (typeof window !== "undefined") {
          if (!path?.includes("customerProfile")) {
            window.location.href = "/login";
          }
        }
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export const clientSSR = () =>
  new ApolloClient({
    ssrMode: true,
    link: from([errorLink, authLink.concat(httpLink)]),
    cache: new InMemoryCache(),
  });
