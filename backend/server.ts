import "https://deno.land/x/dotenv/load.ts";
import { router } from "https://crux.land/router@0.0.12";
import { pushNotifications } from "./notifications.ts";
import { updateSubscriptions } from "./subscriptions.ts";

const handler = router({
  "GET@/": (req) => pushNotifications(req),
  "POST@/subscriptions": (req) => updateSubscriptions(req)
})

const serveHttp = async (conn: Deno.Conn) => {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const response = handler(requestEvent.request, conn);
    requestEvent.respondWith(response);
  }
};



const server = Deno.listen({ port: Number(Deno.env.get("PORT")) ?? 8000 });
for await (const conn of server) {
  serveHttp(conn);
}
