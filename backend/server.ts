import "https://deno.land/x/dotenv/load.ts";

const hyperspaceRestUrl = "https://beta.api.solanalysis.com/rest";
const ntfyUrl = "https://ntfy.sh";
const apiKey = Deno.env.get("HYPERSPACE_API_KEY");

if (typeof apiKey !== "string") {
  console.log("HYPERSPACE_API_KEY not found");
  Deno.exit(1);
}

async function queryFauna(
  query: string,
  variables: { [key: string]: unknown }
): Promise<{
  data?: any;
  error?: any;
}> {
  const token = Deno.env.get("FAUNA_SECRET");
  if (!token) {
    throw new Error("environment variable FAUNA_SECRET not set");
  }

  try {
    const res = await fetch("https://graphql.us.fauna.com/graphql", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const { data, errors } = await res.json();
    if (errors) {
      // Return the first error if there are any.
      return { data, error: errors[0] };
    }

    return { data };
  } catch (error) {
    return { error };
  }
}

const getProjects = async () => {
  const query = `
  query allNotifications{
    allNotifications {
      data {
        address
        projects
      }
    }
  }`;
  const { data } = await queryFauna(query, {});
  return data;
};

const serveHttp = async (conn: Deno.Conn) => {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const response = pushNotifications(requestEvent);
    requestEvent.respondWith(response);
  }
};

const pushNotifications = async (_req: any) => {
  const subscriptions = await getProjects();
  for (const sub of subscriptions.allNotifications.data) {
    const { address, projects } = sub;
    const res = await fetch(hyperspaceRestUrl + "/get-project-stats", {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conditions: {
          project_ids: projects,
        },
      }),
    });
    const json = await res.json();

    const prices = [];
    for (const project of json.project_stats) {
      prices.push({
        project: project.project_id,
        floor_price: parseFloat(project.floor_price).toLocaleString(undefined, {
          maximumFractionDigits: 3,
        }),
      });
    }

    const response = {
      prices: prices,
    };

    await fetch(`${ntfyUrl}/${address}-subs`, {
      method: "POST",
      body: JSON.stringify(response),
    });
  }
  return new Response(undefined, { status: 200 });
};

const server = Deno.listen({ port: Number(Deno.env.get("PORT")) ?? 8000 });
for await (const conn of server) {
  serveHttp(conn);
}
