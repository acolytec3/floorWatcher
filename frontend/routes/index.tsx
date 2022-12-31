import { Head } from "$fresh/runtime.ts";
import Address from "../islands/Address.tsx";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import "https://deno.land/x/dotenv/load.ts";
interface Url {
  url: string
}
export const handler: Handlers<Url> = {
  async GET(_req: Request, ctx: HandlerContext) {
    const url = Deno.env.get("BACKEND_URL") || 'http://localhost:8002'
    return ctx.render({ url: url} )
  }
}

export default function Home(props: PageProps<Url>) {
  return (
    <>
      <Head>
        <title>Floor Watcher</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="my-6">
          Lets setup some floor price notifications
        </p>
        <Address url={props.data.url}/>
      </div>
    </>
  );
}
