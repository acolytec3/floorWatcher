import "https://deno.land/x/dotenv/load.ts";
import { queryFauna } from "./helpers/fauna.ts";

const hyperspaceRestUrl = "https://beta.api.solanalysis.com/rest";
const ntfyUrl = "https://ntfy.sh";
const apiKey = Deno.env.get("HYPERSPACE_API_KEY");

if (typeof apiKey !== "string") {
  console.log("HYPERSPACE_API_KEY not found");
  Deno.exit(1);
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
  
export const pushNotifications = async (_req: any) => {
    const subscriptions = await getProjects();
    console.log(subscriptions)
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
            project_ids: projects[0].split(',').map((el: string)=> el.trim()),
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
      console.log(json.project_stats)
      await fetch(`${ntfyUrl}/${address}-subs`, {
        method: "POST",
        body: JSON.stringify(response),
      });
    }
    return new Response(undefined, { status: 200 });
  };