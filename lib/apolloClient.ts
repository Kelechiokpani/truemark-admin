import { ApolloClient, InMemoryCache, createHttpLink, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { NEXT_PUBLIC_API_URL } from "@/lib/env";



const httpLink = createHttpLink({
  uri: NEXT_PUBLIC_API_URL,
  // uri: "https://staging.api.truemarkglobalss.com/graphql",
  // uri: "https://api.truemarkglobalss.com/graphql",
});

// @ts-ignore
export const errorLink = onError((graphQLErrors:any) => {
      // In case you still want to use raw bodyText
      const {  networkError, operation } = graphQLErrors;
      const bodyText = (graphQLErrors as any)?.error?.bodyText;
      if (bodyText) {
        try {
          const parsed = JSON.parse(bodyText);
          parsed?.errors?.forEach((err: any) => {
            const message = err?.message;
            const code = err?.extensions?.code;
            const stacktrace = err?.extensions?.exception?.stacktrace?.[0];

            console.log("GraphQL Message:", message);
            console.log("GraphQL Code:", code);
            console.log("GraphQL Stacktrace:", stacktrace);

            if (code === "UNAUTHENTICATED") {
              localStorage.removeItem("token"); // clear token
              localStorage.removeItem("currentUser"); // optional
              window.location.href = "/signin"; // redirect
            }

          });
        } catch (e) {
          console.error("Failed to parse bodyText:", e);
        }
      }

      // if (graphQLErrors) {
      //   graphQLErrors?.forEach(({ message, extensions }) => {
      //     const code = extensions?.code;
      //     const stacktrace = extensions?.exception?.stacktrace?.[0];
      //
      //     console.log("GraphQL Message:", message);
      //     console.log("GraphQL Code:", code);
      //     console.log("GraphQL Stacktrace:", stacktrace);
      //   });
      // }

      if (networkError) {
        console.error("Network Error:", networkError);
      }

});

const authLink = setContext((_, { headers }) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

// export const client = new ApolloClient({
//   link: from([authLink, errorLink, uploadLink]),
//   cache: new InMemoryCache(),
// });
