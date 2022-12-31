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
  };
  return (
    <div>
      <form onSubmit={createSubscription}>
        Projects
        <input class="border-2 border-black-500 mx-2" type="text" name="projects" value={projects.value} onChange={(e) => projects.value = e.currentTarget.value}/>
        <button type="submit">Subscribe to floor price notifications</button>
      </form>
    </div>
  );
};

export default NotificationForm;
