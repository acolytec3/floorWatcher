import { useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import NotificationForm from "../components/NotificationForm.tsx";


const getProvider = async () => {

    if ('phantom' in window) {
      const provider = (window.phantom as any).solana ;
  
      if (provider?.isPhantom) {
        const resp = await provider.connect()
        return resp.publicKey.toString()
      }

      return ""
    }
};


export default function Address() {
  const address = useSignal("");
  return (
    <div class="flex gap-2">
      <Button onClick={() => getProvider().then(res => address.value = res)}>Get address</Button>
      {address}
      {address !== "" && <NotificationForm address={address.value} />}
    </div>
  );
}
