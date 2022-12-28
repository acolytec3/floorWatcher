import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import "https://deno.land/x/dotenv/load.ts";

const hyperspaceRestUrl = 'https://beta.api.solanalysis.com/rest'
const ntfyUrl = 'https://ntfy.sh'
const apiKey = Deno.env.get("HYPERSPACE_API_KEY")

if (typeof apiKey !== 'string') {
  console.log('HYPERSPACE_API_KEY not found')
  Deno.exit(1)
}
serve(async (_req) => {
  const res = await fetch(hyperspaceRestUrl + '/get-project-stats', {
    method: "POST",
    headers: {
      "Authorization": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "conditions":{
        "project_ids":[
          "okaybears"
        ]
      }
    })
  })
  const json = await res.json()
  const projectId = json.project_stats[0].project_id
  const floorPrice = json.project_stats[0].floor_price

  const response = {
    "project_id": projectId,
    "floor_price": floorPrice
  }
  await fetch(`${ntfyUrl}/${projectId}floorprice`, { method: "POST", body: JSON.stringify(response)}) 
  return new Response(undefined, { status: 200}  );
}, { port: Number(Deno.env.get("PORT")) ?? 8000}
);