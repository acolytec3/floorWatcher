// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/api/joke.ts";
import * as $2 from "./routes/index.tsx";
import * as $$0 from "./islands/Address.tsx";
import * as $$1 from "./islands/Counter.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/api/joke.ts": $1,
    "./routes/index.tsx": $2,
  },
  islands: {
    "./islands/Address.tsx": $$0,
    "./islands/Counter.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
