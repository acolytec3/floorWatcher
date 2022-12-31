import { queryFauna } from "./helpers/fauna.ts";

export const updateSubscriptions = async (req: Request): Promise<Response> => {
    const { address, projects } = await req.json()
    const query = `
    mutation {
      createNotification(data: { address: "${address}", projects: ${JSON.stringify(projects)} }) {
        address
        projects
      }
    }
    `
    const { error } = await queryFauna(query, {});
    if (error !== undefined) return new Response(undefined, { status: 500})
    return new Response(undefined, { status: 200});
  };