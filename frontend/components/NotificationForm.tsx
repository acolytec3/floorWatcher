import { useSignal } from "@preact/signals";

interface FormProps {
  address: string,
  url: string
}

const NotificationForm = (props: FormProps): any => {
  const projects = useSignal("")
  const createSubscription = async (req: any) => {
    req.preventDefault()
    const res = await fetch(props.url, { method: "POST", mode: 'no-cors', headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': props.url
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
