import GhostContentAPI from "@tryghost/content-api";
import { env } from "@/env.mjs";
export const api = new GhostContentAPI({
  url: env.API_URL,
  key: env.CONTENT_API_KEY,
  version: "v5.0",
  // @ts-expect-error
  makeRequest: ({ url, method, params, headers }) => {
    const apiUrl = new URL(url);
    // @ts-ignore
    Object.keys(params).map((key) =>
      apiUrl.searchParams.set(key, encodeURIComponent(params[key]))
    );

    return fetch(apiUrl.toString(), { method, headers })
      .then(async (res) => {
        // Check if the response was successful.
        if (!res.ok) {
          // You can handle HTTP errors here
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return { data: await res.json() };
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  },
});
