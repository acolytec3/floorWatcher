import { useSignal } from "@preact/signals";

const NotificationForm = (props: any): any => {
  const backend = 'https://acolytec3-floor-atcher.deno.dev/subscriptions'
  const projects = useSignal("")
  const createSubscription = async (req: any) => {
    console.log("we am handling", projects.value);
    req.preventDefault()
    const res = await fetch(backend, { method: "POST", mode: 'no-cors', headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': backend
                }, body: JSON.stringify({
                  address: props.address,
                  projects: [projects.value]
                }) })
    console.log('we head something', res)
  };
  return (
    <div>
      <form onSubmit={createSubscription}>
        Projects
        <input type="text" name="projects" value={projects.value} onChange={(e) => projects.value = e.currentTarget.value}/>
        <button type="submit">Subscribe to cheese</button>
      </form>
    </div>
  );
};

export default NotificationForm;
