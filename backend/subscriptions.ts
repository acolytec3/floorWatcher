import { queryFauna } from "./helpers/fauna.ts";
import * as ed from 'npm:@noble/ed25519@1.7.1';
import { base58 } from 'npm:@scure/base@1.1.1'
export const updateSubscriptions = async (req: Request): Promise<Response> => {
    const { address, projects } = await req.json()
    const query = `
    mutation {
      createNotification(data: { address: "${address.address}", projects: ${JSON.stringify(projects)} }) {
        address
        projects
      }
    }
    `
    const sigData = (Uint8Array.from(address.signature.signature.data))
    const verified = await ed.verify(sigData, new TextEncoder().encode(address.message), base58.decode(address.signature.publicKey))
    if (!verified) return new Response(undefined, { status: 401, statusText: 'bad signature'});
    const { error } = await queryFauna(query, {});
    if (error !== undefined) return new Response(undefined, { status: 500, statusText: 'error updating subscriptions'})
    return new Response(undefined, { status: 200});
  };