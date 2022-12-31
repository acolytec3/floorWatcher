import { useSignal } from "@preact/signals";

const NotificationForm = (props: any): any => {
  console.log("rendering the form!", props);
  const projects = useSignal("")
  const createSubscription = async (req: any) => {
    console.log("we am handling", projects.value);
    req.preventDefault()
    const res = await fetch('http://localhost:8002/subscriptions', { method: "POST", mode: 'no-cors', headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:8002/subscriptions'
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
