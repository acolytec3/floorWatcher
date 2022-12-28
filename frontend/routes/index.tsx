import { Head } from "$fresh/runtime.ts";
import Address from "../islands/Address.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Floor Watcher</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="my-6">
          Let's setup some notifications
        </p>
        <Address />
      </div>
    </>
  );
}
